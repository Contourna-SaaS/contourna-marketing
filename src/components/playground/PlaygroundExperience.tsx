"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  FileText,
  RotateCcw,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  EMPTY_PLAYGROUND_FORM,
  PLAYGROUND_DEPARTMENTS,
  PLAYGROUND_DOCUMENT_TYPES,
  getPlaygroundDocumentType,
} from "@/features/playground/config";
import { generatePlaygroundDocument } from "@/features/playground/api";
import { readStoredDraft, writeStoredDraft } from "@/features/playground/storage";
import type {
  GeneratedPlaygroundDocument,
  PlaygroundDocumentType,
  PlaygroundForm,
  StoredPlaygroundDraft,
} from "@/features/playground/types";
import { cn } from "@/lib/cn";

import { DocumentEditor } from "./DocumentEditor";
import { PlaygroundGeneratingView } from "./PlaygroundGeneratingView";
import { PlaygroundStepper } from "./PlaygroundStepper";

const typeIcons = {
  Policy: Shield,
  Procedure: ClipboardList,
  WorkInstruction: Wrench,
};

const fieldClass =
  "mt-2 w-full rounded-lg border border-c-brown/15 bg-c-off-white px-3.5 py-2.5 text-sm text-c-ink outline-none placeholder:text-c-brown/65 focus:border-c-yellow focus:bg-white focus:ring-2 focus:ring-c-yellow/25";
const primaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-c-yellow px-5 text-sm font-semibold text-c-brown transition-colors hover:bg-c-brown hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow disabled:cursor-not-allowed disabled:opacity-40";
const developmentBypassEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_PLAYGROUND_BYPASS_TURNSTILE === "true";
const privacyUrl = `${(process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com").replace(/\/$/, "")}/privacy`;

const PLAYGROUND_STEPS = ["choose", "customize", "review"] as const;

type PlaygroundStep = (typeof PLAYGROUND_STEPS)[number];

function getPlaygroundStep(value: string | null): PlaygroundStep {
  return PLAYGROUND_STEPS.includes(value as PlaygroundStep) ? (value as PlaygroundStep) : "choose";
}

export function isPlaygroundFormValid(form: PlaygroundForm): boolean {
  const documentType = getPlaygroundDocumentType(form.documentType);
  if (!documentType) return false;
  if (!form.name.trim() || !form.description.trim() || !form.department) return false;
  if (form.department === "Other" && !form.otherDepartment.trim()) return false;
  return documentType.questions
    .filter((question) => question.required)
    .every((question) => form.answers[question.id]?.trim());
}

