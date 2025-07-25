import type { ColorScalesArray } from '@weme-ui/colors'
import type { Preflight, WemeTheme } from '../types'
import { createCssVars, minifyCss } from '../utils'

export function preflightThemes(prefix: string, themes: WemeTheme[]): Preflight[] {
  return Object.entries(themes)
    .map(([_, theme]) => {
      return {
        getCSS() {
          return minifyCss(`
            [data-theme=${theme.id}] {
              color-scheme: ${theme.appearance};
              --${prefix}radius: ${theme.radius};
              ${createThemeColor(prefix, theme.colors)}
              ${createCssVars(prefix, theme.tokens as unknown as Record<string, string>)}
            }
          `)
        },
        layer: 'base',
      }
    })
}

function createThemeColor(prefix: string, colors: WemeTheme['colors']): string {
  return Object.entries(colors)
    .map(([name, scales]: [string, ColorScalesArray]) => {
      // support custom color scales
      if (['accent', 'neutral'].includes(name)) {
        return [
          // default
          `--${prefix}${name}: var(--${prefix}${name}-9);`,
          // scales
          ...scales.map(
            (value, i) => `--${prefix}${name}-${i + 1}: var(--custom-${name}-${i + 1}, ${value});`,
          ),
        ].join('')
      }

      return [
        // default
        `--${prefix}${name}: var(--${prefix}${name}-9);`,
        // scales
        ...scales.map(
          (value, i) => `--${prefix}${name}-${i + 1}: ${value};`,
        ),
      ]
    })
    .join('')
}
