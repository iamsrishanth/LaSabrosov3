"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { InstagramLogo as Instagram, Phone, ArrowRight, Clock } from "@phosphor-icons/react";
import { brand } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media";

/** Reserve CTA — strong conversion band before Contact. Full-bleed image + forest overlay. */
export function ReserveCTA() {
  const reduce = usePrefersReducedMotion();
  return (
    <section className="relative w-full overflow-hidden">
      {/* full-bleed image */}
      <Image
        src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f20824b7f85b.jpg"
        alt="A warm café table set for an evening reservation"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* forest overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/92 via-forest-deep/75 to-forest-deep/55" />

      <div className="container-edge relative z-10 grid items-center gap-8 py-20 sm:py-24 lg:grid-cols-2 lg:py-28">
        {/* copy */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 text-cream"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
            <Clock size={12} weight="fill" /> Reserve in 30 seconds
          </span>
          <h2 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Your table is waiting
            <span className="block font-script text-gold">in the boho courtyard</span>
          </h2>
          <p className="max-w-md text-cream/80">
            DM us on Instagram to reserve. We confirm within minutes during open
            hours, and we will hold your table for 15 minutes past the booking time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href={brand.reserveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-cream px-7 py-3.5 text-base font-bold text-forest-deep shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5"
            >
              <Instagram size={20} weight="fill" />
              {brand.reserveLabel}
            </a>
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-cream/35 bg-cream/5 px-6 py-3.5 text-base font-semibold text-cream backdrop-blur-md transition-colors hover:bg-cream/15"
            >
              <Phone size={18} weight="duotone" />
              {brand.phoneDisplay}
            </a>
          </div>
        </motion.div>

        {/* info card */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="ml-auto w-full max-w-sm rounded-3xl border border-cream/15 bg-cream/8 p-6 backdrop-blur-xl sm:p-8"
        >
          <h3 className="font-display text-xl italic text-gold">Quick facts</h3>
          <dl className="mt-4 space-y-3 text-cream">
            {[
              { k: "Hours", v: brand.hours },
              { k: "Cost for two", v: brand.costForTwo },
              { k: "Address", v: brand.address },
              { k: "Best for", v: "Coffee, dates, small groups" },
            ].map((row) => (
              <div key={row.k} className="flex items-start justify-between gap-4 border-b border-cream/12 pb-3 last:border-0">
                <dt className="text-xs font-semibold uppercase tracking-wide text-cream/60">
                  {row.k}
                </dt>
                <dd className="text-right text-sm font-semibold text-cream">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
          <a
            href="#contact"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-gold transition-colors hover:text-cream"
          >
            Or send a detailed enquiry <ArrowRight size={14} weight="bold" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