export function PlaygroundExperience() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<PlaygroundForm>(EMPTY_PLAYGROUND_FORM);
  const [email, setEmail] = useState("");
  const [draft, setDraft] = useState<StoredPlaygroundDraft | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const previousStep = useRef<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const documentType = getPlaygroundDocumentType(form.documentType);
  // Steps that need a chosen document type fall back to "choose".
  const requestedStep = getPlaygroundStep(searchParams.get("step"));
  const currentStep = documentType ? requestedStep : "choose";
  const step = PLAYGROUND_STEPS.indexOf(currentStep);

  useEffect(() => {
    const didChange = previousStep.current !== null && previousStep.current !== currentStep;
    previousStep.current = currentStep;
    if (!didChange) return;
    const heading = formRef.current?.querySelector<HTMLElement>("h2");
    heading?.focus({ preventScroll: true });
    if (formRef.current && formRef.current.getBoundingClientRect().top < 88) {
      formRef.current.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [currentStep]);

  const navigateToStep = useCallback(
    (nextStep: PlaygroundStep, method: "push" | "replace" = "push") => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", nextStep);
      // Wizard steps are client state. Route navigation can restore cached search
      // params in a static production build and send Continue back to "choose".
      window.history[method === "push" ? "pushState" : "replaceState"](
        null, "", `${pathname}?${params.toString()}`,
      );
    },
    [pathname, searchParams],
  );

  useEffect(() => {
    if (requestedStep !== currentStep || !searchParams.has("step")) {
      navigateToStep(currentStep, "replace");
    }
  }, [currentStep, navigateToStep, requestedStep, searchParams]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDraft(readStoredDraft(window.sessionStorage));
      setIsHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const persistDraft = useCallback((nextDraft: StoredPlaygroundDraft | null) => {
    setDraft(nextDraft);
    writeStoredDraft(window.sessionStorage, nextDraft);
  }, []);

  const selectDocumentType = (selectedType: PlaygroundDocumentType) => {
    const selected = getPlaygroundDocumentType(selectedType);
    if (selected) setForm({ documentType: selectedType, ...selected.sample });
  };

  const updateForm = (patch: Partial<PlaygroundForm>) => {
    setForm((current) => ({ ...current, ...patch }));
  };

  const updateAnswer = (id: string, value: string) => {
    setForm((current) => ({
      ...current,
      answers: { ...current.answers, [id]: value },
    }));
  };

  const reset = () => {
    setForm(EMPTY_PLAYGROUND_FORM);
    setEmail("");
    setError(null);
    setTurnstileToken(null);
    persistDraft(null);
    navigateToStep("choose", "replace");
  };

  const handleGenerate = async () => {
    const verificationToken = developmentBypassEnabled ? "development-bypass" : turnstileToken;
    if (!verificationToken || isGenerating || currentStep !== "review" || !isPlaygroundFormValid(form)) return;
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generatePlaygroundDocument(
        form,
        email.trim().toLowerCase(),
        verificationToken,
      );
      persistDraft({ version: 1, form, document: result.document, quota: result.quota });
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Unable to generate a document right now.",
      );
    } finally {
      setIsGenerating(false);
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  const updateDocument = (patch: Partial<GeneratedPlaygroundDocument>) => {
    if (!draft) return;
    persistDraft({ ...draft, document: { ...draft.document, ...patch } });
  };

  if (!isHydrated) {
    return <div className="h-96 animate-pulse bg-c-yellow-light" aria-label="Loading playground" />;
  }

  if (draft) {
    return (
      <DocumentEditor
        document={draft.document}
        quota={draft.quota}
        onContentChange={(documentContent) => updateDocument({ documentContent })}
        onTitleChange={(name) => updateDocument({ name })}
        onStartOver={reset}
      />
    );
  }

  const canContinue =
    (step === 0 && Boolean(form.documentType)) || (step === 1 && isPlaygroundFormValid(form));

  return (
    <form
      ref={formRef}
      className="relative scroll-mt-24 [&_h2]:text-balance [&_h3]:text-balance [&_p]:text-pretty"
      onSubmit={(event) => {
        event.preventDefault();
        void handleGenerate();
      }}
    >
      {isGenerating ? <PlaygroundGeneratingView /> : null}

      <PlaygroundStepper currentStep={step} />

      <div className="mt-7">
        {step === 0 ? (
          <section aria-labelledby="document-type-heading">
            <h2 tabIndex={-1} id="document-type-heading" className="text-xl font-semibold tracking-tight text-c-ink sm:text-2xl">
              What would you like to create?
            </h2>
            <p className="mt-2 text-sm leading-6 text-c-brown/75">
              Pick a document type and we will load an example you can make your own.
            </p>
            <div role="radiogroup" aria-label="Document type" className="mt-6 grid gap-3 md:grid-cols-3">
              {PLAYGROUND_DOCUMENT_TYPES.map((item) => {
                const Icon = typeIcons[item.type];
                const isSelected = form.documentType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    role="radio"
                    aria-label={`${item.title} ${item.description}`}
                    aria-checked={isSelected}
                    aria-describedby={`${item.type}-example`}
                    onClick={() => selectDocumentType(item.type)}
                    className={cn(
                      "relative grid h-full grid-cols-[2.5rem_1fr] gap-x-3 rounded-xl md:flex md:flex-col border-2 p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-brown focus-visible:ring-offset-2",
                      isSelected ? "border-c-brown bg-c-yellow-light" : "border-c-line bg-white hover:border-c-brown/40 hover:bg-c-off-white/50",
                    )}
                  >
                    <span aria-hidden="true" className={cn(
                      "absolute right-5 top-5 flex h-5 w-5 items-center justify-center rounded-full border",
                      isSelected ? "border-c-brown bg-c-brown text-white" : "border-c-brown/20",
                    )}>
                      {isSelected ? <Check className="h-3 w-3" /> : null}
                    </span>
                    <span className={cn(
                      "row-span-2 flex h-10 w-10 items-center justify-center rounded-lg",
                      isSelected ? "bg-c-yellow text-c-brown" : "bg-c-yellow-light text-c-brown",
                    )}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="block pr-5 font-semibold text-c-ink md:mt-4 md:pr-0">{item.title}</span>
                    <span className="col-start-2 mt-2 block flex-1 text-sm leading-6 text-c-brown/75">{item.description}</span>
                    <span id={`${item.type}-example`} className="col-span-2 mt-4 flex items-start gap-2 border-t border-c-brown/10 pt-3 md:mt-5 md:pt-4 text-xs leading-5 text-c-brown/75">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span><span className="block font-medium text-c-brown">Try an example</span>{item.sample.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {step === 1 && documentType ? (
          <section aria-labelledby="details-heading">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-c-brown/10 pb-5">
              <div>
                <h2 tabIndex={-1} id="details-heading" className="text-xl font-semibold tracking-tight text-c-ink sm:text-2xl">Customize the example</h2>
                <p className="mt-1 text-sm text-c-brown/75">Change as much or as little as you like.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-c-yellow-light px-3 py-1 text-xs font-semibold text-c-brown">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> AI · {documentType.title}
              </span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Document title" id="playground-name" required className="sm:col-span-2">
                <input id="playground-name" value={form.name} maxLength={120} onChange={(event) => updateForm({ name: event.target.value })} className={fieldClass} />
              </Field>
              <Field label="Description" id="playground-description" required className="sm:col-span-2">
                <textarea id="playground-description" rows={3} value={form.description} maxLength={1500} onChange={(event) => updateForm({ description: event.target.value })} className={fieldClass} />
              </Field>
              <Field label="Department" id="playground-department" required>
                <select id="playground-department" value={form.department} onChange={(event) => updateForm({ department: event.target.value })} className={fieldClass}>
                  <option value="">Select department</option>
                  {PLAYGROUND_DEPARTMENTS.map((department) => <option key={department} value={department}>{department}</option>)}
                </select>
              </Field>
              <Field label="Organization" id="playground-organization">
                <input id="playground-organization" value={form.organizationName} maxLength={120} placeholder="Optional" onChange={(event) => updateForm({ organizationName: event.target.value })} className={fieldClass} />
              </Field>
              {form.department === "Other" ? (
                <Field label="Department name" id="playground-other-department" required className="sm:col-span-2">
                  <input id="playground-other-department" value={form.otherDepartment} maxLength={120} onChange={(event) => updateForm({ otherDepartment: event.target.value })} className={fieldClass} />
                </Field>
              ) : null}
              {documentType.questions.map((question) => (
                <Field key={question.id} label={question.label} id={`playground-${question.id}`} required={question.required} className="sm:col-span-2">
                  <textarea id={`playground-${question.id}`} rows={3} value={form.answers[question.id] || ""} placeholder={question.placeholder} maxLength={2000} onChange={(event) => updateAnswer(question.id, event.target.value)} className={fieldClass} />
                </Field>
              ))}
            </div>
          </section>
        ) : null}

        {step === 2 && documentType ? (
          <section aria-labelledby="review-heading">
            <h2 tabIndex={-1} id="review-heading" className="text-xl font-semibold tracking-tight text-c-ink sm:text-2xl">Review and generate</h2>
            <p className="mt-2 text-sm leading-6 text-c-brown/75">Check the details, complete verification, and create your editable draft.</p>
            <div className="mt-6">
              <Field label="Email" id="playground-email" required>
                <input
                  id="playground-email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={fieldClass}
                />
              </Field>
              <p className="mt-2 text-xs leading-5 text-c-brown/75">
                We use your email only to provide and protect the playground, including its two-document limit every 24 hours. We will not use it for marketing. See our{" "}
                <a href={privacyUrl} className="underline hover:text-c-brown">Privacy Policy</a>.
              </p>
            </div>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-c-brown/10 bg-c-brown/10 sm:grid-cols-2">
              <ReviewItem label="Type" value={documentType.title} />
              <ReviewItem label="Department" value={form.department === "Other" ? form.otherDepartment : form.department} />
              <ReviewItem label="Title" value={form.name} className="sm:col-span-2" />
              <ReviewItem label="Description" value={form.description} className="sm:col-span-2" />
            </dl>
            <div className="mt-6 border-l-4 border-c-yellow bg-c-yellow-light p-4 text-sm leading-6 text-c-brown">
              Do not enter personal, confidential, or sensitive information. Your answers are sent to an AI service to create the draft and are not saved to a Contourna account.
            </div>
            <div className="mt-6 min-h-[66px]">
              {developmentBypassEnabled ? (
                <p className="text-sm font-medium text-c-brown">Development verification bypass is active.</p>
              ) : siteKey ? (
                <Turnstile
                  ref={turnstileRef}
                  siteKey={siteKey}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                  options={{ action: "playground_generate", theme: "light", size: "compact" }}
                />
              ) : (
                <p role="alert" className="text-sm font-medium text-c-red">Verification is temporarily unavailable. Refresh the page to try again.</p>
              )}
            </div>
          </section>
        ) : null}
      </div>

      {error ? <p role="alert" className="mt-5 border-l-4 border-c-red bg-red-50 p-4 text-sm text-c-red">{error}</p> : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-c-brown/10 pt-5">
        <button type="button" onClick={reset} className="inline-flex h-10 w-9 items-center justify-center gap-2 text-sm font-medium text-c-brown/75 hover:text-c-brown sm:w-auto sm:px-2">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> <span className="sr-only sm:not-sr-only">Start over</span>
        </button>
        <div className="flex gap-2">
          {step > 0 ? (
            <button type="button" onClick={() => navigateToStep(PLAYGROUND_STEPS[step - 1])} className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-lg border border-c-brown/15 bg-white sm:w-auto sm:px-5 text-sm font-semibold text-c-brown hover:border-c-yellow hover:text-c-yellow">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> <span className="sr-only sm:not-sr-only">Back</span>
            </button>
          ) : null}
          {step < 2 ? (
            <button type="button" disabled={!canContinue} onClick={() => navigateToStep(PLAYGROUND_STEPS[step + 1])} className={primaryButtonClass}>
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" aria-label="Generate document" disabled={isGenerating || !isPlaygroundFormValid(form) || (!developmentBypassEnabled && !turnstileToken)} className={primaryButtonClass}>
              <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" /> <span>Generate<span className="sr-only sm:not-sr-only"> document</span></span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

function Field({ id, label, children, required, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-c-ink">
        {label}{required ? <span className="text-c-red"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

function ReviewItem({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("bg-white p-4", className)}>
      <dt className="text-xs font-semibold uppercase text-c-brown/75">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-c-brown">{value}</dd>
    </div>
  );
}
