import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      types: 'src/types.ts',
      colors: 'src/colors.ts',
      tokens: 'src/tokens.ts',
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
