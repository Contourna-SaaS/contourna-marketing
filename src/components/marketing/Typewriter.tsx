"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "./hooks";

/**
 * Types each phrase, holds it, deletes it, moves on. Screen readers get the
 * full list once instead of a stream of partial words.
 */
export function Typewriter({ phrases }: { phrases: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const phrase = phrases[index];

  useEffect(() => {
    if (reducedMotion) return;
    const done = length === phrase.length;
    const delay = deleting ? 22 : done ? 1800 : 55;
    const timer = window.setTimeout(() => {
      if (!deleting && done) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((current) => (current + 1) % phrases.length);
      } else setLength((current) => current + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [length, deleting, phrase, phrases.length, reducedMotion]);

  return (
    <>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true">
        {reducedMotion ? phrase : phrase.slice(0, length)}
        <span className="caret ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-c-yellow" />
      </span>
    </>
  );
}
