import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: [
    '@weme-ui/nuxt',
    '@nuxt/content',
  ],

  alias: {
    '@registry': fileURLToPath(new URL('../registry', import.meta.url)),
  },

  components: [
    {
      path: '~/components',
      extensions: ['vue'],
    },
  ],

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
        highlight: {
          theme: {
            default: 'andromeeda',
          },
          langs: ['js', 'ts', 'html', 'css', 'vue', 'json', 'yaml', 'go', 'bash', 'shell', 'mdc', 'md', 'diff', 'dotenv'],
        },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      autoSubfolderIndex: false,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'reka-ui',
        'clsx',
        'tailwind-merge',
        'tailwind-variants',
        'motion-v',
        'debug',
        'remark-emoji',
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-08-21',
})
