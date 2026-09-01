"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Sparkle } from "@phosphor-icons/react";
import { getHappyHourStatus, formatCountdown } from "@/lib/hours";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/** Live happy-hour countdown — ticks every second, creates urgency. */
export function HappyHourCountdown({ className }: { className?: string }) {
  const [status, setStatus] = useState(() => getHappyHourStatus());
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const tick = () => setStatus(getHappyHourStatus());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-bold",
        status.active
          ? "border-forest/30 bg-mint/50 text-forest-deep"
          : "border-forest/15 bg-cream-soft text-muted",
        className
      )}
    >
      <motion.span
        animate={reduce || !status.active ? undefined : { scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {status.active ? (
          <Sparkle size={14} weight="fill" className="text-gold" />
        ) : (
          <Clock size={14} weight="duotone" />
        )}
      </motion.span>
      <span className="hidden sm:inline">{status.label}</span>
      <span className="text-muted/60">·</span>
      <span>{status.target}</span>
      <span className="tabular-nums font-extrabold tracking-tight text-forest">
        {formatCountdown(status.secondsLeft)}
      </span>
    </div>
  );
}
