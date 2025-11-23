/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          500: '#64748b',
          accent: '#f59e0b',
          success: '#22c55e',
          danger: '#ef4444',
        }
      }
    },
  },
  plugins: [],
}