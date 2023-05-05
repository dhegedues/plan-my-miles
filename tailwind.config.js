const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '310px',
        'xsp': '375px'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      aria: {
        invalid: 'invalid="true"',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

