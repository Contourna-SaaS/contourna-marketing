"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  ChartLine,
  Clock,
  RotateCcw,
  Sparkles,
  SquareCheck,
  Thermometer,
  User,
  Users,
  Repeat,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import { useInView, usePrefersReducedMotion } from "./hooks";

const PROMPT =
  "A twice-daily temperature log for the walk-in cooler, with who checked it and whether the door seal is intact.";

const fields = [
  { icon: CalendarDays, label: "Date", type: "Date" },
  { icon: Clock, label: "Check", type: "Dropdown" },
  { icon: Thermometer, label: "Temperature (°C)", type: "Quality metric", metric: true },
  { icon: SquareCheck, label: "Door seal intact", type: "Checkbox" },
  { icon: User, label: "Checked by", type: "Text" },
] as const;

type Stage = "waiting" | "typing" | "generating" | "building" | "done";

/**
 * Scripted form generation: the description types itself in, then the fields
 * land one at a time. Plays once when scrolled into view; Replay restarts it.
 */
export function FormBuilderDemo() {
  const [stage, setStage] = useState<Stage>("waiting");
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4, once: true });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let timer = 0;
    const after = (ms: number, next: () => void) => {
      timer = window.setTimeout(next, ms);
    };

    if (stage === "waiting") {
      if (inView) after(reducedMotion ? 0 : 250, () => (reducedMotion ? setStage("done") : setStage("typing")));
    } else if (stage === "typing") {
      if (count < PROMPT.length) after(20, () => setCount((value) => Math.min(PROMPT.length, value + 2)));
      else after(350, () => setStage("generating"));
    } else if (stage === "generating") {
      after(850, () => {
        setCount(0);
        setStage("building");
      });
    } else if (stage === "building") {
      if (count < fields.length) after(300, () => setCount((value) => value + 1));
      else after(250, () => setStage("done"));
    }

    return () => window.clearTimeout(timer);
  }, [stage, count, inView, reducedMotion]);

  const typed = stage === "typing" ? PROMPT.slice(0, count) : stage === "waiting" ? "" : PROMPT;
  const visibleFields = stage === "building" ? count : stage === "done" ? fields.length : 0;

  return (
    <div ref={ref} className="relative grid items-start gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[1.5rem] border border-c-line bg-white p-6 shadow-card lg:mt-16">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-yellow text-c-brown">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="font-semibold text-c-ink">Describe your form</p>
        </div>
        <p className="mt-4 min-h-[6rem] text-[17px] leading-8 text-c-brown">
          {typed}
          {stage === "typing" || stage === "waiting" ? (
            <span className="caret ml-0.5 inline-block h-5 w-0.5 translate-y-1 bg-c-yellow" aria-hidden="true" />
          ) : null}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300",
              stage === "generating" ? "scale-95 bg-c-yellow-light text-c-brown" : "bg-c-yellow text-c-brown",
            )}
          >
            {stage === "generating" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-c-brown/30 border-t-c-brown" aria-hidden="true" />
                Generating…
              </>
            ) : (
              <>
                Generate form <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </span>
          {stage === "done" && !reducedMotion ? (
            <button
              type="button"
              onClick={() => {
                setCount(0);
                setStage("typing");
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-c-brown/60 transition-colors hover:text-c-brown"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Replay
            </button>
          ) : null}
        </div>
      </div>

      <div className="relative">
        <div className="rounded-[1.75rem] border border-c-line bg-white p-6 shadow-panel sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xl font-bold tracking-tight text-c-ink sm:text-2xl">Walk-in cooler temperature log</p>
            <span className="shrink-0 rounded-full border border-c-brown/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-c-brown/60">
              Draft
            </span>
          </div>
          <ul className="mt-5 divide-y divide-c-brown/10 border-t border-c-brown/10" aria-label="Generated fields">
            {fields.map((field, index) => {
              const Icon = field.icon;
              const shown = index < visibleFields;
              if (!shown) {
                return (
                  <li key={field.label} className="flex items-center gap-3.5 py-3.5" aria-hidden="true">
                    <span className="h-9 w-9 shrink-0 rounded-xl bg-c-brown/[0.05]" />
                    <span className="h-2.5 w-1/3 rounded-full bg-c-brown/[0.07]" />
                    <span className="ml-auto h-2.5 w-16 rounded-full bg-c-brown/[0.05]" />
                  </li>
                );
              }
              return (
                <li
                  key={field.label}
                  className={cn(
                    "animate-pop-in flex items-center gap-3.5 py-3.5",
                    "metric" in field && "-mx-3 rounded-2xl border border-c-yellow/60 bg-c-yellow-light px-3",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                      "metric" in field ? "bg-c-yellow text-c-brown" : "bg-c-yellow-light text-c-brown/70",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-c-ink">{field.label}</span>
                  {"metric" in field ? (
                    <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-c-brown px-2.5 py-1 text-xs font-semibold text-c-yellow">
                      <ChartLine className="h-3.5 w-3.5" aria-hidden="true" /> {field.type}
                    </span>
                  ) : (
                    <span className="ml-auto text-sm text-c-brown/55">{field.type}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <div
            className={cn(
              "mt-5 flex flex-wrap gap-2 transition-all duration-500",
              stage === "done" ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-c-brown/15 px-3 py-1 text-sm font-semibold text-c-brown">
              <Repeat className="h-3.5 w-3.5" aria-hidden="true" /> Twice daily
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-c-brown/15 px-3 py-1 text-sm font-semibold text-c-brown">
              <Users className="h-3.5 w-3.5" aria-hidden="true" /> Kitchen team
            </span>
          </div>
        </div>

        <div
          aria-live="polite"
          className={cn(
            "absolute -bottom-7 left-4 flex items-center gap-3 rounded-2xl bg-c-brown px-4 py-3 shadow-panel ring-1 ring-white/10 transition-all duration-500 sm:left-auto sm:right-8",
            stage === "done" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-yellow text-c-brown">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          {stage === "done" ? (
            <span>
              <span className="block text-sm font-semibold text-white">Form generated</span>
              <span className="block text-xs text-white/55">5 fields · 1 quality metric</span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
