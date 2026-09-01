# LaSabroso — Design Contract (DESIGN.md v2)

> Premium café landing for Madhapur, Hyderabad. Warm-cream editorial + fluid scroll choreography + ONE WebGL signature moment (Three.js neon sign band). Variance 7 / Motion 6–7 / Density 3–4.

## Palette (exact — hex literals ONLY in `src/app/globals.css`)

| Token | Hex | Role |
|---|---|---|
| cream bg | `#FFFDD0` | page base, cosmic latte |
| forest primary | `#166534` | headings, filled buttons, footer |
| forest-deep | `#14532D` | hover, dark sections, neon band bg |
| ink | `#0F1710` | body text (green-tinted, never #000) |
| muted | `#4E584E` | secondary text |
| neon-green glow | `#166534` + `#FFFDD0` | sanctioned glow pair (3D sign + CSS fallback) |
| culinary accent | `#E57A4F` / `#C9623A` | menu prices/dividers ONLY |
| gold | `#FFD700` | rating stars, chef's-pick badges |
| mint | `#D5F5E3` | veg tags, delivery cards |

**Lock rules**: forest = single accent. Glow = green/cream recipes only, never pink. Terracotta confined to menu-food contexts. Hex literals forbidden outside the tokens file.

## Type

| Token | Source | Usage |
|---|---|---|
| wordmark/kicker | Dancing Script (Histerm fallback unavailable in sandbox) | logo, kicker, 3D neon sign text |
| UI | Outfit 800/700/600/400 | h1/h2/h3/body/buttons |
| accent quotes | Playfair Display italic | testimonials, taglines ONLY |

Scale: 12·14·16·18·22·28·36·48. Hero headline `clamp(2.25rem,6vw,4.5rem)`. Italic descenders: line-height ≥ 1.1 + reserve padding.

## Imagery — REAL assets

- Hero: `https://lasabraso.com/hero-bg.png` via next/image priority (LCP). Upstream domain carries "sabraso" misspelling — remotePattern configured, typo never propagated into copy.
- Menu photos: Petpooja CDN `dineinpetweb.gumlet.io` referenced from `src/data/menu.ts`.
- Partner tiles: `/public/logos/` colored-text-chip fallback until licensed.
- Gallery fallback: Unsplash warm-cafe IDs documented in `docs/assets/README.md`.

## Three.js System (single WebGL signature)

- Scene: Neon sign band, full-bleed forest-deep section after Brand story.
- drei `<Text>` (troika) using same Dancing Script font served from `/public/fonts`, rendering wordmark.
- Emissive forest-green tubes (#166534) over cream glow plane (#FFFDD0); warm point light; `@react-three/postprocessing <Bloom mipmapBlur>` high luminance threshold — bloom touches ONLY the sign.
- Flicker: 4.2s loop modulating emissiveIntensity in useFrame. Disabled under reduced motion.
- Pointer parallax ≤ 3°, desktop only, transform-only, off under reduced motion.
- Performance: dynamic import ssr:false; DPR clamped [1,2]; frameloop 'never' when offscreen (IntersectionObserver); disposal on unmount.
- Fallbacks (mandatory): WebGL unsupported → CSS neon text (text-shadow #166534/#FFFDD0). reduced-motion → static poster / CSS fallback.
- Hard limits: ≤ 1 R3F canvas, home only. No OrbitControls, no autorotate, no external HDRI.

## Motion Architecture

- ONE library: `motion/react`. Animate transform/opacity only.
- Reveals: fade-up 24px, 500ms ease-out, staggered 80ms (whileInView). NO `window.addEventListener('scroll')`.
- Sticky: menu pills `top-[68px]`.
- Marquee: ≤ 1 per page ("Farm Fresh • Handcrafted • Boho Vibes").
- Reduced motion: `MotionConfig reducedMotion="user"` disables flicker, reveals, parallax, scrub, autoplay, marquee — non-negotiable.
- States: skeleton shimmer, "no dishes match" empty card, inline form errors, CTA focus rings forest 2–4px.

## Responsiveness

Breakpoints 640/768/1024/1280/1536 (375 start, 1440 cap). Touch ≥ 44px. `min-h-dvh` (never h-screen). No horizontal scroll on mobile.

## Copy Discipline

Headline ≤ 8 words, subtext ≤ 25 words, one visual/CTA per block. Zero AI-cliché ("Elevate", "Seamless", fake %, fake names). Zero em-dashes in rendered copy. Brand canon data is the ONLY source for UI.

## Canonical Brand Data (verified 2026-08-31)

- Hours: Mon–Sun 11:00 AM–11:00 PM
- Phone: +91 9182801364
- Address: Madhapur, Hyderabad, Telangana 500019
- Rating: 4.3★ Zomato (1,158) · 4.4 EazyDiner (~1.2K) · 4.4 Swiggy Dineout · 4.6 magicpin
- Cost for two: ₹1,200–₹2,000
- Partners: Zomato, Swiggy, magicpin; dine-in Zomato District / Swiggy Dineout (Flat 10–35%)
- Franchise: FOCO inquiry
- IG: @lasabroso_cafe
- Primary CTA: "Reserve your table" (Instagram DM path)
