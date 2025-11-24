import type { ColorAppearance, ColorScalesArray } from './types'
import { getColors } from './colors'
import { generateColor } from './generator'
import { getRadixColor, isRadixColorName } from './utils'

interface TransformColorOptions {
  color: string
  appearance?: ColorAppearance
  isNeutral?: boolean
  background?: string
}

export function transformColor({
  color,
  appearance = 'light',
  isNeutral = false,
  background = '#fff',
}: TransformColorOptions): ColorScalesArray {
  if (isRadixColorName(color))
    return getRadixColor(appearance, color, true)

  const colors = getColors(appearance, isNeutral)

  return generateColor(color, colors, background)
}
