/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // JIT mode generates your CSS on-demand by scanning your template files
  purge: ["./public/**/*.html", "./src/**/*.{ts,tsx}"],
  plugins: [],
};
