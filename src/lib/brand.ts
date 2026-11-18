/**
 * Brand colours as plain hex, for places Tailwind cannot reach (the Open
 * Graph image, the apple icon, the theme colour). Keep in sync with
 * tailwind.config.ts.
 */
export const brandColors = {
  navy: "#15264F",
  navyDeep: "#0E1B3B",
  navyRaised: "#1D3263",
  gold: "#F6B91C",
  blueprint: "#9DB2E0",
  paper: "#F7F5EF",
} as const;

/**
 * "YP" monogram, drawn on a 64 x 64 grid for the favicon and the apple
 * icon. Our own letter drawing: it does not trace the business's logo.
 * src/app/icon.svg is a static copy of the same paths (keep them in sync).
 */
export const MONOGRAM_VIEWBOX = "0 0 64 64";
export const MONOGRAM_Y_PATH = "M5 13h9.5l3.5 9.5 3.5-9.5H31l-9 20v18h-8V33Z";
export const MONOGRAM_P_PATH = "M36 13h12a11 11 0 0 1 0 22h-4v16h-8Zm8 7v8h3.5a4 4 0 0 0 0-8Z";
