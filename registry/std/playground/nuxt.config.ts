import { fileURLToPath } from 'node:url'
import { version } from '../package.json'

export default defineNuxtConfig({
  modules: [
    '@weme-ui/nuxt',
  ],

  components: {
    dirs: [
      '~/components',
      {
        prefix: 'Ui',
        path: fileURLToPath(new URL('./../components', import.meta.url)),
        pathPrefix: false,
        extensions: ['.vue'],
      },
    ],
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
        '@vue/devtools-core',
        'reka-ui',
        'clsx',
        'tailwind-merge',
        'tailwind-variants',
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      version,
    },
  },

  compatibilityDate: '2025-08-02',
})
