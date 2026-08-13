import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  ChevronDown,
  FileUp,
  Layers,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/cn";

import {
  ANNUAL_DISCOUNT_PERCENT,
  EXTRA_SEAT_MONTHLY,
  INCLUDED_EDITOR_SEATS,
  TRIAL_DAYS,
  accessFacts,
  documentTypes,
  editorHighlights,
  faqs,
  formFieldTypes,
  importFormats,
  importModes,
  manualTiers,
  pillars,
  plans,
  reviewCadences,
  reviewDispositions,
  reviewReasons,
  scheduleCadences,
  spcCapabilities,
  steps,
} from "./content";
import {
  Eyebrow,
  Screenshot,
  Section,
  SectionHeading,
  buttonBase,
  appUrl,
  ghostOnColorLinkClass,
  loginUrl,
  primaryLinkClass,
  primaryOnColorLinkClass,
  secondaryLinkClass,
  signupUrl,
} from "./primitives";
import { SiteHeader } from "./SiteHeader";

/* --------------------------------------------------------------- sections */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-c-off-white" aria-labelledby="hero-heading">
      <div className="bg-dot-grid bg-dot-grid-fade absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full bg-c-yellow/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-c-yellow/40 bg-c-yellow-light px-3.5 py-1.5 text-xs font-semibold text-c-brown">
            <Sparkles className="h-3.5 w-3.5 text-c-brown" aria-hidden="true" />
            AI-assisted document control
          </span>
          <h1
            id="hero-heading"
            className="mt-6 text-[2.3rem] font-bold leading-[1.05] tracking-tight text-c-ink sm:text-[3.4rem] lg:text-[3.7rem] xl:text-[4rem]"
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
            Contourna drafts your policies, procedures, and work instructions with
            AI, routes them through review and approval, then proves they are
            followed with forms and records.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={signupUrl} className={primaryLinkClass}>
              Start free trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/playground" className={secondaryLinkClass}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Try it without an account
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-c-grey-light">
            {[
              `${TRIAL_DAYS} days free, cancel anytime`,
              "Unlimited free viewers",
              "Bring your existing documents",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-c-yellow" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative lg:-mr-24 xl:-mr-40">
          <div
            className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-c-yellow/30 blur-3xl"
            aria-hidden="true"
          />
          <Image
            src="/images/dashboard-home.png"
            alt="Contourna dashboard showing open review counts, quick actions for a new manual, document, or form, and a Needs your attention task list of overdue reviews"
            width={2400}
            height={1475}
            className="relative h-auto w-full rounded-2xl"
            quality={82}
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

function Pillars() {
  return (
    <Section id="features" className="bg-white">
      <SectionHeading
        eyebrow="Why Contourna"
        title="Write the standard, control the standard, prove the standard"
        description="Most quality systems fall apart between those three jobs. Contourna keeps them in one place, so documentation stays part of the work instead of a separate admin project."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          const isDark = pillar.className === "bg-c-brown";
          return (
            <article
              key={pillar.title}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[1.75rem] p-8 pt-10 transition duration-300 hover:-translate-y-1.5",
                pillar.className,
              )}
            >
              {/* Oversized index sits behind the content as texture, not a label —
                  it is decorative, so it stays out of the accessibility tree. */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute right-6 top-5 text-[5.5rem] font-bold leading-[0.75] tracking-tighter transition-opacity duration-300",
                  isDark ? "text-white/10 group-hover:text-white/[0.16]" : "text-c-brown/10 group-hover:text-c-brown/20",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "relative flex h-14 w-14 -rotate-6 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-0",
                  pillar.iconClassName,
                )}
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className={cn("relative mt-7 text-[1.35rem] font-bold leading-snug", pillar.titleClassName)}>
                {pillar.title}
              </h3>
              <p className={cn("relative mt-3 text-[15px] leading-7", pillar.bodyClassName)}>{pillar.description}</p>
              <ul
                className={cn(
                  "relative mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t pt-5 text-xs font-semibold uppercase tracking-[0.1em]",
                  isDark ? "border-white/15 text-white/55" : "border-c-brown/15 text-c-brown/65",
                )}
              >
                {pillar.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-1.5">
                    <span
                      className={cn("h-1 w-1 rounded-full", isDark ? "bg-c-yellow" : "bg-c-brown/50")}
                      aria-hidden="true"
                    />
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function ImportBand() {
  return (
    <Section className="bg-c-off-white">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <Eyebrow>Start where you are</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-c-ink sm:text-[2.75rem]">
            You already wrote half of this. Bring it with you.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-c-grey-light">
            Import the files and pages your process already lives in — from your
            drive, from Notion, or from Google Drive. Everything arrives as a
            draft, and Contourna suggests how to group it into manuals so you are
            not filing hundreds of files by hand.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {importModes.map((mode) => (
              <div key={mode.title} className="rounded-2xl border border-c-brown/10 bg-white p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-yellow text-c-brown">
                    <FileUp className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-[15px] font-semibold text-c-ink">{mode.title}</p>
                </div>
                <p className="mt-2.5 text-sm leading-6 text-c-grey-light">{mode.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-c-yellow-light p-4">
            <Layers className="mt-0.5 h-5 w-5 shrink-0 text-c-brown" aria-hidden="true" />
            <p className="text-sm leading-6 text-c-brown">
              After an import, Contourna proposes a manual structure for everything
              that came in — grouped by the work it describes.
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-c-brown/50">Supported files</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {importFormats.map((format) => (
                <li
                  key={format}
                  className="rounded-full border border-c-brown/15 bg-white px-3 py-1 text-xs font-semibold text-c-brown"
                >
                  {format}
                </li>
              ))}
            </ul>
          </div>
          <a href={signupUrl} className={cn(primaryLinkClass, "mt-9")}>
            Import your documents
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <Screenshot
          src="/images/document-import.png"
          alt="Contourna Import Documents screen with tabs for Files, Notion, and Google Drive, a choice between converting a file to an editable document or uploading the original, and a drag-and-drop area listing the supported file formats"
          width={1610}
          height={958}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </Section>
  );
}

function ManualStructure() {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="Manuals"
        title="A manual, not a folder of files"
        description="Every manual stacks in four tiers, so a policy, the procedures that carry it out, the instructions that do the work, and the records that prove it all sit in one place — in the order an auditor reads them."
      />
      <div className="mt-14">
        <Screenshot
          src="/images/manual-spotlight-clean.png"
          alt="Contourna manual contents view for an Events and Catering manual, showing the cover image, document and form counts, the four tiers Policy, Procedures, Work Instructions, and Forms and Proofs, and a Create Manual panel offering to generate the policy with AI or link an existing one"
          width={2400}
          height={1118}
          sizes="(max-width: 1280px) 100vw, 1152px"
          // Shadow via filter, not a box: the capture is L-shaped, with the
          // Create Manual card overhanging the window it belongs to.
          className="mx-auto max-w-6xl drop-shadow-[0_30px_60px_rgba(55,48,18,0.22)]"
          bare
        />
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {manualTiers.map((tier, index) => (
          <li
            key={tier.title}
            className="group relative rounded-2xl border border-c-brown/10 bg-c-off-white p-6 transition duration-300 hover:border-c-yellow/70 hover:shadow-card"
          >
            {/* Bar length steps up per tier, so the row reads as a stack even
                before anyone reads the labels. */}
            <span
              className="block h-1 rounded-full bg-c-yellow"
              style={{ width: `${28 + index * 18}%` }}
              aria-hidden="true"
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-c-brown/50">{tier.level}</p>
            <h3 className="mt-2 text-lg font-semibold text-c-ink">{tier.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-c-brown/70">{tier.role}</p>
            <p className="mt-3 text-sm leading-6 text-c-grey-light">{tier.description}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a href={signupUrl} className={primaryLinkClass}>
          Build your first manual
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <p className="text-sm text-c-grey-light">
          Generate the parent policy with AI, or link one you already have.
        </p>
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
  children?: ReactNode;
  /** Caps and centres tall captures so a portrait panel does not tower over the copy. */
  portrait?: boolean;
  /** Adds the site's panel frame around captures that ship without their own. */
  framed?: boolean;
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
  children,
  portrait = false,
  framed = false,
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
          {children}
          <a href={signupUrl} className={cn(primaryLinkClass, "mt-9")}>
            Start free trial
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className={cn(reverse && "lg:order-1", portrait && "mx-auto max-w-[30rem]")}>
          <Screenshot
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes={portrait ? "(max-width: 1024px) 100vw, 30rem" : "(max-width: 1024px) 100vw, 50vw"}
            bare={!framed}
          />
        </div>
      </div>
    </section>
  );
}

function EditorHighlights() {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {editorHighlights.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-c-brown/10 bg-white px-4 py-3 text-sm font-medium text-c-brown"
        >
          <Icon className="h-4 w-4 shrink-0 text-c-brown/70" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

function ReviewCycles() {
  return (
    <Section className="bg-c-off-white">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <Eyebrow>Review cycles</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-c-ink sm:text-[2.75rem]">
            Documents come back for review on their own.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-c-grey-light">
            Set a cadence per document and Contourna queues the next review for
            you. The reviewer opens the revision under review, records findings
            against the section they affect, and closes the cycle with a
            disposition.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              "Overdue and upcoming reviews collect in one queue.",
              "Reviews can be started early when the process changes.",
              "Findings and rounds are recorded against the cycle.",
              "Each published revision keeps the reason it was made.",
            ].map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[15px] leading-7 text-c-brown/80">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <Screenshot
          src="/images/review-workspace.png"
          alt="Contourna controlled review workspace for a work instruction, showing the revision under review, reviewer, owner and due date, alongside a panel to choose a disposition and record findings"
          width={2400}
          height={1556}
          sizes="(max-width: 1024px) 100vw, 55vw"
          // Filter, not a box: the disposition panel overhangs the window below
          // and to the right, so the capture is L-shaped.
          className="drop-shadow-[0_30px_60px_rgba(55,48,18,0.22)]"
          bare
        />
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl border border-c-brown/10 bg-white p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-c-yellow-light text-c-brown">
            <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-c-ink">Three ways to close a review</h3>
          <ul className="mt-4 space-y-3">
            {reviewDispositions.map((disposition) => (
              <li key={disposition.title} className="text-sm leading-6">
                <span className="font-semibold text-c-brown">{disposition.title}</span>
                <span className="block text-c-grey-light">{disposition.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-c-brown/10 bg-white p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-c-yellow-light text-c-brown">
            <CalendarClock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-c-ink">Review cadence</h3>
          <p className="mt-2 text-sm leading-6 text-c-grey-light">Pick one per document.</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {reviewCadences.map((cadence) => (
              <li
                key={cadence}
                className="rounded-full border border-c-brown/15 bg-c-off-white px-3 py-1 text-xs font-semibold text-c-brown"
              >
                {cadence}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-lg font-semibold text-c-ink">Reason on the record</h3>
          <p className="mt-2 text-sm leading-6 text-c-grey-light">
            Every revision states why it happened.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-c-brown/80">
            {reviewReasons.map((reason) => (
              <li key={reason} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-c-yellow" aria-hidden="true" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-c-brown/10 bg-white p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-c-yellow-light text-c-brown">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-c-ink">Anyone can raise it. Reviewers decide.</h3>
          <p className="mt-2 text-[15px] leading-7 text-c-grey-light">
            A worker who spots a step that no longer matches reality flags the
            section from the document itself. It lands in the review queue as a
            suggestion with the section attached — not as a message someone has to
            remember to act on.
          </p>
        </div>
      </div>
    </Section>
  );
}

function FormsBand() {
  return (
    <section className="relative overflow-hidden bg-c-brown py-20 sm:py-28">
      <div className="bg-dot-grid-light absolute inset-0" aria-hidden="true" />
      <div className="bg-brown-glow absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Eyebrow tone="dark">Forms &amp; records</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.75rem]">
            Describe the record you need. Get a form ready to publish.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-white/70">
            Contourna builds the fields, sections, and tracked quality metrics for
            you. Adjust anything, publish it, then assign it on a schedule so the
            work leaves evidence behind.
          </p>
          <ul className="mt-7 space-y-4 text-[15px] leading-7 text-white/75">
            {[
              "Ask the assistant to add, edit, or reorder fields — you approve each change.",
              "Assign to people or whole departments, once each or once for the group.",
              "Missed submissions are flagged instead of disappearing.",
              "Records stay attached to the procedure they prove.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Field types</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {formFieldTypes.map((field) => (
                <li
                  key={field}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80"
                >
                  {field}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Schedules</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {scheduleCadences.map((cadence) => (
                <li
                  key={cadence}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80"
                >
                  {cadence}
                </li>
              ))}
            </ul>
          </div>
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

function QualityData() {
  return (
    <Section className="bg-c-off-white">
      <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div>
          <Eyebrow>Quality data</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-c-ink sm:text-[2.75rem]">
            Records are not the point. Knowing is the point.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-c-grey-light">
            Mark a form field as a quality metric and every submission feeds a
            control chart. Contourna calculates the limits, checks the standard
            SPC rule sets, and tells you in plain language what the pattern means.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {spcCapabilities.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-c-brown/10 bg-white p-5 pl-6 transition duration-300 hover:border-c-yellow/70 hover:shadow-card"
              >
                <span
                  className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-c-yellow transition-transform duration-300 group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-c-brown text-c-yellow transition-colors duration-300 group-hover:bg-c-yellow group-hover:text-c-brown">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-c-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-c-grey-light">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-c-grey-light">Included in the Control plan.</p>
        </div>
        <Screenshot
          src="/images/form-analytics.png"
          alt="Contourna process control view: tracked measurements across forms, calculated mean, upper and lower control limits, an out-of-control counter, and a roast duration control chart with the out-of-limit point marked in red"
          width={1800}
          height={1045}
          sizes="(max-width: 1024px) 100vw, 50vw"
          bare
        />
      </div>
    </Section>
  );
}

function AccessBand() {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="Team & access"
        title="Roll it out to everyone without paying for everyone"
        description="A quality system only works if the whole team can open it. Contourna charges for the people who write and approve documents, not for the people who follow them."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {accessFacts.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className="group relative rounded-3xl border border-c-brown/10 bg-c-off-white p-7 transition duration-300 hover:-translate-y-1 hover:border-c-yellow/60 hover:shadow-card"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-c-brown ring-1 ring-c-brown/15 transition duration-300 group-hover:bg-c-yellow group-hover:ring-c-yellow">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span
                className="text-xs font-semibold tracking-[0.16em] text-c-brown/30 transition-colors duration-300 group-hover:text-c-brown/70"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-c-ink">
              {title}
              {/* Underline grows on hover so the row of cards reacts to the pointer
                  without moving any text. */}
              <span
                className="mt-1.5 block h-0.5 w-8 origin-left scale-x-0 bg-c-yellow transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-c-grey-light">{description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-c-yellow">
      <SectionHeading
        eyebrow="How it works"
        title="Draft it, approve it, publish it, prove it"
        description="One loop, from a blank page to a published standard with records behind it."
        tone="yellow"
      />
      <div className="relative mt-14">
        {/* Dashed rail behind the row reads as one loop instead of four islands.
            Only drawn once the cards actually sit side by side. */}
        <div
          className="absolute left-[12%] right-[12%] top-[7.5rem] hidden border-t-2 border-dashed border-c-brown/25 lg:block"
          aria-hidden="true"
        />
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="group relative overflow-hidden rounded-3xl bg-c-brown p-8 pt-7 transition duration-300 hover:-translate-y-1.5"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-c-yellow">
                    Step {index + 1}
                  </span>
                  <span
                    className="text-[3.25rem] font-bold leading-none tracking-tighter text-white/10 transition-colors duration-300 group-hover:text-white/20"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                </div>
                <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-c-yellow text-c-brown transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-white/70">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
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

function Pricing() {
  return (
    <Section id="pricing" className="bg-c-off-white">
      <SectionHeading
        eyebrow="Pricing"
        title="Two plans. One decides how far you take it."
        description={`Prices in CAD. Every plan includes ${INCLUDED_EDITOR_SEATS} editor seats and unlimited free viewers, and starts with a ${TRIAL_DAYS}-day free trial.`}
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-3xl p-8 sm:p-10",
              plan.highlight
                ? "bg-c-brown text-white shadow-panel"
                : "border border-c-brown/10 bg-white",
            )}
          >
            {plan.highlight ? (
              <span className="absolute right-8 top-8 rounded-full bg-c-yellow px-3 py-1 text-xs font-semibold text-c-brown">
                Most complete
              </span>
            ) : null}
            <h3 className={cn("text-2xl font-bold", plan.highlight ? "text-white" : "text-c-ink")}>
              {plan.name}
            </h3>
            <p className={cn("mt-2 max-w-sm text-[15px] leading-7", plan.highlight ? "text-white/70" : "text-c-grey-light")}>
              {plan.description}
            </p>
            <p className="mt-7 flex items-baseline gap-2">
              <span className={cn("text-5xl font-bold tracking-tight", plan.highlight ? "text-white" : "text-c-ink")}>
                ${plan.monthly}
              </span>
              <span className={cn("text-sm font-medium", plan.highlight ? "text-white/60" : "text-c-grey-light")}>
                CAD / month
              </span>
            </p>
            <p className={cn("mt-2 text-sm font-semibold", plan.highlight ? "text-c-yellow" : "text-c-brown")}>
              ${plan.annualMonthly}/month billed annually — save {ANNUAL_DISCOUNT_PERCENT}%
            </p>
            <ul className="mt-8 space-y-3.5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={cn("flex gap-3 text-[15px] leading-7", plan.highlight ? "text-white/80" : "text-c-brown/80")}
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={signupUrl}
              className={cn(plan.highlight ? primaryOnColorLinkClass : primaryLinkClass, "mt-9 w-full")}
            >
              Start {TRIAL_DAYS}-day free trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center text-sm leading-7 text-c-grey-light">
        Extra editor seats are ${EXTRA_SEAT_MONTHLY} CAD per month each. Cancel or
        switch plans yourself from the billing portal.
      </p>
    </Section>
  );
}

function PlaygroundCta() {
  return (
    <Section id="playground" className="bg-white">
      <div className="relative overflow-hidden rounded-[2rem] bg-c-brown px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="bg-dot-grid-light absolute inset-0" aria-hidden="true" />
        <div className="bg-brown-glow absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-c-yellow/40 bg-c-yellow/10 px-3.5 py-1.5 text-xs font-semibold text-c-yellow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Live demo — no account required
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Judge the writing before you sign up
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Pick a policy, procedure, or work instruction, adjust a realistic
            example, and generate a real draft in the same editor the product uses.
            It stays in your browser tab.
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

function Faq() {
  return (
    <Section id="faq" className="bg-c-off-white">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-c-ink sm:text-[2.75rem]">
            The things people ask first
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-c-grey-light">
            Still unsure?{" "}
            <a href="mailto:hello@contourna.com" className="font-semibold text-c-brown underline decoration-c-yellow decoration-2 underline-offset-4">
              Email us
            </a>{" "}
            and a human will answer.
          </p>
        </div>
        <div className="divide-y divide-c-brown/10 border-y border-c-brown/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[17px] font-semibold text-c-ink marker:content-none">
                {faq.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-c-brown/60 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-c-grey-light">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-c-brown py-20 text-white sm:py-24">
      <div className="bg-brown-glow absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-[2.75rem]">
            Build a system your employees can actually follow.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            Replace scattered files and manual follow-up with controlled documents
            that stay current — and records that show they were used.
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

const footerLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Playground", href: "/playground" },
  { label: "FAQ", href: "/#faq" },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-c-brown text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-5 py-12 sm:px-8 md:flex-row">
        <div>
          <BrandLogo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">Business manuals, done automatically.</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/75">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-c-yellow">
              {link.label}
            </Link>
          ))}
          <a href={loginUrl} className="hover:text-c-yellow">Log in</a>
          <a href="mailto:hello@contourna.com" className="hover:text-c-yellow">Contact</a>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-5 py-6 text-xs text-white/50 sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} Contourna. All rights reserved.</p>
        <p className="flex gap-6">
          <a href={`${appUrl}/terms`} className="hover:text-c-yellow">Terms</a>
          <a href={`${appUrl}/privacy`} className="hover:text-c-yellow">Privacy</a>
        </p>
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
        <Pillars />
        <ImportBand />
        <ManualStructure />
        <MediaFeature
          className="bg-c-off-white"
          eyebrow="Write with AI"
          title="Draft and refine documents without starting from a blank page."
          description="Highlight a passage, tell the assistant what you want, and review the change as a tracked suggestion before it touches the document."
          bullets={[
            "Rewrite selected passages with the surrounding context included.",
            "Review every AI edit as a diff you can apply or discard.",
            "Keep policies, procedures, and instructions consistent in tone and structure.",
          ]}
          image="/images/ai-assistant-panel.png"
          imageAlt="Contourna AI Assistant panel showing a rewrite returned as an editor suggestion, with the changed words marked in green and red and Accept and Reject buttons"
          imageWidth={1782}
          imageHeight={3180}
          portrait
          framed
        >
          <EditorHighlights />
        </MediaFeature>
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
        <ReviewCycles />
        <FormsBand />
        <QualityData />
        <AccessBand />
        <HowItWorks />
        <Pricing />
        <PlaygroundCta />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
