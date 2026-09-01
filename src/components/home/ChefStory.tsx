import { ChefHat, Quote } from "@phosphor-icons/react";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

/** Chef's story — editorial flavor-text band between Specialties and BrandStory. */
export function ChefStory() {
  return (
    <Section className="py-12 sm:py-16">
      <Reveal>
        <div className="mx-auto max-w-4xl rounded-3xl border border-forest/10 bg-cream-soft p-8 sm:p-12">
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest/8 text-forest">
              <ChefHat size={28} weight="duotone" />
            </span>
            <Quote
              size={40}
              weight="fill"
              className="text-forest/15"
            />
            <p className="font-display text-xl italic leading-relaxed text-forest-deep sm:text-2xl lg:text-3xl">
              “Every dish leaves the pass the way we would serve it to our own
              friends. No shortcuts, no reheats. Just fresh ingredients, steady
              hands, and a little boho mischief.”
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-forest/30" />
              <div className="text-center">
                <p className="font-script text-2xl font-bold text-forest">The LaSabroso kitchen</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  Handcrafted since day one
                </p>
              </div>
              <div className="h-px w-8 bg-forest/30" />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
