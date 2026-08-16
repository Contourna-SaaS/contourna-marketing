"use client";

import { FileText, RotateCcw, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

import { extractPlaygroundSections } from "@/features/playground/editorContent";
import type { GeneratedPlaygroundDocument, PlaygroundQuota } from "@/features/playground/types";

const PublicLexicalEditor = dynamic(
  () => import("./PublicLexicalEditor").then((module) => module.PublicLexicalEditor),
  {
    ssr: false,
    loading: () => <div className="min-h-[530px] animate-pulse bg-c-yellow-light" />,
  },
);

interface DocumentEditorProps {
  document: GeneratedPlaygroundDocument;
  quota: PlaygroundQuota;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
  onStartOver: () => void;
}

export function DocumentEditor({
  document,
  quota,
  onContentChange,
  onTitleChange,
  onStartOver,
}: DocumentEditorProps) {
  const editorRootRef = useRef<HTMLDivElement>(null);
  const sections = useMemo(
    () => extractPlaygroundSections(document.documentContent),
    [document.documentContent],
  );
  const remaining = Math.min(quota.remainingBrowser, quota.remainingIp);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com";

  const scrollToSection = (index: number) => {
    const headings = editorRootRef.current?.querySelectorAll("h1");
    headings?.[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="overflow-hidden border border-c-brown/15 bg-white">
      <div className="flex flex-col gap-4 border-b border-c-brown/10 bg-c-yellow-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-c-brown">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Your first draft
          </p>
          <p className="mt-1 text-sm text-c-grey-light">
            Your edits stay in this browser tab. {remaining} generation{remaining === 1 ? "" : "s"} left.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-c-brown/15 bg-white px-4 text-sm font-semibold text-c-brown hover:border-c-yellow hover:text-c-yellow"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over
          </button>
          <a
            href={`${appUrl.replace(/\/$/, "")}/signup`}
            className="inline-flex h-10 items-center rounded-lg bg-c-yellow px-4 text-sm font-semibold text-white hover:bg-c-brown"
          >
            Start free trial
          </a>
        </div>
      </div>

      <div className="grid min-h-[650px] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-b border-c-brown/10 bg-c-off-white p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 text-sm font-semibold text-c-brown">
            <FileText className="h-4 w-4" aria-hidden="true" /> Sections
          </div>
          {sections.length > 0 ? (
            <ol className="mt-4 space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(index)}
                    className="w-full rounded-lg px-2 py-2 text-left text-sm text-c-grey-light hover:bg-c-yellow-light hover:text-c-brown"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm leading-6 text-c-grey-light">Add headings in the editor to create an outline.</p>
          )}
        </aside>
        <div className="min-w-0 bg-c-off-white p-3 sm:p-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 border-b border-c-brown/10 bg-white px-4 py-4">
              <label htmlFor="playground-document-title" className="text-xs font-semibold uppercase text-c-grey-light">
                Document title
              </label>
              <input
                id="playground-document-title"
                value={document.name}
                maxLength={120}
                onChange={(event) => onTitleChange(event.target.value)}
                className="mt-1 w-full border-0 bg-transparent p-0 text-2xl font-bold text-c-brown outline-none sm:text-3xl"
              />
              <p className="mt-2 text-xs text-c-grey-light">
                {document.documentType} · {document.department}
              </p>
            </div>
            <div ref={editorRootRef} className="min-h-[530px] overflow-hidden border border-c-brown/10 bg-white [&_h1]:scroll-mt-28">
              <PublicLexicalEditor initialContent={document.documentContent} onChange={onContentChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
