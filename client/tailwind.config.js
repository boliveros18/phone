/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem',
        'xxxs': '0.5rem', 
      },
      height: {
        '60': '60px',
        '672': '672px',
        '410': '410px',
        '420': '420px',
        '365': '365px',
        '506': '506px',
        '558': '558px',
      },
      width: {
        '272': '272px'
      },
      rotate: {
        '135': '135deg'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}