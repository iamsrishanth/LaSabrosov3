"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Flame, Star } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/site/primitives";
import { menu, type Dish } from "@/data/menu";
import { brand } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media";

/**
 * Specialties — rich editorial bento layout (1 feature + 3 supporting cards),
 * real imagery, hover details overlay. Eliminates the visual void.
 */
export function Specialties() {
  const reduce = usePrefersReducedMotion();
  const picks: Dish[] = [
    menu.find((d) => d.id === "sig-2")!, // Chocolate Khoma
    menu.find((d) => d.id === "sig-3")!, // Truffle Mushroom Pizza
    menu.find((d) => d.id === "sig-1")!, // LaSabroso Special Momo
    menu.find((d) => d.id === "cof-2")!, // Spanish Latte
  ];

  return (
    <Section id="specialties" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <SectionEyebrow>Specialties</SectionEyebrow>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
            The plates Madhapur keeps coming back for
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Each signature is made to order at the counter, plated with intention.
        </p>
      </div>

      {/* bento grid: 1 feature (col-span-2) + 3 supporting */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((d, i) => {
          const feature = i === 0;
          return (
            <Reveal
              key={d.id}
              delay={i * 0.08}
              className={feature ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <article
                className={`group relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-[0_20px_50px_-30px_rgba(22,101,52,0.45)] transition-all duration-300 hover:shadow-[0_30px_60px_-25px_rgba(22,101,52,0.55)] ${
                  feature ? "lg:min-h-[560px]" : ""
                }`}
              >
                {/* image fills card */}
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes={feature ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />

                {/* top badges */}
                <div className="absolute left-4 top-4 flex gap-1.5">
                  <Badge variant="gold" className="shadow-md">
                    <Star size={11} weight="fill" /> Chef’s pick
                  </Badge>
                  {d.bestseller && (
                    <Badge variant="forest" className="shadow-md">
                      Bestseller
                    </Badge>
                  )}
                </div>

                {/* hover "view" overlay */}
                <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-forest-deep opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                  View <ArrowRight size={12} weight="bold" />
                </div>

                {/* bottom content over image */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-cream/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream backdrop-blur-sm">
                      {d.category}
                    </span>
                    {d.spicy && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/30 px-2 py-0.5 text-[10px] font-bold text-cream backdrop-blur-sm">
                        <Flame size={9} weight="fill" /> Spicy
                      </span>
                    )}
                  </div>
                  <h3 className={`font-bold text-cream drop-shadow-md ${feature ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
                    {d.name}
                  </h3>
                  <p className={`mt-1 text-cream/80 drop-shadow ${feature ? "text-sm sm:text-base" : "text-xs line-clamp-2"}`}>
                    {d.desc}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-display text-2xl font-bold text-gold drop-shadow">
                      ₹{d.price}
                    </span>
                    <motion.a
                      href={brand.reserveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={reduce ? undefined : { x: 4 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-1.5 text-xs font-bold text-forest-deep"
                    >
                      Order <ArrowRight size={11} weight="bold" />
                    </motion.a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
