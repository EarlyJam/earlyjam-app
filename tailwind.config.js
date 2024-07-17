const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
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
      fontFamily: {
        fraunces: ['"Fraunces"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "primary/24": "#7AD38E3D",
        "beige-secondary": "#F7F5F0",
        "blue-secondary-dark": "#051D56",
        "blue-secondary-dark/90": "#051d56e6",
        gray: "#D9D9D9",
        "gray-200": "#F2F4F7",
        "gray-300": "#EAECF0",
        "gray-400-disable": "#D0D5DD",
        "gray-500": "#98A2B3",
        "gray-600-secondary": "#667085",
        "gray-700": "#475467",
        "gray-800": "#344054",
        "blue-primary-500": "#628EF8",

        /* Shadcn UI */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      height: {
        30: "120px",
        10.5: "42px",
      },
      borderRadius: {
        /* Shadcn UI */
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        6: "6px",
      },
      outlineWidth: {
        6: "6px",
      },
      lineHeight: {
        11: "44px",
        4.5: "18px",
        5.5: "22px",
      },
      fontSize: {
        "2.5xl": "28px",
      },
      maxWidth: {
        50: "200px",
      },
      padding: {
        2.5: "10px",
      },
      margin: {
        1.5: "6px",
        4.5: "18px",
      },
      keyframes: {
        /* Shadcn UI */
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      boxShadow: {
        "ej-card":
          "0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        "ej-2": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
      animation: {
        /* Shadcn UI */
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
