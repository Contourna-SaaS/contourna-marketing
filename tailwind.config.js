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
        'c-yellow-2': '#fbc312',
        'c-yellow-3': '#f7c937',
        'c-yellow-4': '#f4c951',
        'c-yellow-5': '#f7d06f',
        'c-yellow-6': '#fef4df',
        'c-grey': '#494949',
        'c-off-white': '#FCFAF7',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
