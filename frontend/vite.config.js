import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    watch: {
      usePolling: true, // Helps with WSL or Docker issues
    },
    hmr: true, // Ensure HMR is enabled
  },
})
