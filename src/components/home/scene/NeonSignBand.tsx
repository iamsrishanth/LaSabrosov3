"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { brand } from "@/data/brand";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
  useMounted,
  useWebGLSupport,
  usePrefersReducedMotion,
  useIsDesktop,
} from "@/hooks/use-media";

const NeonSign = lazy(() => import("./NeonSign"));

/** CSS neon fallback — warm cream glow */
function CSSNeon({ text }: { text: string }) {
  return (
    <div className="flex min-h-[280px] sm:min-h-[340px] items-center justify-center px-4 py-8">
      <span className="neon-css font-histerm text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl select-none">
        {text}
      </span>
    </div>
  );
}

export function NeonSignBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const mounted = useMounted();
  const webgl = useWebGLSupport();
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop();
  const parallax = desktop && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-forest-deep py-24 sm:py-28 lg:py-32"
      aria-label="LaSabroso neon sign"
    >
      {/* ambient grain */}
      <div className="neon-ambient pointer-events-none absolute inset-0 opacity-[0.08]" />

      <div className="container-edge relative z-10">
        {/* Section Header with Microscopic Eyebrow */}
        <div className="mb-10 sm:mb-12 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cream animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-medium text-cream/90">
              Signature Installation
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-5xl">
            The Sign of Madhapur
          </h2>

          <p className="max-w-xl text-sm text-cream/70 sm:text-base">
            Where Madhapur slows down. The warm, unhurried glow that says you have arrived.
          </p>
        </div>

        {/* Floating Neon Stage (Clean floating sign with no black background) */}
        <div className="relative mx-auto w-full max-w-5xl">
          {/* Subtle Ambient Radial Light Bloom behind the sign */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-cream/10 blur-3xl" />

          {/* WebGL Canvas / Fallback Container */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/7] w-full min-h-[290px] sm:min-h-[360px] flex items-center justify-center">
            {!mounted || !webgl ? (
              <CSSNeon text={brand.name} />
            ) : (
              <Suspense fallback={<CSSNeon text={brand.name} />}>
                <NeonSign
                  reducedMotion={reduced}
                  parallax={parallax}
                  active={active}
                  text={brand.name}
                />
              </Suspense>
            )}
          </div>
        </div>

        {/* Below-sign Copy & Button-in-Button Island CTA */}
        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="font-display text-xl italic text-cream/85 sm:text-2xl lg:text-3xl">
            “Handcrafted. Boho. Unhurried.”
          </p>

          <a
            href={brand.reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 rounded-full bg-cream pl-7 pr-2 py-2 text-sm font-semibold text-forest-deep shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,253,208,0.25)] active:scale-[0.98]"
          >
            <span>{brand.reserveLabel}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-deep text-cream transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-forest-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
              <ArrowUpRight className="h-4 w-4" weight="bold" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
