"use client";

import { Check, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import { usePrefersReducedMotion } from "./hooks";

const ORIGINAL = "Wipe the steam wand after every use and purge it.";

const prompts = [
  {
    label: "Make this clearer for new staff",
    result: "After each drink, wipe the steam wand with a clean damp cloth, then purge it for two seconds.",
  },
  {
    label: "Explain why it matters",
    result:
      "Wipe the steam wand after every use and purge it, so dried milk cannot block the tip or end up in the next drink.",
  },
  { label: "Make it shorter", result: "Wipe and purge the wand after each drink." },
] as const;

type Phase = "idle" | "thinking" | "streaming" | "ready" | "accepted";

/**
 * Scripted version of the editor's rewrite flow: highlight, ask, watch the
 * suggestion stream in as a tracked change, then accept or reject it. Nothing
 * reaches the document until Accept, which is the promise the copy makes.
 */
export function AiRewriteDemo() {
  const [text, setText] = useState<string>(ORIGINAL);
  const [active, setActive] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const suggestion = active === null ? "" : prompts[active].result;

  useEffect(() => {
    if (phase === "thinking") {
      const timer = window.setTimeout(() => setPhase("streaming"), reducedMotion ? 0 : 750);
      return () => window.clearTimeout(timer);
    }
    if (phase !== "streaming") return;
    if (reducedMotion || shown >= suggestion.length) {
      const timer = window.setTimeout(() => {
        setShown(suggestion.length);
        setPhase("ready");
      }, 0);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setShown((count) => Math.min(suggestion.length, count + 2)), 18);
    return () => window.clearTimeout(timer);
  }, [phase, shown, suggestion, reducedMotion]);

  const ask = (index: number) => {
    setActive(index);
    setShown(0);
    setPhase("thinking");
  };

  const reset = () => {
    setText(ORIGINAL);
    setActive(null);
    setPhase("idle");
  };

  const reviewing = phase === "thinking" || phase === "streaming" || phase === "ready";

  return (
    <div className="relative">
      <div className="rounded-[1.75rem] border border-c-brown/10 bg-white p-6 shadow-panel sm:p-9">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-c-off-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-c-brown/70">
            SOP
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-c-brown/40">
            {phase === "accepted" ? "Draft · 1 edit" : "Draft"}
          </span>
        </div>
        <p className="mt-4 text-2xl font-bold tracking-tight text-c-ink sm:text-3xl">Opening the espresso bar</p>
        <div className="mt-5 space-y-2" aria-hidden="true">
          <div className="h-2 w-full rounded-full bg-c-brown/[0.07]" />
          <div className="h-2 w-5/6 rounded-full bg-c-brown/[0.07]" />
        </div>
        <p className="mt-7 font-semibold text-c-ink">3. Steam wand</p>
        <p className="mt-2 text-[17px] leading-8 text-c-brown">
          <mark
            className={cn(
              "rounded px-0.5 text-c-brown transition-colors duration-500",
              reviewing ? "bg-c-yellow/40" : phase === "accepted" ? "bg-c-yellow-light" : "bg-c-yellow/25",
            )}
          >
            {text}
          </mark>{" "}
          Store the pitchers upside down on the drip tray.
        </p>
        <div className="mt-6 space-y-2" aria-hidden="true">
          <div className="h-2 w-11/12 rounded-full bg-c-brown/[0.07]" />
          <div className="h-2 w-2/3 rounded-full bg-c-brown/[0.07]" />
        </div>
      </div>

      <div className="relative z-10 -mt-10 ml-auto w-[94%] rounded-[1.5rem] border border-c-brown/10 bg-c-off-white/95 p-5 shadow-panel backdrop-blur sm:-mt-16 sm:w-[86%] sm:p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-yellow text-c-brown">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="font-semibold text-c-ink">AI Assistant</p>
          {phase === "accepted" ? (
            <button
              type="button"
              onClick={reset}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-c-brown/60 transition-colors hover:text-c-yellow"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Ask the assistant">
          {prompts.map((prompt, index) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => ask(index)}
              disabled={phase === "thinking" || phase === "streaming"}
              aria-pressed={active === index && reviewing}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors disabled:cursor-wait",
                active === index && reviewing
                  ? "border-c-brown bg-c-brown text-white"
                  : "border-c-brown/15 bg-white text-c-brown hover:border-c-yellow",
              )}
            >
              {prompt.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-4 min-h-[7.5rem] rounded-2xl border border-c-brown/10 bg-white p-4 text-[15px] leading-7">
          {phase === "idle" ? (
            <p className="text-c-brown/55">Pick a request. The suggestion appears here as a tracked change.</p>
          ) : phase === "accepted" ? (
            <p className="flex items-center gap-2 font-medium text-c-brown">
              <Check className="h-4 w-4 text-c-yellow" aria-hidden="true" /> Change applied to the draft.
            </p>
          ) : phase === "thinking" ? (
            <p className="flex items-center gap-2 text-c-brown/60">
              <span className="flex gap-1" aria-hidden="true">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-c-yellow"
                    style={{ animationDelay: `${dot * 120}ms` }}
                  />
                ))}
              </span>
              Rewriting the highlighted passage…
            </p>
          ) : (
            <p>
              <del className="rounded bg-c-red/10 px-0.5 text-c-red decoration-c-red/70">{text}</del>{" "}
              <ins className="rounded bg-c-yellow/30 px-0.5 text-c-ink no-underline">
                {suggestion.slice(0, shown)}
                {phase === "streaming" ? <span className="caret ml-px inline-block h-4 w-0.5 translate-y-0.5 bg-c-brown" /> : null}
              </ins>
            </p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            disabled={phase !== "ready"}
            onClick={() => {
              setText(suggestion);
              setPhase("accepted");
            }}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-c-yellow px-5 text-sm font-semibold text-c-brown transition-colors hover:bg-c-brown hover:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            <Check className="h-4 w-4" aria-hidden="true" /> Accept
          </button>
          <button
            type="button"
            disabled={phase !== "ready"}
            onClick={() => {
              setActive(null);
              setPhase("idle");
            }}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-c-brown/15 bg-white px-5 text-sm font-semibold text-c-brown transition-colors hover:border-c-yellow disabled:pointer-events-none disabled:opacity-40"
          >
            <X className="h-4 w-4" aria-hidden="true" /> Reject
          </button>
        </div>
      </div>
    </div>
  );
}
