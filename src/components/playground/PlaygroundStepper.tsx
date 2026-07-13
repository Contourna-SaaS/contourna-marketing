import { Check } from "lucide-react";

const steps = ["Document type", "Details", "Review"];

export function PlaygroundStepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="grid grid-cols-3 border border-c-brown/10 bg-c-off-white" aria-label="Generation progress">
      {steps.map((label, index) => {
        const isComplete = index < currentStep;
        const isActive = index === currentStep;
        return (
          <li
            key={label}
            aria-current={isActive ? "step" : undefined}
            className="flex min-w-0 items-center gap-2 border-r border-c-brown/10 px-2 py-3 last:border-r-0 sm:px-4"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                isComplete || isActive ? "bg-c-brown text-white" : "bg-white text-c-grey-light"
              }`}
            >
              {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
            </span>
            <span className={`hidden text-xs font-medium sm:inline sm:text-sm ${isActive ? "text-c-brown" : "text-c-grey-light"}`}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
