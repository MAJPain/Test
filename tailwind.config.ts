import type { Config } from "tailwindcss";

/**
 * Maison Noire design system.
 * The palette, type scale, and motion tokens below are the single source of
 * truth for the whole site — components reference these names, never raw hex.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette
        navy: {
          DEFAULT: "#0A2540", // deep primary navy
          light: "#1A3A5C", // lighter supporting blue
        },
        brown: {
          DEFAULT: "#8B6B47", // warm taupe / accent
          light: "#A6855F",
        },
        cream: "#E8E2D8",
        offwhite: "#FAFAF7",
        ink: "#0A0A0A", // near-black text

        // shadcn/ui semantic tokens, remapped to the brand
        background: "#FAFAF7",
        foreground: "#0A0A0A",
        primary: {
          DEFAULT: "#0A2540",
          foreground: "#FAFAF7",
        },
        accent: {
          DEFAULT: "#8B6B47",
          foreground: "#FAFAF7",
        },
        muted: {
          DEFAULT: "#E8E2D8",
          foreground: "#5A5A52",
        },
        border: "#E8E2D8",
        ring: "#8B6B47",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        eyebrow: "0.35em",
      },
      transitionTimingFunction: {
        // Signature editorial easing used across reveals + hovers
        editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
