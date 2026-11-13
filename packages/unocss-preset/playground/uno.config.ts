import { presetIcons } from 'unocss'
import { presetWemeUI, defineUnoConfig } from '../src'

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
      ],
    }),
    presetIcons(),
  ],
})
