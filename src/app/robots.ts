import type { MetadataRoute } from "next";
import { hasPublicSiteUrl, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // The sitemap is only advertised at an address that is really the site's
    ...(hasPublicSiteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
