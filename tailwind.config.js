/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#90343d",
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
