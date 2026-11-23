import type { MetadataRoute } from "next";
import { games } from "@/lib/site";

const base = "https://quibinc.dpdns.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/games", "/music", "/projects", "/devlog", "/about", "/contact", "/mediaocre", "/team-thorn"];

  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...games.map((game) => ({
      url: `${base}/games/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
