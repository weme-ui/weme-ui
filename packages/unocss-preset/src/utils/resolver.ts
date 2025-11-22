import type { CSSObject } from 'unocss'
import type { WemePresetResolvedOptions } from '../types'
import { trackColor } from './tracker'
import { cssVar, getColorNames, parseColorStr } from './utilities'

const variableMap: Record<string, string[]> = {
  fg: ['default', 'muted', 'toned', 'highlighted'],
  bg: ['default', 'dimmed', 'muted', 'elevated'],
  border: ['default', 'elevated'],
}

const variableNames = Object.keys(variableMap)

const variableSuffixes: Record<string, string[]> = {
  'color': ['fg', 'color'],
  'background-color': ['bg', 'color'],
  'fill': ['bg', 'color'],
  'border-color': ['border', 'color'],
  'border-width': ['border-width'],
  'width': ['width'],
  'height': ['height'],
}

/**
 * Resolve color.
 */
export function resolveColor(property: string, varName: string, args: string, options: WemePresetResolvedOptions) {
  const {
    name,
    scale,
    opacity,
  } = parseColorStr(args)

  const colors = getColorNames(options.colors)

  let css = ''

  // Colors
  if (colors.includes(name)) {
    trackColor(name, scale || 9)
    css = cssVar([name, scale || 9])
  }

  // Tokens with variable name
  if (variableMap[varName]) {
    const suffixes = variableMap[varName]

    if (suffixes.includes(name)) {
      css = cssVar([options.variablePrefix, varName, name])
    }
  }

  // Tokens with name
  if (variableNames.some(p => name.startsWith(p))) {
    css = cssVar([options.variablePrefix, name])
  }

  // Css Variables
  const variable = Object
    .keys(options.cssVars)
    .find((k) => {
      return (variableSuffixes[property] ?? []).some(s => k === `${name}-${s}`)
    })

  if (variable) {
    css = cssVar([options.variablePrefix, variable])
  }

  if (css !== '') {
    if (opacity !== undefined) {
      css = `color-mix(in oklch, ${css} ${opacity}%, transparent)`
    }

    return {
      [`${property}`]: css,
    } as CSSObject
  }
}

/**
 * Resolve theme token value.
 */
export function resolveTokenValue(prefix: string, value: string) {
  if (value.startsWith('$')) {
    return cssVar([prefix, value.slice(1).replace(/\./g, '-')])
  }
  else if (value.includes('.')) {
    const [color, scale] = value.split('.')

    trackColor(color, Number(scale))

    return cssVar([color, scale])
  }

  return value
}
