import { Section, SectionEyebrow } from "@/components/site/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { PartnerTile, PartnerMarqueeRow } from "@/components/site/partner-tile";
import { partners, brand } from "@/data/brand";

/** Partners — logo-tile + label cards. */
export function Partners() {
  return (
    <Section id="partners" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <SectionEyebrow>Order & deals</SectionEyebrow>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
            Get LaSabroso however you like
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Delivery across Madhapur and HITEC City, or flat 10–35% off on dine-in.
        </p>
      </div>

      <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {partners.map((p) => (
          <StaggerItem key={p.name}>
            <PartnerTile name={p.name} role={p.role} slug={p.slug} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* deal callout */}
      <Reveal delay={0.1} className="mt-6">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-forest/12 bg-forest p-6 text-cream sm:flex-row sm:items-center sm:p-8">
          <div className="space-y-1">
            <p className="font-display text-2xl italic text-gold sm:text-3xl">
              Flat 10–35% off dine-in
            </p>
            <p className="text-sm text-cream/75">
              Via Zomato District & Swiggy Dineout. Show the deal at the counter.
            </p>
          </div>
          <a
            href={brand.reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-bold text-forest-deep transition-transform hover:-translate-y-0.5"
          >
            {brand.reserveLabel}
          </a>
        </div>
      </Reveal>

      {/* vocabulary marquee */}
      <div className="mt-14">
        <PartnerMarqueeRow />
      </div>
    </Section>
  );
}
