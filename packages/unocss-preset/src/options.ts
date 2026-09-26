import type { PresetWemeUIOptions } from '.'
import { defu } from 'defu'
import { DEFAULT_COLORS, DEFAULT_NAME, DEFAULT_RADIUS, DEFAULT_SCALING, DEFAULT_TOKENS } from './tokens'

export function resolveOptions(options: PresetWemeUIOptions) {
  options.dark = options.dark ?? 'class'
  options.variablePrefix = options.variablePrefix ?? 'un-'
  options.important = options.important ?? false
  options.colors = options.colors ?? {}
  options.themes = options.themes ?? []
  options.cssVars = options.cssVars ?? {}

  options.themes = options.themes.map((theme) => {
    return {
      name: theme.name ?? DEFAULT_NAME,
      scaling: theme.scaling ?? DEFAULT_SCALING,
      radius: theme.radius ?? DEFAULT_RADIUS,
      colors: defu(theme.colors ?? {}, DEFAULT_COLORS),
      tokens: defu(theme.tokens ?? {}, DEFAULT_TOKENS),
    }
  })

  if (!options.themes.some(theme => theme.name === DEFAULT_NAME)) {
    options.themes.push({
      name: DEFAULT_NAME,
      scaling: DEFAULT_SCALING,
      radius: DEFAULT_RADIUS,
      colors: DEFAULT_COLORS,
      tokens: DEFAULT_TOKENS,
    })
  }

  return options
}
