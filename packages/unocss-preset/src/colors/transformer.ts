import type { WemeColorArray, WemeColorMode } from '../types'
import { ALL_COLOR_NAMES } from '../defaults'
import { blackColors, darkColors, darkGrayColors, lightColors, lightGrayColors, whiteColors } from './colors'
import { generateColor, generateGrayColor, toOklchString } from './generator'

export function transformColor(
  color: string,
  mode: WemeColorMode,
  isGray?: boolean,
): WemeColorArray<string> {
  if (ALL_COLOR_NAMES.includes(color as any)) {
    if (mode === 'light') {
      return isGray
        ? lightGrayColors[color as keyof typeof lightGrayColors].map(toOklchString) as WemeColorArray<string>
        : lightColors[color as keyof typeof lightColors].map(toOklchString) as WemeColorArray<string>
    }
    else {
      return isGray
        ? darkGrayColors[color as keyof typeof darkGrayColors].map(toOklchString) as WemeColorArray<string>
        : darkColors[color as keyof typeof darkColors].map(toOklchString) as WemeColorArray<string>
    }
  }

  if (color === 'black')
    return blackColors.map(toOklchString) as WemeColorArray<string>
  if (color === 'white')
    return whiteColors.map(toOklchString) as WemeColorArray<string>

  return isGray
    ? generateGrayColor(color, mode)
    : generateColor(color, mode)
}
