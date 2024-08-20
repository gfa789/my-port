/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    
    
    extend: {
      fontFamily: {
        dmserif: 'DM Serif Text'
      },
      colors: {
        'puce': '#474241',
        'nude': '#cda67a',
        'sage': '#a7a88a',
        'sagegreen': '#d0ccb9',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        }, 
        shine: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        ripple: 'ripple 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        shine: 'shine 0.85s ease infinite',
      }
    },
  },
  plugins: [],
}

