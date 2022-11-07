/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        background1: "url('../assets/images/background1.jpg')",
      },
      fontFamily: {
        Poppins: ["Poppins", "cursive"],
      },
      colors: {
        grayColor: "#C4C4C4",
        darkGray: "#616161",
        blueColor: "#29B6F6",
      },
    },
  },
  plugins: [],
};
