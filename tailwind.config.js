/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        desert: {
          50: "#fff8ed",
          100: "#ffedcf",
          500: "#d97825",
          600: "#b95c18"
        },
        saguaro: {
          500: "#16715f",
          700: "#0f4f44"
        },
        ink: "#172033"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 32, 51, 0.10)"
      }
    }
  },
  plugins: []
};
