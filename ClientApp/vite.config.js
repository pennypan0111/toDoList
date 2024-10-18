import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/toDoList/',
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.jsx', 'src/**/*.cjs', 'src/**/*.mjs']
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'todoList',
        short_name: 'todoList',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'fullscreen',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/appIcon.jpg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /someInterface/i, // 接口緩存
            handler: 'CacheFirst',
            options: {
              cacheName: 'interface-cache'
            }
          },
          {
            urlPattern: /(.*?)\.(js|css|ts)/, // 靜態資源緩存
            handler: 'CacheFirst',
            options: {
              cacheName: 'js-css-cache'
            }
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 圖片緩存
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache'
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://todolistpenny.azurewebsites.net',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
