/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'c-yellow': '#fdb913',
        'c-grey': '#494949',
        'c-off-white': '#FCFAF7',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
