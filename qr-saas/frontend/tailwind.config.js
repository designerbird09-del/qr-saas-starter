/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f7f8f8",
          100: "#e3e4e4",
          200: "#c9caca",
          300: "#9a9b9b",
          400: "#6e6f6f",
          500: "#525353",
          600: "#3a3b3b",
          700: "#252626",
          800: "#141515",
          900: "#08090a",
        },
      },
    },
  },
  plugins: [],
};
