/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7452BC',
        secondary: '#FFDC56',
        tertiary: '#554D62',
        background: '#38364B',
        'recipe-card-bg': '#FFFFFF',
        text: {
          primary: '#000000',
          secondary: '#999999',
        },
      },
      borderRadius: {
        'recipe-card': '1.5rem',
        element: '9999px',
      },
      boxShadow: {
        primary:
          '0px 0px 15px 0px rgba(0,0,0,.03),0px 2px 30px 0px rgba(0,0,0,.08),0px 0px 1px 0px rgba(0,0,0,.3)',
      },
    },
  },
  plugins: [],
};
