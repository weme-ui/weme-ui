import { presetIcons } from 'unocss'
import { presetWemeUI, defineUnoConfig, loadCustomThemes } from '../src'

const themes = await loadCustomThemes()

export default defineUnoConfig({
  presets: [
    presetWemeUI({
      themes: [
        {
          name: 'default',
          aliases: {
            accent: 'clay',
          },
        },
        ...themes,
      ],
    }),
    presetIcons(),
  ],
})
