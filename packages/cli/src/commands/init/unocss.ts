import { join } from 'node:path/posix'
import { CLI_TMP_DIR, PROJECT_CONFIG_FILENAME } from '../../constants'
import { writeFile } from '../../utils'

const baseUnoConfig = `import type { Theme } from '@weme-ui/unocss-preset/types'
import { defineConfig } from 'unocss'

export default defineConfig<Theme>({
  // Configure the content pipeline to include *.style.ts files in the project.
  content: {
    pipeline: {
      include: [
        /\\.(vue|[jt]sx|style\\.[jt]s|vine\\.[jt]s|mdx?|astro|elm|php|phtml|html)($|\\?)/,
      ],
    },
  },
})
`
const unoConfig = `import type { ProjectConfigSchema } from '@weme-ui/schema'
import type { Theme } from '@weme-ui/unocss-preset/types'
import type { InferInput } from 'valibot'
import { presetWemeUI } from '@weme-ui/unocss-preset'
import { mergeConfigs } from 'unocss'
import baseConfig from './${CLI_TMP_DIR}/uno.config'
import wemeConfigJson from './${PROJECT_CONFIG_FILENAME}' with { type: 'json' }

const wemeConfig = wemeConfigJson as InferInput<typeof ProjectConfigSchema>

export default mergeConfigs<Theme>([
  baseConfig,
  {
    presets: [
      presetWemeUI({
        colors: wemeConfig.unocss?.colors || {},
        cssVars: wemeConfig.unocss?.cssVars || {},
      }),
    ],
  },
])
`

export async function generateDefaultUnoCSS(root: string) {
  const createdBaseConfig = await writeFile(join(root, CLI_TMP_DIR), 'uno.config.ts', baseUnoConfig.trim())
  const createdUnoConfig = await writeFile(root, 'uno.config.ts', unoConfig.trim())

  return createdBaseConfig && createdUnoConfig
}
