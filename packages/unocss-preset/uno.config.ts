import { defineConfig } from 'unocss'
import { presetWemeUI } from './src'

export default defineConfig({
  presets: [
    presetWemeUI({
      cssVars: {
        card: {
          'text': 'foreground.base',
          'background': 'primary.1',
          'border': 'border.base',
          'fill': 'background.base',
          'border-width': '2px',
          'width': '15rem',
          'height': '15rem',
          'padding': '2rem',
          'margin': '2rem',
          'space': '2rem',
        },
      },
    }),
  ],
})
