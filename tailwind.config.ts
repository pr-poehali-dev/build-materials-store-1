import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./1778491446494961907.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1360px" },
    },
    extend: {
      fontFamily: {
        sans: ["Manrope", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        /* iOS palette */
        ios: {
          bg:     "#F2F2F7",
          black:  "#1C1C1E",
          gray1:  "#48484A",
          gray2:  "#636366",
          gray3:  "#8E8E93",
          gray4:  "#AEAEB2",
          gray5:  "#D1D1D6",
          gray6:  "#E5E5EA",
          yellow: "#FFD60A",
          green:  "#34C759",
          red:    "#FF3B30",
          blue:   "#007AFF",
        },
        brand: {
          yellow:      "#FFD60A",
          "yellow-dim":"rgba(255,214,10,0.15)",
          black:       "#1C1C1E",
          charcoal:    "#48484A",
        },
      },
      borderRadius: {
        DEFAULT: "20px",
        lg: "20px",
        md: "14px",
        sm: "10px",
        xl: "24px",
        "2xl": "28px",
        pill: "50px",
      },
      boxShadow: {
        float:  "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08)",
        "float-hover": "0 4px 16px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.12)",
        yellow: "0 4px 20px rgba(255,214,10,0.35)",
        inset:  "inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
