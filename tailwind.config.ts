import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
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