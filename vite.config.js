import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Chicken Shop',
        short_name: 'ChickenShop',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        "icons": [
          {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    })
  ]
})
