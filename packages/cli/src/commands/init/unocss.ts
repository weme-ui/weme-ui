import { join } from 'node:path/posix'
import { CLI_BASE_DIR } from '../../constants'
import { writeFile } from '../../utils'
import { PROJECT_CONFIG_FILENAME } from '../../utils/project'

const baseUnoConfig = `import { defineConfig } from 'unocss'

export default defineConfig({
  // Configure the content pipeline to include style.ts files in the project.
  content: {
    pipeline: {
      include: [
        /\\.(vue|[jt]sx|style\\.[jt]s|vine\\.[jt]s|mdx?|astro|elm|php|phtml|html)($|\\?)/,
      ],
    },
  },
})
`
const unoConfig = `import { presetWemeUI } from '@weme-ui/unocss-preset'
import { mergeConfigs } from 'unocss'
import baseConfig from './.weme/uno.config'
import wemeConfig from './${PROJECT_CONFIG_FILENAME}' with { type: 'json' }

export default mergeConfigs([
  baseConfig,
  {
    presets: [
      presetWemeUI({
        unocss: wemeConfig.unocss || {},
        cssVars: wemeConfig.cssVars || {},
      }),
    ],
  },
])
`

export async function generateDefaultUnoCSS(root: string) {
  const createdBaseConfig = await writeFile(join(root, CLI_BASE_DIR), 'uno.config.ts', baseUnoConfig)
  const createdUnoConfig = await writeFile(root, 'uno.config.ts', unoConfig)

  return createdBaseConfig && createdUnoConfig
}
