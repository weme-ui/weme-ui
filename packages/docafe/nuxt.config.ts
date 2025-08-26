import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: [
    '@weme-ui/nuxt',
    '@nuxt/content',
    fileURLToPath(new URL('./modules/config', import.meta.url)),
  ],

  components: [
    {
      path: fileURLToPath(new URL('./app/components', import.meta.url)),
      extensions: ['vue', 'tsx'],
    },
  ],

  content: {
    build: {
      markdown: {
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

  compatibilityDate: '2025-08-20',
})
