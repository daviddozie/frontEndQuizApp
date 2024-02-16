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
  ...tailwindConfig, // Spread the properties of tailwindConfig
  // Add or override any specific properties if needed
  // content: [], // Example: Override the content property
  // theme: { ... }, // Example: Override the theme property
  // plugins: [], // Example: Override the plugins property
});
