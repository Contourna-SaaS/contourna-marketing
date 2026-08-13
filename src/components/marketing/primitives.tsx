import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com";

export const appUrl = rawAppUrl.replace(/\/$/, "");
export const signupUrl = `${appUrl}/signup`;
export const loginUrl = `${appUrl}/login`;

export const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

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
  "border border-white/25 text-white hover:border-c-yellow hover:text-c-yellow focus-visible:ring-white focus-visible:ring-offset-c-brown",
);

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
        "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "light" && "text-c-brown/70",
        tone === "dark" && "text-c-yellow",
        tone === "yellow" && "text-c-brown/70",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "yellow" ? "bg-c-brown/60" : "bg-c-yellow",
        )}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

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
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark" | "yellow";
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="flex justify-center">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </div>
      <h2
        className={cn(
          "mt-4 text-3xl font-bold tracking-tight sm:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-c-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-lg leading-8",
            tone === "dark" ? "text-white/70" : tone === "yellow" ? "text-c-brown/80" : "text-c-grey-light",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Screenshot in a soft product frame. Used for bare captures with no chrome. */
export function Screenshot({
  src,
  alt,
  width,
  height,
  sizes,
  preload = false,
  bare = false,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  preload?: boolean;
  /** Set for mockups that already ship their own padding, shadow, and backdrop. */
  bare?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={90}
      preload={preload}
      className={cn(
        "h-auto w-full",
        bare ? "rounded-2xl" : "rounded-2xl border border-c-brown/10 bg-white shadow-panel",
        className,
      )}
    />
  );
}
