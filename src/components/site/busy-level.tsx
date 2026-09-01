"use client";

import { motion } from "motion/react";
import { Users } from "@phosphor-icons/react";
import { useBusyLevel, LEVELS } from "@/hooks/use-busy-level";

/**
 * Live busy-level indicator — estimates café busy-ness from IST hour.
 * Re-evaluates every 5 min. SSR-safe.
 */
export function BusyLevel() {
  const level = useBusyLevel();
  const cfg = LEVELS[level];

  return (
    <span
      className="hidden items-center gap-1.5 rounded-full border border-forest/15 bg-cream-soft px-2.5 py-1 text-[11px] font-bold lg:inline-flex"
      title={`Café is ${cfg.label.toLowerCase()} right now`}
    >
      <Users size={12} weight="duotone" className={cfg.color} />
      <span className="hidden xl:inline text-muted">Busy:</span>
      <span className={cfg.color}>{cfg.label}</span>
      {/* signal bars */}
      <span className="flex items-end gap-0.5" aria-hidden>
        {[1, 2, 3].map((n) => (
          <motion.span
            key={n}
            initial={false}
            animate={{ opacity: n <= cfg.bars ? 1 : 0.2 }}
            className={`block w-1 rounded-sm ${cfg.color} ${
              n === 1 ? "h-2" : n === 2 ? "h-2.5" : "h-3"
            }`}
            style={{ backgroundColor: "currentColor" }}
          />
        ))}
      </span>
    </span>
  );
}
