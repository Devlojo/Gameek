/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Le fichier index.html
    "./src/**/*.{js,ts,jsx,tsx}", // les autres fichiers dans le dossier src
  ],
  theme: {
    extend: {
      colors: {
        global: "#171625",
        lastestGames: "#404447",
        mainYellow: "#FFCA2C",
        customWhite: "#e5e7eb",
        Action: "#111927",
      },
    },
  },
  plugins: [],
};
