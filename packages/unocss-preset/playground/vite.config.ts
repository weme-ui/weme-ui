import Vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Vue(), UnoCSS()],

  devtools: {
    apply: 'serve',
  },

  optimizeDeps: {
    include: ['@weme-ui/unocss-preset'],
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
