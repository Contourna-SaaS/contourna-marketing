import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com";

export const appUrl = rawAppUrl.replace(/\/$/, "");
export const signupUrl = `${appUrl}/signup`;
export const loginUrl = `${appUrl}/login`;

export const buttonBase =
  "group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const primaryLinkClass = cn(
  buttonBase,
  "bg-c-yellow text-white hover:bg-c-brown focus-visible:ring-c-yellow focus-visible:ring-offset-c-off-white",
);

// On brown/yellow sections the default hover would blend into the background,
// so buttons there hover to white instead.
export const primaryOnColorLinkClass = cn(
  buttonBase,
  "bg-c-yellow text-white hover:bg-white hover:text-c-brown focus-visible:ring-white focus-visible:ring-offset-c-brown",
);

export const secondaryLinkClass = cn(
  buttonBase,
  "border border-c-brown/15 bg-white text-c-brown hover:border-c-yellow hover:bg-c-yellow-light focus-visible:ring-c-yellow focus-visible:ring-offset-c-off-white",
);

export const ghostOnColorLinkClass = cn(
  buttonBase,
  "border border-white/20 text-white hover:border-c-yellow hover:text-c-yellow focus-visible:ring-white focus-visible:ring-offset-c-brown",
);

/** Arrow that nudges forward when its button is hovered. */
export function ButtonArrow() {
  return (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden="true"
    />
  );
}

/** Section eyebrow in the product's label style: small, bold, tracked caps. */
export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "yellow";
}) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.18em]",
        tone === "dark" ? "text-c-yellow" : "text-c-brown/70",
      )}
    >
      {children}
    </p>
  );
}

export const displayHeadingClass =
  "text-[2.4rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/** Product illustration. Each one ships its own backdrop and shadows; the ring keeps its edge visible. */
export function Illustration({
  src,
  alt,
  width,
  height,
  sizes,
  preload = false,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={82}
      preload={preload}
      className={cn("h-auto w-full rounded-[1.5rem] ring-1 ring-c-brown/10", className)}
    />
  );
}

/** Pill tag list used for formats, field types, cadences. */
export function TagList({
  label,
  items,
  tone = "light",
}: {
  label: string;
  items: readonly string[];
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <p
        className={cn(
          "text-[11px] font-bold uppercase tracking-[0.14em]",
          tone === "dark" ? "text-white/45" : "text-c-brown/50",
        )}
      >
        {label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-200",
              tone === "dark"
                ? "border-white/15 text-white/80 hover:border-c-yellow hover:text-c-yellow"
                : "border-c-brown/15 bg-white text-c-brown hover:border-c-yellow",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
