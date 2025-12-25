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
        prefix: 'Ui',
        path: resolve('../'),
        pathPrefix: false,
        extensions: ['.vue'],
      },
    ],
  },

  alias: {
    '@registry': resolve('../'),
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'reka-ui',
        'clsx',
        'tailwind-merge',
        'tailwind-variants',
        '@iconify-json/lucide',
        '@iconify-json/mingcute',
        'unocss',
        '@unocss/core',
        '@radix-ui/colors',
        'colorjs.io',
        'bezier-easing',
        '@unocss/rule-utils',
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
