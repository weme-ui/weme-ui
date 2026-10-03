import { existsSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const registryDir = resolve(rootDir, 'registry')

/**
 * Resolve `~/*` imports from inside `registry/<library>/src/**` to that library's src root.
 */
function registryTildeAlias() {
  return {
    name: 'registry-tilde-alias',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!id.startsWith('~/') || !importer)
        return null

      const normalizedImporter = importer.split('?')[0]
      const relativeToRegistry = relative(registryDir, normalizedImporter)
      if (relativeToRegistry.startsWith('..') || relativeToRegistry.includes('..'))
        return null

      const [library, ...rest] = relativeToRegistry.split(/[/\\]/)
      if (!library || rest[0] !== 'src')
        return null

      const sourceRoot = resolve(registryDir, library, 'src')
      const resolved = resolve(sourceRoot, id.slice(2))
      if (!existsSync(resolved) && !existsSync(`${resolved}.ts`) && !existsSync(`${resolved}.vue`)) {
        for (const ext of ['.ts', '.js', '.vue', '/index.ts', '/index.js']) {
          if (existsSync(`${resolved}${ext}`))
            return `${resolved}${ext}`
        }
      }

      if (existsSync(resolved))
        return resolved
      if (existsSync(`${resolved}.ts`))
        return `${resolved}.ts`
      if (existsSync(`${resolved}.vue`))
        return `${resolved}.vue`

      return resolved
    },
  }
}

export default defineConfig({
  site: 'https://weme-ui.github.io',
  base: '/weme-ui',
  outDir: '../../docs',
  integrations: [
    vue(),
    UnoCSS({
    }),
  ],
  vite: {
    plugins: [registryTildeAlias()],
    resolve: {
      alias: {
        '@registry': registryDir,
      },
    },
    server: {
      fs: {
        allow: [rootDir],
      },
    },
  },
})
