/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3A8ECD',
        secondary: '#FB8A38',
        accent: '#0A3D2F',
      },
    },
  },
  plugins: [typography],
}
