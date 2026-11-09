import type {
  ColorMode,
  ColorScales,
  ColorValue,
  RadixColorName,
  RadixNeutralColorName,
} from './types'
import * as colors from '@radix-ui/colors'
import Color from 'colorjs.io'
import { RADIX_COLOR_NAMES, RADIX_NEUTRAL_COLOR_NAMES } from './constants'

export type RadixColorScales<T extends RadixColorName> = ColorScales<Color, T>

/**
 * Light 模式下的 Radix 颜色值对象
 */
export const lightColors = Object.fromEntries(
  RADIX_COLOR_NAMES.map((name) => [
    name,
    getRadixColorValue(name).map((c) => new Color(c).to('oklch')) as ColorValue<Color>,
  ]),
) as RadixColorScales<RadixColorName>

/**
 * Dark 模式下的 Radix 颜色值对象
 */
export const darkColors = Object.fromEntries(
  RADIX_COLOR_NAMES.map((name) => [
    name,
    getRadixColorValue(name, 'dark').map((c) => new Color(c).to('oklch')) as ColorValue<Color>,
  ]),
) as RadixColorScales<RadixColorName>

/**
 * Light 模式下的 Radix 中性颜色值对象
 */
export const lightNeutralColors = Object.fromEntries(
  RADIX_NEUTRAL_COLOR_NAMES.map((name) => [
    name,
    getRadixColorValue(name).map((c) => new Color(c).to('oklch')) as ColorValue<Color>,
  ]),
) as RadixColorScales<RadixNeutralColorName>

/**
 * Dark 模式下的 Radix 中性颜色值对象
 */
export const darkNeutralColors = Object.fromEntries(
  RADIX_NEUTRAL_COLOR_NAMES.map((name) => [
    name,
    getRadixColorValue(name, 'dark').map((c) => new Color(c).to('oklch')) as ColorValue<Color>,
  ]),
) as RadixColorScales<RadixNeutralColorName>

/**
 * 获取 Radix 颜色值
 *
 * @param name - 颜色名称, 支持 `black` 和 `white`
 * @param mode - 颜色模式
 * @returns - 颜色值
 */
export function getRadixColorValue(
  name: RadixColorName | 'black' | 'white',
  mode: ColorMode = 'light',
): ColorValue<string> {
  const isDarkBlack = name === 'black' && mode === 'dark'
  const isDarkWhite = name === 'white' && mode === 'dark'
  const isBlackOrWhite = ['black', 'white'].includes(name)

  const colorKey = [
    isDarkBlack ? 'white' : isDarkWhite ? 'black' : name,
    mode === 'dark' && !isBlackOrWhite ? 'Dark' : '',
    'P3',
    isBlackOrWhite ? 'A' : '',
  ].join('') as RadixColorName

  return Object.values(colors[colorKey]) as ColorValue<string>
}
