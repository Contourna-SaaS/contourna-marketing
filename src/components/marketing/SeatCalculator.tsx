"use client";

import { Minus, Plus } from "lucide-react";
import { useState, type CSSProperties } from "react";

import { cn } from "@/lib/cn";

import { EXTRA_SEAT_MONTHLY, INCLUDED_EDITOR_SEATS, plans } from "./content";

const MIN_PEOPLE = 5;
const MAX_PEOPLE = 2000;
const MAX_EDITORS = 20;

/** The slider runs on a log scale so 10 and 1,000 people are both easy to hit. */
function peopleAt(position: number) {
  const raw = MIN_PEOPLE * (MAX_PEOPLE / MIN_PEOPLE) ** (position / 100);
  const step = raw < 50 ? 1 : raw < 500 ? 5 : 10;
  return Math.round(raw / step) * step;
}

/**
 * Makes the pricing model tangible: drag the headcount up and the price does
 * not move, because only editors are paid seats. Monthly billing only, which
 * is the one rate the extra-seat price is published for.
 */
export function SeatCalculator() {
  const [position, setPosition] = useState(62);
  const [editors, setEditors] = useState(INCLUDED_EDITOR_SEATS);
  const [planIndex, setPlanIndex] = useState(0);
  const people = peopleAt(position);
  const editorSeats = Math.min(editors, people);
  const extraSeats = Math.max(0, editorSeats - INCLUDED_EDITOR_SEATS);
  const plan = plans[planIndex];
  const total = plan.monthly + extraSeats * EXTRA_SEAT_MONTHLY;
  const free = people - editorSeats;

  return (
    <div className="rounded-[2rem] border border-c-line bg-white p-6 shadow-card sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="lg:order-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="team-size" className="text-[10px] font-bold uppercase tracking-[0.14em] text-c-brown/55">
              People who follow your standards
            </label>
            <output htmlFor="team-size" className="text-3xl font-bold tabular-nums text-c-ink">
              {people.toLocaleString("en-CA")}
            </output>
          </div>
          <input
            id="team-size"
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-valuetext={`${people} people`}
            className="range mt-5 w-full"
            style={{ "--fill": `${position}%` } as CSSProperties}
          />
          <div className="mt-2 flex justify-between text-xs text-c-brown/40">
            <span>{MIN_PEOPLE}</span>
            <span>{MAX_PEOPLE.toLocaleString("en-CA")}+</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-c-brown/55" id="editor-label">
              Editors who write and approve
            </p>
            <div className="flex items-center gap-1 rounded-full border border-c-brown/15 p-1" role="group" aria-labelledby="editor-label">
              <button
                type="button"
                onClick={() => setEditors((value) => Math.max(1, value - 1))}
                disabled={editors <= 1}
                aria-label="One fewer editor"
                className="flex h-9 w-9 items-center justify-center rounded-full text-c-brown transition-colors hover:bg-c-yellow-light disabled:opacity-30"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="w-10 text-center text-lg font-bold tabular-nums text-c-ink" aria-live="polite">
                {editorSeats}
              </span>
              <button
                type="button"
                onClick={() => setEditors((value) => Math.min(MAX_EDITORS, value + 1))}
                disabled={editors >= MAX_EDITORS}
                aria-label="One more editor"
                className="flex h-9 w-9 items-center justify-center rounded-full text-c-brown transition-colors hover:bg-c-yellow-light disabled:opacity-30"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* One dot per person, capped so 2,000 people still fits: editors glow, everyone else is free. */}
          <div className="mt-8 flex flex-wrap gap-1.5" aria-hidden="true">
            {Array.from({ length: Math.min(people, 120) }, (_, index) => (
              <span
                key={index}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors duration-300",
                  index < editorSeats ? "bg-c-yellow ring-1 ring-c-ink" : "bg-c-brown/15",
                )}
              />
            ))}
            {people > 120 ? <span className="ml-1 text-xs leading-[10px] text-c-brown/45">+{(people - 120).toLocaleString("en-CA")}</span> : null}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl bg-c-off-white p-6 lg:order-1">
          <div className="grid grid-cols-2 gap-1 rounded-full bg-white p-1 ring-1 ring-c-line" role="group" aria-label="Plan">
            {plans.map((option, index) => (
              <button
                key={option.name}
                type="button"
                aria-pressed={planIndex === index}
                onClick={() => setPlanIndex(index)}
                className={cn(
                  "h-9 rounded-full text-sm font-semibold transition-colors",
                  planIndex === index ? "bg-c-brown text-white" : "text-c-brown hover:bg-c-yellow-light",
                )}
              >
                {option.name}
              </button>
            ))}
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-c-brown/70">{plan.name} plan · {INCLUDED_EDITOR_SEATS} editors included</dt>
              <dd className="font-semibold tabular-nums text-c-ink">${plan.monthly}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-c-brown/70">
                {extraSeats} extra {extraSeats === 1 ? "editor" : "editors"} × ${EXTRA_SEAT_MONTHLY}
              </dt>
              <dd className="font-semibold tabular-nums text-c-ink">${extraSeats * EXTRA_SEAT_MONTHLY}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-c-brown/70">{free.toLocaleString("en-CA")} readers and form users</dt>
              <dd className="rounded-full bg-c-yellow px-2 text-xs font-bold leading-5 text-c-brown">Free</dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-c-line pt-6">
            <p className="flex items-end gap-2">
              <span className="text-5xl font-extrabold tracking-[-0.04em] tabular-nums text-c-ink">
                $<span className="count" style={{ "--num": total } as CSSProperties} aria-hidden="true" />
                <span className="sr-only">{total}</span>
              </span>
              <span className="pb-1.5 text-sm text-c-brown/55">CAD / month</span>
            </p>
            <p className="mt-2 text-sm text-c-brown/60">
              About <span className="font-semibold text-c-ink">${(total / people).toFixed(2)}</span> per person, billed monthly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
