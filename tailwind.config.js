/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#006A4E", // Primary Bangladesh Green
          dark: "#004D3A",   // Dark Green
          light: "#E8F6F0",  // Light Green
          hover: "#005841"
        },
        accent: {
          DEFAULT: "#F42A41", // Bangladesh Red Accent
          hover: "#d91f34"
        },
        bgLight: "#F7FAF9",
        textMain: "#17211D",
        textMuted: "#66736D",
        // Category Specific Colors (Design standard)
        catBlue: "#2563EB",
        catGreen: "#16A34A",
        catPurple: "#9333EA",
        catOrange: "#EA580C",
        catCyan: "#0891B2",
        catRed: "#DC2626",
        catViolet: "#7C3AED",
        catPink: "#DB2777",
        catTeal: "#0D9488",
        catGold: "#D97706",
        catIndigo: "#4F46E5",
        catSlate: "#475569",
      },
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 106, 78, 0.08)',
        cardHover: '0 10px 25px -5px rgba(0, 106, 78, 0.15)',
      }
    },
  },
  plugins: [],
}