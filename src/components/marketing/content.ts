import {
  BarChart3,
  BookOpen,
  Bot,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  History,
  LineChart,
  ListChecks,
  Mic,
  Repeat,
  ShieldCheck,
  Sparkles,
  Table2,
  Users,
  Wrench,
} from "lucide-react";

/**
 * Every claim on this page maps to shipped product behaviour. When a feature
 * changes in `contourna-frontend` / `contourna-backend`, change it here too —
 * the marketing copy is the contract we show prospects before they sign up.
 */

/* ---------------------------------------------------------------- pillars */

export const pillars = [
  {
    icon: Bot,
    title: "Get to a first draft faster",
    description:
      "Give Contourna a short brief and get a structured policy, procedure, work instruction, or training document. You can also highlight any passage and ask for a rewrite that fits the rest of the document.",
    tags: ["Guided drafting", "Inline rewrites", "Dictation"],
    className: "bg-c-brown",
    iconClassName: "bg-c-yellow text-c-brown",
    titleClassName: "text-white",
    bodyClassName: "text-white/70",
  },
  {
    icon: ClipboardCheck,
    title: "Keep every document current",
    description:
      "Move work from draft to review to published, with a clear owner and approval trail. Scheduled reviews and a reason for every revision give you the history an auditor will ask for.",
    tags: ["Approvals", "Version history", "Review cycles"],
    className: "bg-c-yellow",
    iconClassName: "bg-c-brown text-c-yellow",
    titleClassName: "text-c-brown",
    bodyClassName: "text-c-brown/80",
  },
  {
    icon: LineChart,
    title: "Show the work was done",
    description:
      "Add forms to a procedure, assign them on a schedule, and keep every submission with the document it supports. Track key measurements so you can catch process drift early.",
    tags: ["Form schedules", "Linked records", "SPC charts"],
    className: "bg-c-yellow-light",
    iconClassName: "bg-c-yellow text-c-brown",
    titleClassName: "text-c-ink",
    bodyClassName: "text-c-brown/75",
  },
] as const;

/* ------------------------------------------------------------- doc marquee */

export const documentTypes = [
  { icon: ShieldCheck, label: "Policies" },
  { icon: ClipboardList, label: "Procedures" },
  { icon: Wrench, label: "Work instructions" },
  { icon: GraduationCap, label: "Training documents" },
  { icon: BookOpen, label: "Manuals" },
  { icon: FileText, label: "Forms" },
  { icon: ListChecks, label: "Records" },
] as const;

/* ---------------------------------------------------------------- manuals */

/**
 * The four tiers a manual is built from, worded as the product words them in
 * the manual contents view.
 */
export const manualTiers = [
  {
    level: "Level 1",
    title: "Policy",
    role: "Why",
    description: "Sets the direction and explains what your organization expects.",
  },
  {
    level: "Level 2",
    title: "Procedures",
    role: "Who · When · Where",
    description: "Makes responsibilities, timing, and locations clear.",
  },
  {
    level: "Level 3",
    title: "Work instructions",
    role: "How",
    description: "Shows people exactly how to complete a specific task.",
  },
  {
    level: "Level 4",
    title: "Forms & proofs",
    role: "Evidence",
    description: "Captures the records that show the work was completed.",
  },
] as const;

/* ---------------------------------------------------------------- imports */

/**
 * Wording follows the Import Documents screen: files, Notion, or Drive; each
 * file is either converted to an editable document or kept as uploaded; and
 * everything lands as a draft.
 */
export const importFormats = ["PDF", "DOC", "DOCX", "MD", "JPG", "PNG"] as const;

export const importModes = [
  {
    title: "Convert to editable",
    description:
      "Turn the file into a Contourna document you can update. Choose whether you want AI to clean up the writing too.",
  },
  {
    title: "Upload original",
    description: "Keep the original file and its layout exactly as they are.",
  },
] as const;

/* --------------------------------------------------------- review cadence */

export const reviewCadences = ["Monthly", "Quarterly", "Semi-annual", "Annual"] as const;

/** The three outcomes a reviewer can record, per DocumentReviewDisposition. */
export const reviewDispositions = [
  { title: "Approve without changes", detail: "It is current and ready as written." },
  { title: "Approve with changes", detail: "Approve it and send minor findings to the owner." },
  { title: "Request revision", detail: "Send it back with the changes that must be made." },
] as const;

export const reviewReasons = [
  "Process change",
  "Audit finding",
  "Incident or corrective action",
  "Regulatory change",
] as const;

/* -------------------------------------------------------------- form types */

export const formFieldTypes = [
  "Text",
  "Long text",
  "Number",
  "Duration",
  "Checkbox",
  "Dropdown",
  "Date",
  "Section",
  "Quality metric",
] as const;

export const scheduleCadences = [
  "Daily",
  "Twice daily",
  "Weekly",
  "Twice weekly",
  "Monthly",
  "Specific dates",
  "As needed",
] as const;

/* --------------------------------------------------------------- spc facts */

export const spcCapabilities = [
  {
    icon: LineChart,
    title: "Control charts",
    description:
      "Turn any quality metric into a chart with its mean and calculated control limits.",
  },
  {
    icon: ShieldCheck,
    title: "Rule detection",
    description:
      "See Nelson and Western Electric rule violations on the exact points that triggered them.",
  },
  {
    icon: BarChart3,
    title: "Capability",
    description: "Follow Cp, Cpk, mean, and standard deviation as new records come in.",
  },
  {
    icon: Sparkles,
    title: "Clear explanations",
    description:
      "Get a plain-language read on stability, trends, and capability, plus a useful next step.",
  },
] as const;

