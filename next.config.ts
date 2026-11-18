import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json sits above this folder on the build machine.
  // Pin both roots to the repo so Next does not pick the wrong workspace.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  // No old site exists (yoyoproservices.com is not registered), so there are
  // no redirects to add. The site ships no raster photos yet, so no image
  // qualities are configured.
};

export default nextConfig;
