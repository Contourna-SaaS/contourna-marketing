import { Check } from "lucide-react";

const steps = ["Document type", "Details", "Review"];

export function PlaygroundStepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="grid grid-cols-3 gap-2 border-b border-c-brown/10 pb-5" aria-label="Generation progress">
      {steps.map((label, index) => {
        const isComplete = index < currentStep;
        const isActive = index === currentStep;
        return (
          <li
            key={label}
            aria-current={isActive ? "step" : undefined}
            className="flex min-w-0 flex-col items-start gap-2 py-1 sm:flex-row sm:items-center"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                isComplete || isActive ? "bg-c-brown text-white" : "bg-c-off-white text-c-brown/65"
              }`}
            >
              {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
            </span>
            <span className={`text-[11px] font-medium sm:text-sm ${isActive ? "text-c-brown" : "text-c-brown/75"}`}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
