import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#242424",
          bg: "#FFFFFF",
        },
        gray: {
          2: "#F1F1F1",
          3: "#E3E3E3",
          5: "#C8C8C8",
          6: "#E3E3E3",
          7: "#919191",
          8: "#757575",
          9: "#5E5E5E",
          13: "#171717",
          DEFAULT: "#787774",
          bg: "#E2E2E1",
        },
        brown: {
          DEFAULT: "#9F6B53",
          bg: "#E8E0DC",
        },
        orange: {
          DEFAULT: "#D9730D",
          bg: "#F1E1D2",
        },
        yellow: {
          DEFAULT: "#CB912F",
          bg: "#EEE6D7",
        },
        green: {
          DEFAULT: "#448361",
          bg: "#E4EAE7",
        },
        blue: {
          DEFAULT: "#3680AA",
          bg: "#D8E3E9",
        },
        purple: {
          DEFAULT: "#9065B0",
          bg: "#E6DFEA",
        },
        pink: {
          DEFAULT: "#C14C8A",
          bg: "#F0E5EB",
        },
        red: {
          DEFAULT: "#D44C47",
          bg: "#F0DBDB",
        },
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        md: "0px 2px 4px 0px rgba(0, 0, 0, 0.04)",
        DEFAULT: "0px 2px 8px 0px rgba(0, 0, 0, 0.08)",
        lg: "0px 4px 10px 0px rgba(0, 0, 0, 0.06)",
        xl: "0px 8px 16px 0px rgba(0, 0, 0, 0.08)",
        xl2: "0px 12px 20px 0px rgba(0, 0, 0, 0.10)",
      },
    },
    container: {
      center: true,
      padding: "16px",
      screens: {
        lg: "1100px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },

  plugins: [],
};
export default config;
