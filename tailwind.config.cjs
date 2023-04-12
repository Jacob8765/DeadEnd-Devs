/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  // JIT mode generates your CSS on-demand by scanning your template files
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
