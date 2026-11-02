import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'

const docsRoot = fileURLToPath(new URL('../unocss-preset/docs', import.meta.url))
const palette = readFileSync(new URL('../unocss-preset/docs/theme/palette.md', import.meta.url), 'utf8')

/** 色板 HTML 里的工具类。全量 `theme: true` 写出 `--colors-gray-1`，工具类读的是 `--gray-1`。 */
const paletteColors = [...new Set([...palette.matchAll(/\bbg-[a-z0-9-]+\b/g)].map(match => match[0]))]

export default defineConfig({
  content: {
    filesystem: [`${docsRoot}/**/*.md`],
  },
  safelist: paletteColors,
  presets: [
    presetWemeUI({
      preflights: {
        reset: false,
        theme: 'on-demand',
      },
    }),
  ],
})
