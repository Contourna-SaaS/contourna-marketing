import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/*
 * Sticker-style brand illustrations from the "Header Illustrations" Claude
 * Design handoff: heavy ink outlines and flat brand fills. Decorative only.
 */

const svgProps = {
  fill: "none",
  strokeLinejoin: "round",
  strokeLinecap: "round",
  "aria-hidden": true,
} as const;

/** Stacked documents inside a review cycle, with a check, a pencil, and sparkles. */
export function HeroIllustration() {
  return (
    <div className="relative">
      <svg viewBox="0 0 640 580" className="block w-full" {...svgProps}>
        <circle cx="340" cy="290" r="215" fill="#f6efdf" />
        <circle cx="478" cy="138" r="66" fill="#fdb913" />
        <g transform="rotate(-9 240 300)">
          <rect x="118" y="130" width="250" height="330" rx="14" fill="#fff" stroke="#161616" strokeWidth="4" />
          <rect x="144" y="160" width="130" height="14" rx="7" fill="#161616" opacity=".85" />
          <rect x="144" y="196" width="190" height="8" rx="4" fill="#e3dac4" />
          <rect x="144" y="216" width="170" height="8" rx="4" fill="#e3dac4" />
          <rect x="144" y="236" width="182" height="8" rx="4" fill="#e3dac4" />
          <rect x="144" y="256" width="120" height="8" rx="4" fill="#e3dac4" />
        </g>
        <g transform="rotate(5 390 300)">
          <rect x="250" y="110" width="280" height="370" rx="16" fill="#fff" stroke="#161616" strokeWidth="4" />
          <rect x="276" y="136" width="58" height="24" rx="12" fill="#fdb913" stroke="#161616" strokeWidth="3" />
          <rect x="276" y="180" width="206" height="18" rx="5" fill="#161616" />
          <rect x="276" y="206" width="150" height="18" rx="5" fill="#161616" />
          <rect x="272" y="243" width="200" height="16" rx="3" fill="#fbcb5c" />
          <rect x="276" y="247" width="190" height="8" rx="4" fill="#161616" opacity=".55" />
          <rect x="276" y="270" width="214" height="8" rx="4" fill="#e3dac4" />
          <rect x="276" y="290" width="168" height="8" rx="4" fill="#e3dac4" />
          <rect x="276" y="330" width="22" height="22" rx="6" fill="#fdb913" stroke="#161616" strokeWidth="3" />
          <path d="M281 341 l5 5 l8 -9" stroke="#161616" strokeWidth="3" />
          <rect x="312" y="337" width="150" height="8" rx="4" fill="#e3dac4" />
          <rect x="276" y="368" width="22" height="22" rx="6" fill="#fdb913" stroke="#161616" strokeWidth="3" />
          <path d="M281 379 l5 5 l8 -9" stroke="#161616" strokeWidth="3" />
          <rect x="312" y="375" width="126" height="8" rx="4" fill="#e3dac4" />
          <rect x="276" y="406" width="22" height="22" rx="6" fill="#fff" stroke="#161616" strokeWidth="3" />
          <rect x="312" y="413" width="140" height="8" rx="4" fill="#e3dac4" />
        </g>
        <path d="M105 204.5 A250 250 0 0 1 296.6 43.8" stroke="#161616" strokeWidth="5" />
        <path d="M276.5 33.1 L296.6 43.8 L281.3 60.7" stroke="#161616" strokeWidth="5" />
        <path d="M575 375.5 A250 250 0 0 1 383.4 536.2" stroke="#161616" strokeWidth="5" />
        <path d="M403.5 546.9 L383.4 536.2 L398.7 519.3" stroke="#161616" strokeWidth="5" />
        <circle cx="528" cy="420" r="46" fill="#fdb913" stroke="#161616" strokeWidth="4" />
        <path d="M508 420 l14 14 l26 -28" stroke="#161616" strokeWidth="6" />
        <g transform="translate(118 492) rotate(-32)">
          <rect x="0" y="-13" width="120" height="26" rx="3" fill="#fdb913" stroke="#161616" strokeWidth="4" />
          <rect x="-24" y="-13" width="24" height="26" rx="3" fill="#C4553A" stroke="#161616" strokeWidth="4" />
          <path d="M120 -13 L154 0 L120 13 Z" fill="#f6efdf" stroke="#161616" strokeWidth="4" />
          <path d="M143 -4.5 L154 0 L143 4.5 Z" fill="#161616" stroke="#161616" strokeWidth="2" />
        </g>
        <path d="M160 70 Q160 96 186 96 Q160 96 160 122 Q160 96 134 96 Q160 96 160 70 Z" fill="#fdb913" stroke="#161616" strokeWidth="3.5" />
        <path d="M600 238 Q600 254 616 254 Q600 254 600 270 Q600 254 584 254 Q600 254 600 238 Z" fill="#161616" stroke="#161616" strokeWidth="3" />
        <path d="M88 300 Q88 310 98 310 Q88 310 88 320 Q88 310 78 310 Q88 310 88 300 Z" fill="#161616" stroke="#161616" strokeWidth="2.5" />
      </svg>
      <div className="absolute left-0 top-[58%] flex items-center gap-2 rounded-full border-2 border-c-ink bg-white px-3.5 py-2 text-[13px] font-semibold text-c-ink shadow-[3px_3px_0_var(--c-ink)]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4553A" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        Review due in 3d
      </div>
      <div className="absolute right-[2%] top-[7%] flex items-center gap-2 rounded-full border-2 border-c-ink bg-white px-3.5 py-2 text-[13px] font-semibold text-c-ink shadow-[3px_3px_0_var(--c-ink)]">
        <span className="rounded-full bg-c-yellow px-2 py-px text-[11px] font-bold">v4</span>
        Published
      </div>
    </div>
  );
}

