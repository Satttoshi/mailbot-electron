/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'color-dark': 'var(--color-dark)',
        'color-light': 'var(--color-light)',
        'color-1': 'var(--color-1)',
        'color-2': 'var(--color-2)',
        'color-3': 'var(--color-3)',
        'color-4': 'var(--color-4)',
        'color-5': 'var(--color-5)',
        'color-red': 'var(--color-red)',
        'color-green': 'var(--color-green)',
        'color-blue': 'var(--color-blue)'
      }
    }
  },
  plugins: []
};
