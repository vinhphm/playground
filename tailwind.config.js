/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    themes: ['light', 'dark'],
  },
}
