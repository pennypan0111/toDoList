import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.jsx', 'src/**/*.cjs', 'src/**/*.mjs']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
