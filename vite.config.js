import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@atoms': '/src/components/atoms',
      '@molecules': '/src/components/molecules',
      '@organisms': '/src/components/organisms',
      '@templates': '/src/components/templates',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@hooks': '/src/lib/hooks',
      '@store': '/src/lib/store',
      '@context': '/src/lib/context',
      '@utils': '/src/utils',
      '@routes': '/src/routes',
      '@api': '/src/api',
      '@dtos': '/src/dtos',
      '@services': '/src/services',
    },
  },
})
