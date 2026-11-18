import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { brandColors } from "@/lib/brand";
import { Footer } from "@/lib/components/footer";
import { SiteHeader } from "@/lib/components/site-header";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.name,
};

export const viewport: Viewport = {
  themeColor: brandColors.navy,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior tells Next that html uses smooth scrolling, so
    // route changes still jump to the top instantly.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Marks the document as JS-capable before paint so scroll reveals can
            start hidden. Without JavaScript nothing is ever hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
