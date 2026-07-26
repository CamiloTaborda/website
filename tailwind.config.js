/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter Variable self-hosted; cae a la fuente del sistema (SF Pro en
        // Apple, Segoe en Windows) si por lo que sea no carga.
        sans: [
          'Inter Variable',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },

      // Escala tipografica con tracking negativo en los tamanos grandes: es lo
      // que separa un titular premium de uno generico. Cuanto mas grande el
      // texto, mas apretado el interletrado.
      fontSize: {
        // Los límites están calculados para que "Diseño, construyo" entre en
        // una sola línea en cualquier ancho: por debajo se parte en móvil,
        // por encima se parte en monitores anchos.
        'display-2xl': ['clamp(2.25rem, 8.5vw, 7rem)',  { lineHeight: '0.98', letterSpacing: '-0.045em', fontWeight: '600' }],
        'display-xl':  ['clamp(2.75rem, 7vw, 5.5rem)',  { lineHeight: '1.02', letterSpacing: '-0.04em',  fontWeight: '600' }],
        'display-lg':  ['clamp(2.25rem, 5vw, 4rem)',    { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-md':  ['clamp(1.75rem, 3.5vw, 2.75rem)',{ lineHeight: '1.12', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-sm':  ['clamp(1.375rem, 2.5vw, 1.875rem)',{ lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'body-lg':     ['clamp(1.0625rem, 1.6vw, 1.3125rem)', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
        'body':        ['1.0625rem', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        'caption':     ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        // Eyebrow: texto pequeno en mayusculas sobre los titulares
        'eyebrow':     ['0.75rem', { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '600' }],
      },

      colors: {
        // Grises calibrados: negro y blanco puros para los fondos, y una
        // escala neutra para todo lo demas. Sin colores saturados salvo el
        // acento, que se usa con cuentagotas.
        ink: {
          DEFAULT: '#000000',
          900: '#0a0a0a',
          800: '#141414',
          700: '#1d1d1f', // el gris de Apple
          600: '#2d2d2f',
          500: '#4a4a4d',
          400: '#6e6e73',
          300: '#98989d',
          200: '#c7c7cc',
          100: '#e8e8ed',
          50:  '#f5f5f7', // el fondo claro de Apple
        },
        accent: {
          DEFAULT: '#0071e3', // azul Apple
          hover:   '#0077ed',
          soft:    '#2997ff',
        },
      },

      maxWidth: {
        content: '1800px',
        // Los bloques de texto NO siguen al contenedor: a 1800px una línea
        // corrida se vuelve ilegible. El ancho lo aprovecha la maqueta, no
        // los párrafos.
        prose: '68ch',
        narrow: '52rem',
      },

      // Curvas de easing suaves: nada lineal, nada rebotado.
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'entrance': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
      },

      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':      { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%':      { transform: 'translateY(6px)', opacity: '1' },
        },
      },

      animation: {
        blob: 'blob 7s infinite ease-in-out',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1s ease-out both',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-2000': { 'animation-delay': '2s' },
        '.animation-delay-4000': { 'animation-delay': '4s' },
        // Escalonado para animaciones de entrada en serie
        '.delay-1': { 'animation-delay': '80ms' },
        '.delay-2': { 'animation-delay': '160ms' },
        '.delay-3': { 'animation-delay': '240ms' },
        '.delay-4': { 'animation-delay': '320ms' },
        '.delay-5': { 'animation-delay': '400ms' },
        // Degradado de texto sutil, no arcoiris
        '.text-gradient-light': {
          'background-image': 'linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.62) 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
        },
        '.text-gradient-dark': {
          'background-image': 'linear-gradient(180deg, #1d1d1f 30%, rgba(29,29,31,0.6) 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
        },
      });
    },
  ],
}
