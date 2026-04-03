/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        sand: '#f5efe6',
        card: '#fffaf3',
        border: '#eadfce',
        ink: '#261f17',
        muted: '#6f6454',
        primary: '#1f4b45',
        accent: '#8c3c26',
        info: '#e4efe9',
        highlight: '#f2c66d',
      },
    },
  },
  plugins: [],
};
