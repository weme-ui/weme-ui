import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm'],
    dts: true,
    deps: {
      onlyBundle: false,
    },
    // Avoid wiping dist while website/playground are already importing it in watch mode.
    // eslint-disable-next-line node/prefer-global/process
    clean: process.env.NODE_ENV === 'deploy',
    shims: true,
    failOnWarn: true,
  },
])
