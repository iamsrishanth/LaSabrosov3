/**
 * Canonical site URL — single source of truth for all metadata.
 * Override with NEXT_PUBLIC_SITE_URL for local/draft environments;
 * production always falls back to the real domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lasabroso.srishanth.com";