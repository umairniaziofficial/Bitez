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
        secondary: "#f30a39",
        customGray: "#d0d0d0",
        customBackground: "#f4f5f7",
        customRed: "#f30a39",
        customBackgroundBG: "#0b161a",  //Body background color
      }
    },
  },
  plugins: [],
}