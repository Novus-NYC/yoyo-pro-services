import { ImageResponse } from "next/og";
import { brandColors, MONOGRAM_P_PATH, MONOGRAM_VIEWBOX, MONOGRAM_Y_PATH } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the YP monogram on the navy tile (iOS rounds the corners). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.navy,
        }}
      >
        <svg viewBox={MONOGRAM_VIEWBOX} width="150" height="150">
          <path d={MONOGRAM_Y_PATH} fill={brandColors.paper} />
          <path d={MONOGRAM_P_PATH} fillRule="evenodd" fill={brandColors.gold} />
        </svg>
      </div>
    ),
    size,
  );
}
