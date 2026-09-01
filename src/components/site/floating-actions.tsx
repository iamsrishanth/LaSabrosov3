"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, InstagramLogo as Instagram } from "@phosphor-icons/react";
import { brand } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media";

/**
 * Floating actions — back-to-top (desktop) + mobile sticky reserve bar.
 * Both appear after scrolling past the hero (~80vh). Reduced-motion safe.
 */
export function FloatingActions() {
  const [show, setShow] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Back-to-top — desktop floating, bottom-right */}
      <AnimatePresence>
        {show && (
          <motion.button
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reduce ? "auto" : "smooth",
              })
            }
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 hidden h-12 w-12 place-items-center rounded-full bg-forest text-cream shadow-[0_10px_30px_-8px_rgba(22,101,52,0.6)] transition-all duration-300 hover:scale-110 hover:bg-forest-deep lg:grid"
          >
            <ArrowUp size={20} weight="bold" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile sticky reserve CTA — bottom bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-forest/15 bg-cream/95 backdrop-blur-md lg:hidden"
          >
            <div className="container-edge flex items-center justify-between gap-3 py-3">
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
                  Open 11–11
                </span>
                <span className="font-script text-lg font-bold text-forest">
                  LaSabroso
                </span>
              </div>
              <Link
                href={brand.reserveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-cream shadow-[0_6px_18px_-6px_rgba(22,101,52,0.7)]"
              >
                <Instagram size={16} weight="fill" />
                {brand.reserveLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
