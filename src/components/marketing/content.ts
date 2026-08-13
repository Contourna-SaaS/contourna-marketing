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
    title: "Author with AI",
    description:
      "Generate policies, procedures, work instructions, and training documents from a short brief — or rewrite a passage you highlight, with the surrounding context included.",
    tags: ["Guided drafting", "Inline rewrites", "Dictation"],
    className: "bg-c-brown",
    iconClassName: "bg-c-yellow text-c-brown",
    titleClassName: "text-white",
    bodyClassName: "text-white/70",
  },
  {
    icon: ClipboardCheck,
    title: "Keep it controlled",
    description:
      "Draft, in review, published. Revision history, scheduled review cycles, and a recorded reason for every change your quality program has to defend.",
    tags: ["Approvals", "Version history", "Review cycles"],
    className: "bg-c-yellow",
    iconClassName: "bg-c-brown text-c-yellow",
    titleClassName: "text-c-brown",
    bodyClassName: "text-c-brown/80",
  },
  {
    icon: LineChart,
    title: "Prove it works",
    description:
      "Publish the forms that go with a procedure, collect records against it on a schedule, and watch the quality metrics you track for signs of drift.",
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
    description: "Defines what will be done — stated once, sets the direction.",
  },
  {
    level: "Level 2",
    title: "Procedures",
    role: "Who · When · Where",
    description: "Assigns responsibilities, timing, and locations for carrying out the policy.",
  },
  {
    level: "Level 3",
    title: "Work instructions",
    role: "How",
    description: "Step-by-step guidance for completing specific tasks and activities.",
  },
  {
    level: "Level 4",
    title: "Forms & proofs",
    role: "Evidence",
    description: "Forms and templates that capture proof of compliance and activity.",
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
      "Creates a Contourna document you can edit. Formatting may shift, and an AI rewrite is optional.",
  },
  {
    title: "Upload original",
    description: "Keeps the file exactly as uploaded, for when the original layout matters most.",
  },
] as const;

/* --------------------------------------------------------- review cadence */

export const reviewCadences = ["Monthly", "Quarterly", "Semi-annual", "Annual"] as const;

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
      "Every quality-metric field you track gets a chart with a mean and calculated control limits.",
  },
  {
    icon: ShieldCheck,
    title: "Rule detection",
    description:
      "Nelson and Western Electric rule violations are flagged on the points that triggered them.",
  },
  {
    icon: BarChart3,
    title: "Capability",
    description: "Cp and Cpk alongside mean and standard deviation, recalculated as records arrive.",
  },
  {
    icon: Sparkles,
    title: "Plain-language insights",
    description:
      "Stability, trend, and capability findings written out with a recommended next step.",
  },
] as const;

/* -------------------------------------------------------------- team facts */

export const accessFacts = [
  {
    icon: Users,
    title: "Only editors need a seat",
    description:
      "Admins who author and approve documents use a seat. Everyone who fills forms, raises suggestions, and reads the current version is free — with no cap.",
  },
  {
    icon: ShieldCheck,
    title: "Permissions by role",
    description:
      "Document, manual, team, department, and settings access is granted per role, so the front line sees what it needs and nothing else.",
  },
  {
    icon: Table2,
    title: "Departments and job roles",
    description:
      "Group documents, manuals, and form schedules by department and job role so the right standard reaches the right people.",
  },
] as const;

/* ------------------------------------------------------------------- steps */

export const steps = [
  {
    icon: Sparkles,
    title: "Draft",
    description:
      "Import what you already have, or describe the document you need. The assistant returns a structured draft with the sections your quality program expects.",
  },
  {
    icon: ClipboardCheck,
    title: "Review",
    description:
      "Anyone doing the work can flag a document as out of date. Reviewers see the suggestion against the exact section it affects, then apply, edit, or reject it.",
  },
  {
    icon: History,
    title: "Publish",
    description:
      "Approve to publish. Employees always open the current version, and the revision that replaced it stays in the history with its reason attached.",
  },
  {
    icon: ListChecks,
    title: "Prove",
    description:
      "Assign the matching form on a schedule. Submissions land against the document that governs them and feed the metrics you track.",
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
    description: "Author and control the whole document side of your quality system.",
    features: [
      "Policies, procedures, work instructions, training",
      "Manuals with an ordered document hierarchy",
      "AI drafting, rewriting, and voice dictation",
      "File, Notion, and Google Drive import",
      "Suggestions, review cycles, and revision history",
      `${INCLUDED_EDITOR_SEATS} editor seats · unlimited free viewers`,
    ],
    highlight: false,
  },
  {
    name: "Control",
    monthly: 399,
    annualMonthly: 319,
    description: "Everything in Generate, plus the records and quality data that prove it.",
    features: [
      "Everything in Generate",
      "Form builder with an AI assistant",
      "Scheduled and assigned form submissions",
      "Records tied to the document they prove",
      "Control charts with Nelson and Western Electric rules",
      "Cp / Cpk capability and written SPC insights",
    ],
    highlight: true,
  },
] as const;

/* --------------------------------------------------------------------- faq */

export const faqs = [
  {
    question: "Does Contourna certify us to ISO 9001?",
    answer:
      "No — certification comes from your auditor. Contourna gives you the structure auditors look for: controlled documents with owners, revision history with a recorded reason, scheduled review cycles, and records tied to the procedure they prove.",
  },
  {
    question: "Who needs a paid seat?",
    answer:
      `Only the people who author and approve documents. Every plan includes ${INCLUDED_EDITOR_SEATS} editor seats, and extra seats are $${EXTRA_SEAT_MONTHLY} CAD per month. Employees who fill forms, raise suggestions, and read published documents are free, with no limit on how many you add.`,
  },
  {
    question: "Can we bring the documents we already have?",
    answer:
      "Yes. Upload Word or PDF files one at a time or in a batch, or connect Notion and Google Drive and import from there. After an import, Contourna suggests how to group what came in into manuals so you are not filing hundreds of files by hand.",
  },
  {
    question: "Does the AI publish anything on its own?",
    answer:
      "No. AI output arrives as a draft or a tracked suggestion against a specific section. A person applies or discards each change, and a person approves the document before it publishes.",
  },
  {
    question: "How does the free trial work?",
    answer:
      `You pick a plan and start a ${TRIAL_DAYS}-day trial at checkout. A card is collected up front, nothing is charged until the trial ends, and you can cancel from the billing portal at any point before then.`,
  },
  {
    question: "Is the playground connected to my account?",
    answer:
      "No. The playground generates a real document with the same assistant the product uses, but the draft lives in your browser tab and is never saved to a Contourna account. Do not put confidential information into it.",
  },
] as const;

/* ------------------------------------------------------------ misc exports */

export const editorHighlights = [
  { icon: Bot, label: "Highlight text and ask for a rewrite" },
  { icon: Mic, label: "Dictate straight into a section" },
  { icon: Table2, label: "Tables, images, and diagrams" },
  { icon: Repeat, label: "Reusable document templates" },
  { icon: CalendarClock, label: "Section-by-section navigation" },
  { icon: CheckCircle2, label: "Every AI edit shown as a diff" },
] as const;
