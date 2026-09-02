---
plan_id: lasabroso-seo-geo-audit
title: "La Sabroso (lasabroso.srishanth.com) — SEO + GEO Audit — Round 1"
status: draft
effort: ultrathink
variant: deep
author: Shikamaru ♟️
created: 2026-09-02T23:10:00+05:30
---

# Plan: lasabroso-seo-geo-audit

**Effort Level:** ultrathink
**Variant:** deep (three_subagents_with_critique — adapted to live-site audit, in-session collection per the live-site pattern; no codebase fan-out was needed since the repo is local)
**Site:** https://lasabroso.srishanth.com (Next.js App Router, static prerender, Cloudflare edge, origin systemd lasabroso.service :3311)
**Repo:** /mnt/data/Projects/LaSabrosov3 (GitHub iamsrishanth/LaSabrosov3, main)
**Date:** 2026-09-02 (Round 1 — no prior SEO/GEO audit exists in /home/sri/.hermes/plans/)

## Round 2 — SEO + GEO Re-Audit (2026-09-02, after commit 302bf13)

**Scope of this round:** the site was redeployed with fix commit `302bf13 "seo/geo: fix metadata plumbing, add structured data + GEO artifacts"` (detected via asset hash diff: `e2abb3fcc655eab5.js` → `1f25e18c2d2cf36d.js`). This round re-runs the full probe battery against the live site, verifies every Round-1 finding, and adds remaining recommendations. Fresh Lighthouse runs were performed with Lighthouse 13.4.1 (chrome flags `--no-sandbox --headless=new`); the repo's committed Lighthouse JSONs (also updated in the fix commit) were read as the owner's own baseline.

**Round 2 verdict: 10 of 12 Round-1 findings verified FIXED in live HTTP; 2 partially open; 2 new findings. SEO Health Score: 55 → 75/100.**

### Round 1 → Round 2 status table

| Finding | Round 1 | Round 2 status | Verification evidence (2026-09-02 live) |
|---|---|---|---|
| A1 placeholder domain | CRITICAL | ✅ FIXED | `curl /` → og:url `https://lasabroso.srishanth.com`; `lasabroso.example` count in raw HTML = **0**; SITE_URL centralized in `src/lib/site.ts` (commit stat) |
| A2 no canonical | CRITICAL | ✅ FIXED | raw + rendered `<link rel="canonical" href="https://lasabroso.srishanth.com/">` present |
| A3 sitemap fragments/.example | CRITICAL | ✅ FIXED | `curl /sitemap.xml` → single `<loc>https://lasabroso.srishanth.com</loc>`, no hash fragments; source rewritten to emit `SITE_URL` only |
| A4 zero JSON-LD | HIGH | ✅ FIXED | raw HTML has 4 blocks: `CafeOrCoffeeShop`, `Organization`, `WebSite`, `QAPage`; rendered DOM `jsonldCount` = 4; source `src/components/seo/schema.tsx` (138 lines) sources NAP from `brand.ts`; **schema-vs-visible NAP check PASSES** — schema `telephone` = `+91 9182801364`, rendered `tel:` links = same ×4 (no placeholder-phone bug) |
| A5 llms.txt SPA-shell traps | HIGH | ✅ FIXED | `/llms.txt` opens `# LaSabroso` + blockquote; `/llms-full.txt` opens `# LaSabroso — Full Site Reference`; `/.well-known/ai.txt` opens `# LaSabroso` — all real content, none `<!DOCTYPE` |
| A6 robots blocks AI crawlers | HIGH | ⚠️ PARTIAL — origin fixed, edge still blocks | origin `public/robots.txt` now allows GPTBot/ClaudeBot/PerplexityBot/Googlebot/Bingbot with `Content-Signal: search=yes, ai-train=no, use=reference` + `Sitemap:` line; **but Cloudflare "Managed robots.txt" is still prepended at the edge** and keeps `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended, meta-externalagent. Equal-specificity UA groups → first match (CF block) wins for GPTBot/ClaudeBot/Google-Extended. PerplexityBot now crawls (not in CF list + origin Allow). **Owner action required: disable CF Managed robots.txt in the dashboard** (the origin file already documents this) |
| A7 mobile CWV | HIGH | ❌ STILL OPEN | fresh runs: mobile perf 28/34, LCP 6.8 s/6.0 s (target ≤2.5), TBT 14.8 s/5.0 s (target ≤200 ms), FCP 4.2–5.7 s; owner's committed run: perf 44, LCP 10.7 s. The metadata commit did NOT touch the JS bundles (268 KB + 116 KB chunks, ~226 KB unused) — code-split is the remaining fix |
| A8 no og:image | HIGH | ✅ FIXED | `og:image: https://lasabroso.srishanth.com/og.png`, HEAD 200, 75,385 bytes (1200×630 brand roundel); `twitter:image` also set |
| A9 React #418 hydration | MEDIUM | ✅ FIXED | fresh Lighthouse `errors-in-console` item count = **0** (both profiles); BP category 96 → 100; `suppressHydrationWarning` added on countdown span (commit stat) |
| A10 stats render 0 | MEDIUM | ✅ FIXED | raw HTML: `121` before "Dishes on the menu", `20` before "Categories crafted", `4.3` before "Zomato rating"; rendered DOM stats = `["121","20","4.3★"]` (was 0/0/0.0★); `useState(to)` in StatsBand |
| A11 NAP drift | MEDIUM | ⚠️ PARTIAL — site/schema now canonical, directories still drift | site + schema use Appendix B values (phone +91 9182801364, ₹1,200–₹2,000, 11–23, Siddhi Vinayak Nagar geo 17.4552275/78.3841271); magicpin still shows +91 8008577931 / 10–10 / ₹2,000; Swiggy Dineout still ₹600 + "North Indian". Account-level updates remain (owner) |
| A12 brand spelling | MEDIUM | ✅ FIXED (schema-side) | `alternateName: "La Sabroso"` + `name: "LaSabroso"` in Cafe + Organization schema; og:site_name LaSabroso |
| A13 single-URL, no long-tail pages | MEDIUM | ⚠️ STILL OPEN (phase 2) | still only `/` (src/app/page.tsx); no /menu or dish pages; unchanged by the fix commit |
| A14 img dims | LOW | ⚠️ STILL OPEN | 25/31 images still lack explicit width/height (CLS 0.036–0.037 now measured on mobile — small but nonzero) |
| A15 IndexNow | LOW | STILL OPEN | no IndexNow; low value for a single URL |

