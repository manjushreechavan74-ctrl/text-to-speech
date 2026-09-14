export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F6",
        ink: "#1B1B1F",
        teal: {
          DEFAULT: "#2F6F6D",
          dark: "#204B49",
          light: "#E4EEED",
        },
        amber: {
          DEFAULT: "#E8A33D",
          dark: "#C6862A",
        },
        line: "#DCE3E2",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["'IBM Plex Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};