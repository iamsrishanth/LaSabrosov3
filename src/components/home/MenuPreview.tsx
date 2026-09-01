"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MagnifyingGlass as Search, X, Sparkle, Leaf } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { VegTag, Badge } from "@/components/site/primitives";
import { categories, dishesByCategory, type DishCategory, menu } from "@/data/menu";
import { cn } from "@/lib/utils";

/** Menu preview — La.Revi tabbed pattern. Default category SSR'd into HTML. */
export function MenuPreview() {
  const [active, setActive] = useState<DishCategory>("signature");
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const base = query
    ? menu.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.desc.toLowerCase().includes(query.toLowerCase())
      )
    : dishesByCategory(active);
  const dishes = vegOnly ? base.filter((d) => d.veg) : base;

  return (
    <Section id="menu" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <SectionEyebrow>The menu</SectionEyebrow>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
            From the counter, made to order
          </h2>
        </div>
        {/* search + veg toggle */}
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes…"
              aria-label="Search dishes"
              className="h-11 w-full rounded-full border border-forest/20 bg-cream-soft pl-9 pr-9 text-sm text-ink placeholder:text-muted focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-forest"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setVegOnly((v) => !v)}
            aria-pressed={vegOnly}
            aria-label="Toggle veg-only filter"
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors",
              vegOnly
                ? "border-forest bg-mint/60 text-forest-deep"
                : "border-forest/20 bg-cream-soft text-muted hover:text-forest"
            )}
          >
            <Leaf size={15} weight="fill" />
            <span className="hidden sm:inline">Veg</span>
          </button>
        </div>
      </div>

      {/* sticky category pills */}
      <div className="sticky top-[60px] z-30 -mx-5 mb-8 bg-cream/90 px-5 py-3 backdrop-blur-md sm:top-[68px] sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => {
            const on = !query && active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setQuery("");
                  setActive(c.id);
                }}
                className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  on
                    ? "border-forest bg-forest text-cream shadow-[0_8px_20px_-8px_rgba(22,101,52,0.6)]"
                    : "border-forest/20 bg-cream text-forest hover:bg-forest/8"
                }`}
                aria-pressed={on}
              >
                <span className="text-base leading-none">{c.emoji}</span>
                {c.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    on ? "bg-cream/20 text-cream" : "bg-forest/10 text-forest"
                  }`}
                >
                  {dishesByCategory(c.id).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* dish grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={query ? `search-${query}` : active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {dishes.map((d) => (
            <motion.article
              layout
              key={d.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-[0_12px_30px_-20px_rgba(22,101,52,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(22,101,52,0.5)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex gap-1.5">
                  <VegTag veg={d.veg} />
                  {d.chefPick && (
                    <Badge variant="gold" className="shadow-sm">
                      <Sparkle size={11} weight="fill" /> Chef’s pick
                    </Badge>
                  )}
                </div>
                {d.bestseller && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-forest px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                    Bestseller
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-base font-bold text-forest">{d.name}</h3>
                  {d.spicy && <span className="text-xs" title="Spicy">🌶</span>}
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted">
                  {d.desc}
                </p>
                <div className="mt-auto flex items-baseline pt-2">
                  <span className="font-display text-lg font-semibold text-terracotta-deep">
                    ₹{d.price}
                  </span>
                  <span className="dotted-leader" aria-hidden />
                  <span className="text-[11px] uppercase tracking-wide text-muted">
                    {categories.find((c) => c.id === d.category)?.label}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* empty state */}
      {dishes.length === 0 && (
        <div className="rounded-2xl border border-dashed border-forest/25 bg-cream-soft p-10 text-center">
          <p className="font-display text-xl italic text-forest">
            No dishes match “{query}”.
          </p>
          <p className="mt-1 text-sm text-muted">
            Try a different keyword, or browse a category.
          </p>
        </div>
      )}
    </Section>
  );
}
