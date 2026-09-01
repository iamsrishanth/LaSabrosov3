"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramLogo as Instagram, MapPin, Star, Clock, ArrowDown } from "@phosphor-icons/react";
import { brand } from "@/data/brand";

/**
 * Hero — server component. LCP image via next/image priority.
 * Full-bleed warm café image with forest scrim + centered cream card.
 */
export function Hero() {
  return (
    <section id="top" className="relative min-h-dvh w-full overflow-hidden">
      {/* LCP image */}
      <Image
        src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a57f07411e62.jpg"
        alt="Warm boho café interior at LaSabroso in Madhapur, Hyderabad"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* forest scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/45 to-forest-deep/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,83,45,0.55)_100%)]" />

      {/* content */}
      <div className="container-edge relative z-10 flex min-h-dvh flex-col items-center justify-center py-24 text-center">
        {/* Matchao-style sticker */}
        <div className="mb-6 inline-flex -rotate-3 items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 backdrop-blur-md">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-cream">
            Now open in Madhapur
          </span>
        </div>

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

        {/* quick facts */}
        <dl className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          <Fact icon={<Star size={16} weight="fill" className="text-gold" />} label="4.3 on Zomato" sub="1,158 reviews" />
          <Fact icon={<Clock size={16} weight="duotone" className="text-gold" />} label="11 AM – 11 PM" sub="Open all week" />
          <Fact icon={<MapPin size={16} weight="duotone" className="text-gold" />} label="Madhapur" sub="Hyderabad 500019" />
        </dl>
      </div>

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

function Fact({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-cream/15 bg-forest-deep/30 px-4 py-3 backdrop-blur-md">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream/10">
        {icon}
      </span>
      <span className="flex flex-col text-left leading-tight">
        <span className="text-sm font-bold text-cream">{label}</span>
        <span className="text-xs text-cream/60">{sub}</span>
      </span>
    </div>
  );
}
