import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { PlaygroundExperience } from "../PlaygroundExperience";
import { PLAYGROUND_SESSION_KEY } from "@/features/playground/storage";

// Emulate Next's documented History API integration. Production router behavior
// is covered separately by scripts/check-playground-navigation.mjs.
vi.mock("next/navigation", async () => {
  const { useSyncExternalStore } = await import("react");
  const subscribe = (listener: () => void) => {
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  };
  return {
    usePathname: () => "/playground",
    useSearchParams: () => new URLSearchParams(useSyncExternalStore(subscribe, () => window.location.search)),
  };
});

vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
    <button type="button" onClick={() => onSuccess("verified-test-token")}>Verify</button>
  ),
}));

beforeEach(() => {
  sessionStorage.clear();
  window.history.replaceState(null, "", "/playground?step=choose");
  for (const method of ["pushState", "replaceState"] as const) {
    const original = window.history[method].bind(window.history);
    vi.spyOn(window.history, method).mockImplementation((...args) => {
      original(...args);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 100 } as DOMRect);
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-site-key");
  vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.com/api");
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

async function goToReview() {
  render(<PlaygroundExperience />);
  fireEvent.click(await screen.findByRole("radio", { name: /^Policy / }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  expect(screen.getByRole("heading", { name: "Customize the example" })).toHaveFocus();
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "person@example.com" } });
}

test("requires verification and preserves inputs when generation fails so it can be retried", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ code: "GENERATION_FAILED", message: "Please try again." }),
  });
  vi.stubGlobal("fetch", fetchMock);
  await goToReview();
  expect(screen.getByRole("button", { name: "Generate document" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "Verify" }));
  fireEvent.click(screen.getByRole("button", { name: "Generate document" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Please try again.");
  expect(screen.getByLabelText(/Email/)).toHaveValue("person@example.com");
  expect(screen.getByRole("button", { name: "Generate document" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "Verify" }));
  fireEvent.click(screen.getByRole("button", { name: "Generate document" }));
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  expect(sessionStorage.getItem(PLAYGROUND_SESSION_KEY)).toBeNull();
});

test("sends the completed form and opens a successful draft for editing", async () => {
  const document = {
    name: "Generated safety policy",
    documentType: "Policy",
    department: "Safety",
    documentContent: '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
  };
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      success: true,
      document,
      quota: { remainingBrowser: 1, remainingEmail: 1, remainingIp: 4 },
    }),
  });
  vi.stubGlobal("fetch", fetchMock);
  await goToReview();
  fireEvent.click(screen.getByRole("button", { name: "Verify" }));
  fireEvent.click(screen.getByRole("button", { name: "Generate document" }));
  expect(await screen.findByLabelText("Document title")).toHaveValue(document.name);
  const request = fetchMock.mock.calls[0][1] as RequestInit;
  expect(JSON.parse(request.body as string)).toMatchObject({
    documentType: "Policy", email: "person@example.com", turnstileToken: "verified-test-token",
    name: "Workplace Health & Safety Policy",
  });
  expect(JSON.parse(sessionStorage.getItem(PLAYGROUND_SESSION_KEY)!)).toMatchObject({ document });
  fireEvent.change(screen.getByLabelText("Document title"), { target: { value: "Edited policy" } });
  expect(JSON.parse(sessionStorage.getItem(PLAYGROUND_SESSION_KEY)!)).toMatchObject({ document: { name: "Edited policy" } });
});

test("does not generate when the form is submitted from Details after going back", async () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  await goToReview();
  fireEvent.click(screen.getByRole("button", { name: "Verify" }));
  fireEvent.click(screen.getByRole("button", { name: "Back" }));
  fireEvent.submit(screen.getByLabelText(/Document title/).closest("form")!);
  expect(fetchMock).not.toHaveBeenCalled();
});
