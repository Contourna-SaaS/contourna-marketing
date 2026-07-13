import type { GeneratedPlaygroundDocument, PlaygroundForm, PlaygroundQuota } from "./types";

export interface PlaygroundSuccessResponse {
  success: true;
  document: GeneratedPlaygroundDocument;
  quota: PlaygroundQuota;
}

interface PlaygroundFailureResponse {
  success: false;
  code: string;
  message: string;
  retryAfterSeconds?: number;
}

export class PlaygroundApiError extends Error {
  readonly code: string;
  readonly retryAfterSeconds?: number;

  constructor(message: string, code: string, retryAfterSeconds?: number) {
    super(message);
    this.name = "PlaygroundApiError";
    this.code = code;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export function getPlaygroundApiBaseUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:4000/api";
  throw new PlaygroundApiError("The playground is temporarily unavailable.", "PLAYGROUND_UNAVAILABLE");
}

function isSuccessResponse(value: unknown): value is PlaygroundSuccessResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Partial<PlaygroundSuccessResponse>;
  return (
    response.success === true &&
    typeof response.document?.name === "string" &&
    typeof response.document?.documentContent === "string" &&
    typeof response.quota?.remainingBrowser === "number" &&
    typeof response.quota?.remainingIp === "number"
  );
}

export async function generatePlaygroundDocument(
  form: PlaygroundForm,
  turnstileToken: string,
): Promise<PlaygroundSuccessResponse> {
  const response = await fetch(`${getPlaygroundApiBaseUrl()}/playground/generate-document`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      turnstileToken,
      documentType: form.documentType,
      name: form.name,
      description: form.description,
      department: form.department,
      ...(form.department === "Other" ? { otherDepartment: form.otherDepartment } : {}),
      organizationName: form.organizationName,
      industry: form.industry,
      answers: form.answers,
    }),
  });

  const payload: unknown = await response.json().catch(() => null);
  if (response.ok && isSuccessResponse(payload)) return payload;

  const failure = (payload || {}) as Partial<PlaygroundFailureResponse>;
  throw new PlaygroundApiError(
    failure.message || "Unable to generate a document right now.",
    failure.code || "GENERATION_FAILED",
    failure.retryAfterSeconds,
  );
}
