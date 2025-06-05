import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Disable server-side rendering for SPA mode
  ssr: false,
  modules: [
    '@vite-pwa/nuxt',
  ],
  nitro: {
    prerender: {
      // Pre-render home page for offline use
      routes: ['/'],
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nuxt 3 PWA',
      short_name: 'NuxtPWA',
      description: 'A Nuxt 3 Progressive Web App',
      theme_color: '#4A90E2',
      icons: [
        { src: '/pwa-icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ]
    }
  }
})
