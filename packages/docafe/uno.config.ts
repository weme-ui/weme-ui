import { mergeConfigs, presetIcons } from 'unocss'
import config from './.nuxt/uno.config'

export default mergeConfigs([config, {
  presets: [
    presetIcons(),
  ],
}])
