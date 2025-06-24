/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Le fichier index.html
    "./src/**/*.{js,ts,jsx,tsx}", // les autres fichiers dans le dossier src
  ],
  theme: {
    extend: {
      colors: {
        global: "#0C111D",
        lastestGames: "#404447",
        mainYellow: "#FFCA2C",
        customWhite: "#FDFDFE",
        surface: "#111727",
        light: "#D4E1FF",
        mainCyan: "#1AAEAB",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
