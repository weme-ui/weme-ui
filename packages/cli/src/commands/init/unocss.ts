import { writeFile } from '../../utils'

const unoConfig = `import { defineUnoConfig, presetWemeUI } from '@weme-ui/unocss-preset'

export default defineUnoConfig({
  presets: [
    presetWemeUI(),
  ],
})
`

export async function generateDefaultUnoCSSConfigs(root: string) {
  return await writeFile(root, 'uno.config.ts', unoConfig.trim())
}
