const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  mode: 'jit',
  plugins: [require("daisyui")],
};

module.exports = withMT({
  ...tailwindConfig,
});
