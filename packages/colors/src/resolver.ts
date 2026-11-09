import type { ColorKind, ColorMode, ColorValue, GeneratedColor, RadixColorName } from './types'
import Color from 'colorjs.io'
import { getRadixColorValue } from './colors'
import { RADIX_COLOR_NAMES } from './constants'
import { generateRadixColor } from './generator'
import { toOklchString } from './utils'

/**
 * 解析颜色值
 *
 * 如果颜色值是 Radix 颜色值，则返回 Radix 颜色值
 * 如果颜色值是自定义颜色值，则返回自定义颜色值
 *
 * @param color - 颜色值
 * @param mode - 颜色模式
 * @param kind - 颜色类型
 * @returns - 生成的颜色值
 */
export function resolveColor(
  color: string,
  mode: ColorMode = 'light',
  kind: ColorKind = 'accent',
): GeneratedColor {
  if ([...RADIX_COLOR_NAMES, 'black', 'white'].includes(color)) {
    const radixColors = getRadixColorValue(color as RadixColorName, mode)

    return {
      p3: radixColors,
      oklch: radixColors.map((c) => toOklchString(new Color(c))) as ColorValue<string>,
    }
  }

  return generateRadixColor(color, mode, kind)
}
