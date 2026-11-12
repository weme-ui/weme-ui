import { presetWemeUI } from '@weme-ui/unocss-preset'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'unocss'

const docsRoot = fileURLToPath(new URL('../unocss-preset/docs', import.meta.url))

export default defineConfig({
  content: {
    filesystem: [`${docsRoot}/**/*.md`],
  },
  presets: [
    presetWemeUI({
      preflights: {
        reset: false,
        theme: 'on-demand',
      },
    }),
  ],
})