/* -------------------------------------------------------------- team facts */

export const accessFacts = [
  {
    icon: Users,
    title: "Only editors need a seat",
    description:
      "Pay for the people who write and approve documents. Everyone who reads documents, fills forms, or suggests a change is free, with no limit.",
  },
  {
    icon: ShieldCheck,
    title: "Give people the right access",
    description:
      "Set access by role across documents, manuals, teams, departments, and settings. People see what they need without wading through what they do not.",
  },
  {
    icon: Table2,
    title: "Departments and job roles",
    description:
      "Organize manuals, documents, and form schedules by department and job role so each person gets the standards that apply to them.",
  },
] as const;

/* ------------------------------------------------------------------- steps */

export const steps = [
  {
    icon: Sparkles,
    title: "Draft",
    description:
      "Import an existing file or describe what you need. Contourna gives you a structured draft to work from.",
  },
  {
    icon: ClipboardCheck,
    title: "Review",
    description:
      "Let the people doing the work flag anything that is out of date. Reviewers can apply, edit, or reject each suggestion in context.",
  },
  {
    icon: History,
    title: "Publish",
    description:
      "Approve the document and make it live. Employees always see the current version, while older revisions and the reason for each change stay on record.",
  },
  {
    icon: ListChecks,
    title: "Record",
    description:
      "Assign the matching form on a schedule. Each submission stays tied to the document and feeds the metrics you track.",
  },
] as const;

/* ----------------------------------------------------------------- pricing */

/**
 * Mirrors the Stripe CAD catalog v1 in `contourna-backend`
 * (`scripts/stripe-setup.sh`): 199 / 399 monthly, 20% off annual, 39 per extra
 * editor seat, 3 seats included, 14-day trial.
 */
export const TRIAL_DAYS = 14;
export const INCLUDED_EDITOR_SEATS = 3;
export const EXTRA_SEAT_MONTHLY = 39;
export const ANNUAL_DISCOUNT_PERCENT = 20;

export const plans = [
  {
    name: "Generate",
    monthly: 199,
    annualMonthly: 159,
    description: "For teams that need one place to write, organize, review, and control their documents.",
    features: [
      "Policies, procedures, work instructions, training",
      "Manuals that keep every document in the right order",
      "AI drafting, rewriting, and dictation",
      "Import from files, Notion, and Google Drive",
      "Suggestions, scheduled reviews, and revision history",
      `${INCLUDED_EDITOR_SEATS} editor seats and unlimited free readers`,
    ],
    highlight: false,
  },
  {
    name: "Control",
    monthly: 399,
    annualMonthly: 319,
    description: "For teams that also need forms, records, and quality data to show the process is working.",
    features: [
      "Everything in Generate",
      "AI-assisted form builder",
      "Form assignments and schedules",
      "Records kept with the document they support",
      "SPC charts with Nelson and Western Electric rules",
      "Cp, Cpk, and clear SPC insights",
    ],
    highlight: true,
  },
] as const;

/* --------------------------------------------------------------------- faq */

export const faqs = [
  {
    question: "Does Contourna certify us to ISO 9001?",
    answer:
      "No. Certification comes from your auditor. Contourna helps you put the pieces auditors look for in place: controlled documents with owners, scheduled reviews, a complete revision history, and records tied to the right procedure.",
  },
  {
    question: "Who needs a paid seat?",
    answer:
      `Only the people who write and approve documents need a paid seat. Every plan includes ${INCLUDED_EDITOR_SEATS} editor seats, and extra seats are $${EXTRA_SEAT_MONTHLY} CAD per month. Everyone else can read published documents, fill forms, and suggest changes for free.`,
  },
  {
    question: "Can we bring the documents we already have?",
    answer:
      "Yes. Upload Word or PDF files individually or in a batch, or import from Notion and Google Drive. Contourna can then suggest a manual structure for everything you brought in, saving you from sorting each file by hand.",
  },
  {
    question: "Does the AI publish anything on its own?",
    answer:
      "No. AI output starts as a draft or a tracked suggestion on a specific section. A person decides what to keep and approves the document before it is published.",
  },
  {
    question: "How does the free trial work?",
    answer:
      `Choose a plan to start your ${TRIAL_DAYS}-day trial. You will enter a card, but you will not be charged until the trial ends. You can cancel from the billing portal at any time before then.`,
  },
  {
    question: "Is the playground connected to my account?",
    answer:
      "No. The playground uses the same document assistant as Contourna, but your draft only lives in the current browser tab. It is never saved to a Contourna account, so please do not enter confidential information.",
  },
] as const;

/* ------------------------------------------------------------ misc exports */

export const editorHighlights = [
  { icon: Bot, label: "Highlight a passage and ask for a rewrite" },
  { icon: Mic, label: "Dictate directly into any section" },
  { icon: Table2, label: "Tables, images, and diagrams" },
  { icon: Repeat, label: "Reusable document templates" },
  { icon: CalendarClock, label: "Section-by-section navigation" },
  { icon: CheckCircle2, label: "See every AI edit before accepting it" },
] as const;
