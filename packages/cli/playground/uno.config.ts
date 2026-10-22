import { presetWemeUI } from '@weme-ui/unocss-preset'
import { mergeConfigs } from 'unocss'
import baseConfig from './.weme/uno.config'
import wemeConfig from './weme.config.json' with { type: 'json' }

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
