export default defineNuxtConfig({
  modules: [
    '@weme-ui/nuxt',
    '@nuxt/content',
    // '@nuxtjs/i18n',
  ],

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
      },
    },
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-07-22',
})
