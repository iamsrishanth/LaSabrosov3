import Image from "next/image";
import { Section, SectionEyebrow } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/site/primitives";
import { menu } from "@/data/menu";

/** Specialties — zigzag 1-2 split cards, real imagery. */
export function Specialties() {
  const picks = [
    menu.find((d) => d.id === "sig-2")!,
    menu.find((d) => d.id === "sig-3")!,
    menu.find((d) => d.id === "cof-2")!,
  ];

  return (
    <Section id="specialties" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-12 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <SectionEyebrow>Specialties</SectionEyebrow>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
            The plates Madhapur keeps coming back for
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Each signature is made to order at the counter, plated with intention.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {picks.map((d, i) => {
          const feature = i === 0;
          return (
            <Reveal key={d.id} delay={i * 0.08}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-[0_20px_50px_-30px_rgba(22,101,52,0.45)] transition-all duration-300 hover:shadow-[0_30px_60px_-25px_rgba(22,101,52,0.55)] ${
                  feature ? "lg:flex-row" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    feature
                      ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:w-1/2"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4">
                    <Badge variant="gold">
                      <span className="text-gold">★</span> Chef’s pick
                    </Badge>
                  </span>
                </div>
                <div
                  className={`flex flex-1 flex-col gap-3 p-6 sm:p-8 ${
                    feature ? "lg:justify-center" : ""
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-deep">
                    {d.category}
                  </span>
                  <h3 className="text-2xl font-bold text-forest sm:text-3xl">{d.name}</h3>
                  <p className="text-sm leading-relaxed text-muted">{d.desc}</p>
                  <div className="mt-auto flex items-center gap-3 pt-4">
                    <span className="font-display text-2xl font-semibold text-terracotta-deep">
                      ₹{d.price}
                    </span>
                    {d.bestseller && <Badge variant="mint">Bestseller</Badge>}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
