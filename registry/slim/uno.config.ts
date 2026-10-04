import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWemeUI(),
  ],

  content: {
    pipeline: {
      include: [
        /\.(vue|[jt]sx|style\.[jt]s|vine\.[jt]s|mdx?|astro|elm|php|phtml|html)($|\?)/,
      ],
    },
  },
})
