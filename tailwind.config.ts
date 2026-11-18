import type { Config } from "tailwindcss";

// Brand tokens for YOYO Pro Services: "blueprint and sign paint".
// navy = the drafting field and the type (primary), gold = the sign-painted
// panel that carries every call to action (secondary, used as a fill with
// navy text, never as text on light grounds), blueprint = line work and
// quiet labels on navy (supplemental). Paper and rule are the neutrals.
// Contrast pairs are listed in BUILD_NOTES.md.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#15264F",
          deep: "#0E1B3B",
          raised: "#1D3263",
        },
        gold: {
          DEFAULT: "#F6B91C",
          deep: "#E9A90A",
          tint: "#FDEFC8",
        },
        blueprint: "#9DB2E0",
        paper: {
          DEFAULT: "#F7F5EF",
          2: "#EDE9DF",
        },
        // Muted text on paper and white
        muted: "#4D5875",
        // Decorative rules on paper (never the only boundary of a control)
        rule: "#CFC9BA",
        // Plan line work on paper (3:1 against paper)
        plan: "#7E8BAA",
      },
      fontFamily: {
        sans: ['"Archivo Variable"', "Archivo", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.6rem, 6.4vw, 5.5rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(2.1rem, 4.4vw, 3.75rem)", { lineHeight: "1" }],
        "display-md": ["clamp(1.6rem, 2.8vw, 2.375rem)", { lineHeight: "1.05" }],
        "display-sm": ["1.375rem", { lineHeight: "1.15" }],
        lead: ["1.1875rem", { lineHeight: "1.55" }],
      },
      maxWidth: {
        site: "76rem",
      },
      letterSpacing: {
        label: "0.12em",
        wordmark: "0.28em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
