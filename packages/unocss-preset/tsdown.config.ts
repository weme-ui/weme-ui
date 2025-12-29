import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    './src/index.ts',
    './src/colors.ts',
  ],
  clean: true,
  dts: true,
  external: [
    '@unocss/core',
    '@unocss/rule-utils',
  ],
})
