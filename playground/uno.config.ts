import { presetIcons, defineConfig } from 'unocss'
import { presetWemeUI } from '../packages/unocss-preset/src'

export default defineConfig({
  presets: [presetIcons(), presetWemeUI()],
})
