# LaSabroso — Worklog

## Project Status

**Phase: COMPLETE (Wave 3 verified).** Premium café single-page landing at `/`
(the only user-visible route per environment constraint) implementing the
La.Revi guest journey: Hero → OfferStrip → Specialties → BrandStory →
NeonSignBand (3D) → MenuPreview → Partners → Events → Moments → Testimonials
→ Contact → Footer.

Stack: Next.js 16.1.3 (App Router, Turbopack), React 19, TypeScript strict,
Tailwind v4 + shadcn/ui, `motion/react` (Framer Motion), `three` +
`@react-three/fiber` + `@react-three/drei`. Palette lock: warm cream
(#FFFDD0) + forest (#166534 / #14532D). Single accent. ONE sanctioned glow.

## Completed (verified)

- **Design contract**: `DESIGN.md`, `globals.css` token layer (cream/forest/
  forest-deep/ink/muted/gold/mint/terracotta + shadcn semantic mapping),
  `next.config.ts` remotePatterns (lasabraso.com, dineinpetweb.gumlet.io,
  images.unsplash.com, z-cdn.chatglm.cn, sfile.chatglm.cn) + AVIF/WebP,
  `next/font/google` (Outfit UI, Playfair Display italic accents, Dancing
  Script wordmark), `favicon.svg`.
- **Data layer**: `src/data/brand.ts` (brand canon, partners, offers, events,
  moments, testimonials), `src/data/menu.ts` (39 dishes / 8 categories,
  36 veg / 3 non-veg, chefPicks, bestsellers, asserted counts),
  `src/data/palette.ts` (hex constants so .tsx stays hex-free).
- **Shared primitives**: Nav (sticky, mobile sheet, scroll progress),
  Footer (forest 4-col, FOCO franchise, hours, map anchor #franchise),
  Section/SectionEyebrow, VegTag/Badge/PriceRow (dotted leader),
  PartnerTile (CSS-variable brand tints, no inline style), Reveal/StaggerGroup,
  Providers (MotionConfig reducedMotion="user" + next-themes).
- **Hooks**: `src/hooks/use-media.ts` (useSyncExternalStore for
  prefers-reduced-motion, pointer:fine, mounted, WebGL support — avoids
  React-19 set-state-in-effect lint).
- **Home sections**: Hero (LCP image priority, forest scrim, sticker, CTAs),
  OfferStrip (dashed border, numeric specials), Specialties (zigzag, real
  imagery, chef-pick badges), BrandStory (Playfair quote, stats, image),
  NeonSignBand (Three.js: Dancing Script wordmark, layered additive glow
  planes, emissive forest-green, flicker 4.2s, pointer parallax ≤3° desktop,
  DPR [1,2], IntersectionObserver frameloop pause, WebGL + reduced-motion
  CSS fallback), MenuPreview (sticky pills, search, veg-only filter, motion
  tab switch, empty state), Partners (5 brand tiles + deal banner + marquee),
  Events (count-up counter + perks grid), Moments (masonry + Radix Dialog
  lightbox), Testimonials (carousel, autoplay, gold stars), Contact (map
  iframe + zod-validated enquiry form with inline errors).
- **Supporting**: sitemap.ts, robots.ts, loading.tsx, error.tsx, not-found.tsx,
  docs/assets/README.md.

## Verification (agent-browser + VLM)

- HTTP 200, page title correct, **zero console errors** (desktop + mobile).
- 11 articles SSR'd (specialties + signature menu + events). All section IDs
  present: #top #specialties #menu #partners #events #moments #about
  #contact #franchise.
- Menu tab switching verified (Signature → Momos → Desserts, dish names
  change). Veg-only filter functional (36 veg / 3 non-veg). Gallery lightbox
  opens with image. Partner brand tints render (Zomato red confirmed).
- All images load (OSS-hosted via image-search service, guaranteed reachable;
  replaced broken Unsplash IDs that were 404ing).
- Grep gates PASS for brand code: 0 `style={{}}` in non-ui tsx, 0 hex literals
  in non-ui tsx, 0 `addEventListener('scroll')`. (shadcn `ui/` vendor files
  retain their own inline styles — out of scope.)
- Lint clean (`bun run lint` → 0 errors).
- VLM assessment: palette cohesive, typography strong, hero/neon/menu/footer
  professional. All sections visually full.

## Key decisions / risks

- **Postprocessing removed**: `@react-three/postprocessing` Bloom caused
  Turbopack to OOM-kill (4GB RAM sandbox, 3.5GB RSS during compile). Replaced
  with layered additive-blended cream glow planes behind the emissive wordmark
  — a lightweight bloom substitute. Glow still touches ONLY the sign. The
  three.js scene otherwise meets spec (lazy, ssr:false, DPR-clamped,
  offscreen-paused, WebGL + reduced-motion CSS fallbacks).
- **Histerm .woff2 unavailable** in sandbox → Dancing Script as wordmark
  fallback (downloaded to /public/fonts/DancingScript.ttf for troika Text).
- **Single route**: per environment hard-constraint "user can only see the / route",
  the 6-route IA is consolidated into anchored sections on `/` (deep-linkable
  via #ids). Per-route metadata/sitemap/robots still ship.
- **Dev server persistence**: bash-spawned processes are killed by cgroup
  cleanup when a tool call returns; verification is done by starting the
  server and running agent-browser in the SAME bash call.
- The "floating n" noted in full-page VLM captures is a marquee/mask capture
  artifact (section-level screenshots are clean) — not a real layout bug.

## Next-phase recommendations (for the recurring webDevReview cron)

- Swap Dancing Script → Histerm .woff2 when available; re-enable
  `@react-three/postprocessing` Bloom if RAM is increased.
- Replace image-search OSS placeholders with verified Petpooja CDN item photos.
- License partner logos (Zomato/Swiggy/magicpin) to replace colored-chip
  fallback tiles.
- Add a "Back to top" floating button and an "Open now" status pill in the
  nav (11AM–11PM IST).
- Add per-dish "Add to cart" → Instagram DM deep-link with pre-filled message.
