"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { InstagramLogo as Instagram, MapPin, Star, Clock, ArrowDown, TrendUp } from "@phosphor-icons/react";
import { brand } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media";

/**
 * Hero — LCP image via next/image priority, forest scrim, glassmorphism trust
 * bar with animated rating stats, floating food image accent, scroll parallax.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // parallax transforms (disabled under reduced motion)
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-dvh w-full overflow-hidden">
      {/* LCP background image with parallax */}
      <motion.div style={reduce ? undefined : { y: yImg }} className="absolute inset-0 -z-10">
        <Image
          src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a57f07411e62.jpg"
          alt="Warm boho café interior at LaSabroso in Madhapur, Hyderabad"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* forest scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/45 to-forest-deep/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,83,45,0.55)_100%)]" />

      {/* floating food accent (desktop only) */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, x: 40, rotate: 6 }}
        animate={{ opacity: 1, x: 0, rotate: 6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="pointer-events-none absolute right-[6%] top-[18%] z-10 hidden h-44 w-44 overflow-hidden rounded-3xl border-4 border-cream/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] xl:block"
      >
        <Image
          src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dbc1969df7dd.jpg"
          alt="Signature chocolate dessert"
          fill
          sizes="176px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 to-transparent" />
        <span className="absolute bottom-2 left-2 rounded-full bg-cream/90 px-2.5 py-0.5 text-[10px] font-bold text-forest-deep backdrop-blur-sm">
          Signature
        </span>
      </motion.div>

      {/* content */}
      <motion.div
        style={reduce ? undefined : { y: yContent, opacity }}
        className="container-edge relative z-10 flex min-h-dvh flex-col items-center justify-center py-24 text-center"
      >
        {/* Matchao-style sticker */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex -rotate-3 items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-cream">
            Now open in Madhapur
          </span>
        </motion.div>

        <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.08] text-cream drop-shadow-[0_4px_30px_rgba(20,83,45,0.55)] sm:text-5xl lg:text-[clamp(2.25rem,6vw,4.5rem)]">
          A boho café
          <span className="font-script block font-bold text-gold">
            handcrafted in Madhapur
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base text-cream/85 sm:text-lg">
          Signature momos, wood-fired pizzas and a live dessert lab. Single-origin
          coffee from first light to last call.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href={brand.reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-cream px-7 py-3.5 text-base font-bold text-forest-deep shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Instagram size={20} weight="fill" />
            {brand.reserveLabel}
          </Link>
          <Link
            href="#menu"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-cream/40 bg-forest-deep/30 px-6 py-3.5 text-base font-semibold text-cream backdrop-blur-md transition-colors hover:bg-forest-deep/50"
          >
            Explore the menu
          </Link>
        </div>

        {/* glassmorphism trust bar */}
        <motion.dl
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-2 rounded-2xl border border-cream/15 bg-cream/8 p-2 backdrop-blur-xl sm:gap-3 sm:p-3"
        >
          <TrustStat
            icon={<Star size={16} weight="fill" className="text-gold" />}
            value="4.3"
            suffix="★"
            label="Zomato"
            sub="1,158 reviews"
          />
          <TrustStat
            icon={<Clock size={16} weight="duotone" className="text-gold" />}
            value="11–11"
            label="Daily hours"
            sub="Open all week"
          />
          <TrustStat
            icon={<MapPin size={16} weight="duotone" className="text-gold" />}
            value="Madhapur"
            label="Hyderabad"
            sub="500019"
          />
        </motion.dl>
      </motion.div>

      {/* scroll cue */}
      <a
        href="#specialties"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cream/70 transition-colors hover:text-gold"
        aria-label="Scroll to specialties"
      >
        <ArrowDown size={22} className="animate-bounce" weight="duotone" />
      </a>
    </section>
  );
}

function TrustStat({
  icon,
  value,
  suffix,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  suffix?: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-cream/5 px-2 py-3 text-center sm:flex-row sm:gap-3 sm:text-left">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream/10">
        {icon}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-base font-extrabold text-cream">
          {value}
          {suffix && <span className="ml-0.5 text-gold">{suffix}</span>}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-cream/70">
          {label}
        </span>
        <span className="hidden text-[10px] text-cream/50 sm:block">{sub}</span>
      </div>
    </div>
  );
}
