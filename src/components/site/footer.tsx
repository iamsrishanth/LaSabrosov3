"use client";

import Link from "next/link";
import { InstagramLogo as Instagram, Phone, MapPin, Clock, Star } from "@phosphor-icons/react";
import { brand, partners } from "@/data/brand";

export function Footer() {
  return (
    <footer
      id="franchise"
      className="relative mt-auto bg-forest text-cream"
    >
      {/* top hairline glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container-edge grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-cream/10">
              <span className="font-script text-2xl leading-none text-gold">L</span>
            </span>
            <span className="font-script text-3xl font-bold text-cream">LaSabroso</span>
          </div>
          <p className="font-display text-lg italic text-cream/80">
            {brand.tagline}
          </p>
          <div className="flex items-center gap-1.5">
            <Star size={16} weight="fill" className="text-gold" />
            <span className="text-sm font-semibold text-cream">
              4.3 <span className="text-cream/60">· 1,158 Zomato reviews</span>
            </span>
          </div>
          <p className="text-sm text-cream/70">
            A hybrid-boho café in Madhapur. Handcrafted coffee, signature momos,
            wood-fired pizzas and a live dessert lab.
          </p>
        </div>

        {/* Explore col */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "#specialties", label: "Specialties" },
              { href: "#menu", label: "Menu" },
              { href: "#partners", label: "Order & Deals" },
              { href: "#events", label: "Events" },
              { href: "#moments", label: "Moments" },
              { href: "#about", label: "About" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/75 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact col */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
            Visit
          </h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} weight="duotone" className="mt-0.5 shrink-0 text-gold" />
              <span className="text-cream/80">{brand.address}</span>
            </li>
            <li className="flex gap-3">
              <Clock size={18} weight="duotone" className="mt-0.5 shrink-0 text-gold" />
              <span className="text-cream/80">
                {brand.hours}
                <br />
                <span className="text-cream/55">{brand.hoursNote}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} weight="duotone" className="mt-0.5 shrink-0 text-gold" />
              <a href={`tel:${brand.phone}`} className="text-cream/80 hover:text-gold">
                {brand.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Instagram size={18} weight="duotone" className="mt-0.5 shrink-0 text-gold" />
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-gold"
              >
                {brand.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        {/* Franchise / partners col */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
            {brand.franchiseModel} Franchise
          </h3>
          <div className="rounded-2xl border border-cream/15 bg-cream/5 p-4">
            <p className="text-sm leading-relaxed text-cream/80">
              Own a LaSabroso under the {brand.franchiseModel} model.
              Franchise-owned, company-operated. Inquiry opens soon.
            </p>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-gold hover:underline"
            >
              <Instagram size={16} weight="fill" />
              DM to inquire
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {partners.slice(0, 3).map((p) => (
              <span
                key={p.name}
                className="rounded-full border border-cream/15 px-2.5 py-1 text-[11px] font-semibold text-cream/70"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/12">
        <div className="container-edge flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} LaSabroso. Handcrafted in Madhapur, Hyderabad.</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            Cost for two {brand.costForTwo}
          </p>
        </div>
      </div>
    </footer>
  );
}
