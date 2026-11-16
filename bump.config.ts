import { defineConfig } from 'bumpp'

export default defineConfig({
  files: [
    'package.json',
    'packages/cli/package.json',
    'packages/colors/package.json',
    'packages/schema/package.json',
    'packages/unocss-preset/package.json',
    'packages/utilities/package.json',
  ],
  commit: 'release: v%s',
  tag: 'v%s',
  push: true,
  all: true,
  install: false,
  execute: 'bun scripts/prepare-release.ts',
})
