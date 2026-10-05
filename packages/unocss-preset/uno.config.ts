import { defineConfig } from 'unocss'
import { presetWemeUI } from './src'

export const cssVars = {
  card: {
    'text': 'foreground.base',
    'background': 'accent.1',
    'border': 'border.base',
    'fill': 'background.base',
    'border-width': '2px',
    'width': '15rem',
    'max-width': '15rem',
    'min-width': '10rem',
    'height': '15rem',
    'max-height': '15rem',
    'min-height': '10rem',
    'padding': '2rem',
    'margin': '2rem',
    'space': '2rem',
  },
}

export default defineConfig({
  presets: [
    presetWemeUI({
      cssVars,
    }),
  ],
})
