import type { HaloPresetOptions, UserPresetOptions } from './types'
import { resolveColors } from './colors'
import { resolveThemes } from './themes'

export function resolveOptions(options: UserPresetOptions): HaloPresetOptions {
  const prefix = options.prefix ?? 'ui-'
  const reset = options.reset ?? true
  const background = resolveBackground(options.background)
  const accentColors = resolveColors(options.accentColors, background)
  const neutralColors = resolveColors(options.neutralColors, background, true)
  const themes = resolveThemes(options.themes || [], background, prefix)

  return {
    prefix,
    reset,
    accentColors,
    neutralColors,
    background,
    themes,
  }
}

function resolveBackground(
  background: UserPresetOptions['background'],
): HaloPresetOptions['background'] {
  return {
    light: background?.light ?? '#fff',
    dark: background?.dark ?? '#111',
  }
}
