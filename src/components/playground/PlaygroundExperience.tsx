"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  Loader2,
  RotateCcw,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
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
import { PlaygroundStepper } from "./PlaygroundStepper";

const typeIcons = {
  Policy: Shield,
  Procedure: ClipboardList,
  WorkInstruction: Wrench,
};

const fieldClass =
  "mt-2 w-full rounded-lg border border-c-brown/15 bg-c-off-white px-3.5 py-2.5 text-sm text-c-ink outline-none placeholder:text-c-grey-light/70 focus:border-c-yellow focus:bg-white focus:ring-2 focus:ring-c-yellow/25";
const primaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-c-yellow px-5 text-sm font-semibold text-c-brown transition-colors hover:bg-c-brown hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow disabled:cursor-not-allowed disabled:opacity-40";
const developmentBypassEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_PLAYGROUND_BYPASS_TURNSTILE === "true";

export function isPlaygroundFormValid(form: PlaygroundForm): boolean {
  const documentType = getPlaygroundDocumentType(form.documentType);
  if (!documentType) return false;
  if (!form.name.trim() || !form.description.trim() || !form.department) return false;
  if (form.department === "Other" && !form.otherDepartment.trim()) return false;
  return documentType.questions
    .filter((question) => question.required)
    .every((question) => form.answers[question.id]?.trim());
}

interface PlaygroundExperienceProps {
  embedded?: boolean;
}

export function PlaygroundExperience({ embedded = false }: PlaygroundExperienceProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<PlaygroundForm>(EMPTY_PLAYGROUND_FORM);
  const [draft, setDraft] = useState<StoredPlaygroundDraft | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const documentType = getPlaygroundDocumentType(form.documentType);

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
    setStep(0);
    setForm(EMPTY_PLAYGROUND_FORM);
    setError(null);
    setTurnstileToken(null);
    persistDraft(null);
  };

  const handleGenerate = async () => {
    const verificationToken = developmentBypassEnabled ? "development-bypass" : turnstileToken;
    if (!verificationToken) return;
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generatePlaygroundDocument(form, verificationToken);
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
    <div className={cn("relative", embedded && "max-w-full")}>
      {isGenerating ? (
        <div className="absolute inset-0 z-20 flex min-h-96 items-center justify-center bg-white/95">
          <div className="text-center" role="status">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-c-yellow" aria-hidden="true" />
            <p className="mt-4 font-semibold text-c-brown">Creating {form.name || "your document"}...</p>
            <p className="mt-1 text-sm text-c-grey-light">Structuring your draft and applying the details you provided.</p>
          </div>
        </div>
      ) : null}

      <PlaygroundStepper currentStep={step} />

      <div className="mt-7">
        {step === 0 ? (
          <section aria-labelledby="document-type-heading">
            <h3 id="document-type-heading" className="text-xl font-bold text-c-ink sm:text-2xl">
              What would you like to create?
            </h3>
            <p className="mt-2 text-sm leading-6 text-c-grey-light">
              Choose a document type to load a realistic example you can customize.
            </p>
            <div role="radiogroup" aria-label="Document type" className="mt-6 grid gap-4 md:grid-cols-3">
              {PLAYGROUND_DOCUMENT_TYPES.map((item) => {
                const Icon = typeIcons[item.type];
                const isSelected = form.documentType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => selectDocumentType(item.type)}
                    className={cn(
                      "min-h-[180px] rounded-lg border bg-white p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow",
                      isSelected ? "border-c-yellow shadow-md" : "border-c-brown/15 hover:border-c-green",
                    )}
                  >
                    <span className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      isSelected ? "bg-c-yellow text-c-brown" : "bg-c-yellow-light text-c-brown",
                    )}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="mt-4 block font-semibold text-c-ink">{item.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-c-grey-light">{item.description}</span>
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
                <h3 id="details-heading" className="text-xl font-bold text-c-ink sm:text-2xl">Customize the example</h3>
                <p className="mt-1 text-sm text-c-grey-light">Change any detail before generating your document.</p>
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
            <h3 id="review-heading" className="text-xl font-bold text-c-ink sm:text-2xl">Review and generate</h3>
            <p className="mt-2 text-sm leading-6 text-c-grey-light">Confirm the details below, complete verification, and create an editable draft.</p>
            <dl className="mt-6 grid gap-px overflow-hidden border border-c-brown/10 bg-c-brown/10 sm:grid-cols-2">
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
                <p className="text-sm font-medium text-c-green">Development verification bypass is active.</p>
              ) : siteKey ? (
                <Turnstile
                  ref={turnstileRef}
                  siteKey={siteKey}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                  options={{ action: "playground_generate", theme: "light", size: "flexible" }}
                />
              ) : (
                <p role="alert" className="text-sm font-medium text-c-red">Verification is unavailable. Configure the Turnstile site key to enable generation.</p>
              )}
            </div>
          </section>
        ) : null}
      </div>

      {error ? <p role="alert" className="mt-5 border-l-4 border-c-red bg-red-50 p-4 text-sm text-c-red">{error}</p> : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-c-brown/10 pt-5">
        <button type="button" onClick={reset} className="inline-flex h-10 items-center gap-2 px-2 text-sm font-medium text-c-grey-light hover:text-c-brown">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over
        </button>
        <div className="flex gap-2">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex h-11 items-center gap-2 rounded-lg border border-c-brown/15 bg-white px-5 text-sm font-semibold text-c-brown hover:border-c-green hover:text-c-green">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
          ) : null}
          {step < 2 ? (
            <button type="button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)} className={primaryButtonClass}>
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="button" disabled={isGenerating || (!developmentBypassEnabled && !turnstileToken)} onClick={() => void handleGenerate()} className={primaryButtonClass}>
              <Sparkles className="h-4 w-4" aria-hidden="true" /> Generate document
            </button>
          )}
        </div>
      </div>
    </div>
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
      <dt className="text-xs font-semibold uppercase text-c-grey-light">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-c-brown">{value}</dd>
    </div>
  );
}
