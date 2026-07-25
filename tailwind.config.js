/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfPro: ['SF Pro Display', 'sans-serif'],
      },
      // Diplomas usaba animate-blob y animation-delay-* pero nunca estuvieron
      // definidas, asi que los tres circulos decorativos quedaban congelados.
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':      { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      animation: {
        blob: 'blob 7s infinite ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    // Utilidades animation-delay-*, que Tailwind no trae de fabrica.
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-2000': { 'animation-delay': '2s' },
        '.animation-delay-4000': { 'animation-delay': '4s' },
      });
    },
  ],
}
