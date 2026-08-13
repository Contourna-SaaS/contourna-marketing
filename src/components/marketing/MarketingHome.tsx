import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Eye,
  FileText,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Target,
  UserPlus,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/cn";

import { SiteHeader } from "./SiteHeader";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com";
const signupUrl = `${appUrl.replace(/\/$/, "")}/signup`;

/* ---------------------------------------------------------------- content */

const featureCards = [
  {
    icon: ClipboardCheck,
    title: "Document control",
    description:
      "Move every document from draft through review, approval, and publication with a clear record of ownership.",
    className: "bg-c-brown",
    iconClassName: "bg-c-yellow text-c-brown",
    titleClassName: "text-white",
    bodyClassName: "text-white/70",
  },
  {
    icon: Bot,
    title: "AI-assisted editor",
    description:
      "Draft structured content, refine existing text, and keep policies, procedures, and work instructions consistent.",
    className: "bg-c-yellow",
    iconClassName: "bg-c-brown text-c-yellow",
    titleClassName: "text-c-brown",
    bodyClassName: "text-c-brown/80",
  },
  {
    icon: Eye,
    title: "One source of truth",
    description:
      "Give employees the current approved version while retaining the review history your quality program needs.",
    className: "bg-c-yellow-light",
    iconClassName: "bg-c-yellow text-c-brown",
    titleClassName: "text-c-ink",
    bodyClassName: "text-c-brown/75",
  },
] as const;

const valueCards = [
  {
    icon: Zap,
    title: "ISO-ready structure",
    description: "Start with practical structures for policies, SOPs, work instructions, and quality records.",
  },
  {
    icon: UserPlus,
    title: "Faster onboarding",
    description: "Give new employees clear, searchable instructions from their first day.",
  },
  {
    icon: BarChart3,
    title: "Visible progress",
    description: "See which documents need review, approval, publication, or revision without chasing updates.",
  },
  {
    icon: Users,
    title: "Shared standards",
    description: "Keep teams aligned on how work should be completed across roles and locations.",
  },
  {
    icon: BookOpen,
    title: "Connected manuals",
    description: "Organize policies, procedures, and instructions into manuals employees can navigate easily.",
  },
  {
    icon: Target,
    title: "Quality built in",
    description: "Make controlled documentation part of daily operations instead of a separate compliance exercise.",
  },
] as const;

const documentTypes = [
  { icon: ShieldCheck, label: "Policies" },
  { icon: ClipboardList, label: "Procedures" },
  { icon: Wrench, label: "Work instructions" },
  { icon: BookOpen, label: "Quality manuals" },
  { icon: FileText, label: "SOPs" },
  { icon: ListChecks, label: "Forms & records" },
  { icon: CheckCircle2, label: "Quality records" },
] as const;

/* ------------------------------------------------------------ primitives */

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryLinkClass = cn(
  buttonBase,
  "bg-c-yellow text-white hover:bg-c-brown focus-visible:ring-c-yellow focus-visible:ring-offset-c-off-white",
);

// On brown/yellow sections the default hover would blend into the background,
// so buttons there hover to white instead.
const primaryOnColorLinkClass = cn(
  buttonBase,
  "bg-c-yellow text-white hover:bg-white hover:text-c-brown focus-visible:ring-white focus-visible:ring-offset-c-brown",
);

const secondaryLinkClass = cn(
  buttonBase,
  "border border-c-brown/15 bg-white text-c-brown hover:border-c-yellow hover:text-c-amber focus-visible:ring-c-yellow focus-visible:ring-offset-c-off-white",
);

const ghostOnColorLinkClass = cn(
  buttonBase,
  "border border-white/25 text-white hover:border-c-yellow hover:text-c-yellow focus-visible:ring-white focus-visible:ring-offset-c-brown",
);

function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" | "yellow" }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "light" && "text-c-amber",
        tone === "dark" && "text-c-yellow",
        tone === "yellow" && "text-c-brown/70",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "light" ? "bg-c-yellow" : tone === "dark" ? "bg-c-yellow" : "bg-c-brown/60",
        )}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

