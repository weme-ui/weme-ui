import { createResolver } from 'nuxt/kit'
import { version } from '../package.json'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@weme-ui/nuxt',
  ],

  components: {
    dirs: [
      '~/components',
      {
        prefix: 'Prose',
        path: resolve('../components'),
        pathPrefix: false,
        extensions: ['.vue'],
      },
    ],
  },

  alias: {
    '@std': resolve('../../std'),
    '@prose': resolve('../components'),
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
