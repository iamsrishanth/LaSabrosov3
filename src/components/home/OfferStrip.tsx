"use client";

import { Tag, Percent } from "@phosphor-icons/react";
import { offers } from "@/data/brand";
import { HappyHourCountdown } from "@/components/site/happy-hour";

/** Offer strip — cream band, dashed forest border, pill chips + happy-hour countdown. */
export function OfferStrip() {
  return (
    <section className="border-y border-dashed border-forest/30 bg-cream-soft">
      <div className="container-edge flex flex-wrap items-center justify-center gap-3 py-4 sm:gap-4">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-forest">
          <Percent size={16} weight="duotone" />
          Today’s specials
        </span>
        {offers.map((o) => (
          <span
            key={o.label}
            className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-cream px-4 py-1.5 text-sm font-semibold text-forest shadow-[0_4px_12px_-6px_rgba(22,101,52,0.4)]"
          >
            <Tag size={14} weight="duotone" className="text-terracotta-deep" />
            {o.label}
            <span className="text-muted">· {o.note}</span>
          </span>
        ))}
        {/* live happy-hour countdown */}
        <HappyHourCountdown />
      </div>
    </section>
  );
}