function Section({
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

/** Screenshot in a soft product frame. Used for bare captures with no chrome. */
function Screenshot({
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

/* --------------------------------------------------------------- sections */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-c-off-white" aria-labelledby="hero-heading">
      <div className="bg-dot-grid bg-dot-grid-fade absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full bg-c-yellow/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-c-yellow/40 bg-c-yellow-light px-3.5 py-1.5 text-xs font-semibold text-c-brown">
            <Sparkles className="h-3.5 w-3.5 text-c-amber" aria-hidden="true" />
            AI-assisted document control
          </span>
          <h1
            id="hero-heading"
            className="mt-6 text-[2.6rem] font-bold leading-[1.05] tracking-tight text-c-ink sm:text-6xl lg:text-[4.1rem]"
          >
            All your business manuals.{" "}
            <span className="relative inline-block text-c-brown">
              Done automatically.
              <svg
                className="absolute -bottom-2 left-0 w-full text-c-yellow"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M2 9C60 3 180 2 298 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-c-grey-light">
            Standardize processes, onboard employees faster, and keep every policy,
            procedure, and work instruction under control.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={signupUrl} className={primaryLinkClass}>
              Start free trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/playground" className={secondaryLinkClass}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Try the playground
            </Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-c-grey-light">
            <CheckCircle2 className="h-4 w-4 text-c-yellow" aria-hidden="true" />
            No credit card required.
          </p>
        </div>
        <div className="relative lg:-mr-10 xl:-mr-20">
          <div
            className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-c-yellow/30 blur-3xl"
            aria-hidden="true"
          />
          <Image
            src="/images/hero.png"
            alt="Contourna dashboard showing open review counts, quick actions for a new manual, document, or form, and a Needs your attention task list of overdue reviews"
            width={2400}
            height={1500}
            className="relative h-auto w-full rounded-2xl"
            quality={90}
            preload
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      </div>
    </section>
  );
}

function DocumentMarquee() {
  return (
    <section className="overflow-hidden bg-c-brown py-5" aria-label="Document types Contourna manages">
      <div className="animate-marquee flex w-max items-center gap-14 pr-14">
        {/* Two identical halves; -50% keyframe lands the second exactly where the
            first started. Each half repeats the list so it always exceeds the
            viewport width — otherwise wide screens see a blank gap at the seam. */}
        {[0, 1].map((half) => (
          <div
            key={half}
            aria-hidden={half === 1}
            className="flex shrink-0 items-center gap-14 text-base font-semibold text-white"
          >
            {[...documentTypes, ...documentTypes].map(({ icon: Icon, label }, index) => (
              <span key={`${label}-${index}`} className="inline-flex items-center gap-3 whitespace-nowrap">
                <Icon className="h-5 w-5 text-c-yellow" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <Section id="features" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Eyebrow>Why Contourna</Eyebrow>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-c-ink sm:text-5xl">
          A practical system for controlled documents
        </h2>
        <p className="mt-5 text-lg leading-8 text-c-grey-light">
          Build reliable documentation without turning quality management into a
          full-time administrative job.
        </p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {featureCards.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className={cn(
                "rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1",
                feature.className,
              )}
            >
              <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", feature.iconClassName)}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className={cn("mt-6 text-xl font-bold", feature.titleClassName)}>{feature.title}</h3>
              <p className={cn("mt-3 text-[15px] leading-7", feature.bodyClassName)}>{feature.description}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

interface MediaFeatureProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: readonly string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
  className?: string;
}

function MediaFeature({
  eyebrow,
  title,
  description,
  bullets,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  className,
}: MediaFeatureProps) {
  return (
    <section className={cn("py-18 sm:py-24", className)}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-c-ink sm:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-c-grey-light">{description}</p>
          {bullets ? (
            <ul className="mt-7 space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[15px] leading-7 text-c-brown/80">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
          <a href={signupUrl} className={cn(primaryLinkClass, "mt-9")}>
            Start free trial
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <Screenshot
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes="(max-width: 1024px) 100vw, 50vw"
            bare
          />
        </div>
      </div>
    </section>
  );
}

function FormsBand() {
  return (
    <section className="relative overflow-hidden bg-c-brown py-20 sm:py-28">
      <div className="bg-dot-grid-light absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-c-yellow/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Eyebrow tone="dark">Forms &amp; records</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.75rem]">
            Describe the record you need. Get a form ready to publish.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-white/70">
            Contourna builds the fields, sections, and quality metrics for you.
            Review, adjust, and publish — then every submission is captured against
            the document it belongs to.
          </p>
          <ul className="mt-7 space-y-4 text-[15px] leading-7 text-white/75">
            {[
              "Text, choice, date, duration, and quality-metric fields.",
              "Edit any field before it goes live.",
              "Submissions land beside the procedure they prove.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a href={signupUrl} className={cn(primaryOnColorLinkClass, "mt-9")}>
            Start free trial
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <Screenshot
          src="/images/form-builder-mock-dark.png"
          alt="Contourna form builder generating an inventory adjustment request form, with a field properties panel and a Form Generated confirmation"
          width={1800}
          height={1350}
          sizes="(max-width: 1024px) 100vw, 55vw"
          bare
        />
      </div>
    </section>
  );
}

const steps = [
  {
    icon: Sparkles,
    title: "Draft",
    description:
      "Describe the policy, procedure, or work instruction. The assistant returns a structured draft with the sections your quality program expects.",
  },
  {
    icon: ClipboardCheck,
    title: "Review",
    description:
      "Reviewers see suggestions against the exact section they affect, apply or discard each change, then approve and publish.",
  },
  {
    icon: ListChecks,
    title: "Record",
    description:
      "Publish the matching form so the work leaves evidence. Submissions stay attached to the document that governs them.",
  },
] as const;

function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-c-yellow">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Eyebrow tone="yellow">How it works</Eyebrow>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-c-ink sm:text-5xl">
          Draft it, approve it, prove it
        </h2>
        <p className="mt-5 text-lg leading-8 text-c-brown/80">
          One loop, from a blank page to a published standard with records behind it.
        </p>
      </div>
      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="rounded-3xl bg-c-brown p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-c-yellow text-c-brown">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-white/70">{step.description}</p>
            </li>
          );
        })}
      </ol>
      <div className="mt-12 flex justify-center">
        <a
          href={signupUrl}
          className={cn(
            buttonBase,
            "bg-c-brown text-white hover:bg-white hover:text-c-brown focus-visible:ring-c-brown focus-visible:ring-offset-c-yellow",
          )}
        >
          Start free trial
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}

function ValueGrid() {
  return (
    <Section className="bg-white">
      <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-c-ink sm:text-5xl">
        Managing business standards has never been easier
      </h2>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {valueCards.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="rounded-3xl border border-c-brown/10 bg-c-off-white p-7 transition duration-300 hover:-translate-y-1 hover:border-c-yellow/60 hover:shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-c-yellow-light text-c-brown">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-c-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-c-grey-light">{item.description}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function PlaygroundCta() {
  return (
    <Section id="playground" className="bg-c-off-white">
      <div className="relative overflow-hidden rounded-[2rem] bg-c-brown px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="bg-dot-grid-light absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-c-yellow/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-c-yellow/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-c-yellow/40 bg-c-yellow/10 px-3.5 py-1.5 text-xs font-semibold text-c-yellow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Live demo — no account required
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            See the AI document generator in action
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Pick a document type, tailor a realistic example, and generate an editable
            draft in minutes — right in your browser.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/playground" className={primaryOnColorLinkClass}>
              Open the playground
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={signupUrl} className={ghostOnColorLinkClass}>
              Start free trial
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-c-brown py-20 text-white sm:py-24">
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-c-yellow/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-[2.75rem]">
            Build a system your employees can actually follow.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            Replace scattered files and manual follow-up with controlled documents that stay current.
          </p>
        </div>
        <a href={signupUrl} className={cn(primaryOnColorLinkClass, "shrink-0")}>
          Get started
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-c-brown text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-5 py-12 sm:px-8 md:flex-row">
        <div>
          <BrandLogo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">Business manuals, done automatically.</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/75">
          <Link href="#features" className="hover:text-c-yellow">Features</Link>
          <Link href="/playground" className="hover:text-c-yellow">Playground</Link>
          <a href={`${appUrl.replace(/\/$/, "")}/login`} className="hover:text-c-yellow">Log in</a>
          <a href="mailto:hello@contourna.com" className="hover:text-c-yellow">Contact</a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Contourna. All rights reserved.
      </div>
    </footer>
  );
}

export function MarketingHome() {
  return (
    <div className="min-h-screen bg-c-off-white">
      <SiteHeader />
      <main>
        <Hero />
        <DocumentMarquee />
        <Features />
        <MediaFeature
          className="bg-white"
          eyebrow="Write with AI"
          title="Draft and refine documents without starting from a blank page."
          description="Highlight a passage, tell the assistant what you want, and review the change as a tracked suggestion before it touches the document."
          bullets={[
            "Rewrite selected passages with the surrounding context included.",
            "Review every AI edit as a diff you can apply or discard.",
            "Keep policies, procedures, and instructions consistent in tone and structure.",
          ]}
          image="/images/ai-writing-assistant.png"
          imageAlt="Contourna editor with the AI Assistant panel open, showing a tracked rewrite suggestion for a Roles and Responsibilities section"
          imageWidth={2000}
          imageHeight={1250}
        />
        <MediaFeature
          className="bg-white"
          eyebrow="Review & approve"
          title="Consistent employee standards. Consistent customer service."
          description="Anyone doing the work can flag a document as out of date. Reviewers see the suggestion against the exact section it affects, then approve, edit, or publish."
          bullets={[
            "Suggestions are tied to a section, not a comment thread.",
            "Reviewers see what changed and why before publishing.",
            "Section navigation keeps long work instructions manageable.",
          ]}
          image="/images/editor-review.png"
          imageAlt="Contourna document editor showing a work instruction with a section outline and a task panel containing an out-of-date suggestion"
          imageWidth={1800}
          imageHeight={1350}
          reverse
        />
        <FormsBand />
        <HowItWorks />
        <ValueGrid />
        <PlaygroundCta />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
