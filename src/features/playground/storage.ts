import type { StoredPlaygroundDraft } from "./types";

export const PLAYGROUND_SESSION_KEY = "contourna:playground-draft:v1";

export function isStoredPlaygroundDraft(value: unknown): value is StoredPlaygroundDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Partial<StoredPlaygroundDraft>;
  return (
    draft.version === 1 &&
    typeof draft.form?.name === "string" &&
    typeof draft.document?.name === "string" &&
    typeof draft.document?.documentContent === "string" &&
    draft.document.documentContent.length > 0 &&
    typeof draft.quota?.remainingBrowser === "number" &&
    typeof draft.quota?.remainingIp === "number"
  );
}

export function readStoredDraft(storage: Storage): StoredPlaygroundDraft | null {
  try {
    const value = storage.getItem(PLAYGROUND_SESSION_KEY);
    if (!value) return null;
    const parsed: unknown = JSON.parse(value);
    return isStoredPlaygroundDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeStoredDraft(storage: Storage, draft: StoredPlaygroundDraft | null): void {
  try {
    if (draft) storage.setItem(PLAYGROUND_SESSION_KEY, JSON.stringify(draft));
    else storage.removeItem(PLAYGROUND_SESSION_KEY);
  } catch {
    // The in-memory draft remains available when browser storage is blocked.
  }
}
