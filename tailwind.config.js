/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          dark: "#141414",
          gold: "#D4AF37",
          "gold-light": "#E8C547",
          white: "#FAFAFA",
          gray: "#888888",
          "dark-gray": "#1E1E1E",
        },
      },
    },
  },
  plugins: [],
};
