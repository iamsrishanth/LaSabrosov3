"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Camera } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { moments } from "@/data/brand";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/** Moments gallery — masonry, Radix Dialog lightbox with figcaption. */
export function Moments() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="moments" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <SectionEyebrow>Moments</SectionEyebrow>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
            The corners guests photograph most
          </h2>
        </div>
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <Camera size={16} weight="duotone" /> Tag {`@lasabroso_cafe`} to be featured
        </p>
      </div>

      {/* masonry via columns */}
      <StaggerGroup className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {moments.map((m, i) => (
          <StaggerItem key={m.title}>
            <button
              onClick={() => setOpen(i)}
              className={cn(
                "group relative block w-full overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-[0_12px_30px_-22px_rgba(22,101,52,0.4)] transition-all duration-300 hover:shadow-[0_24px_50px_-22px_rgba(22,101,52,0.5)]",
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
              )}
              aria-label={`Open ${m.title}`}
            >
              <Image
                src={m.image}
                alt={m.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-80" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream backdrop-blur-sm">
                  {m.cluster}
                </span>
                <p className="mt-2 text-base font-bold text-cream">{m.title}</p>
                <p className="text-xs text-cream/70">{m.desc}</p>
              </figcaption>
            </button>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* lightbox */}
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-3xl border-forest/15 bg-cream p-0 sm:rounded-3xl">
          <DialogTitle className="sr-only">
            {open !== null ? moments[open].title : "Gallery image"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {open !== null ? moments[open].desc : "Photograph from the gallery"}
          </DialogDescription>
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:rounded-3xl">
            {open !== null && (
              <Image
                src={moments[open].image}
                alt={moments[open].title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
            <DialogClose asChild>
              <button
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-forest-deep/70 text-cream backdrop-blur-sm transition-colors hover:bg-forest-deep"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </DialogClose>
          </div>
          {open !== null && (
            <div className="flex items-center justify-between gap-4 p-5">
              <figcaption>
                <p className="font-display text-xl italic text-forest">
                  {moments[open].title}
                </p>
                <p className="text-sm text-muted">{moments[open].desc}</p>
              </figcaption>
              <span className="rounded-full bg-mint/50 px-3 py-1 text-xs font-bold text-forest-deep">
                {moments[open].cluster}
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
