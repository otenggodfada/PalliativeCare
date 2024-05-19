/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBackground: '#F8F9FE',
        primaryText: '#4B4B4B',
        secondaryText: '#808080',
        primaryButton: '#261F57',
        secondaryButton: '#561E5A',
        accent: '#020D48',
        positiveNotification: '#508AA0',
        warmAccent: '#F5DEB3',
        
      },
    },
  },
  plugins: [],
}
