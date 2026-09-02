"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { InstagramLogo as Instagram, Phone, List as MenuIcon, X } from "@phosphor-icons/react";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { OpenStatusPill } from "@/components/site/open-status";
import { BusyLevel } from "@/components/site/busy-level";
import { useScrollspy } from "@/hooks/use-scrollspy";

import { BrandLogoMark } from "@/components/site/BrandLogo";

const LINKS = [
  { href: "specialties", label: "Specialties" },
  { href: "menu", label: "Menu" },
  { href: "partners", label: "Order" },
  { href: "events", label: "Events" },
  { href: "moments", label: "Moments" },
  { href: "about", label: "About" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // reading progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const ids = useMemo(() => LINKS.map((l) => l.href), []);
  const activeId = useScrollspy(ids, 80);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(22,101,52,0.12),0_8px_24px_-12px_rgba(22,101,52,0.25)]"
          : "bg-transparent"
      )}
    >
      <nav className="container-edge flex h-[68px] items-center justify-between gap-4">
        {/* Wordmark */}
        <Link href="#top" className="group flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center text-forest"
          >
            <BrandLogoMark />
          </motion.span>
          <span className="flex flex-col leading-none">
            <span className="font-histerm text-3xl font-bold text-forest tracking-tight leading-none">
              LaSabroso
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted mt-1">
              Madhapur · Hyderabad
            </span>
          </span>
        </Link>

        {/* Desktop links with scrollspy */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map((l) => {
            const on = activeId === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={`#${l.href}`}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                    on ? "text-forest" : "text-ink/70 hover:text-forest"
                  )}
                >
                  <span className="relative z-10">{l.label}</span>
                  {on && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-forest/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <OpenStatusPill />
          <BusyLevel />
          <a
            href={`tel:${brand.phone}`}
            className="hidden h-10 w-10 place-items-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest/5 sm:grid"
            aria-label={`Call ${brand.phoneDisplay}`}
          >
            <Phone size={18} weight="duotone" />
          </a>
          <Link
            href={brand.reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-bold text-cream shadow-[0_6px_18px_-6px_rgba(22,101,52,0.7)] transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex"
          >
            <Instagram size={16} weight="fill" />
            {brand.reserveLabel}
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="grid h-10 w-10 place-items-center rounded-full border border-forest/20 text-forest lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon size={20} weight="duotone" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm border-forest/15 bg-cream p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-forest/12 px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center text-forest">
                      <BrandLogoMark />
                    </span>
                    <span className="font-histerm text-2xl font-bold text-forest">LaSabroso</span>
                  </div>
                  <SheetClose asChild>
                    <button className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5" aria-label="Close menu">
                      <X size={20} />
                    </button>
                  </SheetClose>
                </div>
                <ul className="flex flex-col gap-1 px-4 py-4">
                  {LINKS.map((l) => {
                    const on = activeId === l.href;
                    return (
                      <li key={l.href}>
                        <SheetClose asChild>
                          <Link
                            href={`#${l.href}`}
                            className={cn(
                              "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors",
                              on
                                ? "bg-forest/10 text-forest"
                                : "text-ink hover:bg-forest/8 hover:text-forest"
                            )}
                          >
                            {l.label}
                            {on && <span className="h-1.5 w-1.5 rounded-full bg-forest" />}
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-auto space-y-3 border-t border-forest/12 px-6 py-5">
                  <Link
                    href={brand.reserveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-base font-bold text-cream"
                  >
                    <Instagram size={18} weight="fill" />
                    {brand.reserveLabel}
                  </Link>
                  <a
                    href={`tel:${brand.phone}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-forest/25 px-5 py-3 text-base font-semibold text-forest"
                  >
                    <Phone size={18} weight="duotone" />
                    {brand.phoneDisplay}
                  </a>
                  <p className="pt-1 text-center text-xs text-muted">{brand.hours}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* reading progress bar */}
      <AnimatePresence>
        {scrolled && (
          <motion.div className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-forest via-gold to-forest">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-forest via-gold to-forest"
              style={{ scaleX: progress }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
