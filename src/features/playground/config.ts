import type {
  PlaygroundDocumentType,
  PlaygroundDocumentTypeOption,
  PlaygroundForm,
} from "./types";

export const PLAYGROUND_DEPARTMENTS = [
  "Operations",
  "Quality",
  "Safety",
  "Cafes",
  "Human Resources",
  "Other",
] as const;

export const EMPTY_PLAYGROUND_FORM: PlaygroundForm = {
  documentType: null,
  name: "",
  description: "",
  department: "",
  otherDepartment: "",
  organizationName: "",
  industry: "",
  answers: {},
};

export const PLAYGROUND_DOCUMENT_TYPES: PlaygroundDocumentTypeOption[] = [
  {
    type: "Policy",
    title: "Policy",
    description: "Set clear expectations and principles for everyone in your organization.",
    questions: [
      {
        id: "scope",
        label: "Who does this policy apply to and what is its scope?",
        placeholder: "Describe the people, teams, or situations covered...",
        required: true,
      },
      {
        id: "principles",
        label: "What are the core principles or rules?",
        placeholder: "List the key principles, rules, or expectations...",
      },
      {
        id: "compliance",
        label: "Any compliance or regulatory references?",
        placeholder: "For example: ISO 9001, OSHA, or internal standards...",
      },
    ],
    sample: {
      name: "Workplace Health & Safety Policy",
      description: "Defines the organization's commitment to a safe, healthy environment for employees, contractors, and visitors.",
      department: "Safety",
      otherDepartment: "",
      organizationName: "",
      industry: "",
      answers: {
        scope: "All employees, contractors, temporary staff, and visitors across every location and worksite.",
        principles: "Safety is everyone's responsibility; hazards are reported immediately; PPE is mandatory where posted; incidents are investigated and documented.",
        compliance: "",
      },
    },
  },
  {
    type: "Procedure",
    title: "Procedure",
    description: "Lay out a repeatable process with clear steps and responsibilities.",
    questions: [
      {
        id: "process",
        label: "What process does this cover and when is it performed?",
        placeholder: "Describe the process and its trigger or frequency...",
        required: true,
      },
      {
        id: "steps",
        label: "Outline the main steps in order",
        placeholder: "List the steps from start to finish...",
      },
      {
        id: "roles",
        label: "Who is responsible for each step?",
        placeholder: "List the responsible roles or people...",
      },
    ],
    sample: {
      name: "New Employee Onboarding Procedure",
      description: "Standardizes how new hires are set up, trained, and integrated during their first two weeks.",
      department: "Human Resources",
      otherDepartment: "",
      organizationName: "",
      industry: "",
      answers: {
        process: "Onboarding from offer acceptance through the end of week two; performed each time a new employee joins.",
        steps: "1. Send the welcome pack and create accounts. 2. Run day-one orientation. 3. Assign an onboarding buddy. 4. Complete role training. 5. Hold a week-two check-in.",
        roles: "HR coordinates accounts and orientation; the hiring manager owns role training; the onboarding buddy supports day-to-day questions.",
      },
    },
  },
  {
    type: "WorkInstruction",
    title: "Work Instruction",
    description: "Show someone exactly how to complete a task safely and correctly.",
    questions: [
      {
        id: "task",
        label: "What specific task does this work instruction cover?",
        placeholder: "Describe the exact task or operation...",
        required: true,
      },
      {
        id: "tools",
        label: "What tools or equipment are required?",
        placeholder: "List tools, equipment, or materials...",
      },
      {
        id: "safety",
        label: "Are there any safety considerations or requirements?",
        placeholder: "Describe PPE, hazards, or safety protocols...",
      },
    ],
    sample: {
      name: "Keg Line Cleaning Work Instruction",
      description: "Explains how to clean and sanitize a keg line at the end of service to maintain product quality.",
      department: "Cafes",
      otherDepartment: "",
      organizationName: "",
      industry: "",
      answers: {
        task: "Flush, clean, and sanitize the draught keg line and couplers at the close of each service day.",
        tools: "Line cleaning solution, recirculating pump, brushes, bucket, nitrile gloves, and safety goggles.",
        safety: "Wear gloves and eye protection, ensure ventilation, never mix cleaning chemicals, and disconnect kegs before cleaning.",
      },
    },
  },
];

export function getPlaygroundDocumentType(
  documentType: PlaygroundDocumentType | null,
): PlaygroundDocumentTypeOption | undefined {
  return PLAYGROUND_DOCUMENT_TYPES.find((item) => item.type === documentType);
}
