"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { InstagramLogo as Instagram, Flame, Star, X, Plus, Check, WhatsappLogo, LinkSimple, CheckCircle } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { VegTag, Badge } from "@/components/site/primitives";
import { brand } from "@/data/brand";
import { categories, ALLERGEN_LABELS, SPICE_LEVELS, menu, type Dish } from "@/data/menu";
import { useCart } from "@/lib/cart-store";
import { useCartWithToast } from "@/lib/use-cart-with-toast";
import { Timer } from "@phosphor-icons/react";

/** Dish quick-view modal. Opens with full details + Instagram DM deep-link. */
export function DishModal({
  dish,
  onClose,
  onSelectDish,
}: {
  dish: Dish | null;
  onClose: () => void;
  onSelectDish?: (d: Dish) => void;
}) {
  const open = dish !== null;
  const { add } = useCartWithToast();
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
                  {dish.spiceLevel && dish.spiceLevel > 0 && (
                    <SpiceMeter level={dish.spiceLevel} />
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
                  {dish.rating && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1">
                      <Star size={13} weight="fill" className="text-gold" />
                      <span className="text-sm font-bold text-forest-deep">{dish.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-muted">({dish.reviews})</span>
                    </span>
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

                  {/* share row */}
                  <DishShare dish={dish} />
                </div>
              </div>

              {/* You might also like */}
              <DishRecommendations dish={dish} onSelect={onSelectDish} />
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

/** Share buttons — WhatsApp + copy link. */
function DishShare({ dish }: { dish: Dish | null }) {
  const [copied, setCopied] = useState(false);
  if (!dish) return null;

  const shareText = `Check out ${dish.name} (₹${dish.price}) at LaSabroso, Madhapur!`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const copyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available — silent fail
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 pt-2">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        Share
      </span>
      <div className="flex items-center gap-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-9 w-9 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-cream"
          aria-label="Share on WhatsApp"
        >
          <WhatsappLogo size={16} weight="fill" />
        </a>
        <button
          onClick={copyLink}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-forest/15 px-3 text-xs font-bold text-forest transition-colors hover:bg-forest hover:text-cream"
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <CheckCircle size={14} weight="fill" /> Copied
            </>
          ) : (
            <>
              <LinkSimple size={14} /> Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/** "You might also like" — 3 recommended dishes from the same category. */
function DishRecommendations({
  dish,
  onSelect,
}: {
  dish: Dish;
  onSelect?: (d: Dish) => void;
}) {
  const recs = menu
    .filter((d) => d.category === dish.category && d.id !== dish.id)
    .slice(0, 3);

  if (recs.length === 0) return null;

  return (
    <div className="border-t border-forest/10 px-6 py-5 sm:px-8">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-muted">
        You might also like
      </p>
      <div className="grid grid-cols-3 gap-2">
        {recs.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelect?.(r)}
            className="group flex flex-col gap-1.5 rounded-xl border border-forest/8 bg-cream-soft p-2 text-left transition-all hover:-translate-y-0.5 hover:border-forest/20 hover:shadow-sm"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={r.image}
                alt={r.name}
                fill
                sizes="120px"
                className="food-img object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex items-center gap-1">
              <Star size={10} weight="fill" className="text-gold" />
              <span className="text-[10px] font-bold text-forest">
                {r.rating?.toFixed(1)}
              </span>
            </div>
            <p className="line-clamp-1 text-[11px] font-semibold text-forest">
              {r.name}
            </p>
            <p className="font-display text-xs font-bold text-terracotta-deep">
              ₹{r.price}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Visual spice-level meter — 3 flame icons, filled to the level. */
function SpiceMeter({ level }: { level: 1 | 2 | 3 }) {
  const label = SPICE_LEVELS.find((s) => s.level === level)?.label ?? "Spicy";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-terracotta/12 px-2 py-0.5"
      title={`Spice: ${label}`}
    >
      <span className="flex items-center gap-0.5">
        {[1, 2, 3].map((n) => (
          <Flame
            key={n}
            size={11}
            weight="fill"
            className={n <= level ? "text-terracotta-deep" : "text-terracotta/20"}
          />
        ))}
      </span>
      <span className="text-[10px] font-bold text-terracotta-deep">{label}</span>
    </span>
  );
}
