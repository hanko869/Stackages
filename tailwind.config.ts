import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shimmer: {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        grid: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 8s infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        grid: "grid 30s linear infinite",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        slide: "slide var(--speed) ease-in-out infinite alternate",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        whisper: {
          primary: "#84aac1",
          secondary: "#30475E",
          accent: "#EADBC8",
          neutral: "#ffffff",
          "base-100": "#F1F1F1",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        branding: {
          primary: "#e9fbfc",
          secondary: "#28bcb4",
          accent: "#2d7676",
          neutral: "#173f3e",
          "base-100": "#f9fafc",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        workoutpro: {
          primary: "#f7f6f2",
          secondary: "#30475E",
          accent: "#093119",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        logo: {
          primary: "#F5DAD2",
          secondary: "#EFD595",
          accent: "#B8B2A6",
          neutral: "#ffffff",
          "base-100": "#FDFDF6",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        marketing: {
          primary: "#1a88ad",
          secondary: "#d1f2fb",
          accent: "#fc9780",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        vision: {
          primary: "#92C7CF",
          secondary: "#76ABAE",
          accent: "#9BB8CD",
          neutral: "#291334",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        interioresia: {
          primary: "#146170",
          secondary: "#bca58b",
          accent: "#883c17",
          neutral: "#ffffff",
          "base-100": "#f9fafb",
          "base-200": "#e2e3e4",
          "base-300": "#cccdcd",
          "base-content": "#444442",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        sdxl: {
          primary: "#A34343",
          "primary-content": "#ffffff",
          secondary: "#fd6f9c",
          accent: "#322C2B",
          neutral: "#1b252d",
          "base-100": "#EEEEEE",
          info: "#88e0eb",
          success: "#acdfac",
          warning: "#f0c891",
          error: "#ffbbbd",
        },
        indielogs: {
          primary: "#3b84bc",
          secondary: "#ef9fbc",
          accent: "#25305e",
          neutral: "#291334",
          "base-100": "#faf7f5",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        imagenmia: {
          primary: "#3a83bb",
          secondary: "#ef9fbc",
          accent: "#eeaf3a",
          neutral: "#291334",
          "base-100": "#f9fafb",
          "base-200": "#e2e3e4",
          "base-300": "#cccdcd",
          "base-content": "#151515",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "sunset",
      "dim",
      "nord",
    ],
  },
} satisfies Config;

export default config;
