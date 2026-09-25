import type { Metadata } from "next";
import { Suspense } from "react";
import { Info } from "lucide-react";

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
      <main className="mx-auto max-w-6xl px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5 [&_h1]:text-balance [&_p]:text-pretty">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-c-brown/70">Contourna playground</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-c-ink sm:text-4xl">Your next document starts here.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-c-brown/75 sm:text-base sm:leading-7">
              Pick an example, make it your own, and turn it into an editable first draft.
            </p>
          </div>
          <p className="text-sm font-medium text-c-brown">No account required.</p>
        </div>
        <section
          aria-label="Document generator"
          className="rounded-2xl border border-c-brown/15 bg-white p-5 shadow-card sm:p-8"
        >
          <Suspense
            fallback={<div className="h-96 animate-pulse rounded-xl bg-c-off-white motion-reduce:animate-none" aria-label="Loading playground" />}
          >
            <PlaygroundExperience />
          </Suspense>
        </section>
        <div className="mx-auto mt-5 flex max-w-3xl items-start gap-2.5 text-xs leading-5 text-c-brown/75">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Your draft stays in this browser tab until you close it. Use example details;
            do not enter personal, confidential, or sensitive information.
          </p>
        </div>
      </main>
    </div>
  );
}
