/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        bumbleebee: {
          ...require('daisyui/src/theming/themes')['bumbleebee'],
          primary: '#76B041',
          secondary: '#222328',
          accent: '#f0ead6',
          'base-content': '#16161A',
          'base-100': '#f0ead6',
          'my-color': '#44FF00',
          '.navbar': {
            'background-color': '#1E1E24',
          },
        },
      },
    ],
    // darkTheme: 'dark',
    logs: false,
  },
}
