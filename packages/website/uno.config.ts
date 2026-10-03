import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))

export default defineConfig({
  presets: [
    presetWemeUI(),
  ],
  content: {
    filesystem: [
      resolve(rootDir, 'packages/website/src/**/*.{astro,vue,ts,tsx,md,mdx}'),
      resolve(rootDir, 'registry/**/src/**/*.{vue,ts,tsx,md}'),
    ],
    // registry.ts eagerly imports markdown as raw strings; do not extract utilities from those blobs.
    pipeline: {
      exclude: [
        /packages\/website\/src\/lib\/registry\.ts/,
      ],
    },
  },
})
