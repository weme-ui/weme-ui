import type { PresetWemeUIOptions } from '..'
import type { Theme } from './types'
import { applyShortKeys, flattenCssVars, type CustomThemeCSSVars } from '../custom'

export function customCSSVars(options: PresetWemeUIOptions): Theme['cssVars'] {
  const cssVars: Theme['cssVars'] = {}

  // Global css vars
  if (options.cssVars) {
    Object.assign(cssVars, resolveIndexes(options.cssVars))
  }

  // Theme css vars
  if (options.themes) {
    options.themes.forEach((theme) => {
      if (theme.cssVars && Object.keys(theme.cssVars).length > 0) {
        Object.assign(cssVars, resolveIndexes(theme.cssVars))
      }
    })
  }

  return cssVars
}

function resolveIndexes(cssVars: CustomThemeCSSVars): Record<string, string[]> {
  const flattened = flattenCssVars(cssVars)

  return Object.entries(flattened).reduce(
    (acc, [key]) => {
      acc['_'] = acc['_'] || []
      acc['keys'] = acc['keys'] || []

      if (!acc['_'].includes(key)) {
        acc['_'].push(key)
      }

      const shortKey = applyShortKeys(key)
      if (!acc['keys'].includes(shortKey)) {
        acc['keys'].push(shortKey)
      }

      return acc
    },
    {} as Record<string, string[]>,
  )
}
