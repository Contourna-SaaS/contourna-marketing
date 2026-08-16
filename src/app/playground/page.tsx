import type { Metadata } from "next";
import { Suspense } from "react";
import { Info, Sparkles } from "lucide-react";

import { SiteHeader } from "@/components/marketing/SiteHeader";
import { PlaygroundExperience } from "@/components/playground/PlaygroundExperience";

export const metadata: Metadata = {
  title: "AI Document Playground",
  description: "Create and edit a policy, procedure, or work instruction with Contourna's AI document writer. No account required.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-c-off-white">
      <SiteHeader />
      <main className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center [&_h1]:text-balance [&_p]:text-pretty">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-c-yellow/40 bg-c-yellow-light px-3.5 py-1.5 text-xs font-semibold text-c-brown">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Interactive demo
          </span>
          <h1 className="mt-4 text-3xl font-bold text-c-ink sm:text-5xl">See what Contourna can write for you</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-c-grey-light">
            Pick a document, make the example your own, and get an editable first draft. No account required.
          </p>
        </div>
        <div className="mx-auto mt-8 flex max-w-5xl items-start gap-3 rounded-xl border-l-4 border-c-yellow bg-c-yellow-light p-4 text-sm leading-6">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
          <p>
            <strong>Your work here is temporary.</strong> The draft stays in this browser tab until you close it.
            Do not enter personal, confidential, or sensitive information.
          </p>
        </div>
        <section
          aria-label="Document generator"
          className="mx-auto mt-8 max-w-6xl rounded-2xl border border-c-brown/15 bg-white p-4 shadow-[0_24px_60px_-44px_rgba(55,48,18,0.6)] sm:p-8"
        >
          <Suspense
            fallback={<div className="h-96 animate-pulse bg-c-yellow-light" aria-label="Loading playground" />}
          >
            <PlaygroundExperience />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
