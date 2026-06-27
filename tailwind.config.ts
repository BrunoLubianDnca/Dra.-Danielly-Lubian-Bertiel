import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terra: {
          DEFAULT: "var(--color-terra)",
          dark: "var(--color-terra-dark)",
          button: "var(--color-terra-button)",
        },
        cream: {
          DEFAULT: "var(--color-cream)",
          light: "var(--color-cream-light)",
          text: "var(--color-cream-text)",
        },
        sand: "var(--color-sand)",
        brown: "var(--color-brown)",
        gold: "var(--color-gold)",
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          light: "#c47353",
          dark: "#6a351f",
        },
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        accent: {
          DEFAULT: "var(--color-accent)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-foreground)",
        },
        border: "#E8D5C4",
        input:  "#E8D5C4",
        ring:   "#B5622A",
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem",  { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-lg":  ["3rem",    { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
        "display-md":  ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.3"  }],
      },
      borderRadius: {
        lg:   "0.75rem",
        xl:   "1rem",
        "2xl":"1.5rem",
        "3xl":"2rem",
      },
      boxShadow: {
        "card":       "0 2px 16px 0 rgba(181, 98, 42, 0.08)",
        "card-hover": "0 8px 32px 0 rgba(181, 98, 42, 0.16)",
        "premium":    "0 20px 60px -10px rgba(181, 98, 42, 0.22)",
        "glow":       "0 0 40px rgba(232, 196, 154, 0.25)",
      },
      backgroundImage: {
        "gradient-hero":    "linear-gradient(135deg, #FAF6F2 0%, #F5EDE5 50%, #EDE0D4 100%)",
        "gradient-primary": "linear-gradient(135deg, #B5622A 0%, #9A5122 100%)",
        "gradient-warm":    "linear-gradient(135deg, #C97040 0%, #B5622A 100%)",
        "gradient-accent":  "linear-gradient(135deg, #E8C49A 0%, #C98D44 100%)",
        "gradient-card":    "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(250,246,242,0.92) 100%)",
      },
      keyframes: {
        "fade-in":       { "0%": { opacity: "0", transform: "translateY(20px)" },  "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in-left":  { "0%": { opacity: "0", transform: "translateX(-20px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "fade-in-right": { "0%": { opacity: "0", transform: "translateX(20px)" },  "100%": { opacity: "1", transform: "translateX(0)" } },
        "scale-in":      { "0%": { opacity: "0", transform: "scale(0.95)" },        "100%": { opacity: "1", transform: "scale(1)" } },
        "float":         { "0%, 100%": { transform: "translateY(0px)" },            "50%": { transform: "translateY(-10px)" } },
        "shimmer":       { "0%": { backgroundPosition: "-200% 0" },                 "100%": { backgroundPosition: "200% 0" } },
        "pulse-soft":    { "0%, 100%": { opacity: "1" },                            "50%": { opacity: "0.7" } },
      },
      animation: {
        "fade-in":       "fade-in 0.6s ease-out forwards",
        "fade-in-left":  "fade-in-left 0.6s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
        "scale-in":      "scale-in 0.5s ease-out forwards",
        "float":         "float 4s ease-in-out infinite",
        "shimmer":       "shimmer 2.5s linear infinite",
        "pulse-soft":    "pulse-soft 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
