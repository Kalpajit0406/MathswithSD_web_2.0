import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#141311",
        chalk: "#f4f1ea",
        board: "#e9e5da",
        accent: "#b3241b",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        chalk: ["var(--font-chalk)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
