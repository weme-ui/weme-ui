import { createResolver } from 'nuxt/kit'
import pkg from '../package.json'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@weme-ui/nuxt',
    '@nuxt/content',
  ],

  components: [
    {
      path: '~/components',
      extensions: ['vue'],
    },
    {
      path: '~/components/prose',
      pathPrefix: false,
      prefix: 'Prose',
      global: true,
    },
  ],

  alias: {
    '@registry': resolve('../registry'),
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'ts', 'typescript', 'diff', 'vue', 'json', 'yml', 'css', 'mdc', 'toml', 'go'],
        },
      },
    },
  },

  mdc: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      noApiRoute: false,
    },
  },

  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: resolve('app/assets/icons'),
    }],

    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },

    provider: 'iconify',
  },

  experimental: {
    normalizeComponentNames: false,
  },

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
        '@nuxt/content/utils',
        'remark-emoji',
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      autoSubfolderIndex: false,
    },
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-11-08',
})
