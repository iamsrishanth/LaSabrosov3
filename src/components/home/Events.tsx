"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { Briefcase, Cake, MusicNotes, ArrowRight, Gift, CalendarCheck } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { brand, events, eventsAtmosphere } from "@/data/brand";
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
  const [val, setVal] = useState(to);

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

/** Events — atmosphere image + discount counter + perks grid. */
export function Events() {
  const reduce = usePrefersReducedMotion();
  return (
    <Section id="events" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <SectionEyebrow>Events & catering</SectionEyebrow>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
            Host it where the glow is
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted">
          From 20-guest team dinners to full courtyard buyouts. Custom menus,
          live counters, and a dessert lab setup.
        </p>
      </div>

      {/* atmosphere + counter split */}
      <Reveal>
        <div className="grid gap-0 overflow-hidden rounded-3xl border border-forest/12 shadow-[0_20px_50px_-30px_rgba(22,101,52,0.5)] md:grid-cols-2">
          {/* atmosphere image */}
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={eventsAtmosphere.image}
              alt={eventsAtmosphere.caption}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent md:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <p className="font-display text-lg italic text-cream sm:text-xl">
                {eventsAtmosphere.caption}
              </p>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-cream/20 px-3 py-1 text-[11px] font-bold text-cream backdrop-blur-sm">
                <CalendarCheck size={13} weight="fill" /> Bookable now
              </span>
            </div>
          </div>

          {/* discount counter */}
          <div className="relative overflow-hidden bg-gradient-to-br from-forest to-forest-deep p-8 text-cream sm:p-10">
            <div className="events-aurora pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative z-10 flex h-full flex-col justify-center gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                {brand.franchiseModel} friendly
              </p>
              <p className="font-display text-3xl italic leading-tight text-cream sm:text-4xl lg:text-5xl">
                Up to <CountUp to={35} suffix="%" /> off on bulk events
              </p>
              <p className="text-sm text-cream/85">
                Corporate offsites, birthdays, team dinners. 20+ guests.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex flex-col items-center gap-1 rounded-2xl bg-cream/10 px-5 py-3 backdrop-blur-sm">
                  <span className="font-display text-3xl font-bold text-gold">
                    <CountUp to={150} suffix="+" />
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-cream/85">
                    events hosted
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-2xl bg-cream/10 px-5 py-3 backdrop-blur-sm">
                  <span className="font-display text-3xl font-bold text-gold">
                    <CountUp to={60} suffix="+" />
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-cream/85">
                    seats max
                  </span>
                </div>
              </div>
              <a
                href={brand.reserveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-forest-deep transition-transform hover:-translate-y-0.5"
              >
                Enquire about your event
                <ArrowRight size={15} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* perks grid */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {events.map((e, i) => {
          const Icon = ICONS[e.icon];
          return (
            <Reveal key={e.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col gap-4 rounded-3xl border border-forest/10 bg-white p-6 shadow-[0_12px_30px_-22px_rgba(22,101,52,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(22,101,52,0.5)]">
                <div className="flex items-center justify-between">
                  <motion.span
                    whileHover={reduce ? undefined : { rotate: -6, scale: 1.08 }}
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-mint/50 text-forest-deep"
                  >
                    <Icon size={24} weight="duotone" />
                  </motion.span>
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
