/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', 'sans-serif'],
        'rubik': ['"Rubik"', 'sans-serif'],
        'karla': ['"Karla"', 'sans-serif'],
        'roboto': ['"Roboto Condensed"', 'sans-serif']
      },fontSize: {
        xxs: ['10px', '16px'],
        xxxs: ['7px', '10px']
      }
    },
  },
  plugins: [],
}

