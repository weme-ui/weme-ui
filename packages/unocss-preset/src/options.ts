import type { UserPresetOptions, WemePresetOptions } from './types'
import { resolveColors } from './colors'
import { DEFAULT_BACKGROUND_DARK, DEFAULT_BACKGROUND_LIGHT, DEFAULT_PREFIX } from './constants'
import { resolveThemes } from './themes'

export function resolveOptions(options: UserPresetOptions): WemePresetOptions {
  const prefix = options.prefix ?? DEFAULT_PREFIX
  const reset = options.reset ?? true
  const background = resolveBackground(options.background)
  const accentColors = resolveColors(options.accentColors, background)
  const neutralColors = resolveColors(options.neutralColors, background, true)
  const injectDefaultThemes = options.injectDefaultThemes ?? true
  const themes = resolveThemes(options.themes || [], background, prefix, injectDefaultThemes)
  const cssVars = resolveCssVars(options.cssVars)

  return {
    prefix,
    reset,
    accentColors,
    neutralColors,
    background,
    injectDefaultThemes,
    themes,
    cssVars,
  }
}

function resolveBackground(
  background: UserPresetOptions['background'],
): WemePresetOptions['background'] {
  return {
    light: background?.light ?? DEFAULT_BACKGROUND_LIGHT,
    dark: background?.dark ?? DEFAULT_BACKGROUND_DARK,
  }
}

function resolveCssVars(cssVars: UserPresetOptions['cssVars']): WemePresetOptions['cssVars'] {
  if (!cssVars)
    return {}

  const flatVars: WemePresetOptions['cssVars'] = {}

  Object.entries(cssVars).forEach(([name, value]) => {
    if (typeof value === 'string') {
      flatVars[name] = value
      return
    }

    Object.entries(value as Record<string, string>)
      .forEach(([subName, subValue]) => {
        flatVars[`${name}-${subName}`] = subValue
      })
  })

  return flatVars
}
