import type { Metadata } from "next";
import Link from "next/link";
import { Info, Sparkles } from "lucide-react";

import { BrandLogo } from "@/components/BrandLogo";
import { PlaygroundExperience } from "@/components/playground/PlaygroundExperience";

export const metadata: Metadata = {
  title: "AI Document Playground",
  description: "Create and edit an AI-generated policy, procedure, or work instruction without an account.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com";

  return (
    <div className="min-h-screen bg-c-off-white">
      <header className="sticky top-0 z-40 border-b-2 border-c-yellow bg-c-off-white/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <BrandLogo />
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden px-3 py-2 text-sm font-medium text-c-brown hover:text-c-green sm:inline-flex">Exit playground</Link>
            <a href={`${appUrl.replace(/\/$/, "")}/signup`} className="inline-flex h-10 items-center rounded-lg bg-c-yellow px-4 text-sm font-semibold text-c-brown hover:bg-c-brown hover:text-white">Start free trial</a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-c-yellow-light px-3 py-1 text-xs font-semibold text-c-brown">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Interactive demo
          </span>
          <h1 className="mt-4 text-3xl font-bold text-c-ink sm:text-5xl">Create a polished document in minutes</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-c-grey-light">Choose a document type, customize a ready-to-use example, and refine your AI-generated draft. No account required.</p>
        </div>
        <div className="mx-auto mt-8 flex max-w-5xl items-start gap-3 border-l-4 border-c-yellow bg-c-yellow-light p-4 text-sm leading-6">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-c-green" aria-hidden="true" />
          <p><strong>Your work here is temporary.</strong> The draft stays in this browser tab until you close it. Do not enter personal, confidential, or sensitive information.</p>
        </div>
        <section aria-label="Document generator" className="mx-auto mt-8 max-w-6xl border border-c-brown/15 bg-white p-4 shadow-[0_24px_60px_-44px_rgba(55,48,18,0.6)] sm:p-8">
          <PlaygroundExperience />
        </section>
      </main>
    </div>
  );
}
