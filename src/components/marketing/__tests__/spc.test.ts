import { describe, expect, it } from "vitest";

import { DEMO_LIMITS, DEMO_READINGS, detectViolations, driftReading, type Reading } from "../spc";

const readings = (values: number[]): Reading[] => values.map((value, index) => ({ id: index + 1, value }));

describe("detectViolations", () => {
  it("flags only the out-of-limit reading in the demo data", () => {
    const violations = detectViolations(DEMO_READINGS, DEMO_LIMITS);
    expect(violations).toHaveLength(1);
    expect(violations[0]).toMatchObject({ rule: 1, ids: [18] });
  });

  it("flags nine in a row on one side of the mean, and a point on the mean breaks the run", () => {
    const run = detectViolations(readings([12.5, 12.6, 12.7, 12.5, 12.8, 12.6, 12.5, 12.7, 12.6]), DEMO_LIMITS);
    expect(run.map((violation) => violation.rule)).toEqual([2]);

    const broken = detectViolations(readings([12.5, 12.6, 12.7, 12.5, 12.4, 12.8, 12.6, 12.5, 12.7]), DEMO_LIMITS);
    expect(broken).toEqual([]);
  });

  it("flags six steadily falling readings, and a repeat value breaks the trend", () => {
    const trend = detectViolations(readings([13.0, 12.8, 12.6, 12.3, 12.1, 11.9]), DEMO_LIMITS);
    expect(trend).toHaveLength(1);
    expect(trend[0]).toMatchObject({ rule: 3, ids: [1, 2, 3, 4, 5, 6] });

    expect(detectViolations(readings([13.0, 12.8, 12.8, 12.3, 12.1, 11.9]), DEMO_LIMITS)).toEqual([]);
  });

  it("a simulated drift run stays above the mean and ends beyond the upper limit", () => {
    for (let trial = 0; trial < 50; trial += 1) {
      const drift = Array.from({ length: 9 }, (_, index) => ({ id: 21 + index, value: driftReading(index + 1, 9) }));
      const window = [...DEMO_READINGS, ...drift].slice(-20);
      const violations = detectViolations(window, DEMO_LIMITS);
      expect(violations.map((violation) => violation.rule)).toContain(2);
      expect(violations.some((violation) => violation.rule === 1 && violation.ids.includes(29))).toBe(true);
      expect(drift.every((reading) => reading.value > DEMO_LIMITS.mean)).toBe(true);
    }
  });
});
