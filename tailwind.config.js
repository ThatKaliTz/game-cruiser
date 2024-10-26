

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        pinkish: "#E11C5C",
        blueish: "#286585",
        yellowish: "#F4C33F",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Example with a Google font
        heading: ['Merriweather', 'serif'], // Example with a serif font for headings
      },
      container:{
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
        }
      },
    },
  },
  plugins: [],
}

