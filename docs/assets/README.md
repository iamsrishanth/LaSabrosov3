# LaSabroso Assets README

## Imagery strategy

### Hero
- Source: `https://lasabraso.com/hero-bg.png`
- **Quarantine note:** the upstream domain carries the "sabraso" misspelling.
  This typo is upstream only — it is NEVER propagated into rendered copy.
  The brand is "LaSabroso". The remotePattern in `next.config.ts` is configured
  for `lasabraso.com` purely to ingest the hero asset.

### Menu photography
- Canonical source: Petpooja CDN at `https://dineinpetweb.gumlet.io`.
- Until the live Petpooja item IDs are re-extracted, the menu uses documented
  **Unsplash food-photo fallbacks** seeded in `src/data/menu.ts`. Each seed is a
  real, reachable Unsplash photo id matching the dish (café / dessert / momo /
  pizza / coffee). Swap to Petpooja CDN URLs once the extraction is verified.

### Gallery (Moments)
- Fallback Unsplash IDs (warm café / dessert / chandelier / interior):
  - `photo-1551024601-bec78c9d249e` — dessert plating
  - `photo-1497034825429-c343d7c68868` — ice cream
  - `photo-1521017432531-fbd92d768814` — café interior, warm
  - `photo-1445116572660-236099ec97a0` — pour over coffee
  - `photo-1565299624946-b28f40a0ae38` — wood-fired pizza
  - `photo-1559339352-11d035aa65de` — chandelier nook
- Prefer official 360 / interior shots where available.

### Partner tiles
- Zomato / Swiggy / Zomato District / Swiggy Dineout / magicpin logos are NOT
  shipped (unlicensed). A branded colored-text-chip fallback component is used
  until logos are cleared for use.

## Fonts
- Outfit (UI) — next/font/google
- Playfair Display italic (accent quotes) — next/font/google
- Dancing Script (wordmark / kicker) — next/font/google
- Histerm (.woff2 local) — **not available in sandbox**. Dancing Script is the
  documented fallback for the wordmark and the 3D neon sign text. Drop the
  Histerm `.woff2` into `/public/fonts/` and update `scene/NeonSign.tsx` font
  loader to switch back.

## Name quarantine
- Avoid the platform slug "Lasabraso". Brand = "LaSabroso". The hero-bg domain
  is the only place the misspelling is tolerated, and only inside `next.config`.
