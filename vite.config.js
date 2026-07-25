import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Separamos las librerias pesadas en chunks propios para que se cacheen
    // aparte y solo las pida la ruta que realmente las usa.
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three': ['three'],
          'model-viewer': ['@google/model-viewer'],
          'ogl': ['ogl'],
          'motion': ['framer-motion'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
