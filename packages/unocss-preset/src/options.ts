import type { UserPresetOptions, WemeColors, WemePresetOptions, WemeTheme } from './types'
import { defu } from 'defu'
import RadixColors from './colors'
import { defaultAccentColors, defaultNeutralColors, defaultTheme } from './defaults'
import { trackColorScales } from './utils'
import { transformColors } from './utils/color'

export function resolveOptions(_options: UserPresetOptions): WemePresetOptions {
  return {
    variablePrefix: _options.variablePrefix || 'ui',
    colors: resolveColors(_options.accentColors, _options.neutralColors),
    themes: resolveThemes(_options.themes),
    cssVars: resolveCssVars(_options.cssVars),
  }
}

function resolveColors(
  accentColors?: Record<string, string>,
  neutralColors?: Record<string, string>,
) {
  const colors: WemeColors = RadixColors

  accentColors = defu(accentColors, defaultAccentColors)
  neutralColors = defu(neutralColors, defaultNeutralColors)

  // Custom Accent Colors
  if (accentColors && Object.keys(accentColors).length > 0) {
    Object.entries(accentColors).forEach(([name, color]) => {
      colors[name] = transformColors(color)
    })
  }

  // Custom Neutral Colors
  if (neutralColors && Object.keys(neutralColors).length > 0) {
    Object.entries(neutralColors).forEach(([name, color]) => {
      colors[name] = transformColors(color, true)
    })
  }

  return colors
}

function resolveThemes(themes?: WemeTheme[]): WemeTheme[] {
  const resolved: WemeTheme[] = [
    defaultTheme,
    ...themes || [],
  ]

  // Track colors
  resolved.forEach((theme) => {
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([, color]) => {
        if (
          !color.startsWith('#')
          && !color.startsWith('rgb(')
          && !color.startsWith('hsl(')
          && !color.startsWith('lch(')
          && !color.startsWith('oklch(')
        ) {
          trackColorScales(color)
        }
      })
    }
  })

  return resolved
}

function resolveCssVars(_cssVars?: UserPresetOptions['cssVars']): WemePresetOptions['cssVars'] {
  if (!_cssVars)
    return {}

  const cssVars: WemePresetOptions['cssVars'] = {}

  Object.entries(_cssVars).forEach(([name, value]) => {
    if (typeof value === 'string') {
      cssVars[name] = value
      return
    }

    Object.entries(value as Record<string, string>)
      .forEach(([subName, subValue]) => {
        if (typeof subValue === 'string')
          cssVars[`${name}-${subName}`] = subValue
      })
  })

  return cssVars
}
