export default defineNuxtConfig({
  modules: [
    '../src/module',

    '@nuxt/icon',
    '@vueuse/nuxt',
    '@unocss/nuxt',
  ],

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-07-28',
})
