import { Hero } from "@/components/home/Hero";
import { OfferStrip } from "@/components/home/OfferStrip";
import { Specialties } from "@/components/home/Specialties";
import { BrandStory } from "@/components/home/BrandStory";
import { StatsBand } from "@/components/home/StatsBand";
import { NeonSignBand } from "@/components/home/scene/NeonSignBand";
import { MenuPreview } from "@/components/home/MenuPreview";
import { Partners } from "@/components/home/Partners";
import { Events } from "@/components/home/Events";
import { Moments } from "@/components/home/Moments";
import { Testimonials } from "@/components/home/Testimonials";
import { ReserveCTA } from "@/components/home/ReserveCTA";
import { Contact } from "@/components/home/Contact";

/**
 * Home — the La.Revi guest journey.
 * discovery → brand → menu → booking, anchored for deep links.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferStrip />
      <Specialties />
      <BrandStory />
      <StatsBand />
      <NeonSignBand />
      <MenuPreview />
      <Partners />
      <Events />
      <Moments />
      <Testimonials />
      <ReserveCTA />
      <Contact />
    </>
  );
}
