import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWemeUI({
      cssVars: {
        'password-strength': {
          'too-weak-color': 'error.9',
          'weak-color': 'error.7',
          'medium-color': 'success.7',
          'strong-color': 'success.9',
        },
      },
    }),
  ],

  content: {
    pipeline: {
      include: [
        /\.(vue|[jt]sx|style\.[jt]s|vine\.[jt]s|mdx?|astro|elm|php|phtml|html)($|\?)/,
      ],
    },
  },
})
