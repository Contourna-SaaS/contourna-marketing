import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://contourna.com", changeFrequency: "weekly", priority: 1 },
    { url: "https://contourna.com/playground", changeFrequency: "monthly", priority: 0.8 },
  ];
}
