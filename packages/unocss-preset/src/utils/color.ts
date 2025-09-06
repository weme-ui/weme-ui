import type { ColorAppearance } from '@weme-ui/colors'
import type { WemeColors, WemeColorScales } from '../types'
import { transformColor } from '@weme-ui/colors'

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
