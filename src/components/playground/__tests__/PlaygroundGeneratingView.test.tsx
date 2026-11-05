import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { PlaygroundGeneratingView } from "../PlaygroundGeneratingView";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

test("shows honest waiting information instead of reporting timed steps as complete", () => {
  vi.useFakeTimers();
  render(<PlaygroundGeneratingView />);
  expect(screen.getByRole("status")).toHaveTextContent("up to two minutes");
  act(() => vi.advanceTimersByTime(61_000));
  expect(screen.getByRole("status")).toHaveTextContent("still waiting for the AI response");
  expect(screen.getByText("61s elapsed")).toBeInTheDocument();
  expect(screen.queryByText("Saving document")).not.toBeInTheDocument();
});
