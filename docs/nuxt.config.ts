import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: [
    '@weme-ui/docafe',
  ],

  alias: {
    '@registry': fileURLToPath(new URL('../registry', import.meta.url)),
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-08-21',
})
