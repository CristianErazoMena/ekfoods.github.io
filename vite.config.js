import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Use root base so it works with custom domains (GoDaddy) and GitHub Pages custom domain
  base: '/',
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 2048,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2
      }
    }
  }
})
