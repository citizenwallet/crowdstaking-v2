import type { Config } from "tailwindcss";

import { breadTheme } from "./bread.theme";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { ...breadTheme },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
export default config;
