import { defineConfig, presetWind4 } from 'unocss'
import { presetHalo } from './src'

export default defineConfig({
  presets: [
    presetWind4({
      reset: true,
      arbitraryVariants: true,
    }),
    presetHalo(),
  ],

  content: {
    pipeline: {
      include: [
        /\.(vue|[jt]sx|ts|mdx?|phtml|html|yml|yaml)($|\?)/,
        /\.ui.([jt]s)$/,
      ],
    },
  },
})
