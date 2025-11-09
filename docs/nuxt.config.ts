export default defineNuxtConfig({
  modules: [
    '@weme-ui/nuxt',
  ],

  components: [
    {
      path: '~/components/ui',
      prefix: 'ui',
      extensions: ['vue'],
    },
  ],

  experimental: {
    normalizeComponentNames: false,
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-11-08',
})