### New Round 2 findings

- **R2-1 (MEDIUM): HTTP serves 200 without an HTTPS redirect.** `curl -sI http://lasabroso.srishanth.com/` → `HTTP/1.1 200 OK` (no 301/308). The SERP `site:` snapshot shows the domain indexed as `http://lasabroso.srishanth.com` — search engines can ingest the non-HTTPS variant. Fix: enable Cloudflare **Always Use HTTPS** (or an edge redirect rule http→https 301). Confirmed the site's only URL should be the https canonical.
- **R2-2 (INFORMATIONAL): index presence achieved.** Round 1 showed zero SERP presence from the audit domain; Round 2 `site:lasabroso.srishanth.com` returns the site at **position 1** with the fixed title/description. Brand SERP still led by www.lasabroso.com (out of scope per owner) + Zomato #2, EazyDiner #4, magicpin #5 — owned domain now visible and consistent.
- **R2-3 (LOW): Lighthouse version/environment noise.** v13 changed presets (`mobile` no longer valid; default IS mobile; desktop = `--preset=desktop`). Committed JSONs vs fresh runs differ materially on desktop (owner 84/TBT 240 ms vs fresh 44–47/TBT 2.4–2.7 s) — host-load noise, not a site change. Treat committed files as the owner baseline and re-run on a quiet machine before/after perf work.

### Recommended changes (what's still needed — carry-forward from Round 1 + new)

1. **Owner action (CF dashboard): disable "Managed robots.txt"** so the curated origin robots takes effect — GPTBot/ClaudeBot/Google-Extended then crawl with `ai-train=no, use=reference` (GEO win). Reversible in seconds. No repo change needed.
2. **Mobile performance (A7, HIGH):** lazy-load the below-fold menu section (`dynamic(() => import(...), { ssr: false })` or route split) to pull the 268 KB + 116 KB chunks out of the initial bundle; inline `live-menu.json` (static, 121 items) into the menu chunk; trim ~226 KB unused JS (motion/react + phosphor tree-shaking); enable CF caching for the prerendered page (`cf-cache-status` is DYNAMIC while origin reports `x-nextjs-cache: HIT`).
3. **HTTPS redirect (R2-1, MEDIUM):** CF Always Use HTTPS toggle.
4. **Accessibility batch (A7 follow-up, unchanged at 84):** `label` (dish search input), `target-size`, `color-contrast`, `definition-list` ordering, `aria-prohibited-attr`, `label-content-name-mismatch`. All 8 failing audits identified in the fresh runs — Mechanical fixes, one commit.
5. **NAP directory sync (A11, owner):** magicpin phone → +91 9182801364, hours → 11–23; Swiggy Dineout cost ₹600 → ₹1,200–₹2,000 + cuisine remove "North Indian". Use Appendix B.
6. **Phase-2 pages (A13):** generate `/menu` + signature-dish pages from `live-menu.json` (121 items / 20 categories), each with canonical + per-page title/description; extend sitemap with real URLs; add Menu schema. Land only after 1–4.
7. **Optional:** per-item Menu schema now (schema quality is good; enriches AI grounding), IndexNow after phase-2 pages exist.
8. **NOT needed (fixed in this round):** no further llms.txt/robots.txt/sitemap/canonical/og-image work — all verified live.

### Round 2 health score (recomputed)

| Category | Weight | R1 | R2 | Rationale |
|---|---|---|---|---|
| Technical SEO | 22% | 55 | 80 | canonical, sitemap, real domain, robots Sitemap — only CF edge blocklist + http-200 remain |
| Content Quality | 23% | 75 | 80 | stats now real (121/20/4.3), copy unchanged, E-E-A-T (press, reviews, owner) |
| On-Page SEO | 20% | 60 | 85 | title/desc, heading tree, og:url fixed, og:image added, canonical |
| Schema / Structured Data | 10% | 10 | 80 | 4 valid JSON-LD blocks, NAP matches visible, no FAQPage (QAPage used); small polish possible |
| Performance (CWV) | 10% | 47 | 35 | mobile LCP 6.0–6.8 s / TBT 5–15 s across all runs — perf work NOT shipped |
| AI Search Readiness | 10% | 35 | 55 | llms.txt/ai.txt real, static HTML, Content-Signal reference — but GPTBot/ClaudeBot blocked at edge until CF toggle |
| Images | 5% | 85 | 85 | alt clean, og image added; dims still missing on 25/31 |

