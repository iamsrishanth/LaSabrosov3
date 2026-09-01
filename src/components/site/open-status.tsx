"use client";

import { useSyncExternalStore, useEffect, useState } from "react";
import { Clock } from "@phosphor-icons/react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

/** Live "Open now" status pill. Re-checks every 60s. */
export function OpenStatusPill() {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  // SSR-safe: render a neutral placeholder until mounted.
  if (!status) {
    return (
      <span className="hidden items-center gap-1.5 rounded-full border border-forest/20 bg-cream-soft px-2.5 py-1 text-[11px] font-bold text-muted md:inline-flex">
        <Clock size={12} weight="duotone" />
        <span>11–11 daily</span>
      </span>
    );
  }

  return (
    <span
      className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold md:inline-flex ${
        status.open
          ? "border-forest/25 bg-mint/50 text-forest-deep"
          : "border-terracotta/30 bg-terracotta/10 text-terracotta-deep"
      }`}
      title={status.detail}
    >
      <span className="relative flex h-2 w-2">
        {status.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            status.open ? "bg-forest" : "bg-terracotta-deep"
          }`}
        />
      </span>
      {status.label}
    </span>
  );
}
