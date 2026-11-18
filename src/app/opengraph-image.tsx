import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/brand";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/lib/metadata";
import { services, site } from "@/lib/site";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = OG_IMAGE_ALT;

/** "We take care" / "of your space." (falls back to one line) */
const taglineLines = site.tagline.includes(" of ")
  ? [site.tagline.slice(0, site.tagline.indexOf(" of ")), site.tagline.slice(site.tagline.indexOf(" of ") + 1)]
  : [site.tagline];

const fontFile = (weight: number) =>
  readFile(join(process.cwd(), "node_modules", "@fontsource", "archivo", "files", `archivo-latin-${weight}-normal.woff`));

/**
 * Shared Open Graph image: the wordmark, the tagline, the four services and
 * the number, on the navy blueprint. Type only: there are no real photos.
 */
export default async function OpenGraphImage() {
  const [heavy, semibold] = await Promise.all([fontFile(800), fontFile(600)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: brandColors.navy,
          backgroundImage:
            "linear-gradient(rgba(157,178,224,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(157,178,224,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          color: brandColors.paper,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 800, lineHeight: 1 }}>YOYO</div>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              fontWeight: 800,
              lineHeight: 1,
              padding: "8px 12px",
              background: brandColors.gold,
              color: brandColors.navy,
              borderRadius: 3,
            }}
          >
            PRO
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, letterSpacing: 4, color: brandColors.blueprint }}>SERVICES</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Set on two lines so "space." never sits alone */}
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            {taglineLines.map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", width: 520, height: 12, marginTop: 22, background: brandColors.gold }} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 28, fontSize: 30, fontWeight: 600, color: brandColors.blueprint }}>
            {services.map((service) => (
              <div key={service.id} style={{ display: "flex" }}>
                {service.name}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 800, color: brandColors.gold }}>{site.phones.primary.display}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: heavy, weight: 800, style: "normal" },
        { name: "Archivo", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