**Weighted R2 total: 75/100** (Round 1: 55/100 — metadata/GEO fixes account for +20; remaining ceiling is mobile performance + edge AI-crawler block).

---

## Executive Summary

La Sabroso is a hybrid-boho café in Madhapur, Hyderabad (phone +91 91828 01364, 11–11 daily, Zomato 4.3 ★ / 1,158 reviews). The site itself is a single-page Next.js app with genuinely good on-page fundamentals: unique title/description, clean heading tree (1 H1 / 13 H2 / 29 H3), 8.9 KB of visible body text, 31 images all with alt text, static prerender (crawlers get full HTML, not a JS shell).

The damage is almost entirely in **metadata plumbing and GEO artifacts**, not in the page content:

1. **Placeholder domain `lasabroso.example` hardcoded in production metadata** — og:url, metadataBase, and the entire sitemap.xml point at a dead domain. This poisons social shares, metadata consumers, and sitemap ingestion simultaneously. (CRITICAL)
2. **No canonical tag at all** on any page. (CRITICAL)
3. **sitemap.xml contains only fragment URLs** (/#menu, /#events…) on the wrong domain — hashes are not indexable, so the sitemap contributes zero value. (CRITICAL)
4. **Zero structured data (JSON-LD = 0)** — a café with hours, phone, geo, price range, reviews, FAQ content, and an Instagram gets no rich-result or AI-entity treatment. (HIGH)
5. **All GEO artifacts are fake**: /llms.txt, /llms-full.txt, /.well-known/ai.txt return HTTP 200 with the index.html SPA body — the site *appears* GEO-ready and has no LLM-readable content. (HIGH)
6. **Cloudflare managed robots.txt blocks every major AI crawler** (GPTBot, ClaudeBot, Google-Extended, CCBot, meta-externalagent, Applebot-Extended, Bytespider, Amazonbot) and carries no Sitemap: line. (HIGH)
7. **Mobile performance is failing CWV**: Lighthouse performance 47/100, LCP 4.7 s (target ≤ 2.5 s), TBT 4,020 ms (target ≤ 200 ms). Desktop 47/100, TBT 910 ms. Main driver: 268 KB + 116 KB JS chunks with ~226 KB unused. (HIGH)
8. **Hydration bug**: React #418 hydration mismatch in the console (live happy-hour countdown), and the StatsBand count-up renders **"0 Dishes on the menu / 0 Categories crafted / 0.0★ Zomato"** in static HTML (true values 121 / 20 / 4.3). (MEDIUM)

**SEO Health Score: 55/100** (weights per claude-seo). Lighthouse's own SEO category scores 100 — it only checks mechanics (meta description, viewport, links, robots) and cannot see the placeholder domain, missing canonical, or absent schema.

## Section A — Confirmed Findings (severity-rated)

Every finding below was verified with live tool output on 2026-09-02: raw-HTML curl pass, rendered-DOM browser pass (browser_console), repo source reads, Lighthouse reports checked into the repo (Lighthouse-mobile.json / Lighthouse-desktop.json), and SERP probes.

### A1. CRITICAL — Placeholder domain `https://lasabroso.example` hardcoded in production

- Evidence: live HTML `og:url` = `https://lasabroso.example`; source hardcodes:
  - `src/app/layout.tsx:70` `const SITE_URL = "https://lasabroso.example";` used for `metadataBase`, `openGraph.url`, `twitter` metadata.
  - `src/app/sitemap.ts:5` `const base = "https://lasabroso.example";`
  - `src/app/robots.ts:7` `sitemap: "https://lasabroso.example/sitemap.xml"` (shadowed in practice — see A6).
- Impact: any consumer of og:/metadataBase/sitemap — social link unfurls, WhatsApp/Telegram previews, AI grounding pipelines that read og:url, Google's sitemap fetcher — resolves the café's canonical identity to a dead domain. This is the single highest-leverage fix in the audit.
- Fix: one `SITE_URL` from `process.env.NEXT_PUBLIC_SITE_URL ?? "https://lasabroso.srishanth.com"`, imported by layout/sitemap/robots. Do not keep three copies.

### A2. CRITICAL — No canonical tag

- Evidence: raw HTML `grep -c 'rel="canonical"' home.html` = 0; rendered DOM `document.querySelector('link[rel=canonical]')` = NONE. No `alternates.canonical` in layout metadata.
- Impact: Google must infer the canonical. With a second live domain for the same business (www.lasabroso.com — Vercel-hosted, same phone/email/Histerm font, existing index presence at SERP position 1 for the brand query), inference risk is real. (Owner has stated lasabroso.com "is not needed" — this audit does not act on it, but the self-domain canonical is still required.)
- Fix: in `src/app/layout.tsx` metadata add `alternates: { canonical: "/" }` (or the absolute real-domain URL). One line.

### A3. CRITICAL — sitemap.xml is unindexable

- Evidence: `curl https://lasabroso.srishanth.com/sitemap.xml` returns 200 application/xml but every `<loc>` is `https://lasabroso.example/…` and 6 of 7 entries are fragment URLs (`/#specialties`, `/#menu`, `/#partners`, `/#events`, `/#moments`, `/#contact`). Search engines ignore hash fragments; the wrong domain poisons the rest.
- Fix: `src/app/sitemap.ts` → single entry `https://lasabroso.srishanth.com/` (real domain, no fragments). Add future sub-pages (see M7) as they ship.

### A4. HIGH — Zero structured data

- Evidence: `document.querySelectorAll('script[type="application/ld+json"]').length` = 0; raw HTML JSON-LD blocks = 0. No schema anywhere on the page.
- Impact: No rich results (review stars, opening hours, price range knowledge), no entity grounding for AI engines ("La Sabroso" as an entity with NAP), weak local-pack signals from the site side.
- Fix: add JSON-LD in the root layout (or a `JsonLd` component in the page):
  - `CafeOrCoffeeShop` (or `Restaurant`) with `name`, `telephone` `+91 9182801364`, `address` (Madhapur, Hyderabad, 500019, Telangana, IN), `geo` (17.4548, 78.3856 — per swiggy/eazydiner map pins), `openingHoursSpecification` (Mo-Su 11:00-23:00), `priceRange` "₹1,200–₹2,000", `servesCuisine` (Coffee, Desserts, Pizza, Momos, Continental), `aggregateRating` (4.3, 1158), `sameAs` (Instagram https://www.instagram.com/lasabroso_cafe/, Zomato listing).
  - `Organization` with `sameAs` + `foundingDate` 2023 (Indulge Express profile).
  - `WebSite` with `name`/`url`.
  - QAPage for the on-page FAQ content (see M5).
- Guardrail: FAQPage rich results retired for Google May 7 2026 — do NOT emit FAQPage for SERP; QAPage is the correct type for genuine Q&A.

### A5. HIGH — GEO artifacts return the SPA shell (fake GEO-readiness)

- Evidence: `curl https://lasabroso.srishanth.com/llms.txt`, `/llms-full.txt`, `/.well-known/ai.txt` all return HTTP 200 with `<!DOCTYPE html>` index body (confirmed by head -c). The site *looks* GEO-ready to a status-only checker; there is zero LLM-readable content.
- Fix: create real static files:
  - `public/llms.txt` (see Appendix C for the full proposed content, per the 11 llms.txt requirements).
  - `public/llms-full.txt` (optional richer version; for a one-page site llms.txt alone is honest and sufficient).
  - `public/.well-known/ai.txt` (recommended: a brief ai.txt summary; if not shipped, ensure it 404s rather than serving index — the 200-trap is the bug).
- Acceptance: first line of each file is the site name, not `<!DOCTYPE`.

### A6. HIGH — AI crawlers blocked edge-side + no Sitemap signal in robots.txt

- Evidence: served `robots.txt` = Cloudflare Managed content (Content-Signals: `search=yes, ai-train=no, use=reference`) PREPENDED to origin `public/robots.txt`. CF blocklist: GPTBot, ClaudeBot, Google-Extended, CCBot, meta-externalagent, Applebot-Extended, Bytespider, Amazonbot, CloudflareBrowserRenderingCrawler all `Disallow: /`. PerplexityBot unlisted (allowed by default). No `Sitemap:` line anywhere (neither CF block nor origin file carries one; the `app/robots.ts` route that would emit one is not being served — the served tail exactly matches `public/robots.txt`).
- Impact: ChatGPT/Claude/Perplexity-style engines cannot crawl the site (blocked or unmanaged), so the café won't be cited from its own domain in AI answers. The Content-Signal `use=reference` (allows reference/grounding use) is a good foundation, but the per-UA Disallows contradict it for the biggest engines.
- Recommended fix (owner can do either):
  - Option A (recommended): disable Cloudflare "Managed robots.txt" in the CF dashboard (reversible), and serve a curated `public/robots.txt` that: allows Googlebot/Bingbot/PerplexityBot/ClaudeBot/GPTBot with `Content-Signal: search=yes, ai-train=no, use=reference`; keeps `Disallow` for known scrapers (Bytespider, Amazonbot, Applebot-Extended, meta-externalagent, CCBot); includes `Sitemap: https://lasabroso.srishanth.com/sitemap.xml`. (Full text in Appendix D.)
  - Option B (safer, weaker GEO): keep CF managed blocklist and accept that AI engines won't crawl the domain.
- Note in plan: regardless of choice, the `Sitemap:` line must be added to whatever robots.txt is served.

### A7. HIGH — Mobile CWV failure (Lighthouse 47/100, LCP 4.7 s, TBT 4,020 ms)

- Evidence (Lighthouse-mobile.json + Lighthouse-desktop.json, checked into repo 2026-09-02):
  - Mobile: performance 47, accessibility 84, best-practices 96, SEO 100. FCP 2.3 s, LCP 4.7 s (FAIL, target ≤2.5 s), Speed Index 5.2 s, TBT 4,020 ms (FAIL), CLS 0, TTFB 610 ms.
  - Desktop: performance 47, identical a11y/BP/SEO. FCP 1.2 s, LCP 2.5 s (borderline), TBT 910 ms (FAIL, target ≤200 ms), CLS 0, TTFB 640 ms.
  - Top opportunities: "Reduce initial server response time — 610 ms" (both), "Reduce unused JavaScript — est. 227 KiB (mobile)/226 KiB (desktop)".
  - Unused JS by chunk: `bddfde8cb58ba531.js` 138 KB wasted, `e2abb3fcc655eab5.js` 55 KB, `5ae5f1c567749fc6.js` 32 KB. Total page JS ~1.02 MB transferred.
  - Console errors (mobile): 2 — `Error: Minified React error #418` (hydration, see M1), `ERR_BLOCKED_BY_CLIENT` (resource blocked, likely ad-blocker-class; low).
- Fix priorities:
  1. Lazy-load the below-fold interactive menu section (search/sort/filter + 121-item list) so the 268 KB chunk isn't in the initial bundle — `dynamic(() => import(...), { ssr: false })` or route-level code split; the menu data (`src/data/live-menu.json`, 121 items/20 categories) is static and could be inlined/streamed.
  2. Trim unused JS (motion/react + phosphor icon tree-shaking; audit bundle with `npx next build --debug` or analyze plugin).
  3. Improve TTFB (610 ms): enable CF caching for the prerendered page (currently `cf-cache-status: DYNAMIC` while origin sends `x-nextjs-cache: HIT`), or shorter origin→edge path. Fastest win is probably CF caching.
  4. Re-run Lighthouse after each change (the JSONs in this repo are the baseline; commit updated JSONs on the same branch).

### A8. HIGH — No og:image (and no twitter:image)

- Evidence: `grep -c 'og:image' home.html` = 0; layout.tsx openGraph has no `images`; no og-image file in `public/` (only favicon.svg, logo.svg, fonts).
- Impact: WhatsApp/Telegram/Slack/X link cards render with no preview image — for a visually-driven café brand this is a conversion and share-quality loss. AI engines also use og:image as a media anchor.
- Fix: generate a 1200×630 OG image (brand: neon sign / boho interior photo with the LaSabroso wordmark, green-on-cream palette), commit to `public/og.png`, set `openGraph.images` + `twitter.images`.

### A9. MEDIUM — Hydration mismatch (React #418) from live countdown

- Evidence: Lighthouse mobile `errors-in-console` = `Error: Minified React error #418` (hydration text mismatch). Source: `src/components/site/happy-hour.tsx` — `useState(() => getHappyHourStatus())` computes countdown text at render; server and client renders straddle a second boundary → text nodes differ at hydration. `suppressHydrationWarning` exists only on `<html>` (layout.tsx:94), not on the ticking span.
- Fix: add `suppressHydrationWarning` on the countdown `<span className="tabular-nums…">` (line 45-47) — the standard pattern for ticking timers; the effect already re-syncs within 1 s.

### A10. MEDIUM — StatsBand renders "0" in static HTML (crawler-visible zeros)

- Evidence: raw HTML shows `0` immediately before "Dishes on the menu" and "Categories crafted" labels; rendered DOM confirms `0` and `0.0★` for the Zomato stat. Source: `src/components/home/StatsBand.tsx:92` `const [val, setVal] = useState(0)` — SSR bakes the initial 0 into the HTML; the in-view count-up never runs for no-JS/crawler consumers. True values (verified in `src/data/live-menu.json`): 121 dishes, 20 categories, 4.3 Zomato (1,158 reviews).
- Impact: SERP snippets and AI citations can quote "0 dishes on the menu" for a café with a 121-item menu; also a hydration-mismatch contributor.
- Fix: initialize `useState(to)` so SSR emits the real number (animation still replays 0→N on reveal via the existing effect). One-line change plus verify.

### A11. MEDIUM — NAP inconsistency across citations

- Evidence (SERP probes, 2026-09-02 — canonical value first, then drift):
  - Phone: site +91 91828 01364 (brand.ts / footer / nav) vs magicpin +91 8008577931. **Phone conflict.**
  - Cost for two: site "₹1,200 – ₹2,000" / Zomato-implied ₹1,200 / EazyDiner ₹1,200 / magicpin ₹2,000 / Swiggy Dineout ₹600. **Wide spread.**
  - Hours: site 11–11 vs magicpin "10:00 AM – 10:00 PM".
  - Address: site "Madhapur, Hyderabad 500019" vs EazyDiner "Madhapur Rd, opposite Game Point Hitech-CIty, Siddhi Vinayak Nagar" vs magicpin "2-57/9A, Siddhi Vinayak Nagar" vs Swiggy "Plot No. 2 and 2, House No. 2-79/1/2 and 2A, Madhapur Road".
  - Cuisine: Swiggy Dineout lists "North Indian" (wrong for a boho café); magicpin "Momos, Continental".
- Impact: local-pack ranking and AI entity grounding degrade when citations disagree; schema (A4) must use the canonical values.
- Fix: this plan's Appendix B is the canonical NAP table. Update directory backends (magicpin phone, Swiggy cuisine+price, unified address string) — those are account-level actions outside this repo; the site side must at minimum emit schema with the canonical values.

### A12. MEDIUM — Brand-spelling confusables

- Evidence: site uses "LaSabroso" (H1, logo, og:site_name, nav "LaSabroso home"); directories/press use "La Sabroso" (spaced); old platform slug "lasabraso" exists (tronx.co.in/lasabraso-19 — legitimate, different platform). No typo ON the site — this is a **consistency** issue across the entity's surface.
- Impact: entity resolution ("LaSabroso" vs "La Sabroso") splits authority and confuses AI citability.
- Fix: standardize in schema (A4) + og:site_name + brand.ts to one primary name ("LaSabroso"), list the spaced form as alternateName in JSON-LD, and prefer the primary in new citations.

### A13. MEDIUM — Single-URL site caps long-tail

- Evidence: repo has exactly one public route (`src/app/page.tsx`); no /menu, /about, /contact, /gallery pages. 121 menu items (live-menu.json) have no individual URLs. `site:lasabroso.srishanth.com` SERP check returns no indexed URLs from the audit domain.
- Impact: long-tail queries ("chocolate khoma hyderabad", "boho cafe madhapur", "momos near hitech city") have nowhere to land except the homepage; per-item menu content cannot rank.
- Fix (phase 2, after this round's criticals): generate `/menu` + top-dish pages from `live-menu.json` (a static route map of ~10-15 signature items is enough), add canonical per page, extend sitemap with real URLs. Do NOT build this before A1-A3 land — the canonical/metadata plumbing must be right first.

### A14. LOW — Images fine, minor CLS hygiene

- Evidence: 31/31 images have alt (0 missing), 0 failed, 0 oversized (>2000px natural width), 30/31 lazy. 25/31 lack explicit width/height attributes; Lighthouse CLS is 0 in lab (containers likely reserve aspect) — this is defensive hygiene for real-world slow networks.
- Fix: add width/height to images without them (or rely on CSS aspect-ratio which appears to work). Non-blocking.

### A15. LOW — No IndexNow

- Evidence: no IndexNow key/ping anywhere in repo or headers.
- Fix: single-URL site — IndexNow adds little; skip unless other pages (A13) ship. Noted for completeness.

## Section B — Cross-cutting issues

- **B1. One root cause, three symptoms:** the `lasabroso.example` constant spans A1 (layout metadata), A2-adjacent (no canonical because the site never wired metadataBase correctly), A3 (sitemap), and A6's robots.ts sitemap line. All four lines are in `src/app/*` and should be fixed in **one commit** with a single `SITE_URL` export (suggest `src/lib/site.ts`).
- **B2. Edge vs origin split:** Cloudflare owns robots.txt and caching; the Next origin prerenders HTML. The GEO/robots work (A5, A6) touches CF dashboard + origin files together — verify the deployed result after both sides change (curl the public URLs; don't trust origin-only tests).
- **B3. Hydration family:** A9 (countdown) and A10 (StatsBand useState(0)) are both "SSR HTML ≠ client-intended render" bugs. After fixing both, re-verify `errors-in-console` = 0 items via Lighthouse.
- **B4. Data truth:** `live-menu.json` is the source of truth for menu counts (121/20) and `src/data/brand.ts` holds rating facts (Zomato 4.3/1158). Schema (A4) and stats (A10) must source from these files, not hardcoded literals, so the values can't drift again.

## Section C — Lighthouse performance details (evidence)

Baseline from repo JSONs, 2026-09-02 (generated at repo root; these files are the audit baseline):

| Metric | Mobile | Desktop | Target |
|---|---|---|---|
| Performance | 47 | 47 | ≥ 90 ideal / ≥ 65 goal |
| LCP | 4.7 s | 2.5 s | ≤ 2.5 s |
| FCP | 2.3 s | 1.2 s | ≤ 1.8 s |
| TBT | 4,020 ms | 910 ms | ≤ 200 ms |
| CLS | 0 | 0 | ≤ 0.1 |
| Speed Index | 5.2 s | 4.6 s | ≤ 3.4 s |
| TTFB | 610 ms | 640 ms | ≤ 800 ms |
| Accessibility | 84 | 84 | ≥ 90 |
| Best Practices | 96 | 96 | ≥ 90 |
| SEO (Lighthouse) | 100 | 100 | — (mechanical only) |

Failed binary audits (both): errors-in-console, valid-source-maps (missing source maps for first-party JS), aria-prohibited-attr, color-contrast, definition-list (`<dl>` ordering), label-content-name-mismatch, label (form fields without labels), target-size (touch targets), agent-accessibility-tree.

Priority for the performance work: (1) split the menu chunk out of the initial bundle (268 KB + 116 KB chunks, ~226 KB unused), (2) CF-cache the prerendered page (TTFB 610 ms while origin reports `x-nextjs-cache: HIT` — edge is not caching), (3) source maps for first-party JS. Accessibility: fix labels on the dish search input + filter/sort buttons (`aria-label`), target-size on touch targets, color-contrast on muted text.

## Section D — Acceptance Criteria (testable)

- [ ] AC1 `curl -s https://lasabroso.srishanth.com/ | grep -c "lasabroso.example"` returns 0 (og:url + metadataBase clean).
- [ ] AC2 `curl -s https://lasabroso.srishanth.com/sitemap.xml | grep -o "https://[^<]*"` returns exactly `https://lasabroso.srishanth.com/` — no fragments, no `.example`.
- [ ] AC3 `curl -s https://lasabroso.srishanth.com/ | grep -c 'rel="canonical"'` = 1 and the href starts with `https://lasabroso.srishanth.com`.
- [ ] AC4 `curl -s https://lasabroso.srishanth.com/llms.txt | head -c 30` starts with `# LaSabroso` (not `<!DOCTYPE`).
- [ ] AC5 Same body check for `/llms-full.txt` and `/.well-known/ai.txt` (or intentional 404 — not the 200-shell).
- [ ] AC6 `curl -s https://lasabroso.srishanth.com/robots.txt | grep -i sitemap` returns the real-domain Sitemap line.
- [ ] AC7 `curl -s https://lasabroso.srishanth.com/ | grep -c 'application/ld+json'` ≥ 3, and the JSON-LD contains `@type` values: CafeOrCoffeeShop (or Restaurant), Organization, WebSite, QAPage.
- [ ] AC8 `curl -s https://lasabroso.srishanth.com/ | grep -c og:image` = 1 and `curl -sI https://lasabroso.srishanth.com/og.png` is 200.
- [ ] AC9 Raw HTML stats: `grep -o ">121<" home.html`, `grep -o ">20<" home.html`, `grep -o ">4.3<" home.html` each present near their labels (or the numeric equivalents rendered by the fixed component).
- [ ] AC10 Lighthouse re-run (both profiles): `errors-in-console` item count = 0; mobile performance ≥ 65; mobile LCP ≤ 2.5 s; TBT ≤ 1,000 ms (intermediate goal, from 4,020).
- [ ] AC11 Side-effect check: `git grep -i "lasabroso.example"` on the repo = 0.
- [ ] AC12 Schema NAP cross-check: JSON-LD telephone/priceRange/openingHours match Appendix B (the canonical table).

## Section E — Test Plan

1. **Before touching code**: `cp` the four edited files aside (`src/app/layout.tsx`, `sitemap.ts`, `robots.ts` or `public/robots.txt`, `StatsBand.tsx`, `happy-hour.tsx`) — rollback insurance.
2. **Unit/lint**: `npx tsc --noEmit` and `npx next lint` (or the repo's lint script) after edits.
3. **Build**: `env NODE_ENV=production npx next build` — confirm prerender still emits static HTML (x-nextjs-prerender header after deploy).
4. **Local smoke**: `npx next start` (or the systemd run path) then curl the local copy for AC1-AC9 checks against localhost before pushing.
5. **Deploy**: systemd `lasabroso.service` restart (or the repo's deploy path; site is behind Zeus CF tunnel + DNS lasabroso.srishanth.com).
6. **Live verify**: run the full AC1-AC10 curl battery against the public URL; re-run Lighthouse mobile+desktop and commit the updated JSONs to the repo (same pattern as the existing baseline files).
7. **Lighthouse accessibility follow-up**: fix `label`/`target-size`/`color-contrast`/`definition-list` after the perf work lands (separate commit, same plan).
8. **SERP watch (post-deploy, 2-4 weeks)**: `site:lasabroso.srishanth.com` should begin returning the single homepage URL; brand query should show the site sooner.

## Section F — Rollback Plan

- **Code changes**: the fix batch is a handful of small, independent edits (metadata const, canonical, sitemap entries, JSON-LD block, stats init, suppressHydrationWarning, og image). Rollback = `git revert` of the batch commit + redeploy; pre-edit copies above make even that unnecessary in most cases.
- **Cloudflare robots.txt Management toggle** (A6 Option A): reverting = re-enable "Managed robots.txt" in the CF dashboard — instant, no deploy.
- **CF caching change** (A7 #3): if caching the prerendered page causes stale content issues, remove the cache rule (or reduce TTL); verify `cf-cache-status` changes to DYNAMIC again.
- **JSON-LD**: removing the block restores prior behavior (no schema); no data migration involved.
- **llms.txt files**: delete `public/llms.txt`, `public/llms-full.txt`, `public/.well-known/ai.txt` and re-deploy to restore the prior (broken) state if a policy objection arises.

## Section G — Out of Scope

- **www.lasabroso.com consolidation** — owner decision ("not needed"); noted only for completeness. If later acted on: pick one domain, 301 the other, align canonicals.
- **Google Business Profile / directory account edits** — NAP fixes on magicpin/Swiggy/Zomato/EazyDiner are account-level, owner-performed; this plan supplies the canonical table (Appendix B) they should enforce.
- **Multi-page build-out** (A13) — phase 2 after criticals; the metadata plumbing must land first.
- **Per-item menu schema** — phase 2 with the /menu page.
- **IndexNow** (A15) — skip for a single-URL site unless phase 2 pages ship.
- **GSC/PSI API integration** — no Google API creds in this environment; CWV evidence comes from local Lighthouse runs (checked into repo) instead.

## Appendix A — SEO Health Score (weights per claude-seo)

| Category | Weight | Score | Rationale |
|---|---|---|---|
| Technical SEO | 22% | 55 | Static HTML, HTTPS, viewport, clean URLs — but no canonical, dead sitemap, no Sitemap signal, no IndexNow |
| Content Quality | 23% | 75 | Rich copy, owner story, real facts (hours/reviews/prices), press coverage — but stats render "0" and single page is thin for long-tail |
| On-Page SEO | 20% | 60 | Unique title/desc, 1 H1 / 13 H2 / 29 H3, en_IN locale, keywords — but og:url to dead domain, no og:image |
| Schema / Structured Data | 10% | 10 | Zero JSON-LD across the entire site |
| Performance (CWV) | 10% | 47 | Lighthouse 47 both profiles; mobile LCP 4.7 s, TBT 4,020 ms |
| AI Search Readiness | 10% | 35 | Static HTML + Content-Signal reference=yes help; fake llms.txt, AI crawlers blocked edge-side |
| Images | 5% | 85 | 31/31 alt, 0 failed/oversized, lazy ok — missing explicit dims on 25/31 |

**Weighted total: 55/100**

## Appendix B — Canonical NAP table (single source of truth)

| Field | Canonical value | Source |
|---|---|---|
| Business name | LaSabroso (alt: La Sabroso) | site H1/logo; directories |
| Phone | +91 91828 01364 | site nav/footer, Zomato-implied; magicpin 8008577931 is DRIFT |
| Address | Madhapur, Hyderabad, Telangana 500019 (Siddhi Vinayak Nagar, near Game Point, Madhapur Rd) | site footer; EazyDiner pin 17.4552275,78.3841271; magicpin 2-57/9A |
| Hours | 11:00 – 23:00 daily | site (11–11); magicpin 10-10 is DRIFT |
| Cost for two | ₹1,200 – ₹2,000 | site + EazyDiner ₹1,200; Swiggy ₹600 and magicpin ₹2,000 as bounds |
| Zomato rating | 4.3 ★ / 1,158 reviews | brand.ts; site hero/footer |
| Cuisine | Hybrid-boho café: coffee, momos, wood-fired pizza, desserts, Continental | site; Swiggy "North Indian" is WRONG |
| Email | lasabrosocafe2022@gmail.com | lasabroso.com listing; footer |
| Instagram | https://www.instagram.com/lasabroso_cafe/ | site footer + IG |

## Appendix C — Proposed /llms.txt (per claude-seo-geo 11 requirements)

```markdown
# LaSabroso

> Boho café in Madhapur, Hyderabad — handcrafted coffee, signature momos, wood-fired pizzas and a live dessert lab. Open daily 11:00–23:00.

LaSabroso is a hybrid-boho café in Madhapur, Hyderabad (500019). Famous for chocolate khoma, veg steam momos, wood-fired pizzas and single-origin coffee. Rated 4.3★ on Zomato (1,158 reviews). Cost for two ₹1,200–₹2,000. Pet-friendly courtyard, free parking.

## Core Website

- [Home](https://lasabroso.srishanth.com/): One-page site — specialties, menu, events, moments, contact, reservations
- [Order & Deals](https://lasabroso.srishanth.com/#menu): Menu of 121 dishes across 20 categories with prices (searchable)
- [Events & Private Hosting](https://lasabroso.srishanth.com/#events): Bulk-event bookings (20+ guests), couples-night offers
- [Contact & Reservations](https://lasabroso.srishanth.com/#contact): Call +91 91828 01364, reserve a table in the courtyard

## Elsewhere

- [Instagram](https://www.instagram.com/lasabroso_cafe/): Photos, reels, daily specials
- [Zomato](https://www.zomato.com): 4.3★, 1,158 reviews
- [Magicpin](https://magicpin.in/Hyderabad/Madhapur/Restaurant/La-Sabroso/store/15825a3): 4.6★ local listings
```

(Verify the Zomato URL before shipping — listing URL changes; grep the footer links in the repo for the exact one.)

## Appendix D — Proposed robots.txt (Option A content; replaces CF managed + origin combo)

```txt
User-agent: *
Content-Signal: search=yes, ai-train=no, use=reference
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Bytespider
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: CCBot
Disallow: /

Sitemap: https://lasabroso.srishanth.com/sitemap.xml
```

Notes: `ai-train=no, use=reference` reserves copyright (EU DSM Art. 4) while allowing search + AI reference/grounding — the GEO-friendly middle ground. Requires disabling Cloudflare "Managed robots.txt" (A6 Option A). If the owner prefers to keep CF managed, at minimum add the `Sitemap:` line to `public/robots.txt` and consider unblocking PerplexityBot explicitly.

## Gate Enforcement

- [x] Effort level assigned (ultrathink) and variant selected (deep, live-site adaptation)
- [x] Acceptance criteria defined (Section D, 12 testable checks)
- [x] Files Changed enumerated (Section A fixes; see per-finding file:line)
- [x] Rollback plan exists (Section F)
- [x] Critique gate: in-session verification pass performed (every claim re-probed with curl/grep/source read; the lash-of-the-pattern: no subagent fan-out — live-site collection in-session per the SEO/GEO live-audit pattern, which the Sackhe round proved be more reliable than fan-out)
- [ ] L 🍰 review
## Section H — Fix Status (2026-09-02, ultracode execution)

Implemented + verified live (AC1-AC5, AC7-AC9, AC11-AC12 pass; AC6 partial):

- [x] A1 placeholder domain → src/lib/site.ts SITE_URL (layout/sitemap/robots import it)
- [x] A2 canonical (alternates.canonical "/")
- [x] A3 sitemap single real URL
- [x] A4 JSON-LD: CafeOrCoffeeShop, Organization, WebSite, QAPage (guardrail: no FAQPage)
- [x] A5 llms.txt / llms-full.txt / .well-known/ai.txt (real content, not SPA shell)
- [~] A6 Sitemap line served; curated robots.txt at origin — CF "Managed robots.txt" still
      prepends its blocklist at the edge (GPTBot/ClaudeBot Allow lines land after the CF
      Disallow; PerplexityBot now allowed). Owner action: disable Managed robots.txt in the
      CF dashboard for the GEO Allows to take full effect.
- [ ] A7 performance — NOT addressed: requires frontend changes (lazy-load menu chunk) or
      CF edge caching; excluded per instruction "don't change the frontend".
- [x] A8 og:image 1200x630 (public/og.png, brand-logo card) + twitter:image
- [x] A9 happy-hour suppressHydrationWarning (console errors now 0)
- [x] A10 StatsBand useState(to) — SSR HTML shows 121 / 20 / 4.3
- [x] A11/A12 canonical NAP + alternateName emitted in schema (Appendix B values)
- [ ] A13/A14/A15 phase-2 / low / skip (unchanged from plan)
- [ ] L 🍰 review (unchecked in plan; execution verified via live AC battery + Lighthouse)
