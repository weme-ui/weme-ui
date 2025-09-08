import type { WemePresetOptions } from '../types'

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

export function resolveCssVar(property: string, args: string, options: WemePresetOptions) {
  const suffixes = variablesPropertyMap[property] ?? []
  const variable = Object
    .keys(options.cssVars)
    .find((k) => {
      return suffixes.some(s => k === `${args}-${s}`)
    })

  if (variable) {
    return {
      [property]: `var(${getCssVarName(variable, options.variablePrefix)})`,
    }
  }
}
