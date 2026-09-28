import { defineConfig } from 'unocss'
import { presetWemeUI } from './src'

export default defineConfig({
  presets: [
    presetWemeUI({
      cssVars: {
        card: {
          'background': 'primary.1',
          'error-color': 'red.9',
          'text': 'foreground.base',
        },
      },
    }),
  ],
})
