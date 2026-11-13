import { defineConfig, presetIcons } from 'unocss'
import { presetWemeUI } from '../src'

export default defineConfig({
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
