/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using the "class" strategy
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include all relevant paths
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        spin : {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
    },
    
  },
  plugins: [],
}

