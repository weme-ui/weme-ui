import type { WemePresetResolvedOptions } from '../types'
import { parseColor } from './color'

const variablesAbbrMap: Record<string, string> = {
  background: 'bg',
  foreground: 'fg',
  color: '',
  default: '',
}

export function getCssVarName(name: string, prefix?: string) {
  return `--${prefix ? `${prefix}-` : ''}${name.split('-')
    .map(n => variablesAbbrMap[n] ?? n)
    .filter(Boolean)
    .join('-')}`
}

const variablesPropertyMap: Record<string, string[]> = {
  // Color
  'color': ['foreground', 'fg'],
  'background-color': ['background', 'bg'],

  // Border
  'border-width': ['border'],

  // Size
  'width': ['width'],
  'height': ['height'],
}

export function resolveCssVar(property: string, args: string, options: WemePresetResolvedOptions) {
  const suffixes = variablesPropertyMap[property] ?? []
  const { color, opacity } = parseColor(args)

  const variable = Object
    .keys(options.cssVars)
    .find((k) => {
      return suffixes.some(s => k === `${color}-${s}`)
    })

  if (variable) {
    const cssVar = `var(${getCssVarName(variable, options.variablePrefix)})`

    return {
      [property]: opacity !== undefined
        ? `color-mix(in oklab, ${cssVar} ${opacity}%, transparent)`
        : cssVar,
    }
  }
}
