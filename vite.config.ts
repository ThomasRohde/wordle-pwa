import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// For GitHub Pages deployment, replace 'wordle-pwa' with your actual repo name
const REPO_NAME = 'wordle-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'icons/*.png', 'icons/*.svg', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      filename: 'sw.js',
      strategies: 'generateSW',
      manifest: {
        name: 'Wordle PWA',
        short_name: 'Wordle',
        description: 'A Progressive Web App clone of the popular Wordle game with offline support',
        theme_color: '#6aaa64',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/wordle-pwa/',
        start_url: '/wordle-pwa/',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache'
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources'
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  // Use the repository name as base path for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/wordle-pwa/' : '/',
  build: {
    sourcemap: true
  },
  server: {
    host: true,
    port: 3000
  },
  preview: {
    port: 4173
  }
})
