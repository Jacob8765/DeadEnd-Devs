/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
};
