import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api/movies': {
        target: 'https://leandroeffgen.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/movies/, '/json/movies/api.json'),
      },
    },
  },
  base: '/projects/cinema/'
})
