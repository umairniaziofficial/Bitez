/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:
      {
        primary: "#fff",
        secondary: "#cd202f",
        customGray: "#d0d0d0",
        customBackground: "#f6f2f3",
        customRed: "#f30a39",
        customBackgroundBG: "#0b161a",  //Body background color
      }
    },
  },
  plugins: [],
}