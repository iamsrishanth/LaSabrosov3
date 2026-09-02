"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ArrowLeft, ArrowRight, Quotes as Quote } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { testimonials } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/** Testimonials — carousel island. Slide 1 SSR'd (renders on first paint). */
export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const reduce = usePrefersReducedMotion();

  const go = useCallback(
    (dir: number) => setIdx((p) => (p + dir + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [reduce]);

  const active = testimonials[idx];

  return (
    <Section className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 space-y-3 text-center">
        <div className="flex justify-center">
          <SectionEyebrow>Guest love</SectionEyebrow>
        </div>
        <h2 className="mx-auto max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
          What Madhapur is saying
        </h2>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-forest/12 bg-gradient-to-b from-cream-soft to-white p-8 shadow-[0_30px_60px_-35px_rgba(22,101,52,0.45)] sm:p-12">
          <Quote
            size={96}
            weight="fill"
            className="absolute -right-3 -top-3 text-forest/8"
          />
          {/* decorative top accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-forest/30 to-transparent" />

          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex gap-1" role="img" aria-label={`${active.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      weight="fill"
                      className={i < active.rating ? "text-gold" : "text-forest/15"}
                    />
                  ))}
                </div>
                <blockquote className="font-display text-xl italic leading-relaxed text-forest sm:text-2xl">
                  “{active.quote}”
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-bold text-forest">{active.name}</p>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {active.role}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  aria-selected={i === idx}
                  role="tab"
                  className="flex h-8 min-w-[28px] items-center justify-center p-1"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === idx ? "w-7 bg-forest" : "w-2 bg-forest/20 hover:bg-forest/35"
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-cream"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-cream"
              >
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
