import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      colors: 'src/colors.ts',
      theme: 'src/theme.ts',
      tokens: 'src/tokens.ts',
      utils: 'src/utils.ts',
    },
    format: ['esm'],
    platform: 'node',
    target: 'node22',
    deps: {
      onlyBundle: false,
      neverBundle: [
        '@unocss/core',
        '@unocss/rule-utils',
        '@radix-ui/colors',
        'bezier-easing',
        'colorjs.io',
        'defu',
        'unocss',
      ],
    },
    unbundle: false,
    dts: true,
    clean: true,
    sourcemap: true,
    minify: false,
    shims: true,
    fixedExtension: false,
  },
])
