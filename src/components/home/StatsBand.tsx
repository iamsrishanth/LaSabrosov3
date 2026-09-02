"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { BowlFood, ForkKnife, Star, CalendarHeart } from "@phosphor-icons/react";
import { Section } from "@/components/site/section";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { menu, categories } from "@/data/menu";

/** Animated stats band — count-up stats with icons. Sits between BrandStory and NeonSign. */
export function StatsBand() {
  const stats = [
    {
      icon: BowlFood,
      value: menu.length,
      suffix: "",
      label: "Dishes on the menu",
    },
    {
      icon: ForkKnife,
      value: categories.length,
      suffix: "",
      label: "Categories crafted",
    },
    {
      icon: Star,
      value: 4.3,
      suffix: "★",
      label: "Zomato rating",
      decimals: 1,
    },
    {
      icon: CalendarHeart,
      value: 11,
      suffix: "–11",
      label: "Daily hours",
      noCount: true,
    },
  ];

  return (
    <Section className="py-12 sm:py-16">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-3xl border border-forest/12 bg-gradient-to-b from-cream-soft to-cream p-5 text-center shadow-[0_10px_30px_-22px_rgba(22,101,52,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(22,101,52,0.45)] sm:p-6"
          >
            {/* corner accent */}
            <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-forest/5 transition-transform duration-500 group-hover:scale-150" />
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-cream">
              <s.icon size={24} weight="duotone" />
            </span>
            <p className="relative font-display text-3xl font-bold text-forest sm:text-4xl">
              {s.noCount ? (
                <>
                  {s.value}
                  <span className="text-terracotta-deep">{s.suffix}</span>
                </>
              ) : (
                <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              )}
            </p>
            <p className="relative text-[11px] font-semibold uppercase tracking-wide text-muted sm:text-xs">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = usePrefersReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  if (reduce) {
    return (
      <span ref={ref}>
        {to.toFixed(decimals)}
        {suffix}
      </span>
    );
  }
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
