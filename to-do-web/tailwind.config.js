/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "cursive"],
      },
      colors: {
        grayColor: "#C4C4C4",
        mediumGray: "#9B9B9B",
        darkGray: "#616161",
        blueColor: "#29B6F6",
        secondGrayColor: "#F4F4F4",
      },
      spacing: {
        '25%': '25%',
        '85%': '85%',
        '90%': '90%',
        '95%': '95%',
        '128': '32rem',
        '132': '40rem'
      },
      minHeight: {
        '20': '5rem'
      },
    },
  },
  plugins: [],
};
