import { defineConfig, presetIcons, presetWind4, transformerVariantGroup } from 'unocss'
import { presetWemeUI } from '../src'

export default defineConfig({
  presets: [
    presetWind4({
      arbitraryVariants: true,
    }),

    presetIcons(),

    presetWemeUI({
      themes: [
        {
          id: 'ROOT',
          name: 'ROOT',
          priority: 1000,
          translucent: false,
          radius: '0.25rem',
          colors: {
            accent: 'indigo',
            neutral: 'gray',
            info: 'blue',
            success: 'grass',
            warning: 'orange',
            error: 'red',
          },
          tokens: {
            foreground: {
              muted: 'color.neutral.7',
              toned: 'color.neutral.9',
              default: 'color.neutral.11',
              highlighted: 'color.neutral.12',
            },
            background: {
              default: 'color.neutral.1',
              dimmed: 'color.neutral.2',
              muted: 'color.neutral.3',
              elevated: 'color.neutral.4',
            },
            border: {
              default: 'color.neutral.5',
              elevated: 'color.neutral.6',
            },
            ring: '$border.default',
          },
        },
      ],

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

  transformers: [
    transformerVariantGroup(),
  ],
})
