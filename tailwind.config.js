/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        sand: '#f6f4fb',
        card: '#fefdfd',
        border: '#d9d3ea',
        ink: '#1e1a33',
        muted: '#6a6482',
        primary: '#2b196f',
        accent: '#d9261e',
        info: '#edf4e3',
        highlight: '#648e2e',
        surface: '#ece8f7',
        date: '#7b738f',
        highlightText: '#f7ffec',
        chipText: '#4d6531',
        infoTitle: '#34501b',
        infoText: '#506734',
      },
    },
  },
  plugins: [],
};
