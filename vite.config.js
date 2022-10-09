import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/twitter-trends/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/url': {
        target: 'https://getdaytrends.com/indonesia/bekasi/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/url/, '')
      },
    }
  }
})
