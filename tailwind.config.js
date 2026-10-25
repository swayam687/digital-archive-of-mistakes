/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        obsidian: '#050505',
        surface: '#121212',
        border: '#2a2a2a',
        accent: '#10b981', // Cyber Emerald
        amber: '#f59e0b',
        error: '#f43f5e'
      }
    }
  },
  plugins: [],
}