import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Mirrors public/robots.txt (which shadows this route at the edge).
// Kept aligned so either path serves the same policy.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
      { userAgent: "meta-externalagent", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}