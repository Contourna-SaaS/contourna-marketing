"use client";

import { Check, Loader2, Sparkles, type LucideIcon } from "lucide-react";

interface AIGeneratingStep {
  label: string;
}

interface AIGeneratingViewProps {
  title: string;
  prompt?: string;
  steps: string[];
  currentStep: number;
  showProgressPercent?: boolean;
  icon?: LucideIcon;
}

function getProgressPercent(steps: AIGeneratingStep[], currentStep: number) {
  if (steps.length === 0) return 0;
  return ((currentStep + 1) / steps.length) * 100;
}

function PromptCard({ prompt }: { prompt?: string }) {
  if (!prompt) return null;

  return (
    <div className="mx-auto max-w-sm rounded-lg border border-c-brown/10 bg-white/60 px-4 py-3">
      <p className="text-sm leading-relaxed text-c-grey-light">&ldquo;{prompt}&rdquo;</p>
    </div>
  );
}

function ProgressStepRow({
  step,
  index,
  currentStep,
}: {
  step: AIGeneratingStep;
  index: number;
  currentStep: number;
}) {
  const isComplete = index < currentStep;
  const isCurrent = index === currentStep;
  const isPending = index > currentStep;

  return (
    <div
      className={`flex min-h-14 items-center gap-4 rounded-xl px-4 py-3 transition-all duration-500 ${
        isCurrent ? "bg-c-brown/[0.03]" : ""
      } ${isPending ? "opacity-35" : "opacity-100"}`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
          isComplete
            ? "bg-c-yellow"
            : isCurrent
              ? "border border-c-brown/15 bg-c-yellow-light"
              : "border border-c-brown/10 bg-c-brown/[0.02]"
        }`}
      >
        {isComplete ? (
          <Check className="h-4 w-4 text-white" aria-hidden="true" />
        ) : isCurrent ? (
          <Loader2 className="h-4 w-4 animate-spin text-c-brown/45" aria-hidden="true" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-c-brown/15" />
        )}
      </div>
      <span
        className={`min-w-0 flex-1 text-base leading-snug transition-all duration-300 ${
          isComplete
            ? "font-semibold text-c-brown/50"
            : isCurrent
              ? "font-bold text-c-brown"
              : "text-c-brown/35"
        }`}
      >
        {step.label}
      </span>
      {isComplete ? (
        <span className="shrink-0 text-xs font-semibold uppercase text-c-yellow">
          Done
        </span>
      ) : null}
    </div>
  );
}

function ProgressCard({
  steps,
  currentStep,
  showProgressPercent,
}: {
  steps: AIGeneratingStep[];
  currentStep: number;
  showProgressPercent: boolean;
}) {
  if (steps.length === 0) return null;

  const progressPercent = getProgressPercent(steps, currentStep);

  return (
    <div className="w-full max-w-xl rounded-2xl border border-c-brown/10 bg-c-off-white p-6 shadow-[0_12px_40px_-32px_rgba(55,48,18,0.9)] sm:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-semibold text-c-brown/45">Progress</p>
          {showProgressPercent ? (
            <p className="text-sm font-semibold text-c-brown/50">{Math.round(progressPercent)}%</p>
          ) : null}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-c-brown/5">
          <div
            className="h-full rounded-full bg-c-yellow/55 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <ProgressStepRow key={step.label} step={step} index={index} currentStep={currentStep} />
        ))}
      </div>
    </div>
  );
}

export function AIGeneratingView({
  title,
  prompt,
  steps,
  currentStep,
  showProgressPercent = true,
  icon: Icon = Sparkles,
}: AIGeneratingViewProps) {
  const normalizedSteps = steps.map((label) => ({ label }));

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-c-off-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-3xl flex-col items-center space-y-10">
        <div className="relative">
          <div className="absolute -inset-5 animate-pulse rounded-full bg-c-brown/[0.03]" />
          <div
            className="absolute -inset-10 animate-pulse rounded-full bg-c-brown/[0.02]"
            style={{ animationDelay: "300ms" }}
          />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-c-brown/10 bg-c-yellow-light/55">
            <Icon className="h-11 w-11 text-c-yellow" aria-hidden="true" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="mb-3 text-3xl font-bold text-c-brown sm:text-4xl">{title}</h2>
          <PromptCard prompt={prompt} />
        </div>

        <ProgressCard
          steps={normalizedSteps}
          currentStep={currentStep}
          showProgressPercent={showProgressPercent}
        />
      </div>
    </div>
  );
}
