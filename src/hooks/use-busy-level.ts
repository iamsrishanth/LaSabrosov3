import { useSyncExternalStore } from "react";

type Level = "quiet" | "moderate" | "busy";

/**
 * Compute the busy level from the current IST hour.
 * Heuristic: quiet (morning/late), moderate (lunch/afternoon), busy (evening peak 6-9 PM).
 */
function computeLevel(): Level {
  if (typeof window === "undefined") return "quiet";
  const utcMs = Date.now() + new Date().getTimezoneOffset() * 60_000;
  const ist = new Date(utcMs + 5.5 * 3_600_000);
  const h = ist.getHours();
  // closed before 11 AM or after 11 PM → quiet
  if (h < 11 || h >= 23) return "quiet";
  // peak: 6 PM – 9 PM
  if (h >= 18 && h < 21) return "busy";
  // moderate: 12 PM – 3 PM (lunch), 4 PM – 6 PM
  if ((h >= 12 && h < 15) || (h >= 16 && h < 18)) return "moderate";
  return "quiet";
}

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 5 * 60_000);
  return () => clearInterval(t);
};

export const LEVELS: Record<Level, { label: string; color: string; bars: number }> = {
  quiet: { label: "Quiet", color: "text-forest", bars: 1 },
  moderate: { label: "Moderate", color: "text-gold", bars: 2 },
  busy: { label: "Busy", color: "text-terracotta-deep", bars: 3 },
};

/** Live busy-level indicator via useSyncExternalStore (no set-state-in-effect). */
export function useBusyLevel(): Level {
  return useSyncExternalStore(subscribe, computeLevel, () => "quiet" as Level);
}
