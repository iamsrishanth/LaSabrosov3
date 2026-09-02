"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MagnifyingGlass as Search, X, Sparkle, Leaf, Flame, Plus, CaretDown, Check, Star } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { VegTag, Badge } from "@/components/site/primitives";
import dynamic from "next/dynamic";
import { categories, dishesByCategory, type DishCategory, type Dish, menu } from "@/data/menu";
import { useDishModal } from "@/components/home/DishModal";
import { useCart } from "@/lib/cart-store";
import { useCartWithToast } from "@/lib/use-cart-with-toast";
import { cn } from "@/lib/utils";

const DishModal = dynamic(
  () => import("@/components/home/DishModal").then((m) => m.DishModal),
  { ssr: false }
);

type SortKey = "default" | "price-asc" | "price-desc" | "chef";

const SORT_LABELS: Record<SortKey, string> = {
  default: "Default order",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  chef: "Chef's picks first",
};

/** Menu preview — La.Revi tabbed pattern. Default category SSR'd into HTML. */
export function MenuPreview() {
  const [active, setActive] = useState<DishCategory>("favourites");
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const { dish, setDish } = useDishModal();
  const searchRef = useRef<HTMLInputElement>(null);

  // keyboard shortcut: '/' focuses the search, Esc clears it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const base = query
    ? menu.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.desc.toLowerCase().includes(query.toLowerCase())
      )
    : dishesByCategory(active);
  const filteredRaw = vegOnly ? base.filter((d) => d.veg) : base;
  const filtered = maxPrice ? filteredRaw.filter((d) => d.price <= maxPrice) : filteredRaw;

  const dishes = useMemo(() => {
    const arr = [...filtered];
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    else if (sort === "chef")
      arr.sort((a, b) => (b.chefPick ? 1 : 0) - (a.chefPick ? 1 : 0));
    return arr;
  }, [filtered, sort]);

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
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes…  (press /)"
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
          {/* sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              aria-expanded={sortOpen}
              className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-forest/20 bg-cream-soft px-3.5 text-sm font-semibold text-muted transition-colors hover:text-forest"
            >
              <span className="hidden sm:inline">{SORT_LABELS[sort]}</span>
              <CaretDown size={14} weight="bold" className={cn("transition-transform", sortOpen && "rotate-180")} />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-forest/15 bg-white p-1 shadow-xl">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => {
                        setSort(k);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                        sort === k
                          ? "bg-forest text-cream"
                          : "text-ink hover:bg-forest/8"
                      )}
                    >
                      {SORT_LABELS[k]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
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
                    on ? "bg-forest-deep text-cream" : "bg-forest/10 text-forest"
                  }`}
                >
                  {dishesByCategory(c.id).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* price filter row */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-muted">Max price:</span>
        {[
          { label: "All", val: null },
          { label: "≤ ₹200", val: 200 },
          { label: "≤ ₹300", val: 300 },
          { label: "≤ ₹400", val: 400 },
        ].map((p) => {
          const on = maxPrice === p.val;
          return (
            <button
              key={p.label}
              onClick={() => setMaxPrice(p.val)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                on
                  ? "border-forest bg-forest text-cream"
                  : "border-forest/15 bg-cream-soft text-muted hover:text-forest"
              )}
              aria-pressed={on}
            >
              {p.label}
            </button>
          );
        })}
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
            <DishCard key={d.id} dish={d} onOpen={() => setDish(d)} />
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

      <DishModal dish={dish} onClose={() => setDish(null)} onSelectDish={setDish} />
    </Section>
  );
}

/** Dish card — clickable, opens quick-view modal. Hover reveals "View" button. */
function DishCard({ dish, onOpen }: { dish: Dish; onOpen: () => void }) {
  const { add } = useCartWithToast();
  const inCart = useCart((s) => s.has(dish.id));
  return (
    <motion.article
      layout
      className="group flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-[0_12px_30px_-20px_rgba(22,101,52,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(22,101,52,0.5)]"
    >
      <button onClick={onOpen} className="flex flex-1 flex-col text-left">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="food-img object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <VegTag veg={dish.veg} />
            {dish.chefPick && (
              <Badge variant="gold" className="shadow-sm">
                <Sparkle size={11} weight="fill" /> Chef’s pick
              </Badge>
            )}
          </div>
          {dish.bestseller && (
            <span className="absolute bottom-3 right-3 rounded-full bg-forest px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
              Bestseller
            </span>
          )}
          {/* hover "view" overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-forest-deep/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-forest-deep shadow-lg">
              <Plus size={12} weight="bold" /> View
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-base font-bold text-forest">{dish.name}</h3>
            {dish.spicy && (
              <span className="inline-flex items-center text-terracotta-deep" title="Spicy">
                <Flame size={13} weight="fill" />
              </span>
            )}
          </div>
          {/* rating row */}
          {dish.rating && (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5">
                <Star size={12} weight="fill" className="text-gold" />
                <span className="text-xs font-bold text-forest">{dish.rating.toFixed(1)}</span>
              </span>
              <span className="text-[10px] text-muted">({dish.reviews})</span>
            </div>
          )}
          <p className="line-clamp-2 text-xs leading-relaxed text-muted">
            {dish.desc}
          </p>
          <div className="mt-auto flex items-baseline pt-2">
            <span className="font-display text-lg font-semibold text-terracotta-deep">
              ₹{dish.price}
            </span>
            <span className="dotted-leader" aria-hidden />
            <span className="text-[11px] uppercase tracking-wide text-muted">
              {categories.find((c) => c.id === dish.category)?.label}
            </span>
          </div>
        </div>
      </button>
      {/* add-to-list button */}
      <div className="border-t border-forest/8 px-4 py-2.5">
        <button
          onClick={() =>
            add({
              id: dish.id,
              name: dish.name,
              price: dish.price,
              image: dish.image,
              veg: dish.veg,
            })
          }
          disabled={inCart}
          className={cn(
            "inline-flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all",
            inCart
              ? "bg-mint/50 text-forest-deep"
              : "bg-forest/8 text-forest hover:bg-forest hover:text-cream"
          )}
        >
          {inCart ? (
            <>
              <Check size={13} weight="bold" /> Added to list
            </>
          ) : (
            <>
              <Plus size={13} weight="bold" /> Add to list
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
