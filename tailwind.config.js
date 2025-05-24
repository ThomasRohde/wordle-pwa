/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wordle-green': '#6aaa64',
        'wordle-yellow': '#c9b458',
        'wordle-gray': '#787c7e',
        'wordle-dark-gray': '#3a3a3c',
        'wordle-light-gray': '#d3d6da',
      },
      fontFamily: {
        'wordle': ['Clear Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
        'bounce-light': 'bounce 0.5s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        }
      }
    },
  },
  plugins: [],
}
