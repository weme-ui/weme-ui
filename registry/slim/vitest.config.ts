import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

function resolve(dir: string) {
  return path.resolve(import.meta.dirname, dir)
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve('./src'),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
})
