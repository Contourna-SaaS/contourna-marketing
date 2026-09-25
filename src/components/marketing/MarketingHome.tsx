import {
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FileUp,
  Layers,
  MessageSquarePlus,
  Plus,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/cn";

import { AiRewriteDemo } from "./AiRewriteDemo";
import {
  EXTRA_SEAT_MONTHLY,
  INCLUDED_EDITOR_SEATS,
  TRIAL_DAYS,
  accessFacts,
  editorHighlights,
  faqs,
  formFieldTypes,
  importFormats,
  importModes,
  operationsFacts,
  reviewCadences,
  reviewDispositions,
  reviewReasons,
  scheduleCadences,
  spcCapabilities,
  steps,
} from "./content";
import { FormBuilderDemo } from "./FormBuilderDemo";
import { HeroIllustration, SpotIllustration } from "./Illustrations";
import { ManualStack } from "./ManualStack";
import { OperationsDemo } from "./OperationsDemo";
import {
  ButtonArrow,
  Eyebrow,
  Illustration,
  Section,
  TagList,
  appUrl,
  buttonBase,
  displayHeadingClass,
  loginUrl,
  ghostOnColorLinkClass,
  primaryLinkClass,
  primaryOnColorLinkClass,
  secondaryLinkClass,
  signupUrl,
} from "./primitives";
import { PricingPlans } from "./PricingPlans";
import { SeatCalculator } from "./SeatCalculator";
import { SiteHeader } from "./SiteHeader";
import { SpcChartDemo } from "./SpcChartDemo";
import { SpotlightTracker } from "./SpotlightTracker";
import { Typewriter } from "./Typewriter";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function CheckList({ items, tone = "light" }: { items: readonly string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="mt-8 space-y-3.5">
      {items.map((item) => (
        <li
          key={item}
          className={cn("flex gap-3 text-[15px] leading-7", tone === "dark" ? "text-white/75" : "text-c-brown/80")}
        >
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------- hero */

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-c-off-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-6">
        <div className="flex flex-col gap-7">
          <h1
            id="hero-heading"
            className="animate-rise text-[clamp(2.75rem,6vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-c-ink"
          >
            Write the standard. Run the checks.{" "}
            <span className="box-decoration-clone bg-[linear-gradient(transparent_62%,#fbcb5c_62%,#fbcb5c_92%,transparent_92%)]">
              Prove the work.
            </span>
          </h1>
          <p className="animate-rise max-w-[520px] text-[17px] leading-[1.7] text-[#6b6450]" style={delay(160)}>
            Write policies, procedures, and work instructions with AI. Build the forms your team fills in, schedule
            checks for every location, machine, and product, and keep every record in one place.
          </p>
          <div className="animate-rise flex flex-col gap-3 sm:flex-row" style={delay(240)}>
            <a href={signupUrl} className={primaryLinkClass}>
              Start free trial
              <ButtonArrow />
            </a>
            <Link href="/playground" className={secondaryLinkClass}>
              Try it without an account
            </Link>
          </div>
        </div>
        <div className="animate-rise mx-auto w-full max-w-xl lg:max-w-none" style={delay(200)}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- import */

function ImportBand() {
  return (
    <Section id="documents" className="bg-white">
      <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="reveal">
          <SpotIllustration name="documents" className="-ml-3 mb-6" />
          <Eyebrow>Start where you are</Eyebrow>
          <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>Don&apos;t start from scratch. Bring what already works</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-c-grey-light">
            Import files from your computer, Notion, or Google Drive. They arrive as drafts, ready to update.
            Contourna can also suggest how they fit together, so you do not have to sort a pile of files by hand.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {importModes.map((mode) => (
              <div key={mode.title} className="spotlight rounded-2xl border border-c-brown/10 bg-c-off-white p-5">
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
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-c-yellow-light p-4">
            <Layers className="mt-0.5 h-5 w-5 shrink-0 text-c-brown" aria-hidden="true" />
            <p className="text-sm leading-6 text-c-brown">
              Once the import is done, Contourna suggests a practical manual structure based on what each document
              covers.
            </p>
          </div>
          <div className="mt-8">
            <TagList label="Supported files" items={importFormats} />
          </div>
          <a href={signupUrl} className={cn(primaryLinkClass, "mt-10")}>
            Import your documents
            <ButtonArrow />
          </a>
        </div>
        <div className="reveal lg:sticky lg:top-28">
          <Illustration
            src="/images/illustrations/illo-import.png"
            alt="Illustration of the Contourna Import Documents screen with tabs for Files, Notion, and Google Drive, a drop zone for PDF, DOCX, MD, and PNG files, and imported documents arriving as drafts"
            width={1200}
            height={720}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- manuals */

function Manuals() {
  return (
    <Section className="overflow-x-clip bg-c-off-white">
      <div className="reveal max-w-3xl">
        <Eyebrow>Manuals</Eyebrow>
        <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>Give every document a place and a purpose</h2>
        <p className="mt-6 text-lg leading-8 text-c-grey-light">
          Organize each manual in four clear levels: the policy, the procedures that support it, the instructions
          people follow, and the forms that capture the work. It is easy for employees to navigate and easy for
          auditors to understand.
        </p>
      </div>
      <div className="mt-14">
        <ManualStack />
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- writing */

function Writing() {
  return (
    <Section className="bg-white">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <Eyebrow>Write with AI</Eyebrow>
          <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>Turn your know-how into a solid first draft</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-c-grey-light">
            Describe what you need or start with an existing document. When the wording needs work, highlight the
            passage, ask for a change, and review the result before it touches your document.
          </p>
          <CheckList
            items={[
              "Rewrite a selected passage without losing the surrounding context.",
              "See every change before you accept or discard it.",
              "Keep policies, procedures, and instructions consistent.",
            ]}
          />
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {editorHighlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-c-brown/10 bg-c-off-white px-3.5 py-2.5 text-sm font-medium text-c-brown"
              >
                <Icon className="h-4 w-4 shrink-0 text-c-brown/60" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-c-brown/50">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-c-yellow" aria-hidden="true" />
            Try it: pick a request
          </p>
          <AiRewriteDemo />
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- reviews */

function StickyRow({
  copy,
  figure,
  reverse = false,
}: {
  copy: ReactNode;
  figure: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid items-start gap-12 lg:gap-16",
        reverse ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[0.85fr_1.15fr]",
      )}
    >
      <div className={cn("reveal lg:sticky lg:top-28", reverse && "lg:order-2")}>{copy}</div>
      <div className={cn("reveal", reverse && "lg:order-1")}>{figure}</div>
    </div>
  );
}

function ReviewCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <article className="spotlight rounded-3xl border border-c-brown/10 bg-white p-7">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-c-yellow text-c-brown">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-c-ink">{title}</h3>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function Reviews() {
  return (
    <Section id="reviews" className="bg-c-off-white">
      <StickyRow
        copy={
          <>
            <SpotIllustration name="reviews" className="-ml-3 mb-6" />
            <Eyebrow>Review &amp; approve</Eyebrow>
            <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>
              Let people keep doing the work. Keep documents honest
            </h2>
            <p className="mt-6 text-lg leading-8 text-c-grey-light">
              Anyone can flag a step that no longer matches the work. Reviewers see the suggestion beside the exact
              section it affects, with the context they need to decide what changes.
            </p>
            <CheckList
              items={[
                "Keep suggestions attached to the section they affect.",
                "See what changed and why before publishing.",
                "Move through long documents one section at a time.",
              ]}
            />
          </>
        }
        figure={
          <Illustration
            src="/images/illustrations/illo-suggestion.png"
            alt="Illustration of a maple latte work instruction where a barista files a Missing suggestion against the Tools section, marks it as required, and sends it to the review queue"
            width={1200}
            height={888}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        }
      />

      <div className="mt-28">
        <StickyRow
          reverse
          copy={
            <>
              <Eyebrow>Review cycles</Eyebrow>
              <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>
                Know what&apos;s due for review before it becomes overdue
              </h2>
              <p className="mt-6 text-lg leading-8 text-c-grey-light">
                Choose how often each document should be reviewed and Contourna puts it in the queue at the right
                time. Reviewers can record findings on the exact section they affect and close the review with a
                clear decision.
              </p>
              <CheckList
                items={[
                  "See upcoming and overdue reviews in one queue.",
                  "Start a review early when a process changes.",
                  "Keep every finding and review round on record.",
                  "Record why each published revision was made.",
                ]}
              />
            </>
          }
          figure={
            <Illustration
              src="/images/illustrations/illo-review-cycle.png"
              alt="Illustration of a quarterly review cadence timeline with the next review due in five days, above a work instruction in review showing its reviewer, owner, due date, and findings"
              width={1440}
              height={900}
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          }
        />
      </div>

      <div className="mt-20 grid gap-5 lg:grid-cols-3">
        <ReviewCard icon={ClipboardCheck} title="Three ways to close a review">
          <ul className="space-y-3">
            {reviewDispositions.map((disposition) => (
              <li key={disposition.title} className="text-sm leading-6">
                <span className="font-semibold text-c-brown">{disposition.title}</span>
                <span className="block text-c-grey-light">{disposition.detail}</span>
              </li>
            ))}
          </ul>
        </ReviewCard>
        <ReviewCard icon={CalendarClock} title="A cadence and a reason for every document">
          <TagList label="Review cadence" items={reviewCadences} />
          <div className="mt-5">
            <TagList label="Reason on the record" items={reviewReasons} />
          </div>
        </ReviewCard>
        <ReviewCard icon={MessageSquarePlus} title="Suggestions from anyone, decisions from reviewers">
          <p className="text-[15px] leading-7 text-c-grey-light">
            When someone spots an outdated step, they can flag it from the document itself. The suggestion lands in
            the review queue with the right section attached, ready for a reviewer to act on.
          </p>
        </ReviewCard>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ forms */

function FormsBand() {
  return (
    <Section id="forms" className="bg-white">
      <div className="reveal max-w-4xl">
        <SpotIllustration name="forms" className="-ml-3 mb-6" />
        <Eyebrow>Forms &amp; records</Eyebrow>
        <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>
          Tell Contourna what you need to record. It builds the form
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-c-brown/75">
          Start with a short description and get a form with the right fields, sections, and quality metrics. Make any
          changes, publish it, and assign it on a schedule so completed work always leaves a record.
        </p>
      </div>

      <div className="mt-16">
        <FormBuilderDemo />
      </div>

      <div className="mt-24 grid gap-12 border-t border-c-brown/10 pt-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <CheckList
          items={[
            "Ask the assistant to add, edit, or reorder fields. You approve every change.",
            "Assign a form to individuals or entire departments.",
            "See missed submissions before they slip through the cracks.",
            "Keep each record attached to the procedure it supports.",
          ]}
        />
        <div className="lg:pt-8">
          <TagList label="Field types" items={formFieldTypes} />
        </div>
        <div className="lg:pt-8">
          <TagList label="Schedules" items={scheduleCadences} />
        </div>
      </div>
      <a href={signupUrl} className={cn(primaryLinkClass, "mt-12")}>
        Start free trial
        <ButtonArrow />
      </a>
    </Section>
  );
}

/* ------------------------------------------------------------- operations */

function Operations() {
  return (
    <Section id="operations" className="bg-c-off-white">
      <div className="reveal grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <SpotIllustration name="operations" className="-ml-3 mb-6" />
          <Eyebrow>Operations</Eyebrow>
          <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>Attach the checks to the things you run</h2>
        </div>
        <p className="text-lg leading-8 text-c-grey-light lg:pb-2">
          Add your locations, equipment, and products, then assign the forms each one needs. Checks are organized by
          site, and each one goes to the team or person who does it.
        </p>
      </div>
      <div className="reveal mt-14">
        <OperationsDemo />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {operationsFacts.map(({ icon: Icon, title, description }) => (
          <article key={title} className="spotlight reveal flex gap-4 rounded-3xl border border-c-brown/10 bg-white p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-c-yellow text-c-brown">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-c-ink">{title}</h3>
              <p className="mt-1.5 text-[15px] leading-7 text-c-grey-light">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- quality */

function QualityData() {
  return (
    <Section id="quality" className="bg-white">
      <div className="reveal grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <Eyebrow>Quality data</Eyebrow>
          <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>See when a process starts to drift</h2>
        </div>
        <p className="text-lg leading-8 text-c-grey-light lg:pb-2">
          Mark any form field as a quality metric and each submission updates its control chart. Contourna calculates
          the limits, checks standard SPC rules, and explains what the pattern means in plain language.
        </p>
      </div>
      <div className="reveal mt-14">
        <SpcChartDemo />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {spcCapabilities.map(({ icon: Icon, title, description }) => (
          <div key={title} className="spotlight reveal rounded-3xl border border-c-brown/10 bg-c-off-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-c-yellow text-c-brown">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-semibold text-c-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-c-grey-light">{description}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-c-grey-light">Included in the Control plan.</p>
    </Section>
  );
}

/* ----------------------------------------------------------------- access */

function Access() {
  return (
    <Section className="bg-c-off-white">
      <div className="reveal mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Eyebrow>Team &amp; access</Eyebrow>
        </div>
        <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>Roll it out to everyone without paying for everyone</h2>
        <p className="mt-6 text-lg leading-8 text-c-grey-light">
          A quality system only works when people can use it. You pay for the people who write and approve
          documents. Everyone else can read, submit forms, and suggest changes for free.
        </p>
      </div>
      <div className="reveal mt-14">
        <SeatCalculator />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {accessFacts.map(({ icon: Icon, title, description }) => (
          <article key={title} className="spotlight reveal rounded-3xl border border-c-brown/10 bg-white p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-c-brown ring-1 ring-c-brown/10">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-c-ink">{title}</h3>
            <p className="mt-2 text-[15px] leading-7 text-c-grey-light">{description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- how it works */

function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-white">
      <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <Eyebrow>How it works</Eyebrow>
          <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>A simpler way to keep standards current</h2>
          <p className="mt-6 text-lg leading-8 text-c-brown/80">
            Go from a rough idea to a published standard, then keep the records that show it is being followed.
          </p>
          <a
            href={signupUrl}
            className={cn(
              buttonBase,
              "mt-10 bg-c-brown text-white hover:bg-c-yellow hover:text-c-brown focus-visible:ring-c-brown focus-visible:ring-offset-white",
            )}
          >
            Start free trial
            <ButtonArrow />
          </a>
        </div>

        <div className="rail relative pl-12 sm:pl-16">
          <div className="absolute bottom-6 left-[1.1rem] top-6 w-0.5 bg-c-brown/15 sm:left-[1.6rem]" aria-hidden="true">
            <div className="rail-fill h-full w-full bg-c-brown" />
          </div>
          <ol className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="reveal relative">
                  <span
                    className="absolute -left-12 top-7 flex h-9 w-9 items-center justify-center rounded-full bg-c-brown text-c-yellow ring-4 ring-white sm:-left-16 sm:h-[3.25rem] sm:w-[3.25rem]"
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div className="rounded-[1.75rem] border border-c-brown/10 bg-c-off-white p-7 text-c-ink sm:p-9">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{step.title}</h3>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-c-brown/50">Step {index + 1}</span>
                    </div>
                    <p className="mt-4 max-w-xl text-[15px] leading-7 text-c-brown/75">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- pricing */

function Pricing() {
  return (
    <Section id="pricing" className="bg-c-off-white">
      <div className="reveal mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Eyebrow>Pricing</Eyebrow>
        </div>
        <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>Choose the right fit for your quality system</h2>
        <p className="mt-6 text-lg leading-8 text-c-grey-light">
          All prices are in CAD. Both plans include {INCLUDED_EDITOR_SEATS} editor seats, unlimited readers and form
          users, and a {TRIAL_DAYS}-day free trial.
        </p>
      </div>
      <div className="mt-12">
        <PricingPlans />
      </div>
      <p className="mt-8 text-center text-sm leading-7 text-c-grey-light">
        Extra editor seats are ${EXTRA_SEAT_MONTHLY} CAD per month each. Cancel or switch plans yourself from the
        billing portal.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------- playground */

function PlaygroundCta() {
  return (
    <Section id="playground" className="bg-white">
      <div className="reveal rounded-[2.5rem] bg-c-brown px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-c-yellow/40 bg-c-yellow/10 px-3.5 py-1.5 text-xs font-semibold text-c-yellow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Live demo. No account required.
          </p>
          <h2 className={cn(displayHeadingClass, "mt-6")}>Try the document writer for yourself</h2>
          <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-left">
            <Sparkles className="h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
            <p className="min-w-0 truncate text-lg text-white">
              <span className="text-white/45">Write a </span>
              <Typewriter
                phrases={[
                  "policy for allergen handling",
                  "procedure for receiving deliveries",
                  "work instruction for opening the espresso bar",
                  "procedure for cold room temperature checks",
                ]}
              />
            </p>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/65">
            Choose a policy, procedure, or work instruction. Adjust the example and create a real draft with the same
            assistant Contourna customers use. Your work stays in the current browser tab.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/playground" className={primaryOnColorLinkClass}>
              Create a free document
              <ButtonArrow />
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

/* -------------------------------------------------------------------- faq */

function Faq() {
  return (
    <Section id="faq" className="bg-c-off-white">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Questions</Eyebrow>
          <h2 className={cn(displayHeadingClass, "mt-6 text-c-ink")}>Questions before you try it?</h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-c-grey-light">
            Still unsure?{" "}
            <a
              href="mailto:hello@contourna.com"
              className="font-semibold text-c-brown underline decoration-c-yellow decoration-2 underline-offset-4 hover:text-c-yellow"
            >
              Email us
            </a>{" "}
            and a human will answer.
          </p>
        </div>
        <div className="border-t border-c-brown/15">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq group border-b border-c-brown/15">
              <summary className="flex cursor-pointer list-none items-center gap-5 py-6 text-left text-lg font-semibold text-c-ink transition-colors marker:content-none hover:text-c-brown [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{faq.question}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-c-brown/15 transition-all duration-300 group-open:rotate-45 group-open:border-c-yellow group-open:bg-c-yellow group-hover:border-c-yellow">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-[15px] leading-7 text-c-grey-light">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- footer */

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Documents", href: "/#documents" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Forms", href: "/#forms" },
      { label: "Operations", href: "/#operations" },
      { label: "Quality data", href: "/#quality" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Playground", href: "/playground" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: loginUrl },
      { label: "Start free trial", href: signupUrl },
      { label: "Contact", href: "mailto:hello@contourna.com" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-c-brown text-white">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="grid items-center gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Build a quality system people can <span className="text-c-yellow">actually follow</span>
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-white/60">
              Replace scattered files and manual follow-up with documents that stay current and records that are ready
              when you need them.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={signupUrl} className={primaryOnColorLinkClass}>
                Start free trial
                <ButtonArrow />
              </a>
              <Link href="/playground" className={ghostOnColorLinkClass}>
                Try the playground
              </Link>
            </div>
          </div>
          <Image
            src="/images/illustrations/footer-illustration.svg"
            alt=""
            width={520}
            height={360}
            className="hidden h-auto w-80 lg:block"
          />
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
              Write the standard, run the checks, and keep the records that prove the work was done.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">{column.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/70 transition-colors hover:text-c-yellow">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Contourna. All rights reserved.</p>
          <p className="flex gap-6">
            <a href={`${appUrl}/terms`} className="transition-colors hover:text-c-yellow">
              Terms
            </a>
            <a href={`${appUrl}/privacy`} className="transition-colors hover:text-c-yellow">
              Privacy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function MarketingHome() {
  return (
    <div className="min-h-screen bg-c-off-white [&_h1]:text-balance [&_h2]:text-balance [&_h3]:text-balance [&_p]:text-pretty">
      <SpotlightTracker />
      <SiteHeader />
      <main>
        <Hero />
        <ImportBand />
        <Manuals />
        <Writing />
        <Reviews />
        <FormsBand />
        <Operations />
        <QualityData />
        <Access />
        <HowItWorks />
        <Pricing />
        <PlaygroundCta />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
