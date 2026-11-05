"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function PlaygroundGeneratingView() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-c-off-white px-6 py-12">
      <div className="w-full max-w-lg text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-c-brown" aria-hidden="true" />
        <h2 className="mt-6 text-2xl font-semibold text-c-brown">Creating your document with AI</h2>
        <p role="status" className="mt-3 text-sm leading-6 text-c-brown/75">
          {elapsedSeconds < 60
            ? "Generating and checking your draft. This can take up to two minutes."
            : "Your draft is taking a little longer. We are still waiting for the AI response."}
        </p>
        <p aria-hidden="true" className="mt-4 text-sm text-c-brown/65">{elapsedSeconds}s elapsed</p>
        <div aria-hidden="true" className="mt-8 space-y-3 bg-white p-6 text-left">
          <div className="mb-6 h-5 w-2/3 animate-pulse bg-c-yellow-light" />
          {["w-full", "w-full", "w-4/5", "w-full", "w-3/5"].map((width, index) => (
            <div key={index} className={`h-3 animate-pulse bg-c-yellow-light ${width}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
