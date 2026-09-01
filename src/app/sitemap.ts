import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lasabroso.example";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#specialties`, lastModified: now, priority: 0.8 },
    { url: `${base}/#menu`, lastModified: now, priority: 0.9 },
    { url: `${base}/#partners`, lastModified: now, priority: 0.7 },
    { url: `${base}/#events`, lastModified: now, priority: 0.7 },
    { url: `${base}/#moments`, lastModified: now, priority: 0.6 },
    { url: `${base}/#contact`, lastModified: now, priority: 0.8 },
  ];
}
