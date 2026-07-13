import {
  BarChart3,
  BookOpen,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Sparkles,
  Target,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";
import { PlaygroundExperience } from "@/components/playground/PlaygroundExperience";

import { SiteHeader } from "./SiteHeader";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com";
const signupUrl = `${appUrl.replace(/\/$/, "")}/signup`;

const featureCards = [
  {
    icon: ClipboardCheck,
    title: "Document control",
    description:
      "Move every document from draft through review, approval, and publication with a clear record of ownership.",
    background: "bg-[#f5a623]",
  },
  {
    icon: Bot,
    title: "AI-assisted editor",
    description:
      "Draft structured content, refine existing text, and keep policies, procedures, and work instructions consistent.",
    background: "bg-[#f2bb3e]",
  },
  {
    icon: Eye,
    title: "One source of truth",
    description:
      "Give employees the current approved version while retaining the review history your quality program needs.",
    background: "bg-[#f4ce6a]",
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

const primaryLinkClass =
  "inline-flex h-12 items-center justify-center rounded-lg bg-c-yellow px-7 text-base font-semibold text-white transition-colors hover:bg-c-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow focus-visible:ring-offset-2";

function Hero() {
  return (
    <section className="overflow-hidden bg-c-off-white" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 text-center sm:px-8 sm:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full bg-c-yellow-light px-3 py-1.5 text-xs font-semibold text-c-brown">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          AI-assisted document control
        </span>
        <h1
          id="hero-heading"
          className="mx-auto mt-5 max-w-5xl text-4xl font-bold leading-[1.08] text-c-ink sm:text-6xl lg:text-7xl"
        >
          All your business manuals. Done automatically.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-c-grey-light sm:text-lg">
          Standardize processes, onboard employees faster, and keep every policy,
          procedure, and work instruction under control.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={signupUrl} className={primaryLinkClass}>
            Start free trial
          </a>
          <Link
            href="/playground"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-c-brown/20 bg-white px-7 text-base font-semibold text-c-brown transition-colors hover:border-c-green hover:text-c-green"
          >
            Try the playground
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-3 sm:px-8">
        <div className="overflow-hidden border border-c-brown/15 bg-white shadow-[0_28px_70px_-46px_rgba(55,48,18,0.7)]">
          <Image
            src="/images/dashboard.png"
            alt="Contourna dashboard showing manuals, documents requiring review, and recent activity"
            width={1672}
            height={941}
            className="h-auto w-full"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}

function DocumentBand() {
  return (
    <section className="mt-10 bg-c-brown" aria-label="Document types">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-6 text-center text-sm font-semibold text-white sm:grid-cols-4 sm:px-8 sm:text-base">
        {["Policies", "Procedures", "Work instructions", "Quality manuals"].map((label) => (
          <div key={label} className="px-3 py-2">
            {label}
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
          <h2 className="text-3xl font-bold text-c-ink sm:text-5xl">A practical system for controlled documents</h2>
          <p className="mt-5 text-base leading-7 text-c-grey-light">
            Build reliable documentation without turning quality management into
            a full-time administrative job.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className={`rounded-lg p-7 ${feature.background}`}>
                <Icon className="h-8 w-8 text-c-brown" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-bold text-c-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-c-brown/80">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlaygroundSection() {
  return (
    <section id="playground" className="bg-c-off-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-c-yellow-light px-3 py-1.5 text-xs font-semibold text-c-brown">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Live demo
          </span>
          <h2 className="mt-4 text-3xl font-bold text-c-ink sm:text-5xl">See the document generator in action</h2>
          <p className="mt-5 text-base leading-7 text-c-grey-light">
            Pick a document type, tailor a realistic example, and generate an editable draft without creating an account.
          </p>
        </div>
        <div className="mt-10 border border-c-brown/15 bg-white p-4 shadow-[0_24px_60px_-44px_rgba(55,48,18,0.6)] sm:p-7">
          <PlaygroundExperience embedded />
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
          <p className="text-sm font-semibold uppercase text-c-green">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-c-ink sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-7 text-c-grey-light">{description}</p>
          {bullets ? (
            <ul className="mt-6 space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-6 text-c-grey-light">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-c-green" aria-hidden="true" />
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
            className="h-auto w-full border border-c-brown/10 shadow-[0_24px_60px_-44px_rgba(55,48,18,0.7)]"
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
          className="h-auto w-full border border-c-brown/10"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div>
          <p className="text-sm font-semibold uppercase text-c-brown/70">Built to scale</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-c-ink sm:text-5xl">
            Give every team the right document at the right time.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-c-brown/80">
            Organize manuals, control access, and make approved information easy to find as your operation grows.
          </p>
          <a
            href={signupUrl}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-c-brown px-7 font-semibold text-white transition-colors hover:bg-c-green"
          >
            Start free trial
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
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {valueCards.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-c-brown/10 bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-c-yellow-light text-c-brown">
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
    <section className="bg-c-brown py-20 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">Build a system your employees can actually follow.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
            Replace scattered files and manual follow-up with controlled documents that stay current.
          </p>
        </div>
        <a href={signupUrl} className={`${primaryLinkClass} shrink-0`}>
          Get started
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
          <Link href="#features" className="hover:text-white">Features</Link>
          <Link href="/playground" className="hover:text-white">Playground</Link>
          <a href={`${appUrl.replace(/\/$/, "")}/login`} className="hover:text-white">Log in</a>
          <a href="mailto:hello@contourna.com" className="hover:text-white">Contact</a>
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
        <DocumentBand />
        <Features />
        <PlaygroundSection />
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
