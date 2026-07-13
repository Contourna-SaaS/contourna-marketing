import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { generatePlaygroundDocument, getPlaygroundApiBaseUrl, PlaygroundApiError } from "../api";
import type { PlaygroundForm } from "../types";

const form: PlaygroundForm = {
  documentType: "Policy",
  name: "Safety Policy",
  description: "Keep everyone safe.",
  department: "Safety",
  otherDepartment: "",
  organizationName: "Contourna",
  industry: "Software",
  answers: { scope: "Everyone" },
};

describe("playground API", () => {
  beforeEach(() => vi.stubEnv("NEXT_PUBLIC_API_URL", "https://backend.example/api/"));

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  test("normalizes the configured API origin", () => {
    expect(getPlaygroundApiBaseUrl()).toBe("https://backend.example/api");
  });

  test("sends the public generation contract with credentials", async () => {
    const payload = {
      success: true as const,
      document: {
        name: "Safety Policy",
        documentType: "Policy" as const,
        department: "Safety",
        documentContent: '{"root":{"children":[]}}',
      },
      quota: { remainingBrowser: 2, remainingIp: 4, resetAt: "2026-07-14T00:00:00.000Z" },
    };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => payload });
    vi.stubGlobal("fetch", fetchMock);

    await expect(generatePlaygroundDocument(form, "token")).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://backend.example/api/playground/generate-document",
      expect.objectContaining({ method: "POST", credentials: "include" }),
    );
    const request = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(request.body as string)).toEqual({
      turnstileToken: "token",
      documentType: "Policy",
      name: "Safety Policy",
      description: "Keep everyone safe.",
      department: "Safety",
      organizationName: "Contourna",
      industry: "Software",
      answers: { scope: "Everyone" },
    });
  });

  test("preserves the backend error contract", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          success: false,
          code: "QUOTA_EXCEEDED",
          message: "Daily limit reached.",
          retryAfterSeconds: 60,
        }),
      }),
    );

    await expect(generatePlaygroundDocument(form, "token")).rejects.toEqual(
      expect.objectContaining<Partial<PlaygroundApiError>>({
        code: "QUOTA_EXCEEDED",
        message: "Daily limit reached.",
        retryAfterSeconds: 60,
      }),
    );
  });
});
