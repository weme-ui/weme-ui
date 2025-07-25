import { defineConfig, presetWind4 } from 'unocss'
import { presetWemeUI } from '../src'

export default defineConfig({
  presets: [
    presetWind4({
      reset: true,
      arbitraryVariants: true,
    }),
    presetWemeUI({
      cssVars: {
        block: {
          'background': '#fff',
          'foreground': '#000',
          'width': '100%',
          'height': '100%',
          'padding': '1rem',
          'padding-inline': '1rem',
          'padding-block': '1rem',
          'padding-left': '1rem',
          'padding-right': '1rem',
          'padding-top': '1rem',
          'padding-bottom': '1rem',
          'margin': '1rem',
          'margin-inline': '1rem',
          'margin-block': '1rem',
          'margin-left': '1rem',
          'margin-right': '1rem',
          'margin-top': '1rem',
          'margin-bottom': '1rem',
        },
      },
    }),
  ],
})
