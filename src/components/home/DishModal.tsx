"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { InstagramLogo as Instagram, Flame, Star, X, Plus, Check } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { VegTag, Badge } from "@/components/site/primitives";
import { brand } from "@/data/brand";
import { categories, ALLERGEN_LABELS, type Dish } from "@/data/menu";
import { useCart } from "@/lib/cart-store";
import { Timer } from "@phosphor-icons/react";

/** Dish quick-view modal. Opens with full details + Instagram DM deep-link. */
export function DishModal({
  dish,
  onClose,
}: {
  dish: Dish | null;
  onClose: () => void;
}) {
  const open = dish !== null;
  const add = useCart((s) => s.add);
  const cartHas = useCart((s) => s.has);
  const inCart = dish ? cartHas(dish.id) : false;

  // Build Instagram DM deep-link with pre-filled order message.
  const dmLink = dish
    ? `${brand.reserveUrl}?msg=${encodeURIComponent(
        `Hi LaSabroso! I'd like to order: ${dish.name} (₹${dish.price}). Is it available?`
      )}`
    : brand.reserveUrl;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl border-forest/15 bg-cream p-0 sm:rounded-3xl">
        {dish && (
          <>
            <DialogTitle className="sr-only">{dish.name}</DialogTitle>
            <DialogDescription className="sr-only">
              {dish.desc}
            </DialogDescription>
            <DialogClose asChild>
              <button
                className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-forest-deep/60 text-cream backdrop-blur-md transition-colors hover:bg-forest-deep"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </DialogClose>

            <div className="grid overflow-hidden sm:grid-cols-2">
              {/* image */}
              <div className="relative aspect-square sm:aspect-auto">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="food-img object-cover"
                />
                <div className="absolute left-3 top-3 flex gap-1.5">
                  <VegTag veg={dish.veg} />
                  {dish.chefPick && (
                    <Badge variant="gold" className="shadow-sm">
                      <Star size={11} weight="fill" /> Chef’s pick
                    </Badge>
                  )}
                </div>
              </div>

              {/* details */}
              <div className="flex flex-col gap-3 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-deep">
                    {categories.find((c) => c.id === dish.category)?.label}
                  </span>
                  {dish.spicy && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/15 px-2 py-0.5 text-[10px] font-bold text-terracotta-deep">
                      <Flame size={10} weight="fill" /> Spicy
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-extrabold text-forest sm:text-3xl">{dish.name}</h2>
                <p className="text-sm leading-relaxed text-muted">{dish.desc}</p>

                <div className="flex items-center gap-3 pt-1">
                  <span className="font-display text-3xl font-bold text-terracotta-deep">
                    ₹{dish.price}
                  </span>
                  {dish.bestseller && (
                    <Badge variant="forest">Bestseller</Badge>
                  )}
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 rounded-2xl bg-cream-soft p-4 text-center">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted">Diet</p>
                    <p className="text-sm font-bold text-forest">
                      {dish.veg ? "Vegetarian" : "Non-veg"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted">Prep time</p>
                    <p className="inline-flex items-center gap-1 text-sm font-bold text-forest">
                      <Timer size={13} weight="duotone" />
                      {dish.prepTime} min
                    </p>
                  </div>
                </div>

                {/* allergen tags */}
                {dish.allergens && dish.allergens.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted self-center">
                      Contains:
                    </span>
                    {dish.allergens.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center rounded-full border border-terracotta/25 bg-terracotta/8 px-2 py-0.5 text-[10px] font-bold text-terracotta-deep"
                      >
                        {ALLERGEN_LABELS[a]}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-2 pt-4">
                  <a
                    href={dmLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-cream transition-transform hover:-translate-y-0.5"
                  >
                    <Instagram size={16} weight="fill" />
                    Order on Instagram
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        dish &&
                        add({
                          id: dish.id,
                          name: dish.name,
                          price: dish.price,
                          image: dish.image,
                          veg: dish.veg,
                        })
                      }
                      disabled={inCart}
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-forest/25 px-4 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-forest/5 disabled:opacity-60"
                    >
                      {inCart ? (
                        <>
                          <Check size={15} weight="bold" /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={15} weight="bold" /> Add to list
                        </>
                      )}
                    </button>
                    <a
                      href={`tel:${brand.phone}`}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-forest/25 px-4 py-2.5 text-sm font-semibold text-forest"
                      aria-label={`Call ${brand.phoneDisplay}`}
                    >
                      Or call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Hook to manage the selected dish + body-scroll lock. */
export function useDishModal() {
  const [dish, setDish] = useState<Dish | null>(null);
  useEffect(() => {
    if (dish) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [dish]);
  return { dish, setDish };
}

export { AnimatePresence };
