const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [require("daisyui")],

  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "off-black": "var(--off-black)",
      },
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "off-black": "91 46% 47%",
        },
      },
    ],
  },
}