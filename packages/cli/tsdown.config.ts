import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm'],
    platform: 'node',
    target: 'node22',
    deps: {
      onlyBundle: false,
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
