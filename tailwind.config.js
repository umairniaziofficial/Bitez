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
        secondary: "#fbb103",
        customGray: "#d0d0d0",
        customBackground: "#f4f5f7",
        customBackgroundBG: "#0b161a",  //Body background color
      }
    },
  },
  plugins: [],
}