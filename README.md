# LaSabroso — Café Website (v3)

Premium single-page landing for **LaSabroso**, a hybrid-boho café in Madhapur, Hyderabad — handcrafted coffee, signature momos, wood-fired pizzas and dessert labs. Warm-cream editorial design with fluid scroll choreography and one WebGL signature moment: a Three.js neon sign band.

## Features

- **Single-page guest journey** at `/`: Hero → OfferStrip → Specialties → BrandStory → NeonSignBand (3D) → MenuPreview → Partners → Events → Moments → Testimonials → Contact → Footer
- **3D neon sign band** (`src/components/home/scene/`): drei `<Text>` (troika) wordmark in Dancing Script, emissive forest-green tubes over a cream glow plane, bloom postprocessing touching only the sign, 4.2s flicker loop, pointer parallax ≤ 3° (desktop only); disabled under reduced motion, CSS neon text fallback when WebGL is unsupported, `ssr:false` dynamic import, DPR clamped [1,2], frameloop paused offscreen
- **Menu preview** with DishModal detail views — 39 dishes / 8 categories (36 veg / 3 non-veg), chef picks and bestsellers from `src/data/menu.ts`
- **Cart & ordering affordances**: floating island, cart sheet, happy-hour banner, live open-status / busy-level indicators
- **Reserve / contact CTA** and newsletter capture; Instagram feed section; partner tiles with colored-text-chip fallbacks
- **SEO**: metadata, OpenGraph, `sitemap.ts`, `robots.ts`, JSON-LD; menu photos served from the Petpooja CDN, hero from the upstream domain via configured `remotePatterns` + AVIF/WebP

## Tech Stack

- Next.js (App Router, Turbopack) + React 19 + TypeScript strict
- Tailwind CSS 4 + shadcn/ui, `motion/react` (single motion library, transform/opacity only)
- Three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing (exactly one R3F canvas, home only)
- Prisma 6 (scaffolded `User`/`Post` models — content ships as typed static data)
- @vercel/analytics + @vercel/speed-insights

## Getting Started

```bash
bun install
bun run dev        # next dev on port 3000
bun run build      # next build (standalone output)
bun run start      # bun .next/standalone/server.js

# Database (scaffold)
bun run db:generate
bun run db:push
```

## Project Structure

```
├── src/
│   ├── app/              # single landing route + metadata/robots/sitemap/error/loading
│   ├── components/
│   │   ├── home/         # Hero, MenuPreview, BrandStory, Testimonials, ... + scene/
│   │   ├── site/         # nav, footer, cart-sheet, floating-island, open-status, ...
│   │   ├── seo/          # SEO helpers
│   │   └── ui/           # shadcn/ui primitives
│   └── data/             # brand.ts, menu.ts, palette.ts (hex constants, .tsx stays hex-free)
├── prisma/               # scaffolded schema
├── DESIGN.md             # design contract v2: palette locks, type, 3D rules, motion
├── docs/assets/          # gallery fallback documentation
├── vercel.json           # pins next build
└── worklog.md            # verified build log
```

## Deployment

Deployed on Vercel at **lasabrosov3.vercel.app**. `vercel.json` pins the Next.js build command and framework. No database or environment variables are required for the landing page.

## Notes

`DESIGN.md` (v2) is the design contract: cosmic-latte cream `#FFFDD0` base, forest `#166534`/`#14532D` as the single accent, green-tinted ink (never `#000`), one sanctioned glow recipe (green/cream), terracotta confined to menu-food contexts, hex literals only in `src/app/globals.css` and `src/data/palette.ts`. Reduced motion disables flicker, reveals, parallax, and the marquee — non-negotiable.
