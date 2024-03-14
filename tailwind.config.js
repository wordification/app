const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
    }
  }
}