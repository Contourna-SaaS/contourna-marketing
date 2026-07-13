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

import { BrandLogo } from "@/components/BrandLogo";

import { SiteHeader } from "./SiteHeader";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com";
const signupUrl = `${appUrl.replace(/\/$/, "")}/signup`;

const featureCards = [
  {
    icon: ClipboardCheck,
    title: "Document control",
    description:
      "Move every document from draft through review, approval, and publication with a clear record of ownership.",
    className: "bg-c-brown text-white",
    iconClassName: "bg-c-yellow text-c-brown",
    bodyClassName: "text-white/70",
    titleClassName: "text-white",
  },
  {
    icon: Bot,
    title: "AI-assisted editor",
    description:
      "Draft structured content, refine existing text, and keep policies, procedures, and work instructions consistent.",
    className: "bg-c-yellow text-c-brown",
    iconClassName: "bg-c-brown text-c-yellow",
    bodyClassName: "text-c-brown/80",
    titleClassName: "text-c-brown",
  },
  {
    icon: Eye,
    title: "One source of truth",
    description:
      "Give employees the current approved version while retaining the review history your quality program needs.",
    className: "bg-c-yellow-light text-c-brown",
    iconClassName: "bg-c-yellow text-c-brown",
    bodyClassName: "text-c-brown/75",
    titleClassName: "text-c-ink",
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
  { icon: CheckCircle2, label: "Quality records" },
] as const;

const primaryLinkClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-c-yellow px-7 text-base font-semibold text-white transition-colors hover:bg-c-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow focus-visible:ring-offset-2";

// On brown/yellow sections the default hover would blend into the background,
// so buttons there hover to white instead.
const primaryOnColorLinkClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-c-yellow px-7 text-base font-semibold text-white transition-colors hover:bg-white hover:text-c-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-c-off-white" aria-labelledby="hero-heading">
      <div className="bg-dot-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-c-yellow/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-c-yellow/40 bg-c-yellow-light px-3.5 py-1.5 text-xs font-semibold text-c-brown">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI-assisted document control
          </span>
          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-bold leading-[1.06] text-c-ink sm:text-6xl lg:text-[4.25rem]"
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
          <p className="mt-7 max-w-xl text-base leading-7 text-c-grey-light sm:text-lg">
            Standardize processes, onboard employees faster, and keep every policy,
            procedure, and work instruction under control.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={signupUrl} className={primaryLinkClass}>
              Start free trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/playground"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-c-brown/20 bg-white px-7 text-base font-semibold text-c-brown transition-colors hover:border-c-yellow hover:text-c-yellow"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Try the playground
            </Link>
          </div>
          <p className="mt-5 text-sm text-c-grey-light">No credit card required.</p>
        </div>
        <div className="relative">
          <div
            className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-c-yellow/30 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-2xl border border-c-brown/10 bg-white shadow-[0_40px_90px_-40px_rgba(55,48,18,0.55)]">
            <Image
              src="/images/dashboard.png"
              alt="Contourna dashboard showing manuals, documents requiring review, and recent activity"
              width={1672}
              height={941}
              className="h-auto w-full"
              preload
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
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
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-c-yellow">Why Contourna</p>
          <h2 className="mt-3 text-3xl font-bold text-c-ink sm:text-5xl">
            A practical system for controlled documents
          </h2>
          <p className="mt-5 text-base leading-7 text-c-grey-light">
            Build reliable documentation without turning quality management into
            a full-time administrative job.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={`rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1 ${feature.className}`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconClassName}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className={`mt-6 text-xl font-bold ${feature.titleClassName}`}>{feature.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${feature.bodyClassName}`}>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlaygroundCta() {
  return (
    <section id="playground" className="bg-c-off-white py-20 sm:py-28" aria-labelledby="playground-cta-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-c-brown px-6 py-14 text-center sm:px-12 sm:py-20">
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
            <h2 id="playground-cta-heading" className="mt-5 text-3xl font-bold text-white sm:text-5xl">
              See the AI document generator in action
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
              Pick a document type, tailor a realistic example, and generate an editable
              draft in minutes — right in your browser.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/playground" className={primaryOnColorLinkClass}>
                Open the playground
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={signupUrl}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-base font-semibold text-white transition-colors hover:border-c-yellow hover:text-c-yellow"
              >
                Start free trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface MediaFeatureProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
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
}: MediaFeatureProps) {
  return (
    <section className="bg-white py-18 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className={reverse ? "lg:order-2" : ""}>
          <p className="text-sm font-semibold uppercase tracking-wide text-c-yellow">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-c-ink sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-7 text-c-grey-light">{description}</p>
          {bullets ? (
            <ul className="mt-6 space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-6 text-c-grey-light">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-c-yellow" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
          <a href={signupUrl} className={`${primaryLinkClass} mt-8`}>
            Start free trial
          </a>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <Image
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="h-auto w-full rounded-2xl border border-c-brown/10 shadow-[0_32px_70px_-48px_rgba(55,48,18,0.7)]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

function GrowthBand() {
  return (
    <section className="bg-c-yellow py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Image
          src="/images/documents.png"
          alt="Contourna document library with folders, tags, and team access"
          width={1448}
          height={1086}
          className="h-auto w-full rounded-2xl border border-c-brown/10 shadow-[0_32px_70px_-48px_rgba(55,48,18,0.55)]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-c-brown/70">Built to scale</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-c-ink sm:text-5xl">
            Give every team the right document at the right time.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-c-brown/80">
            Organize manuals, control access, and make approved information easy to find as your operation grows.
          </p>
          <a
            href={signupUrl}
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-c-brown px-7 font-semibold text-white transition-colors hover:bg-white hover:text-c-brown"
          >
            Start free trial
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ValueGrid() {
  return (
    <section className="bg-c-off-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold text-c-ink sm:text-5xl">
          Managing business standards has never been easier
        </h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {valueCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-c-brown/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-c-yellow/60 hover:shadow-[0_20px_45px_-30px_rgba(55,48,18,0.45)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-c-yellow-light text-c-brown">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-c-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-c-grey-light">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-c-brown py-20 text-white sm:py-24">
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-c-yellow/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Build a system your employees can actually follow.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
            Replace scattered files and manual follow-up with controlled documents that stay current.
          </p>
        </div>
        <a href={signupUrl} className={`${primaryOnColorLinkClass} shrink-0`}>
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
        <PlaygroundCta />
        <div id="how-it-works">
          <MediaFeature
            eyebrow="Create with AI"
            title="Create manuals and documents without starting from a blank page."
            description="Turn practical details about your operation into structured documentation your team can review and improve."
            bullets={[
              "Create consistent policies, procedures, and instructions.",
              "Give new employees a reliable source of operating knowledge.",
              "Keep review and publication responsibilities visible.",
            ]}
            image="/images/manual.png"
            imageAlt="Published Contourna manual containing controlled documents"
            imageWidth={1254}
            imageHeight={1254}
            reverse
          />
          <MediaFeature
            eyebrow="Stay consistent"
            title="Consistent employee standards. Consistent customer service."
            description="Keep reviewers, approvers, and employees aligned around the same current information, with clear visibility into what needs attention."
            image="/images/review-workflow.png"
            imageAlt="Contourna review workflow showing documents that need attention"
            imageWidth={1254}
            imageHeight={1254}
          />
        </div>
        <GrowthBand />
        <ValueGrid />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
