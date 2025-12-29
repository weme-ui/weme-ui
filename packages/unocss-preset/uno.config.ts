import { defineConfig, presetIcons, presetWind4, transformerVariantGroup } from 'unocss'
import { presetWemeUI } from './'

export default defineConfig({
  presets: [
    presetIcons(),

    presetWind4({
      arbitraryVariants: true,
    }),

    presetWemeUI({
      themes: [
        {
          id: 'ROOT',
        },
      ],
      cssVars: {
        block: {
          'background': '#fff',
          'foreground': 'mauve.12',
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

  transformers: [
    transformerVariantGroup(),
  ],
})
