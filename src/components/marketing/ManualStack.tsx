"use client";

import { ClipboardCheck, ClipboardList, Shield, Wrench } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import { manualTiers } from "./content";
import { useInView, usePrefersReducedMotion } from "./hooks";

const icons = [Shield, ClipboardList, Wrench, ClipboardCheck];
// The example manual from the illustration set: Events & Catering.
const examples = [
  { count: 1, unit: "document" },
  { count: 4, unit: "documents" },
  { count: 9, unit: "documents" },
  { count: 5, unit: "forms" },
];
const CYCLE_MS = 2600;

// Isometric square pyramid: apex, then the left, front, and right base corners.
const APEX = { x: 180, y: 20 };
const LEFT = { x: 24, y: 276 };
const FRONT = { x: 180, y: 346 };
const RIGHT = { x: 336, y: 276 };
const TIER_GAP = 0.014;

type Point = { x: number; y: number };
const along = (to: Point, t: number): Point => ({ x: APEX.x + (to.x - APEX.x) * t, y: APEX.y + (to.y - APEX.y) * t });
const polygon = (points: Point[]) => points.map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** Both visible faces of one horizontal band of the pyramid, plus where its label line starts. */
function tierShape(index: number, count: number) {
  const top = index === 0 ? 0 : index / count + TIER_GAP;
  const bottom = (index + 1) / count - (index === count - 1 ? 0 : TIER_GAP);
  return {
    left: polygon([along(LEFT, top), along(LEFT, bottom), along(FRONT, bottom), along(FRONT, top)]),
    right: polygon([along(FRONT, top), along(FRONT, bottom), along(RIGHT, bottom), along(RIGHT, top)]),
    anchor: along(RIGHT, (top + bottom) / 2),
  };
}

/**
 * The four manual levels as the document pyramid auditors expect: policy at
 * the apex, forms and proofs at the base. Hover, focus, or click a level in
 * the list or on the pyramid and its tier slides out. Until the visitor
 * touches it, the pyramid cycles through the levels.
 */
export function ManualStack() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (touched || !inView || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % manualTiers.length), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [touched, inView, reducedMotion]);

  const choose = (index: number) => {
    setTouched(true);
    setActive(index);
  };

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-c-brown/50">
          Example: Events &amp; Catering manual
        </p>
        <ol className="mt-4 space-y-2">
          {manualTiers.map((tier, index) => {
            const Icon = icons[index];
            const isActive = index === active;
            return (
              <li key={tier.title}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onPointerEnter={() => choose(index)}
                  onFocus={() => choose(index)}
                  onClick={() => choose(index)}
                  className={cn(
                    "w-full rounded-2xl border p-5 text-left transition-all duration-300",
                    isActive ? "border-c-yellow bg-white shadow-card" : "border-transparent hover:bg-white/70",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        isActive ? "bg-c-yellow text-c-brown" : "bg-c-yellow-light text-c-brown/70",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-lg font-semibold text-c-ink">{tier.title}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-c-brown/50">
                          {tier.role}
                        </span>
                      </p>
                      {/* Always rendered so the list never changes height as the pyramid cycles. */}
                      <p className="mt-1 text-sm leading-6 text-c-grey-light">{tier.description}</p>
                    </div>
                    <span className="hidden shrink-0 text-sm text-c-brown/50 sm:block">
                      {examples[index].count} {examples[index].unit}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative mx-auto w-full max-w-[34rem]">
        <div className="absolute inset-x-[10%] bottom-[4%] h-[18%] rounded-[50%] bg-c-brown/10 blur-2xl" aria-hidden="true" />
        <svg viewBox="0 0 520 380" className="relative w-full overflow-visible" aria-hidden="true">
          {manualTiers.map((tier, index) => {
            const isActive = index === active;
            const { left, right, anchor } = tierShape(index, manualTiers.length);
            const labelY = anchor.y;
            return (
              <g
                key={tier.title}
                onPointerEnter={() => choose(index)}
                onClick={() => choose(index)}
                className="cursor-pointer"
              >
                <g
                  style={{ transform: isActive ? "translate(-16px, -8px)" : "none" }}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
                >
                  <polygon
                    points={left}
                    className={cn(
                      "stroke-c-brown/10 transition-[fill] duration-500 [stroke-linejoin:round] [stroke-width:1]",
                      isActive ? "fill-c-yellow" : "fill-[#f7f2e6]",
                    )}
                  />
                  <polygon
                    points={right}
                    className={cn(
                      "stroke-c-brown/10 transition-[fill] duration-500 [stroke-linejoin:round] [stroke-width:1]",
                      isActive ? "fill-[#e3a50c]" : "fill-[#e9e0c8]",
                    )}
                  />
                </g>
                <line
                  x1={anchor.x + 8}
                  y1={labelY}
                  x2={392}
                  y2={labelY}
                  strokeDasharray="3 4"
                  className={cn("transition-[stroke] duration-500 [stroke-width:1.5]", isActive ? "stroke-c-yellow" : "stroke-c-brown/20")}
                />
                <circle cx={anchor.x + 8} cy={labelY} r={3} className={isActive ? "fill-c-yellow" : "fill-c-brown/25"} />
                <text
                  x={402}
                  y={labelY - 2}
                  className={cn(
                    "text-[15px] font-semibold transition-[fill] duration-500",
                    isActive ? "fill-c-ink" : "fill-c-brown/45",
                  )}
                >
                  {tier.title}
                </text>
                <text x={402} y={labelY + 16} className="fill-c-brown/45 text-[10px] font-bold uppercase tracking-[0.14em]">
                  {tier.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
