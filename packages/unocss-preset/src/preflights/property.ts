import type { Preflight } from '@unocss/core'
import type { PresetWemeUIOptions } from '..'
import type { Theme } from '../theme'
import { getTrackedProperties } from '../utils/track'

export function property(options: PresetWemeUIOptions): Preflight<Theme> | undefined {
  const parentSelector =
    '@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))'
  const selector = '*, ::before, ::after, ::backdrop'
  const prefix = options.variablePrefix ?? 'un-'

  return {
    getCSS: ({ theme }) => {
      const trackedProperties = getTrackedProperties(theme)
      if (trackedProperties.size === 0) return

      const css = Array.from(trackedProperties.entries())
        .toSorted(([a], [b]) => a.localeCompare(b))
        .map(([property, value]) => `${property.replace(/^--un-/, `--${prefix}`)}:${value};`)
        .join('')

      return `${parentSelector}{${selector}{${css}}}`
    },
    layer: 'properties',
  }
}
