import type { Resolver } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { WemeNuxtOptions } from './types'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defu } from 'defu'
import defaultTheme from './themes/default'

export async function resolveOptions(options: WemeNuxtOptions, nuxt: Nuxt, resolver: Resolver) {
  const configFile = resolve(nuxt.options.rootDir, 'weme.config.json')

  if (existsSync(configFile)) {
    const config = readFileSync(configFile, 'utf-8')
    const parsedConfig = JSON.parse(config)

    if (parsedConfig?.unocss) {
      options = defu({
        accentColors: parsedConfig?.unocss?.accentColors || {},
        neutralColors: parsedConfig?.unocss?.neutralColors || {},
        cssVars: parsedConfig?.unocss?.cssVars || {},
      }, options)
    }
  }

  // variablePrefix
  options.variablePrefix = options.variablePrefix || 'ui'

  // Colors
  options.accentColors = defu(options.accentColors, {
    gunmetal: '#1d2129',
    ocean: '#05f',
  })
  options.neutralColors = defu(options.neutralColors, {
    iron: '#86909c',
  })

  // Themes
  options.themes = options.themes || []
  options.themes.push(defaultTheme)

  if (options.imports?.themes) {
    const resolvedDir = [...new Set(options.imports.themes?.filter(Boolean).map(dir => resolver.resolve(dir)))]
    const { default: fg } = await import('fast-glob')

    for (const dir of resolvedDir) {
      const files = await fg([`${dir}/*.ts`])

      for (const file of files) {
        const module = await import(file)
        const theme = module.default

        if (theme && typeof theme === 'object')
          options.themes.push(theme)
      }
    }
  }

  return options
}
