import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#fdfbf7",
          100: "#f7f3ec",
          200: "#ede7dc",
          300: "#dfd6c5",
          400: "#c7b8a1",
        },
        charcoal: {
          950: "#121417",
          900: "#1e2022",
          800: "#2d3139",
          700: "#3e434d",
          600: "#555b67",
        },
        crimson: {
          50: "#fff1f2",
          100: "#ffe4e6",
          500: "#e11d48",
          600: "#be123c",
          700: "#991b1b",
          800: "#7f1d1d",
          900: "#4c0519",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        ink: "#1e2022",
        chalk: "#fdfbf7",
        board: "#ede7dc",
        accent: "#991b1b",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        chalk: ["var(--font-chalk)", "cursive"],
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
