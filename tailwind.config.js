/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      indent: {
        4: "1rem",
        8: "2rem", // or your desired value
      },
      colors: {
        primary: {
          DEFAULT: "#FF8137",
          100: "#9B3922",
          200: "#481E14",
        },
        secondary: "#246CD0",
        black: {
          100: "#111214",
          200: "#352f36",
          300: "#0C0C0C",
        },
        white: "#FFFFFF",
        gray: "#F3F3F4",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
