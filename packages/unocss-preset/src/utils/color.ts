import type { ColorAppearance } from '@weme-ui/colors'
import type { WemeColors, WemeColorScales, WemePresetOptions } from '../types'
import { transformColor } from '@weme-ui/colors'
import { trackColor } from './tracker'

export function parseColor(str: string) {
  const result: {
    color: string
    scale?: number
    opacity?: number
  } = {
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

export function getColorNames(options: WemePresetOptions): string[] {
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

export function transformColors(color: string, isNeutral?: boolean): WemeColors[string] {
  const appearances: ColorAppearance[] = ['light', 'dark']

  return appearances.reduce((acc, appearance) => {
    if (appearance === 'dark') {
      if (color === 'black')
        color = 'white'
      if (color === 'white')
        color = 'black'
    }

    const result = transformColor({ color, appearance, isNeutral })

    acc[appearance] = Object.fromEntries(
      result.map((c, i) => [i + 1, c]),
    ) as unknown as WemeColorScales

    return acc
  }, {} as WemeColors[string])
}
