"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { InstagramLogo as Instagram, Heart, HeartStraight, ArrowRight } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { instagramFeed, brand } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media";

/** Instagram feed grid — visual social proof with hover likes + follow CTA. */
export function InstagramFeed() {
  const reduce = usePrefersReducedMotion();
  return (
    <Section id="instagram" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <SectionEyebrow>On the feed</SectionEyebrow>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
            Follow the boho life
          </h2>
        </div>
        <a
          href={brand.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-cream transition-transform hover:-translate-y-0.5 sm:self-auto"
        >
          <Instagram size={16} weight="fill" />
          {brand.instagramHandle}
          <ArrowRight size={14} weight="bold" />
        </a>
      </div>

      <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {instagramFeed.map((post, i) => (
          <StaggerItem
            key={i}
            className={i === 0 || i === 3 ? "col-span-2 row-span-2" : ""}
          >
            <motion.a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { y: -4 }}
              className={`group relative block overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-[0_10px_30px_-22px_rgba(22,101,52,0.4)] ${
                i === 0 || i === 3 ? "aspect-square sm:aspect-square" : "aspect-square"
              }`}
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="food-img object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* hover overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-deep/90 via-forest-deep/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-1.5 text-cream">
                  <Heart size={14} weight="fill" className="text-terracotta" />
                  <span className="text-xs font-bold">{post.likes}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] font-medium text-cream/90">
                  {post.caption}
                </p>
              </div>
              {/* top-right IG icon always visible */}
              <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-forest-deep/60 text-cream backdrop-blur-sm transition-colors group-hover:bg-cream group-hover:text-forest-deep">
                <Instagram size={13} weight="fill" />
              </span>
            </motion.a>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* stats strip */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-2xl border border-forest/10 bg-cream-soft px-6 py-5 text-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest">
          <HeartStraight size={16} weight="fill" className="text-terracotta" />
          ~6K followers
        </span>
        <span className="text-sm text-muted">·</span>
        <span className="text-sm font-semibold text-forest">Live menu drops</span>
        <span className="text-sm text-muted">·</span>
        <span className="text-sm font-semibold text-forest">Daily stories</span>
      </div>
    </Section>
  );
}
