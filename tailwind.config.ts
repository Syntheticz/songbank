import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#015A7F",
        secondary: "#DBB467",
        tertiary: "#004B6A",
      },
      dropShadow: {
        primary: "4px 4px 4px #011F2C",
        secondary: "4px 4px 4px #6F5B34",
        "primary-light": "2px 2px 1px #022E40",
        "secondary-light": "2px 2px 1px rgba(51, 41, 23, 0.25)",
        title: "2px 4px 4px rgba(0, 0, 0, 0.75)",
      },

      fontFamily: {
        montserrat: ["var(--Montserrat)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
