"use client";

import { useEffect } from "react";

/**
 * One delegated listener feeds the pointer position to whichever `.spotlight`
 * card is under it, so cards stay server components.
 */
export function SpotlightTracker() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const card = event.target instanceof Element ? event.target.closest(".spotlight") : null;
      if (!(card instanceof HTMLElement)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
