export type PlaygroundDocumentType = "Policy" | "Procedure" | "WorkInstruction";

export interface PlaygroundQuestion {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

export interface PlaygroundForm {
  documentType: PlaygroundDocumentType | null;
  name: string;
  description: string;
  department: string;
  otherDepartment: string;
  organizationName: string;
  industry: string;
  answers: Record<string, string>;
}

export interface PlaygroundDocumentTypeOption {
  type: PlaygroundDocumentType;
  title: string;
  description: string;
  questions: PlaygroundQuestion[];
  sample: Omit<PlaygroundForm, "documentType">;
}

export interface PlaygroundQuota {
  remainingBrowser: number;
  remainingIp: number;
  resetAt: string;
}

export interface GeneratedPlaygroundDocument {
  name: string;
  documentType: PlaygroundDocumentType;
  department: string;
  documentContent: string;
}

export interface StoredPlaygroundDraft {
  version: 1;
  form: PlaygroundForm;
  document: GeneratedPlaygroundDocument;
  quota: PlaygroundQuota;
}
