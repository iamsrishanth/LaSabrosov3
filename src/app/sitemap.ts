import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single canonical URL — the site is one page; fragment URLs (#menu, …)
  // are not indexable and were poisoning the sitemap (audit A3).
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}