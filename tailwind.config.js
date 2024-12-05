/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: '#6c0d38',
        white: '#ffffff',
      },
      height: {
        '108': '27rem',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'scroll': 'scroll 10s linear infinite',
        'scroll-fast': 'scroll 20s linear infinite', 
      },
      screens: {
        'sm': '640px',  
        'lg': '1024px',  
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.pause': {
          'animation-play-state': 'paused',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover', 'group-hover']);
    },
  ],
}