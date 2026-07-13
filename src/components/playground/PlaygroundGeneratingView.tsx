"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { AIGeneratingView } from "./AIGeneratingView";

const GENERATION_STEPS = [
  "Preparing AI generation",
  "Analyzing company context",
  "Checking related documents",
  "Generating document sections",
  "Saving document",
];

export function PlaygroundGeneratingView() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentStep((step) => Math.min(step + 1, GENERATION_STEPS.length - 1));
    }, 4_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-50 overflow-y-auto bg-c-off-white">
      <AIGeneratingView
        title="Creating your document with AI"
        steps={GENERATION_STEPS}
        currentStep={currentStep}
        showProgressPercent={false}
        icon={Sparkles}
      />
    </div>
  );
}
