import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,  // Disable server-side rendering for SPA mode
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  nitro: {
    prerender: {
      routes: ['/', '/offline'],  // Pre-render pages for offline use
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nuxt 3 PWA',
      short_name: 'NuxtPWA',
      description: 'A Nuxt 3 Progressive Web App',
      theme_color: '#4A90E2'
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 604800 }
          }
        },
        {
          urlPattern: '/hello.json',
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-cache'
          }
        },
        {
          urlPattern: 'https://example.com/.*',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 86400 }
          }
        }
      ]
    }
  }
})
