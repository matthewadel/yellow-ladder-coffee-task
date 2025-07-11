/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'coffee-brown': '#6B4423',
        'coffee-light': '#8B5A2B',
        'coffee-dark': '#4A2C17',
        cream: '#F5F5DC',
        'yellow-ladder': '#FFD700',
      },
      fontFamily: {
        coffee: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
