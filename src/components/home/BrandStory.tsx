import Image from "next/image";
import { Section, SectionEyebrow } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { brand } from "@/data/brand";
import { categories } from "@/data/menu";

/** Brand story — aberration split; Playfair quote framed by real photography. */
export function BrandStory() {
  return (
    <Section id="about" className="py-20 sm:py-24 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        {/* image split */}
        <Reveal className="lg:col-span-5" y={28}>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_60px_-25px_rgba(22,101,52,0.5)]">
              <Image
                src="/images/brand/f6ca31dd8993.jpg"
                alt="The chandelier nook at LaSabroso"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* floating stat card */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-forest/12 bg-cream px-5 py-4 shadow-xl sm:block">
              <p className="font-display text-3xl font-bold text-forest">4.6★</p>
              <p className="text-xs text-muted">magicpin rating</p>
            </div>
            {/* accent frame */}
            <div className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-3xl border-2 border-forest/15" />
          </div>
        </Reveal>

        {/* copy split */}
        <div className="space-y-6 lg:col-span-7">
          <SectionEyebrow>Our story</SectionEyebrow>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
            Boho by day, glow by night
          </h2>
          <p className="font-display text-xl italic leading-relaxed text-forest-deep sm:text-2xl">
            “We built the café we wanted to find in Madhapur. Slow coffee, warm
            light, food made by hand.”
          </p>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
            LaSabroso began as a dessert counter and grew into a hybrid-boho
            kitchen. A courtyard dressed in fairy lights, a coffee bar that
            pours single origin, and a wood-fired pass where pizzas and momos
            leave the flame. No fuss, no shortcuts.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
            {[
              { k: `${categories.length}+`, v: "Categories" },
              { k: "4.3★", v: "Zomato" },
              { k: "11–11", v: "Daily hours" },
              { k: "₹1,200", v: "For two" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-forest/10 bg-cream-soft px-3 py-4 text-center"
              >
                <p className="font-display text-xl font-bold text-forest sm:text-2xl">
                  {s.k}
                </p>
                <p className="text-[11px] uppercase tracking-wide text-muted">
                  {s.v}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted">
            Find us in {brand.city}. Cost for two {brand.costForTwo}.
          </p>
        </div>
      </div>
    </Section>
  );
}
