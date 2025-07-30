export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@weme-ui/nuxt',
    // '@nuxtjs/i18n',
  ],

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  // i18n: {
  //   locales: [
  //     { code: 'cn', language: 'zh-CN' },
  //     { code: 'en', language: 'en-US' },
  //   ],
  //   defaultLocale: 'cn',
  // },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-07-22',
})
