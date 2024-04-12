/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        wordification: {
          primary: '#76B041',
          secondary: '#222328',
          "accent": "#E4FDE1",
          "base-content": "#16161A",
          "base-100": "#E4FDE1",
          "my-color": "#44FF00",
          ".navbar": {
            "background-color": "#1E1E24",
          },
        },
      },
    ],
    darkTheme: 'dark',
    logs: false,
  },
}
