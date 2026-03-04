/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a3a52',
          light: '#2d4a5e',
        },
        accent: {
          DEFAULT: '#e67e22',
          dark: '#d35400',
        },
        slate: '#546e7a',
        'bg-card': '#ffffff',
      },
    },
  },
  plugins: [],
};
