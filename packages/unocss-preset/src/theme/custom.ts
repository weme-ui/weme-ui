import type { ThemeConfig, ThemeCSSVariables } from '@weme-ui/utilities'
import type { PresetWemeUIOptions } from '..'
import type { Theme } from './types'
import { applyTokenShortKeys, flattenCssVariables } from '@weme-ui/utilities'

export function customCSSVars(options: PresetWemeUIOptions): Theme['cssVars'] {
  const cssVars: Theme['cssVars'] = {}

  // Global css vars
  if (options.cssVars) {
    Object.assign(cssVars, resolveIndexes(options.cssVars))
  }

  const themes = options.themes as ThemeConfig[]

  // Theme css vars
  themes.forEach((theme) => {
    if (theme.cssVars && Object.keys(theme.cssVars).length > 0) {
      Object.assign(cssVars, resolveIndexes(theme.cssVars))
    }
  })

  return cssVars
}

function resolveIndexes(cssVars: ThemeCSSVariables): Record<string, string[]> {
  const flattened = flattenCssVariables(cssVars)

  return Object.entries(flattened).reduce(
    (acc, [key]) => {
      acc['_'] = acc['_'] || []
      acc['keys'] = acc['keys'] || []

      if (!acc['_'].includes(key)) {
        acc['_'].push(key)
      }

      const shortKey = applyTokenShortKeys(key)
      if (!acc['keys'].includes(shortKey)) {
        acc['keys'].push(shortKey)
      }

      return acc
    },
    {} as Record<string, string[]>,
  )
}
