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

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-11-08',
})
