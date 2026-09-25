/**
 * The small slice of SPC the home page chart demo needs: fixed control limits
 * and three Nelson rules. The product computes limits from real submissions;
 * here they are fixed so the chart stays readable while readings stream in.
 */

export interface Reading {
  id: number;
  value: number;
}

export interface Limits {
  mean: number;
  ucl: number;
  lcl: number;
}

export interface Violation {
  rule: 1 | 2 | 3;
  /** Reading ids that triggered it, so the chart can mark them. */
  ids: number[];
  title: string;
  detail: string;
}

export const DEMO_LIMITS: Limits = { mean: 12.4, ucl: 13.6, lcl: 11.2 };

/** Twenty roast durations (minutes); reading #18 breaks the upper limit. */
export const DEMO_READINGS: Reading[] = [
  12.2, 12.7, 12.1, 12.5, 12.8, 12.0, 12.3, 12.6, 11.8, 12.3, 12.6, 12.7, 12.2, 12.5, 12.9, 12.1, 12.5, 14.2,
  12.3, 12.6,
].map((value, index) => ({ id: index + 1, value }));

const RUN_LENGTH = 9;
const TREND_LENGTH = 6;

export function detectViolations(readings: Reading[], limits: Limits): Violation[] {
  const violations: Violation[] = [];

  // Rule 1: one point beyond a control limit.
  for (const reading of readings) {
    if (reading.value > limits.ucl || reading.value < limits.lcl) {
      const above = reading.value > limits.ucl;
      violations.push({
        rule: 1,
        ids: [reading.id],
        title: `One point beyond the ${above ? "upper" : "lower"} control limit`,
        detail: `Reading #${reading.id} at ${reading.value.toFixed(1)} min sits ${above ? "above the UCL" : "below the LCL"} of ${(above ? limits.ucl : limits.lcl).toFixed(1)} min.`,
      });
    }
  }

  // Rule 2: nine points in a row on one side of the mean. A point on the mean breaks the run.
  let run: Reading[] = [];
  let side = 0;
  const flushRun = () => {
    if (run.length >= RUN_LENGTH) {
      violations.push({
        rule: 2,
        ids: run.map((reading) => reading.id),
        title: `${run.length} readings in a row ${side > 0 ? "above" : "below"} the mean`,
        detail: "The process has likely shifted. Look for a change in material, equipment, or method.",
      });
    }
  };
  for (const reading of readings) {
    const current = Math.sign(reading.value - limits.mean);
    if (current !== 0 && current === side) {
      run.push(reading);
    } else {
      flushRun();
      run = current === 0 ? [] : [reading];
      side = current;
    }
  }
  flushRun();

  // Rule 3: six points in a row steadily rising or falling.
  let trend: Reading[] = readings.slice(0, 1);
  let direction = 0;
  const flushTrend = () => {
    if (trend.length >= TREND_LENGTH) {
      violations.push({
        rule: 3,
        ids: trend.map((reading) => reading.id),
        title: `${trend.length} readings in a row ${direction > 0 ? "rising" : "falling"}`,
        detail: "A steady trend often means wear or drift. Check the equipment before it crosses a limit.",
      });
    }
  };
  for (let index = 1; index < readings.length; index += 1) {
    const step = Math.sign(readings[index].value - readings[index - 1].value);
    if (step !== 0 && step === direction) {
      trend.push(readings[index]);
    } else {
      flushTrend();
      trend = step === 0 ? [readings[index]] : [readings[index - 1], readings[index]];
      direction = step;
    }
  }
  flushTrend();

  return violations;
}

/**
 * One reading of a simulated drift: step 1..total climbs steadily from just
 * above the mean until the last few readings break the upper control limit.
 * Every reading stays above the mean, so a full run also trips the
 * nine-in-a-row rule on the way up.
 */
export function driftReading(step: number, total: number, limits: Limits = DEMO_LIMITS, random: () => number = Math.random) {
  const start = limits.mean + 0.15;
  const end = limits.ucl + 0.45;
  const value = sampleReading(start + (end - start) * (step / total), 0.06, random);
  return Math.max(Math.round((limits.mean + 0.1) * 10) / 10, value);
}

/** Normal-ish reading via Box-Muller, rounded to one decimal like the form field. */
export function sampleReading(mean: number, sigma: number, random: () => number = Math.random): number {
  const u = 1 - random();
  const v = random();
  const gaussian = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round((mean + gaussian * sigma) * 10) / 10;
}
