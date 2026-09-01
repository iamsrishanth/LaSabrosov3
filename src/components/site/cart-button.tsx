"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBagOpen } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-store";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { CartSheet } from "@/components/site/cart-sheet";

/**
 * Floating cart button — shows dish count badge, opens cart slide-over.
 * Appears after scrolling past hero. Sits left of the back-to-top button.
 */
export function CartButton() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.items.length);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            aria-label={`Open order list${count > 0 ? `, ${count} dishes` : ""}`}
            className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-forest/20 bg-cream text-forest shadow-[0_10px_30px_-10px_rgba(22,101,52,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-forest hover:text-cream lg:bottom-24"
          >
            <ShoppingBagOpen size={20} weight="duotone" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={reduce ? undefined : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-cream"
              >
                {count}
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
