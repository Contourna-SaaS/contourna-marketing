import { beforeEach, describe, expect, test } from "vitest";

import { PLAYGROUND_SESSION_KEY, readStoredDraft, writeStoredDraft } from "../storage";
import type { StoredPlaygroundDraft } from "../types";

const draft: StoredPlaygroundDraft = {
  version: 1,
  form: {
    documentType: "Procedure",
    name: "Onboarding",
    description: "Onboard new team members.",
    department: "Human Resources",
    otherDepartment: "",
    organizationName: "",
    industry: "",
    answers: { process: "Every new hire" },
  },
  document: {
    name: "Onboarding",
    documentType: "Procedure",
    department: "Human Resources",
    documentContent: '{"root":{"children":[]}}',
  },
  quota: { remainingBrowser: 2, remainingIp: 3, resetAt: "2026-07-14T00:00:00.000Z" },
};

describe("playground draft storage", () => {
  beforeEach(() => window.sessionStorage.clear());

  test("round-trips a versioned draft", () => {
    writeStoredDraft(window.sessionStorage, draft);
    expect(readStoredDraft(window.sessionStorage)).toEqual(draft);
  });

  test("rejects malformed and incompatible drafts", () => {
    window.sessionStorage.setItem(PLAYGROUND_SESSION_KEY, JSON.stringify({ ...draft, version: 2 }));
    expect(readStoredDraft(window.sessionStorage)).toBeNull();
    window.sessionStorage.setItem(PLAYGROUND_SESSION_KEY, "not-json");
    expect(readStoredDraft(window.sessionStorage)).toBeNull();
  });

  test("removes the draft when starting over", () => {
    writeStoredDraft(window.sessionStorage, draft);
    writeStoredDraft(window.sessionStorage, null);
    expect(window.sessionStorage.getItem(PLAYGROUND_SESSION_KEY)).toBeNull();
  });
});
