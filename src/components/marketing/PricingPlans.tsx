"use client";

import { Check } from "lucide-react";
import { useState, type CSSProperties } from "react";

import { cn } from "@/lib/cn";

import { ANNUAL_DISCOUNT_PERCENT, TRIAL_DAYS, plans } from "./content";
import { ButtonArrow, primaryLinkClass, primaryOnColorLinkClass, signupUrl } from "./primitives";

type Billing = "monthly" | "annual";

export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="relative grid grid-cols-2 rounded-full border border-c-brown/10 bg-white p-1 shadow-card"
        >
          <span
            className={cn(
              "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-c-brown transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              billing === "annual" && "translate-x-full",
            )}
            aria-hidden="true"
          />
          {(["monthly", "annual"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={billing === option}
              onClick={() => setBilling(option)}
              className={cn(
                "relative z-10 flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors",
                billing === option ? "text-white" : "text-c-brown hover:text-c-yellow",
              )}
            >
              {option === "monthly" ? "Monthly" : "Annual"}
              {option === "annual" ? (
                <span className="rounded-full bg-c-yellow px-2 py-0.5 text-[11px] font-bold text-c-brown">
                  −{ANNUAL_DISCOUNT_PERCENT}%
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => {
          const price = billing === "annual" ? plan.annualMonthly : plan.monthly;
          const dark = plan.highlight;
          return (
            <article
              key={plan.name}
              className={cn(
                "spotlight relative flex flex-col rounded-[2rem] p-8 sm:p-10",
                dark ? "glow-border text-white shadow-panel [--glow-fill:var(--c-brown)]" : "border border-c-brown/10 bg-white",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className={cn("text-3xl font-bold tracking-tight", dark ? "text-white" : "text-c-ink")}>{plan.name}</h3>
                {dark ? (
                  <span className="rounded-full bg-c-yellow px-3 py-1 text-xs font-semibold text-c-brown">Forms + quality data</span>
                ) : null}
              </div>
              <p className={cn("mt-3 max-w-sm text-[15px] leading-7", dark ? "text-white/65" : "text-c-grey-light")}>
                {plan.description}
              </p>
              <p className="mt-8 flex items-end gap-2">
                <span className={cn("text-6xl font-extrabold tracking-[-0.04em] tabular-nums", dark ? "text-white" : "text-c-ink")}>
                  $<span className="count" style={{ "--num": price } as CSSProperties} aria-hidden="true" />
                  <span className="sr-only">{price}</span>
                </span>
                <span className={cn("pb-2 text-sm font-medium", dark ? "text-white/55" : "text-c-grey-light")}>CAD / month</span>
                {billing === "annual" ? (
                  <span className={cn("pb-2 text-sm line-through", dark ? "text-white/35" : "text-c-brown/35")}>${plan.monthly}</span>
                ) : null}
              </p>
              <p className={cn("mt-2 text-sm font-semibold", dark ? "text-c-yellow" : "text-c-brown")}>
                {billing === "annual"
                  ? `Billed annually. You save ${ANNUAL_DISCOUNT_PERCENT}%`
                  : `Or $${plan.annualMonthly}/month billed annually. Save ${ANNUAL_DISCOUNT_PERCENT}%`}
              </p>
              <ul className={cn("mt-8 space-y-3 border-t pt-8", dark ? "border-white/10" : "border-c-brown/10")}>
                {plan.features.map((feature) => (
                  <li key={feature} className={cn("flex gap-3 text-[15px] leading-7", dark ? "text-white/80" : "text-c-brown/80")}>
                    <span
                      className={cn(
                        "mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                        dark ? "bg-c-yellow text-c-brown" : "bg-c-yellow-light text-c-brown",
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <a href={signupUrl} className={cn(dark ? primaryOnColorLinkClass : primaryLinkClass, "w-full")}>
                  Start {TRIAL_DAYS}-day free trial
                  <ButtonArrow />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
