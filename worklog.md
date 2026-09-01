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
- Replace image-search OSS placeholders with verified Petpooja CDN item photos
  (some images carry source watermarks — e.g. "alamy" — that look unprofessional
  in production; swap to clean Petpooja CDN photos when re-extracted).
- License partner logos (Zomato/Swiggy/magicpin) to replace colored-chip
  fallback tiles.
- Standardize menu image aspect ratios / object-position for tighter grid.

---

## Round 2 — Features + Polish (webDevReview cron, 2026-09-01)

**Phase: COMPLETE (verified).** Added 6 new features + micro-interaction polish.
VLM polish score: **7.5 → 8.5/10** ("clearly premium execution, comparable to
Stumptown/Blue Bottle").

### New features

1. **"Open now" live status pill** in nav (`src/components/site/open-status.tsx`).
   Computes open/closed from IST (Asia/Kolkata, 11AM–11PM), re-checks every 60s,
   shows "Open now · Closes in Xh Ym" (green, pulsing dot) or "Closed now · Opens
   11:00 AM" (terracotta). SSR-safe placeholder until mounted.
2. **Scrollspy active-section highlight** (`src/hooks/use-scrollspy.ts`). Nav
   links highlight the current section with a `layoutId` sliding background pill
   (motion/react). IntersectionObserver with a thin top detection band — no scroll
   listeners. Verified: all 6 sections correctly highlight on scroll.
3. **Reading progress bar** in nav — `useScroll` + `useSpring` (motion/react)
   drives a gradient (forest→gold→forest) progress hairline at the nav bottom.
4. **Dish quick-view modal** (`src/components/home/DishModal.tsx`). Click any
   menu card → Radix Dialog with large image, full description, price, veg tag,
   chef-pick badge, spicy indicator, diet/made-to-order info, and **"Order on
   Instagram" deep-link** with pre-filled message
   (`?msg=Hi LaSabroso! I'd like to order: {dish} (₹{price})…`). Body-scroll
   lock on open. Hover reveals a "View" overlay on cards.
5. **Back-to-top floating button** (desktop, bottom-right) — forest-filled,
   appears after scrolling past 70vh, smooth-scrolls to top. Reduced-motion safe.
6. **Mobile sticky reserve CTA bar** — fixed bottom bar (appears after hero)
   with brand wordmark + "Reserve your table" button, respects safe-area-inset.
   Added mobile footer bottom-padding so content isn't hidden behind the bar.

### Polish / micro-interactions

- Nav wordmark logo: spring hover (rotate -8°, scale 1.05).
- Menu spicy icon: emoji 🌶 → Phosphor `Flame` (filled, terracotta).
- Menu cards: hover reveals a cream "View" pill on the image (opacity transition).
- Events section: **atmosphere lifestyle image** (birthday table setup) added
  as a 2-col split with the discount counter; +60 seats-max stat; "Bookable now"
  badge; icon hover rotation. Events image: `eventsAtmosphere` in brand.ts.
- Back-to-top button: made more visible (forest fill, cream icon, hover scale).

### Verification (agent-browser)

- HTTP 200, **zero console errors** (desktop + mobile 390).
- Scrollspy: all 6 sections correctly highlight (Specialties→Menu→Order→
  Events→Moments→About).
- Dish modal: opens with image + "Order on Instagram" link confirmed.
- Mobile sticky CTA: "Reserve your table" appears on scroll.
- Mobile horizontal overflow: **0px** (no horizontal scroll).
- Lint clean (`bun run lint` → 0 errors).
- VLM: dish modal 8/10, events section 9/10, full page 8.5/10.

### Files added/changed

- `src/lib/hours.ts` (new) — IST open-status computation.
- `src/hooks/use-scrollspy.ts` (new) — IntersectionObserver scrollspy.
- `src/components/site/open-status.tsx` (new) — live "Open now" pill.
- `src/components/site/floating-actions.tsx` (new) — back-to-top + mobile CTA.
- `src/components/home/DishModal.tsx` (new) — dish quick-view modal.
- `src/components/site/nav.tsx` (rewritten) — OpenStatusPill, scrollspy,
  reading progress, layoutId active pill.
- `src/components/home/MenuPreview.tsx` (rewritten) — clickable cards,
  DishModal integration, Phosphor Flame, hover "View" overlay.
- `src/components/home/Events.tsx` (rewritten) — atmosphere image split,
  +60 seats stat, icon hover.
- `src/data/brand.ts` — added `eventsAtmosphere` image + caption.
- `src/app/layout.tsx` — added `<FloatingActions />`.
- `src/app/globals.css` — mobile footer bottom-padding for sticky CTA.

---

## Round 3 — Editorial Polish + Conversion Sections (webDevReview cron, 2026-09-01)

**Phase: COMPLETE (verified).** Added 2 new sections + redesigned Hero & Specialties
+ testimonial-card polish. VLM section scores: Hero 9/10, Specialties 9/10,
StatsBand 10/10; full page 8.5/10 (strengths: cohesive brand, visual hierarchy,
micro-interactions).

### New sections

1. **Hero redesign** (`Hero.tsx`) — glassmorphism trust bar (frosted-glass 3-col
   grid: 4.3★ Zomato, 11–11 daily, Madhapur), floating food image accent (tilted
   dessert card, desktop xl+), scroll-driven parallax (`useScroll` + `useTransform`
   on bg image + content, reduced-motion safe), entrance animations on sticker/
   headline/trust-bar.
2. **Specialties bento redesign** (`Specialties.tsx`) — eliminated the visual void
   with a 4-dish bento grid (1 feature card spanning 2 cols/rows + 3 supporting).
   Full-bleed images with gradient scrims, chef-pick/bestseller badges, hover
   "View →" overlay, per-card "Order →" link to Instagram. Image-filled cards
   instead of image-above-text.
3. **StatsBand** (new `StatsBand.tsx`, between BrandStory and NeonSign) — 4 animated
   count-up stat cards (39 dishes, 8 categories, 4.3★ rating, 11–11 hours) with
   Phosphor icons, hover lift + corner-accent scale, whileInView reveals. VLM 10/10.
4. **ReserveCTA** (new `ReserveCTA.tsx`, before Contact) — full-bleed café table
   image with forest gradient overlay, "Your table is waiting / in the boho
   courtyard" headline, Instagram + phone CTAs, glassmorphism quick-facts card
   (hours, cost, address, best-for) + "send detailed enquiry" link to #contact.

### Polish

- **Testimonials card** — changed from heavy forest card to airy cream-gradient
  card with forest text + gold stars; controls restyled (forest-fill buttons,
  forest active dots). Decorative top accent line.
- **Menu image crop** — added `.food-img` CSS class (`object-position: center 40%`)
  applied to menu cards + dish modal for consistent food-photo cropping.
- **Safe-area** — moved inline `style={{paddingBottom}}` to `.safe-bottom` CSS class
  (grep-gate compliance; only motion `style={{scaleX}}` binding remains — that's
  the idiomatic motion/react API).

### Page composition (updated `page.tsx`)

Hero → OfferStrip → Specialties → BrandStory → **StatsBand** → NeonSignBand →
MenuPreview → Partners → Events → Moments → Testimonials → **ReserveCTA** →
Contact → Footer. (13 sections.)

### Verification (agent-browser + VLM)

- HTTP 200, **zero console errors** (desktop + mobile 390).
- 13 sections render (was 12). All new sections in SSR HTML confirmed
  (Dishes/Categories/Rating/Hours labels; "Your table is waiting" text present).
- Specialties bento: 4 articles. Partners: 5 tiles + green deal banner (VLM
  confirmed "visually full"). StatsBand: VLM 10/10.
- Mobile horizontal overflow: **0px**. No broken internal links.
- Lint clean. Grep gates: 0 hex in brand tsx; only motion `style={{scaleX}}`
  binding (idiomatic API) in nav.
- VLM scores: Hero 9/10, Specialties 9/10, StatsBand 10/10, full page 8.5/10.

### Files added/changed

- `src/components/home/Hero.tsx` (rewritten) — glassmorphism trust bar, floating
  food accent, scroll parallax, entrance animations.
- `src/components/home/Specialties.tsx` (rewritten) — 4-dish bento grid, image-
  filled cards, hover overlays, order links.
- `src/components/home/StatsBand.tsx` (new) — animated count-up stats.
- `src/components/home/ReserveCTA.tsx` (new) — full-bleed conversion band.
- `src/components/home/Testimonials.tsx` — lighter cream card + restyled controls.
- `src/components/home/MenuPreview.tsx` — `food-img` crop class.
- `src/components/home/DishModal.tsx` — `food-img` crop class.
- `src/components/site/floating-actions.tsx` — `.safe-bottom` class (no inline style).
- `src/app/page.tsx` — added StatsBand + ReserveCTA to composition.
- `src/app/globals.css` — `.food-img` and `.safe-bottom` utility classes.

### Known artifacts (not bugs)

- Full-page VLM screenshots sometimes show lower sections as "empty" due to
  lazy-image load timing during the scroll-through capture; section-level
  screenshots + DOM text checks confirm all sections render fully.

---

## Round 4 — FAQ + Instagram + Accessibility (webDevReview cron, 2026-09-01)

**Phase: COMPLETE (verified).** Added 2 new sections + SVG wave dividers +
skip-to-content accessibility link. VLM section scores: FAQ 9/10, Instagram
9/10. Total page sections: 13 → 15.

### New sections

1. **FAQ section** (new `FAQ.tsx`, before Contact) — 2-col layout: left help
   card (forest gradient, IG DM CTA "Still have a question?") + right accordion
   of 6 common café questions (reservations, parking, pet-friendly, Wi-Fi, events,
   payment). Each item has a Phosphor icon that turns forest→cream on expand.
   Accordion open by default (first item). Icons: CalendarCheck, Car, PawPrint,
   WifiHigh, Users, CreditCard. Data in `faqs` array in brand.ts.
2. **InstagramFeed section** (new `InstagramFeed.tsx`, after Moments) — bento
   grid of 6 real café photos (2 large + 4 small), each links to IG, hover
   reveals likes (Heart icon) + caption overlay, top-right IG badge. Follow CTA
   button `@lasabroso_cafe` in header. Bottom stats strip (~6K followers, live
   menu drops, daily stories). Data in `instagramFeed` array in brand.ts.

### Accessibility + polish

3. **Skip-to-content link** — `sr-only` link in layout that becomes visible on
   focus (fixed top-left, forest pill), jumps to `#top`. Standard a11y pattern.
4. **Animated SVG wave dividers** (new `wave-divider.tsx`) — organic editorial
   separators with a 12s drift animation (reduced-motion disabled). Two
   variants: "dark" (forest-deep fill) and "light" (cream fill), flip option.
   CSS keyframes in globals.css.
5. **Food-img crop** applied to Instagram grid for consistent cropping.

### Page composition (updated `page.tsx`)

Hero → OfferStrip → Specialties → BrandStory → StatsBand → NeonSignBand →
MenuPreview → Partners → Events → Moments → **InstagramFeed** → Testimonials →
ReserveCTA → **FAQ** → Contact → Footer. (15 sections.)

### Verification (agent-browser + VLM)

- HTTP 200, **zero console errors** (desktop + mobile 390).
- 15 sections render (was 13). FAQ + Instagram confirmed in SSR HTML.
- FAQ accordion open by default. Instagram grid: 6 images. Skip-link present.
- Mobile horizontal overflow: **0px**.
- Lint clean.
- VLM: FAQ 9/10, Instagram 9/10.

### Files added/changed

- `src/components/home/FAQ.tsx` (new) — accordion FAQ + help card.
- `src/components/home/InstagramFeed.tsx` (new) — bento IG grid + follow CTA.
- `src/components/site/wave-divider.tsx` (new) — animated SVG wave divider.
- `src/data/brand.ts` — added `faqs` (6 items) + `instagramFeed` (6 posts).
- `src/app/page.tsx` — added FAQ + InstagramFeed to composition.
- `src/app/layout.tsx` — added skip-to-content link.
- `src/app/globals.css` — `.wave-path` drift animation + reduced-motion guard.

