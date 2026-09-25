"use client";

import { Activity, Plus, RotateCcw, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import { usePrefersReducedMotion } from "./hooks";
import { DEMO_LIMITS, DEMO_READINGS, detectViolations, driftReading, sampleReading, type Reading } from "./spc";

const WINDOW = 20;
const SIGMA = 0.35;
/** One drift run: enough readings above the mean to trip the nine-in-a-row rule. */
const DRIFT_RUN = 9;
const DRIFT_TICK_MS = 380;

const WIDTH = 900;
const HEIGHT = 300;
const PAD = { top: 18, right: 64, bottom: 30, left: 44 };
const Y_MIN = 10.4;
const Y_MAX = 14.8;
const plotWidth = WIDTH - PAD.left - PAD.right;
const plotHeight = HEIGHT - PAD.top - PAD.bottom;

const STEP = plotWidth / (WINDOW - 1);
/** Readings sit at a fixed x by id; the whole series slides left as new ones arrive. */
const xOf = (id: number) => PAD.left + (id - 1) * STEP;
const yAt = (value: number) => {
  const clamped = Math.min(Y_MAX, Math.max(Y_MIN, value));
  return PAD.top + (1 - (clamped - Y_MIN) / (Y_MAX - Y_MIN)) * plotHeight;
};

/** Appends a normal reading, or step `driftStep` of a drift run. */
function appendReading(current: Reading[], driftStep?: number): Reading[] {
  const value = driftStep ? driftReading(driftStep, DRIFT_RUN) : sampleReading(DEMO_LIMITS.mean, SIGMA);
  // One extra reading stays in the buffer so the oldest can slide out behind the clip.
  return [...current, { id: current[current.length - 1].id + 1, value }].slice(-(WINDOW + 1));
}

const ruleNames = { 1: "Nelson rule 1", 2: "Nelson rule 2", 3: "Nelson rule 3" } as const;

/**
 * Control chart the visitor drives: every logged reading is checked against
 * three Nelson rules. "Simulate drift" plays nine readings that creep up
 * until they break the upper limit, tripping the run rule on the way.
 */
export function SpcChartDemo() {
  const [buffer, setBuffer] = useState<Reading[]>(DEMO_READINGS);
  // Bumped on reset so the series jumps back instead of sliding across the chart.
  const [resets, setResets] = useState(0);
  const [driftLeft, setDriftLeft] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const drifting = driftLeft > 0;

  useEffect(() => {
    if (!drifting) return;
    const timer = window.setTimeout(
      () => {
        const step = DRIFT_RUN - driftLeft + 1;
        if (reducedMotion) {
          setBuffer((current) =>
            Array.from({ length: driftLeft }).reduce<Reading[]>((next, _, index) => appendReading(next, step + index), current),
          );
          setDriftLeft(0);
        } else {
          setBuffer((current) => appendReading(current, step));
          setDriftLeft((count) => count - 1);
        }
      },
      reducedMotion ? 0 : DRIFT_TICK_MS,
    );
    return () => window.clearTimeout(timer);
  }, [drifting, driftLeft, reducedMotion]);

  const readings = buffer.slice(-WINDOW);
  const offset = (readings[0].id - 1) * STEP;
  const violations = detectViolations(readings, DEMO_LIMITS);
  const flagged = new Set(violations.flatMap((violation) => (violation.rule === 1 ? violation.ids : [])));
  const inRun = new Set(violations.flatMap((violation) => (violation.rule === 1 ? [] : violation.ids)));
  const latest = readings[readings.length - 1];
  // The insight speaks to the newest reading first, most severe rule first.
  const latestViolation =
    violations.find((violation) => violation.rule === 1 && violation.ids.includes(latest.id)) ??
    violations.find((violation) => violation.ids.includes(latest.id)) ??
    violations[violations.length - 1];
  const path = buffer.map((reading, index) => `${index ? "L" : "M"}${xOf(reading.id)} ${yAt(reading.value)}`).join(" ");
  const hoveredIndex = readings.findIndex((reading) => reading.id === hovered);

  return (
    <div>
      <div className="rounded-[2rem] border border-c-line bg-white p-5 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-c-yellow text-c-brown">
              <Activity className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-c-ink">Roast duration</p>
              <p className="text-xs text-c-brown/55">Roast log · minutes</p>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
              violations.length ? "bg-c-red/10 text-c-red" : "bg-c-yellow-light text-c-brown",
            )}
            aria-live="polite"
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", violations.length ? "bg-c-red" : "bg-c-yellow")} />
            {violations.length ? `${violations.length} rule ${violations.length === 1 ? "violation" : "violations"}` : "In control"}
          </span>
        </div>

        <dl className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
          {[
            ["Mean", DEMO_LIMITS.mean.toFixed(1)],
            ["UCL", DEMO_LIMITS.ucl.toFixed(1)],
            ["LCL", DEMO_LIMITS.lcl.toFixed(1)],
            ["Latest", latest.value.toFixed(1)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-c-off-white px-3 py-2.5 sm:px-4">
              <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-c-brown/50">{label}</dt>
              <dd className="mt-1 text-lg font-bold tabular-nums text-c-ink sm:text-2xl">{value}</dd>
            </div>
          ))}
        </dl>

        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mt-5 w-full overflow-visible"
          role="img"
          aria-label={`Control chart of the last ${readings.length} roast durations. Mean ${DEMO_LIMITS.mean}, upper limit ${DEMO_LIMITS.ucl}, lower limit ${DEMO_LIMITS.lcl}. Latest reading ${latest.value} minutes.`}
          onPointerLeave={() => setHovered(null)}
        >
          {[11, 12, 13, 14].map((tick) => (
            <g key={tick}>
              <line x1={PAD.left} x2={WIDTH - PAD.right} y1={yAt(tick)} y2={yAt(tick)} stroke="rgba(55,48,18,0.07)" />
              <text x={PAD.left - 10} y={yAt(tick) + 4} textAnchor="end" className="fill-c-brown/40 text-[11px]">
                {tick}
              </text>
            </g>
          ))}
          {(
            [
              ["UCL", DEMO_LIMITS.ucl, "var(--c-red)", "6 6"],
              ["Mean", DEMO_LIMITS.mean, "rgba(55,48,18,0.45)", undefined],
              ["LCL", DEMO_LIMITS.lcl, "var(--c-red)", "6 6"],
            ] as const
          ).map(([label, value, color, dash]) => (
            <g key={label}>
              <line x1={PAD.left} x2={WIDTH - PAD.right} y1={yAt(value)} y2={yAt(value)} stroke={color} strokeDasharray={dash} strokeWidth={1.5} />
              <text x={WIDTH - PAD.right + 10} y={yAt(value) + 4} fill={color} className="text-[11px] font-semibold">
                {label} {value.toFixed(1)}
              </text>
            </g>
          ))}

          <defs>
            <clipPath id="spc-plot">
              <rect x={PAD.left - 7} y={0} width={plotWidth + 14} height={HEIGHT} />
            </clipPath>
          </defs>
          <g clipPath="url(#spc-plot)">
            <g
              key={resets}
              style={{ transform: `translateX(${-offset}px)` }}
              className="transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
            >
              <path
                d={path}
                fill="none"
                stroke="var(--c-yellow)"
                strokeWidth={3}
                strokeLinejoin="round"
              />

              {buffer.map((reading) => {
                const out = flagged.has(reading.id);
                return (
                  <g
                    key={reading.id}
                    transform={`translate(${xOf(reading.id)} ${yAt(reading.value)})`}
                    onPointerEnter={() => setHovered(reading.id)}
                  >
                    {out || reading.id === latest.id ? (
                      <circle
                        r={6}
                        fill={out ? "var(--c-red)" : "var(--c-yellow)"}
                        className="animate-ping-ring [transform-box:fill-box] [transform-origin:center]"
                      />
                    ) : null}
                    <circle
                      r={out ? 6 : hovered === reading.id ? 6 : 4}
                      fill={out ? "var(--c-red)" : inRun.has(reading.id) ? "#fff" : "var(--c-yellow)"}
                      stroke="var(--c-ink)"
                      strokeWidth={2}
                      className="transition-[r] duration-200"
                    />
                    {/* Generous hit area; the dots themselves are tiny. */}
                    <circle r={14} fill="transparent" />
                  </g>
                );
              })}
            </g>
          </g>

          {hoveredIndex >= 0 ? (
            <g
              style={{
                transform: `translate(${Math.min(PAD.left + hoveredIndex * STEP, WIDTH - PAD.right - 60)}px, ${yAt(readings[hoveredIndex].value) - 40}px)`,
              }}
              className="pointer-events-none"
            >
              <rect x={-44} y={-4} width={104} height={28} rx={8} fill="var(--c-ink)" />
              <text x={8} y={15} textAnchor="middle" className="fill-white text-[12px] font-semibold">
                #{readings[hoveredIndex].id} · {readings[hoveredIndex].value.toFixed(1)} min
              </text>
            </g>
          ) : null}
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setBuffer((current) => appendReading(current))}
            disabled={drifting}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-c-yellow px-4 text-sm font-semibold text-c-brown transition-colors hover:bg-c-brown hover:text-white disabled:opacity-40"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> Log a reading
          </button>
          <button
            type="button"
            onClick={() => setDriftLeft(DRIFT_RUN)}
            disabled={drifting}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-c-brown/15 px-4 text-sm font-semibold text-c-brown transition-colors hover:border-c-yellow hover:bg-c-yellow-light disabled:border-c-yellow disabled:bg-c-yellow-light"
          >
            <TrendingUp className="h-4 w-4" aria-hidden="true" /> {drifting ? "Drifting…" : "Simulate drift"}
          </button>
          <button
            type="button"
            onClick={() => {
              setBuffer(DEMO_READINGS);
              setResets((count) => count + 1);
              setDriftLeft(0);
            }}
            aria-label="Reset chart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-c-brown/15 text-c-brown transition-colors hover:border-c-yellow hover:bg-c-yellow-light"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="ml-auto text-sm text-c-brown/55">
            Log readings or simulate drift and watch the rules react.
          </span>
        </div>
        <div className="mt-6 grid gap-3 border-t border-c-line pt-6 lg:grid-cols-[1.4fr_1fr]" aria-live="polite">
          <article
            key={latestViolation ? `${latestViolation.rule}-${latestViolation.ids[0]}` : "stable"}
            className={cn(
              "animate-pop-in flex gap-3 rounded-2xl border p-4",
              latestViolation?.rule === 1
                ? "border-c-red/20 bg-c-red/5"
                : latestViolation
                  ? "border-c-yellow/50 bg-c-yellow-light"
                  : "border-c-line bg-c-off-white",
            )}
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-c-yellow" aria-hidden="true" />
            <div>
              <p
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.14em]",
                  latestViolation?.rule === 1 ? "text-c-red" : "text-c-brown/60",
                )}
              >
                {latestViolation
                  ? `${ruleNames[latestViolation.rule]} · ${latestViolation.rule === 1 ? "Critical" : "Warning"}`
                  : "Stable"}
              </p>
              <p className="mt-1.5 font-semibold text-c-ink">
                {latestViolation ? latestViolation.title : "Every reading is inside the limits"}
              </p>
              <p className="mt-1 text-sm leading-6 text-c-brown/70">
                {latestViolation
                  ? latestViolation.detail
                  : `No runs or trends in the last ${readings.length} readings. Try simulating drift.`}
              </p>
            </div>
          </article>
          <ul className="space-y-2 rounded-2xl border border-c-line p-4">
            {(
              [
                [1, "Beyond a control limit"],
                [2, "9 in a row on one side"],
                [3, "6 in a row rising or falling"],
              ] as const
            ).map(([rule, label]) => {
              const hit = violations.some((violation) => violation.rule === rule);
              return (
                <li key={rule} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-c-brown/75">{label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]",
                      hit ? "bg-c-red/10 text-c-red" : "bg-c-off-white text-c-brown/55",
                    )}
                  >
                    {hit ? "Flagged" : "Pass"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-4 text-xs text-c-brown/50">Demo data. In Contourna, limits are calculated from your own submissions.</p>
      </div>
    </div>
  );
}
