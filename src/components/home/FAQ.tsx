"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  CalendarCheck,
  Car,
  PawPrint,
  WifiHigh,
  Users,
  CreditCard,
  InstagramLogo as Instagram,
  ArrowRight,
} from "@phosphor-icons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionEyebrow } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { faqs, brand } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

const ICONS = {
  CalendarCheck,
  Car,
  PawPrint,
  WifiHigh,
  Users,
  CreditCard,
} as const;

/** FAQ — accordion answering common café questions. */
export function FAQ() {
  return (
    <Section id="faq" className="py-20 sm:py-24 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        {/* left intro + help card */}
        <div className="space-y-6 lg:col-span-5">
          <div className="space-y-3">
            <SectionEyebrow>Good to know</SectionEyebrow>
            <h2 className="max-w-md text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
              Before you visit
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              The small details that make a big difference. Still unsure? DM us,
              we reply fast.
            </p>
          </div>

          {/* help card */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-forest/12 bg-gradient-to-br from-forest to-forest-deep p-6 text-cream shadow-[0_20px_50px_-30px_rgba(22,101,52,0.6)] sm:p-8">
              <div className="events-aurora pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
                  <Instagram size={14} weight="fill" /> {brand.instagramHandle}
                </span>
                <h3 className="font-display text-2xl italic text-gold sm:text-3xl">
                  Still have a question?
                </h3>
                <p className="text-sm text-cream/90">
                  We are most responsive on Instagram. Send a DM and we will get
                  back to you within minutes during open hours.
                </p>
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-forest-deep transition-transform hover:-translate-y-0.5"
                >
                  <Instagram size={16} weight="fill" />
                  Message us
                  <ArrowRight size={14} weight="bold" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* right accordion */}
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
            {faqs.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <Reveal key={item.q} delay={i * 0.05}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className={cn(
                      "overflow-hidden rounded-2xl border border-forest/10 bg-white px-5 transition-all duration-300",
                      "data-[state=open]:border-forest/25 data-[state=open]:shadow-[0_12px_30px_-20px_rgba(22,101,52,0.4)]"
                    )}
                  >
                    <AccordionTrigger className="flex items-center gap-4 py-5 text-left hover:no-underline">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint/50 text-forest-deep transition-colors duration-300 [[data-state=open]>&]:bg-forest [[data-state=open]>&]:text-cream">
                        <Icon size={20} weight="duotone" />
                      </span>
                      <span className="flex-1 text-base font-bold text-forest sm:text-lg">
                        {item.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-14 pr-2">
                      <p className="text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              );
            })}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
