import type { VariantHandler } from 'unocss'
import type { WemePresetOptions } from '../types'
import { trackColor } from './tracker'

interface ColorParsedResult {
  color: string
  scale?: number
  opacity?: number
}

export function parseColor(str: string) {
  const result: ColorParsedResult = {
    color: str,
  }

  if (str.includes('/')) {
    const [colorPart, opacityStr] = str.split('/')
    const opacity = Number.parseInt(opacityStr, 10)

    if (!Number.isNaN(opacity) && opacity >= 0 && opacity <= 100) {
      result.color = colorPart
      result.opacity = opacity
    }
  }

  const parts = result.color.split('-')
  const lastPart = parts[parts.length - 1]
  const scale = Number.parseInt(lastPart, 10)

  if (!Number.isNaN(scale) && scale >= 1 && scale <= 12) {
    result.scale = scale
    result.color = parts.slice(0, -1).join('-')
  }

  return result
}

export function resolveColor(property: string, args: string, colors: string[]) {
  const { color, scale = 9, opacity } = parseColor(args)

  if (colors.includes(color)) {
    let colorVar = `var(--${color}-${scale})`

    if (opacity !== undefined) {
      colorVar = `color-mix(in oklab, ${colorVar} ${opacity}%, transparent)`
    }

    trackColor(color, scale)

    return {
      [`${property}`]: colorVar,
    }
  }
}

export function resolveColorNames(options: WemePresetOptions): string[] {
  return Object
    .keys(options.colors)
    .concat([
      'accent',
      'neutral',
      'info',
      'success',
      'warning',
      'error',
    ])
}

const shortcuts: Record<string, string> = {
  foreground: 'fg',
  background: 'bg',
  default: '',
}

export function resolveCssVarName(name: string, prefix?: string) {
  return `--${prefix ? `${prefix}-` : ''}${name.split('-')
    .map(n => shortcuts[n] ?? n)
    .filter(Boolean)
    .join('-')}`
}

export function notLastChildSelectorVariant(s: string): VariantHandler {
  return {
    matcher: s,
    handle: (input, next) => next({
      ...input,
      parent: `${input.parent ? `${input.parent} $$ ` : ''}${input.selector}`,
      selector: ':where(&>:not(:last-child))',
    }),
  }
}

export function minifyCss(css: string) {
  return css.trim().replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\//g, '')
}
