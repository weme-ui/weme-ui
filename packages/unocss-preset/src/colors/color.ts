import type { GenerateColorScalesOptions } from './generator'
import type { ColorMode, ColorValueScales, RadixColorName, RadixColorPureName, ResolvedColorScales } from './types'
import * as colors from '@radix-ui/colors'
import Color from 'colorjs.io'
import { RADIX_COLOR_NAMES } from './defaults'
import { generateRadixColorScales } from './generator'
import { toOklchString } from './utils'

export interface GetRadixColorScalesOptions {
  /**
   * 颜色名称
   */
  name: RadixColorPureName | 'black' | 'white'
  /**
   * 颜色模式
   *
   * @default 'light'
   */
  mode?: ColorMode
}

/**
 * 获取 Radix Colors 颜色值刻度
 */
export function getRadixColorScales(
  options: GetRadixColorScalesOptions,
): ColorValueScales<string> {
  const {
    name,
    mode = 'light',
  } = options

  const isBlackOrWhite = name === 'black' || name === 'white'
  const isDarkBlack = name === 'black' && mode === 'dark'
  const isDarkWhite = name === 'white' && mode === 'dark'

  const colorKey = [
    isDarkBlack ? 'white' : isDarkWhite ? 'black' : name,
    mode === 'dark' && !isBlackOrWhite ? 'Dark' : '',
    'P3',
    isBlackOrWhite ? 'A' : '',
  ].join('') as RadixColorName

  return Object.values(colors[colorKey]) as ColorValueScales<string>
}

/**
 * 解析 Radix 颜色刻度
 */
export function resolveRadixColorScales(options: GenerateColorScalesOptions): ResolvedColorScales {
  const {
    color,
    mode = 'light',
    kind = 'accent',
  } = options

  if ([...RADIX_COLOR_NAMES, 'black', 'white'].includes(color)) {
    const radixColors = getRadixColorScales({ name: color as RadixColorPureName, mode })

    return {
      p3: radixColors,
      oklch: radixColors.map(c => toOklchString(new Color(c))) as ColorValueScales<string>,
    }
  }

  return generateRadixColorScales({
    color,
    mode,
    kind,
  })
}
