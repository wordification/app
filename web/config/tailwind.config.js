/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
      colors: {
        customAccentOrange: '#ffbc21',
        'green-500': '#76B041',
        'red-500': '#ff4a21',
      },
  },
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
  variants: {
    extend: {
      textColor: ['hover'], // Enable hover variant for textColor utility
}
  }
}
