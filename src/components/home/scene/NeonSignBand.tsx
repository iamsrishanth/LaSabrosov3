"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { brand } from "@/data/brand";
import { SectionEyebrow } from "@/components/site/section";
import {
  useMounted,
  useWebGLSupport,
  usePrefersReducedMotion,
  useIsDesktop,
} from "@/hooks/use-media";

const NeonSign = lazy(() => import("./NeonSign"));

/** CSS neon fallback — same copy, sanctioned glow pair. */
function CSSNeon({ text }: { text: string }) {
  return (
    <div className="flex min-h-[280px] items-center justify-center px-6">
      <span className="neon-css font-script text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
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
      className="relative w-full overflow-hidden bg-forest-deep"
      aria-label="LaSabroso neon sign"
    >
      {/* ambient grain */}
      <div className="neon-ambient pointer-events-none absolute inset-0 opacity-[0.08]" />

      <div className="container-edge relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <SectionEyebrow className="text-cream/70 [&>span]:bg-cream/30">
            The sign
          </SectionEyebrow>
          <p className="max-w-xl text-sm text-cream/60">
            Where Madhapur slows down. The glow that says you have arrived.
          </p>
        </div>

        {/* canvas / fallback stage */}
        <div className="mx-auto aspect-[16/9] w-full max-w-5xl">
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

        {/* below-sign copy */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="font-display text-xl italic text-cream/85 sm:text-2xl">
            “Handcrafted. Boho. Unhurried.”
          </p>
          <a
            href={brand.reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-forest-deep transition-transform hover:-translate-y-0.5"
          >
            {brand.reserveLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
