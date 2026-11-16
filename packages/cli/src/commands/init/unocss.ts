import { writeFile } from '../../utils'

export async function generateDefaultUnoCSSConfigs(root: string) {
  const unoConfig = `import type { Theme } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default defineConfig<Theme>({
  presets: [
    presetWemeUI(),
  ],

  content: {
    pipeline: {
      include: [
        /\\.(vue|svelte|[jt]sx|vine.ts|style.[jt]s|mdx?|astro|elm|php|phtml|marko|html)($|\\?)/,
      ],
    },
  },
})
`

  return await writeFile(root, 'uno.config.ts', unoConfig.trim())
}
