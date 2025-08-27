/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#2C3E50",
        background: "#f1f5f9",
      },
      lineHeight: {
        "arabic-xs": "21px",
        "arabic-sm": "23px",
        "arabic-base": "25px",
        "arabic-lg": "29px",
        "arabic-xl": "33px",
        "arabic-2xl": "37px",
        "arabic-3xl": "41px",
        "arabic-4xl": "47px",
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
      function ({ addComponents }) {
        addComponents({
          ".text-arabic-xs":   { fontSize: "12px", lineHeight: "21px" },
          ".text-arabic-sm":   { fontSize: "14px", lineHeight: "23px" },
          ".text-arabic-base": { fontSize: "16px", lineHeight: "25px" },
          ".text-arabic-lg":   { fontSize: "18px", lineHeight: "29px" },
          ".text-arabic-xl":   { fontSize: "20px", lineHeight: "33px" },
          ".text-arabic-2xl":  { fontSize: "24px", lineHeight: "37px" },
          ".text-arabic-3xl":  { fontSize: "28px", lineHeight: "41px" },
          ".text-arabic-4xl":  { fontSize: "32px", lineHeight: "47px" },
        });
      },
    ],
};
