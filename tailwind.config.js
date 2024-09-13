const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        fraunces: ['"Fraunces"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "primary/24": "#7AD38E3D",
        "beige-secondary": "#F7F5F0",
        "blue-secondary-dark": "#051D56",
        "blue-secondary-dark/90": "#051d56e6",
        gray: "#D9D9D9",
        "gray-50": "#FCFCFD",
        "gray-100": "#F9FAFB",
        "gray-200": "#F2F4F7",
        "gray-200/24": "#F2F4F73D",
        "gray-300": "#EAECF0",
        "gray-400-disable": "#D0D5DD",
        "gray-500": "#98A2B3",
        "gray-600-secondary": "#667085",
        "gray-700": "#475467",
        "gray-800": "#344054",
        "gray-900": "#1D2939",
        "blue-primary-500": "#628EF8",
        "green-50": "#F3FBF5",
        "green-100": "#E4F6E8",
        "green-500": "#7AD38E",
        "green-700": "#518D5F",
        "green-800": "#3D6947",
        "functional-warning-50": "#FFFAF0",
        "functional-warning-100": "#FEEFD0",
        "functional-warning-500": "#FAAD14",
        "functional-success-100": "#CDEADD",
        "functional-success-500": "#039855",
        "functional-success-900": "#01331C",
        "functional-link-100": "#D1E9FF",
        "functional-link-500": "#1890FF",
        "functional-error-100": "#F04438",

        /* Shadcn UI */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      spacing: {
        6.5: "26px"
      },
      height: {
        "content-with-header": "calc(100vh - 94px)",
        "app-header": "84px",
        "app-header-mobile": "67px",
        "simple-header": "94px",
        "modal-full": "calc(100% - 40px)",
        4.5: "18px",
        8.75: "35px",
        10.5: "42px",
        11.5: "46px",
        13.5: "54px",
        30: "120px",
        42: "168px"
      },
      width: {
        "side-nav": "288px",
        "modal-full": "calc(100% - 40px)",
        4.5: "18px",
        13.5: "54px",
        70: "280px",
        97.25: "389px",
        200: "800px"
      },
      borderRadius: {
        /* Shadcn UI */
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      borderWidth: {
        6: "6px"
      },
      outlineWidth: {
        6: "6px"
      },
      lineHeight: {
        4.5: "18px",
        5.5: "22px",
        11: "44px",
        16: "64px"
      },
      fontSize: {
        "2.5xl": "28px"
      },
      maxWidth: {
        card: "696px",
        modal: "425px",
        50: "200px",
        97.25: "389px",
        200: "800px",
        256: "1024px",
        304: "1216px"
      },
      minWidth: {
        table: "500px"
      },
      gap: {
        4.5: "18px"
      },
      padding: {
        2.5: "10px",
        4.5: "18px"
      },
      margin: {
        header: "94px",
        1.5: "6px",
        4.5: "18px"
      },
      space: {
        4.5: "18px",
        7.5: "30px"
      },
      zIndex: {
        header: 1300,
        sidenav: 1400,
        dropdown: 1500,
        modal: 1600,
        notification: 2000
      },
      keyframes: {
        /* Shadcn UI */
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      boxShadow: {
        "ej-card":
          "0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        "ej-2": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
      },
      animation: {
        /* Shadcn UI */
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
