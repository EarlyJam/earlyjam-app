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
        fraunces: ['"Fraunces"', ...defaultTheme.fontFamily.sans],
        "dm-sans": ['"DM Sans"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "white/10": "#FFFFFF1A",
        "primary/20": "#7AD38E33",
        "primary/24": "#7AD38E3D",
        "primary/60": "#7AD38E99",
        "beige-secondary": "#F7F5F0",
        "blue-secondary-dark": "#051D56",
        "blue-secondary-dark/90": "#051d56e6",
        "blue-800": "#31477C",
        gray: "#D9D9D9",
        "gray-30": "#DFE2E1",
        "gray-50": "#FCFCFD",
        "gray-100": "#F9FAFB",
        "gray-200": "#F2F4F7",
        "gray-250": "#F5F6F6",
        "gray-200/24": "#F2F4F73D",
        "gray-300": "#EAECF0",
        "gray-400-disable": "#D0D5DD",
        "gray-500": "#98A2B3",
        "gray-600-secondary": "#667085",
        "gray-700": "#475467",
        "gray-800": "#344054",
        "gray-900": "#1D2939",
        "gray-920": "#182230",
        "gray-950": "#181B1B",
        "blue-primary-500": "#628EF8",
        "green-50": "#F3FBF5",
        "green-100": "#E4F6E8",
        "green-500": "#7AD38E",
        "green-700": "#518D5F",
        "green-800": "#3D6947",
        "functional-warning-50": "#FFFAF0",
        "functional-warning-100": "#FEEFD0",
        "functional-warning-500": "#FAAD14",
        "functional-warning-600": "#FF9601",
        "functional-success-100": "#CDEADD",
        "functional-success-300": "#81CBAA",
        "functional-success-400": "#57BA8E",
        "functional-success-500": "#039855",
        "functional-success-900": "#01331C",
        "functional-link-100": "#D1E9FF",
        "functional-link-400": "#2E90FA",
        "functional-link-500": "#1890FF",
        "functional-error-100": "#F04438",
        "functional-error-200": "#FD2B2B",
        "sys-on-surface-lighter": "#6F7C7A",
        "sys-outline-light": "#EFF1F0",
        "fix-red": "#FF714E",
        "idea-blue": "#34BBFF",
        "improvement-orange": "#FF9601",

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
        6.5: "26px",
        0.625: "2.5px"
      },
      letterSpacing: {
        customLetterSpacing: "0.4px"
      },
      height: {
        "content-with-header": "calc(100vh - 94px)",
        "app-header": "84px",
        "app-header-mobile": "67px",
        "simple-header": "94px",
        "modal-full": "calc(100% - 40px)",
        3.75: "15px",
        4.5: "18px",
        5.5: "22px",
        8.75: "35px",
        10.5: "42px",
        11.5: "46px",
        13.5: "54px",
        18: "72px",
        30: "120px",
        42: "168px",
        59.5: "238px",
        61: "244px",
        147.25: "589px"
      },
      width: {
        "side-nav": "288px",
        "modal-full": "calc(100% - 40px)",
        3.75: "15px",
        4.5: "18px",
        8.25: "33px",
        10.75: "43px",
        13.5: "54px",
        17.25: "69px",
        28.75: "115px",
        35: "140px",
        60.5: "242px",
        66.25: "265px",
        70: "280px",
        91.5: "366px",
        95.5: "382px",
        97.25: "389px",
        136: "544px",
        140: "560px",
        167.5: "670px",
        200: "800px"
      },
      borderRadius: {
        /* Shadcn UI */
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        customRadius2: "6px",
        customRadius3: "16px",
        customRadius: "99px"
      },
      borderWidth: {
        0.5: "0.5px",
        1.5: "1.5px",
        6: "6px"
      },
      outlineWidth: {
        6: "6px"
      },
      lineHeight: {
        4.2: "16.8px",
        4.5: "18px",
        4.9: "19.6px",
        5.5: "22px",
        5.6: "22.4px",
        11: "44px",
        14: "56px",
        16: "64px",
        19: "76px"
      },
      fontSize: {
        "2.5xl": "28px",
        "5.5xl": "54px"
      },
      maxWidth: {
        card: "696px",
        modal: "425px",
        50: "200px",
        97.25: "389px",
        140: "560px",
        200: "800px",
        256: "1024px",
        262: "1048px",
        304: "1216px",
        196: "784px"
      },
      minWidth: {
        table: "500px"
      },
      gap: {
        0.5: "2px",
        4.5: "18px"
      },
      padding: {
        0.625: "2.5px",
        0.8325: "3.33px",
        2.5: "10px",
        4.5: "18px",
        8.5: "32px",
        13: "52px",
        19.5: "78px"
      },
      margin: {
        header: "94px",
        1.5: "6px",
        4.5: "18px",
        28: "112px"
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
      cursor: {
        pin: "url(data:image/png;base64,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), copy !important"
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
        "ej-2": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "ej-markup-comment-box": "0px 3px 10.8px 0px rgba(0, 0, 0, 0.25)"
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