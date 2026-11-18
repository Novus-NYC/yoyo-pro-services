import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/contact", priority: 0.9 },
  { path: "/about", priority: 0.7 },
];

/** No lastModified: a build-time stamp would claim changes that did not happen. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: route.path === "/" ? siteUrl : `${siteUrl}${route.path}`,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
