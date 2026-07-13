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
    <div className="mx-auto max-w-sm rounded-xl border border-c-brown/10 bg-c-yellow-light/40 px-4 py-3">
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
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-500 ${
        isCurrent ? "bg-c-brown/[0.03]" : ""
      } ${isPending ? "opacity-30" : "opacity-100"}`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
          isComplete
            ? "bg-c-yellow"
            : isCurrent
              ? "border border-c-brown/15 bg-c-yellow-light"
              : "border border-c-brown/10 bg-c-brown/[0.02]"
        }`}
      >
        {isComplete ? (
          <Check className="h-3.5 w-3.5 text-white" aria-hidden="true" />
        ) : isCurrent ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-c-brown/40" aria-hidden="true" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-c-brown/15" />
        )}
      </div>
      <span
        className={`text-sm transition-all duration-300 ${
          isComplete
            ? "font-medium text-c-brown/50"
            : isCurrent
              ? "font-medium text-c-brown"
              : "text-c-brown/35"
        }`}
      >
        {step.label}
      </span>
      {isComplete ? (
        <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-c-yellow">
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
    <div className="w-full max-w-md rounded-2xl border border-c-brown/10 bg-c-off-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-c-brown/50">Progress</p>
          {showProgressPercent ? (
            <p className="text-sm font-medium text-c-brown/50">{Math.round(progressPercent)}%</p>
          ) : null}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-c-brown/5">
          <div
            className="h-full rounded-full bg-c-yellow/60 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-1">
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
      <div className="flex w-full max-w-lg flex-col items-center space-y-10">
        <div className="relative">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-c-brown/[0.03]" />
          <div
            className="absolute -inset-8 animate-pulse rounded-full bg-c-brown/[0.02]"
            style={{ animationDelay: "300ms" }}
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-c-brown/10 bg-c-yellow-light">
            <Icon className="h-9 w-9 text-c-yellow" aria-hidden="true" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="mb-3 text-2xl font-bold text-c-brown">{title}</h2>
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
