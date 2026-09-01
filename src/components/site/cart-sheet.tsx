"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { TrashSimple, InstagramLogo as Instagram, ShoppingBagOpen, X } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-store";
import { brand } from "@/data/brand";
import { VegTag } from "@/components/site/primitives";
import { usePrefersReducedMotion } from "@/hooks/use-media";

/** Cart slide-over — lists selected dishes, builds Instagram DM with all items. */
export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const reduce = usePrefersReducedMotion();

  const total = items.reduce((sum, i) => sum + i.price, 0);

  // Build the Instagram DM message with all cart items.
  const dmMessage = items.length
    ? `Hi LaSabroso! I'd like to order:\n${items
        .map((i, idx) => `${idx + 1}. ${i.name} — ₹${i.price}`)
        .join("\n")}\n\nTotal: ₹${total}\nIs this available?`
    : "";
  const dmLink = `${brand.reserveUrl}?msg=${encodeURIComponent(dmMessage)}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-forest/15 bg-cream p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-forest/12 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-cream">
                <ShoppingBagOpen size={18} weight="duotone" />
              </span>
              <div>
                <SheetTitle className="text-lg font-bold text-forest">
                  Your order list
                </SheetTitle>
                <SheetDescription className="text-xs text-muted">
                  {items.length} {items.length === 1 ? "dish" : "dishes"} selected
                </SheetDescription>
              </div>
            </div>
            <SheetClose asChild>
              <button
                className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        {/* items list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-cream-soft text-forest/30">
                <ShoppingBagOpen size={32} weight="duotone" />
              </span>
              <p className="font-display text-lg italic text-forest">
                Your list is empty
              </p>
              <p className="max-w-[220px] text-xs text-muted">
                Browse the menu, tap “Add” on dishes you want, and send the full
                list to us on Instagram.
              </p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-white p-2.5"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="food-img object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <VegTag veg={item.veg} />
                        <span className="text-sm font-bold text-forest">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-display text-sm font-semibold text-terracotta-deep">
                        ₹{item.price}
                      </span>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-terracotta/10 hover:text-terracotta-deep"
                      aria-label={`Remove ${item.name}`}
                    >
                      <TrashSimple size={16} weight="duotone" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* footer with total + checkout */}
        {items.length > 0 && (
          <div className="space-y-3 border-t border-forest/12 bg-cream-soft px-5 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted">
                Estimated total
              </span>
              <span className="font-display text-2xl font-bold text-forest">
                ₹{total}
              </span>
            </div>
            <a
              href={dmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-cream shadow-[0_8px_24px_-8px_rgba(22,101,52,0.6)] transition-transform hover:-translate-y-0.5"
            >
              <Instagram size={18} weight="fill" />
              Order all on Instagram
            </a>
            <button
              onClick={clear}
              className="w-full text-center text-xs font-semibold text-muted transition-colors hover:text-terracotta-deep"
            >
              Clear list
            </button>
            <p className="text-center text-[10px] text-muted">
              Prices are indicative. Final bill confirmed on DM.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
