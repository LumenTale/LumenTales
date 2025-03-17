/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0c8ee3',
          600: '#0066FF',
          700: '#0057d9',
          800: '#0047b3',
          900: '#003c8f',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#d2d9e7',
          300: '#aab8d3',
          400: '#7a91b8',
          500: '#5a739e',
          600: '#445c85',
          700: '#384c6d',
          800: '#30405a',
          900: '#2b374c',
        },
        accent: {
          50: '#fdf5f9',
          100: '#fbeaf3',
          200: '#f8d5e8',
          300: '#f3b1d4',
          400: '#ec7fb6',
          500: '#e34d97',
          600: '#d32e7b',
          700: '#b01e5f',
          800: '#931c50',
          900: '#7c1b45',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 15px rgba(102, 153, 255, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
        'slide-out': 'slideOut 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}; 