import type { ColorAppearance } from '@weme-ui/colors'
import type { WemePresetColors, WemePresetColorScales } from '../types'
import { transformColor } from '@weme-ui/colors'
import { BG_BLACK, BG_WHITE, THEME_COLORS } from '../defaults'

/**
 * Transform color to color scales.
 */
export function transformColors(color: string, isNeutral?: boolean): WemePresetColors[string] {
  const appearances: ColorAppearance[] = ['light', 'dark']

  return appearances.reduce((acc, appearance) => {
    if (appearance === 'dark') {
      if (color === 'black')
        color = 'white'
      if (color === 'white')
        color = 'black'
    }

    const result = transformColor({
      color,
      appearance,
      isNeutral,
      background: appearance === 'light' ? BG_WHITE : BG_BLACK,
    })

    acc[appearance] = Object.fromEntries(
      result.map((c, i) => [i + 1, c]),
    ) as unknown as WemePresetColorScales

    return acc
  }, {} as WemePresetColors[string])
}

/**
 * Parse color string into color, scale and opacity.
 *
 * @example
 * ```ts
 * const { name, scale, opacity } = parseColorStr('primary-9/10')
 * ```
 */
export function parseColorStr(str: string) {
  const result: {
    name: string
    scale?: number
    opacity?: number
  } = {
    name: str,
  }

  if (str.includes('/')) {
    const [name, opacityStr] = str.split('/')
    const opacity = Number.parseInt(opacityStr, 10)

    if (!Number.isNaN(opacity) && opacity >= 0 && opacity <= 100) {
      result.name = name
      result.opacity = opacity
    }
  }

  const parts = result.name.split('-')
  const lastPart = parts[parts.length - 1]
  const scale = Number.parseInt(lastPart, 10)

  if (!Number.isNaN(scale) && scale >= 1 && scale <= 12) {
    result.scale = scale
    result.name = parts.slice(0, -1).join('-')
  }

  return result
}

/**
 * Get all color names.
 */
export function getColorNames(colors: WemePresetColors): string[] {
  return [
    ...THEME_COLORS,
    ...Object.keys(colors),
  ].map(n => n.toLowerCase())
}

/**
 * Contact css var name.
 */
export function cssVarName(...args: Array<string | number | undefined>): string {
  const mapping: Record<string, string> = {
    background: 'bg',
    foreground: 'fg',
    color: '',
    default: '',
  }

  return `--${args
    .map(c => c !== undefined ? String(c).toLowerCase() : '')
    .map(c => c.split('-').map(n => mapping[n] ?? n).filter(Boolean).join('-'))
    .filter(Boolean)
    .join('-')}`
}

export function cssVar(args: Array<string | number | undefined>, defaultValue?: string) {
  return `var(${cssVarName(...args)}${defaultValue ? `, ${defaultValue}` : ''})`
}

/**
 * Minify css.
 */
export function minifyCss(css: string, isDev?: boolean) {
  return isDev
    ? css
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\*\//g, '*/\n')
        .replace(/\{/g, '{\n')
        .replace(/\}/g, '}\n')
        .replace(/;/g, ';\n')
    : css
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\/\*[\s\S]*?\*\//g, '')
}
