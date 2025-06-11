// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // This option enables fallback to index.html for SPA routing support
    historyApiFallback: true,
  },
})
