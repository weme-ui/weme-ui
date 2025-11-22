import type { InlineCssVars } from '@weme-ui/schema'
import type { WemePresetColors, WemePresetOptions, WemePresetResolvedOptions, WemePresetTheme, WemePresetThemeDefinition } from './types'
import defu from 'defu'
import AllColors from './colors'
import { PRIORITY, THEME } from './defaults'
import { trackColor, transformColors } from './utils'

export function resolveOptions(options: WemePresetOptions): WemePresetResolvedOptions {
  const {
    accentColors,
    neutralColors,
  } = options

  const colors = resolveColors(accentColors, neutralColors)
  const themes = resolveThemes(options.themes || [])
  const cssVars = resolveCssVars(options.cssVars)

  return {
    variablePrefix: options.variablePrefix ? options.variablePrefix.toLowerCase() : 'ui',
    colors,
    themes,
    cssVars,
  }
}

function resolveColors(accentColors?: Record<string, string>, neutralColors?: Record<string, string>) {
  const colors: WemePresetColors = AllColors

  if (accentColors && Object.keys(accentColors).length > 0) {
    Object.entries(accentColors).forEach(([name, color]) => {
      colors[name] = transformColors(color)
    })
  }

  if (neutralColors && Object.keys(neutralColors).length > 0) {
    Object.entries(neutralColors).forEach(([name, color]) => {
      colors[name] = transformColors(color, true)
    })
  }

  return colors
}

function resolveThemes(themes: WemePresetThemeDefinition[]) {
  const resolved: WemePresetTheme[] = [...themes]
    .map((theme) => {
      theme.id = theme.id ?? THEME.id
      theme.name = theme.name ?? THEME.name
      theme.priority = theme.priority ?? theme.id === THEME.id ? THEME.priority : PRIORITY
      theme.appearance = theme.appearance ?? THEME.appearance
      theme.radius = theme.radius ?? THEME.radius
      theme.colors = defu(theme.colors ?? {}, THEME.colors)
      theme.tokens = defu(theme.tokens ?? {}, THEME.tokens)

      return theme as WemePresetTheme
    })
    .filter((theme, index, self) => {
      const foundIndex = self.findIndex(t => t.id === theme.id)
      return index === foundIndex
    })
    .sort((a, b) => b.priority - a.priority)

  resolved.forEach((theme) => {
    Object.entries(theme.colors)
      .forEach(([, color]) => {
        if (
          !color.startsWith('#')
          && !color.startsWith('rgb(')
          && !color.startsWith('rgba(')
          && !color.startsWith('var(')
        ) {
          for (let i = 1; i <= 12; i++) {
            trackColor(color, i)
          }
        }
      })
  })

  return resolved
}

function resolveCssVars(cssVars?: WemePresetOptions['cssVars']) {
  const resolved: InlineCssVars = {}

  if (cssVars && Object.keys(cssVars).length > 0) {
    Object.entries(cssVars).forEach(([name, value]) => {
      if (typeof value === 'string') {
        resolved[name] = value
        return
      }

      Object.entries(value as Record<string, string>)
        .forEach(([subName, subValue]) => {
          if (typeof subValue === 'string')
            resolved[`${name}-${subName}`] = subValue
        })
    })
  }

  return resolved
}
