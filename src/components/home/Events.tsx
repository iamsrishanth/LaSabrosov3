"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { Briefcase, Cake, MusicNotes, ArrowRight, Gift } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { brand, events } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media";

const ICONS = { Briefcase, Cake, MusicNotes } as const;

/** Count-up that respects reduced motion (instant final value). */
function CountUp({
  to,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = usePrefersReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref}>
      {reduce ? to : val}
      {suffix}
    </span>
  );
}

/** Events — discount counter + perks grid. */
export function Events() {
  return (
    <Section id="events" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 space-y-3">
        <SectionEyebrow>Events & catering</SectionEyebrow>
        <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
          Host it where the glow is
        </h2>
      </div>

      {/* discount counter band */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-forest/12 bg-gradient-to-br from-forest to-forest-deep p-8 text-cream sm:p-12">
          <div className="events-aurora pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                {brand.franchiseModel} friendly
              </p>
              <p className="font-display text-3xl italic text-cream sm:text-4xl lg:text-5xl">
                Up to <CountUp to={35} suffix="%" /> off on bulk events
              </p>
              <p className="text-sm text-cream/70">
                Corporate offsites, birthdays, team dinners. 20+ guests.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-1 rounded-2xl bg-cream/10 px-6 py-4 backdrop-blur-sm">
              <span className="font-display text-4xl font-bold text-gold">
                <CountUp to={150} suffix="+" />
              </span>
              <span className="text-[11px] uppercase tracking-wide text-cream/70">
                events hosted
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* perks grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {events.map((e, i) => {
          const Icon = ICONS[e.icon];
          return (
            <Reveal key={e.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col gap-4 rounded-3xl border border-forest/10 bg-white p-6 shadow-[0_12px_30px_-22px_rgba(22,101,52,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(22,101,52,0.5)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint/50 text-forest-deep">
                    <Icon size={24} weight="duotone" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-bold text-forest-deep">
                    <Gift size={12} weight="fill" /> {e.perk}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-forest">{e.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{e.desc}</p>
                <a
                  href={brand.reserveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-forest transition-colors hover:text-terracotta-deep"
                >
                  Enquire <ArrowRight size={14} weight="bold" />
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