export type SpotName = "documents" | "reviews" | "forms" | "operations";

const spots: Record<SpotName, ReactNode> = {
  documents: (
    <>
      <circle cx="160" cy="124" r="100" fill="#f6efdf" />
      <rect x="84" y="62" width="112" height="150" rx="10" fill="#fdb913" stroke="#161616" strokeWidth="4" transform="rotate(-12 140 137)" />
      <rect x="98" y="56" width="112" height="150" rx="10" fill="#fff" stroke="#161616" strokeWidth="4" transform="rotate(-4 154 131)" />
      <path d="M118 46 H194 L224 76 V204 H118 Z" fill="#fff" stroke="#161616" strokeWidth="4" />
      <path d="M194 46 V76 H224" fill="#f6efdf" stroke="#161616" strokeWidth="4" />
      <rect x="136" y="92" width="64" height="12" rx="4" fill="#161616" />
      <rect x="136" y="118" width="70" height="7" rx="3.5" fill="#e3dac4" />
      <rect x="136" y="134" width="58" height="7" rx="3.5" fill="#e3dac4" />
      <rect x="132" y="148" width="74" height="13" rx="3" fill="#fbcb5c" />
      <rect x="136" y="151" width="64" height="7" rx="3.5" fill="#161616" opacity=".55" />
      <rect x="136" y="170" width="50" height="7" rx="3.5" fill="#e3dac4" />
      <path d="M254 58 Q254 74 270 74 Q254 74 254 90 Q254 74 238 74 Q254 74 254 58 Z" fill="#fdb913" stroke="#161616" strokeWidth="3" />
    </>
  ),
  reviews: (
    <>
      <circle cx="160" cy="124" r="100" fill="#f6efdf" />
      <rect x="66" y="44" width="130" height="164" rx="12" fill="#fff" stroke="#161616" strokeWidth="4" />
      <rect x="86" y="68" width="70" height="12" rx="4" fill="#161616" />
      <rect x="86" y="96" width="88" height="7" rx="3.5" fill="#e3dac4" />
      <rect x="82" y="110" width="96" height="14" rx="3" fill="#fbcb5c" />
      <rect x="86" y="113.5" width="80" height="7" rx="3.5" fill="#161616" opacity=".55" />
      <rect x="86" y="132" width="76" height="7" rx="3.5" fill="#e3dac4" />
      <rect x="86" y="148" width="84" height="7" rx="3.5" fill="#e3dac4" />
      <rect x="86" y="164" width="54" height="7" rx="3.5" fill="#e3dac4" />
      <path d="M178 117 H196" stroke="#161616" strokeWidth="3" strokeDasharray="2 6" />
      <rect x="172" y="70" width="104" height="66" rx="18" fill="#fdb913" stroke="#161616" strokeWidth="4" />
      <path d="M196 136 L190 158 L216 136" fill="#fdb913" stroke="#161616" strokeWidth="4" />
      <path d="M200 132 H214" stroke="#fdb913" strokeWidth="6" />
      <path d="M206 103 l12 12 l24 -26" stroke="#161616" strokeWidth="6" />
      <circle cx="258" cy="182" r="18" fill="#fff" stroke="#161616" strokeWidth="4" />
      <circle cx="232" cy="196" r="14" fill="#C4553A" stroke="#161616" strokeWidth="4" />
    </>
  ),
  forms: (
    <>
      <circle cx="160" cy="124" r="100" fill="#f6efdf" />
      <rect x="95" y="44" width="130" height="172" rx="12" fill="#fff" stroke="#161616" strokeWidth="4" />
      <rect x="128" y="30" width="64" height="28" rx="8" fill="#161616" />
      <circle cx="160" cy="44" r="5" fill="#fdb913" />
      <rect x="114" y="82" width="24" height="24" rx="6" fill="#fdb913" stroke="#161616" strokeWidth="3.5" />
      <path d="M119.5 94 l5 5 l8 -9" stroke="#161616" strokeWidth="3.5" />
      <rect x="150" y="90" width="58" height="8" rx="4" fill="#e3dac4" />
      <rect x="114" y="124" width="24" height="24" rx="6" fill="#fdb913" stroke="#161616" strokeWidth="3.5" />
      <path d="M119.5 136 l5 5 l8 -9" stroke="#161616" strokeWidth="3.5" />
      <rect x="150" y="132" width="46" height="8" rx="4" fill="#e3dac4" />
      <rect x="114" y="166" width="24" height="24" rx="6" fill="#fff" stroke="#161616" strokeWidth="3.5" />
      <rect x="150" y="174" width="52" height="8" rx="4" fill="#e3dac4" />
      <g transform="translate(232 150) rotate(-40)">
        <rect x="0" y="-9" width="70" height="18" rx="2" fill="#fdb913" stroke="#161616" strokeWidth="3.5" />
        <path d="M0 -9 L-22 0 L0 9 Z" fill="#f6efdf" stroke="#161616" strokeWidth="3.5" />
        <path d="M-15 -3 L-22 0 L-15 3 Z" fill="#161616" stroke="#161616" strokeWidth="2" />
      </g>
    </>
  ),
  operations: (
    <>
      <circle cx="160" cy="124" r="100" fill="#f6efdf" />
      <path d="M70 124 L100 98 H212 L182 124 Z" fill="#fbcb5c" stroke="#161616" strokeWidth="4" />
      <path d="M182 124 L212 98 V184 L182 210 Z" fill="#e0a200" stroke="#161616" strokeWidth="4" />
      <rect x="70" y="124" width="112" height="86" fill="#fdb913" stroke="#161616" strokeWidth="4" />
      <path d="M112 124 L142 98 H160 L130 124 Z" fill="#fff" stroke="#161616" strokeWidth="3" />
      <rect x="112" y="124" width="18" height="30" fill="#fff" stroke="#161616" strokeWidth="3" />
      <rect x="86" y="182" width="36" height="8" rx="4" fill="#161616" opacity=".55" />
      <path d="M248 152 C228 124 218 108 218 90 A30 30 0 0 1 278 90 C278 108 268 124 248 152 Z" fill="#C4553A" stroke="#161616" strokeWidth="4" />
      <circle cx="248" cy="90" r="11" fill="#fff" stroke="#161616" strokeWidth="4" />
      <path d="M228 196 Q248 186 268 196" stroke="#161616" strokeWidth="3" strokeDasharray="2 7" />
    </>
  ),
};

/** Small section illustration, sized to sit beside a section headline. */
export function SpotIllustration({ name, className }: { name: SpotName; className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={cn("block w-40 sm:w-48", className)} {...svgProps}>
      {spots[name]}
    </svg>
  );
}
