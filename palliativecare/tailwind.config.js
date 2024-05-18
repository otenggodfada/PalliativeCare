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
        primaryBackground: '#F5F5F5',
        primaryText: '#4B4B4B',
        secondaryText: '#808080',
        primaryButton: '#ADD8E6',
        secondaryButton: '#98FF98',
        accent: '#4682B4',
        positiveNotification: '#228B22',
        warmAccent: '#F5DEB3',
      },
    },
  },
  plugins: [],
}
