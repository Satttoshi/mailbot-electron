/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: 'var(--color-black)',
        dark: 'var(--color-dark)',
        grey: 'var(--color-grey)',
        lightgrey: 'var(--color-lightgrey)',
        white: 'var(--color-white)',
        1: 'var(--color-1)',
        2: 'var(--color-2)',
        3: 'var(--color-3)',
        4: 'var(--color-4)',
        select: 'var(--color-select)',
        'select-darken': 'var(--color-select-darken)',
        start: 'var(--color-start)',
        'start-running': 'var(--color-start-running)',
        'start-darken': 'var(--color-start-darken)',
        'error-lighten': 'var(--color-error-lighten)',
        error: 'var(--color-error)',
        'error-darken': 'var(--color-error-darken)'
      }
    }
  },
  plugins: []
};
