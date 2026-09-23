import path from 'node:path'
import { defineConfig } from 'vitest/config'

function resolve(dir: string) {
  return path.resolve(import.meta.dirname, dir)
}

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve('./src'),
    },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
})
