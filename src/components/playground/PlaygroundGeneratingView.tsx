"use client";

import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

import { AIGeneratingView } from "./AIGeneratingView";

const GENERATION_STEPS = [
  "Reviewing your details",
  "Planning the document structure",
  "Writing your first draft",
  "Refining the content and formatting",
];

interface PlaygroundGeneratingViewProps {
  documentTitle: string;
}

export function PlaygroundGeneratingView({ documentTitle }: PlaygroundGeneratingViewProps) {
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
        prompt={documentTitle}
        steps={GENERATION_STEPS}
        currentStep={currentStep}
        showProgressPercent={false}
        icon={FileText}
      />
    </div>
  );
}
