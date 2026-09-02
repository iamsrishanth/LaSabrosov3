import type { JSX } from "react";
import { brand, faqs } from "@/data/brand";
import { SITE_URL } from "@/lib/site";

/**
 * JSON-LD structured-data renderers (GEO/rich-result grounding).
 * Values are sourced from src/data/brand.ts (canonical NAP, Appendix B of
 * the SEO/GEO audit) so the schema can't drift from the site copy.
 * Guardrail: FAQPage rich results retired by Google (2026-05-07) — QAPage
 * is emitted for the genuine on-page Q&A instead, never FAQPage.
 */

const ZOMATO_URL = "https://www.zomato.com/hyderabad/la-sabroso-madhapur";
const INSTAGRAM_URL = "https://www.instagram.com/lasabroso_cafe/";

export function JsonLd({ data }: { data: object }): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** CafeOrCoffeeShop — the business entity with canonical NAP. */
function cafeSchema(): object {
  const rating = brand.ratings.find((r) => r.source === "Zomato");
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: brand.name,
    alternateName: "La Sabroso",
    description:
      "A hybrid-boho café in Madhapur, Hyderabad. Handcrafted coffee, signature momos, wood-fired pizzas and a live dessert lab. Open daily 11:00–23:00.",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og.png`,
    telephone: brand.phone, // +91 9182801364 — canonical (Appendix B)
    email: "lasabrosocafe2022@gmail.com",
    priceRange: brand.costForTwo, // ₹1,200 – ₹2,000 — canonical (Appendix B)
    address: {
      "@type": "PostalAddress",
      streetAddress: "2-57/9A, Siddhi Vinayak Nagar, Madhapur Road (near Game Point)",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500019",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.4552275,
      longitude: 78.3841271,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "23:00",
    },
    servesCuisine: ["Coffee", "Desserts", "Pizza", "Momos", "Continental"],
    acceptsReservations: "True",
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(rating.value),
            reviewCount: String(rating.count),
            bestRating: "5",
          },
        }
      : {}),
    sameAs: [INSTAGRAM_URL, ZOMATO_URL],
  };
}

/** Organization — entity grounding with founding date + socials. */
function organizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    alternateName: "La Sabroso",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.svg`,
    foundingDate: "2023",
    email: "lasabrosocafe2022@gmail.com",
    telephone: brand.phone,
    sameAs: [INSTAGRAM_URL, ZOMATO_URL],
  };
}

/** WebSite — site-level entity. */
function websiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: `${SITE_URL}/`,
    inLanguage: "en-IN",
  };
}

/** QAPage — genuine on-page FAQ content (not FAQPage, which Google retired). */
function qaPageSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

/** Render the full LaSabroso schema set. */
export function LaSabrosoSchema(): JSX.Element {
  return (
    <>
      <JsonLd data={cafeSchema()} />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={qaPageSchema()} />
    </>
  );
}