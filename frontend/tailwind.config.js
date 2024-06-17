/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F52F26',
        secondary: '#000000',
        'recipe-card-bg': '#FFFFFF',
        disabled: '#F86D67',
        text: {
          primary: '#000000',
          secondary: '#FFFFFF',
          thin: '#7D7D7D',
        },
      },
      borderRadius: {
        'recipe-card': '1.5rem',
        element: '9999px',
      },
      boxShadow: {
        default:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
      },
    },
  },
  plugins: [],
};
