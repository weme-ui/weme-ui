import type { GenerateColorScalesOptions, GenerateColorScalesResult } from './generator'
import type { ColorMode, ColorSpace, ColorValueScales, RadixColorName, RadixColorPureName } from './types'
import * as colors from '@radix-ui/colors'
import { RADIX_COLOR_NAMES } from './defaults'
import { generateRadixColorScales } from './generator'

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
  /**
   * 颜色空间
   *
   * @default 'display-p3'
   */
  space?: ColorSpace
  /**
   * 使用透明颜色值
   *
   * @default false
   */
  alpha?: boolean
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
    space = 'display-p3',
    alpha = false,
  } = options

  const isOverlayColor = name === 'black' || name === 'white'
  const isDarkBlack = name === 'black' && mode === 'dark'
  const isDarkWhite = name === 'white' && mode === 'dark'

  const solidColorKeySuffixMap: Record<ColorSpace, string> = { 'srgb': '', 'display-p3': 'P3' }
  const alphaColorKeySuffixMap: Record<ColorSpace, string> = { 'srgb': 'A', 'display-p3': 'P3A' }

  const colorKey = [
    isDarkBlack ? 'white' : isDarkWhite ? 'black' : name,
    mode === 'dark' && !isOverlayColor ? 'Dark' : '',
    (isOverlayColor ? true : alpha) ? alphaColorKeySuffixMap[space] : solidColorKeySuffixMap[space],
  ].join('') as RadixColorName

  return Object.values(colors[colorKey]) as ColorValueScales<string>
}

/**
 * 解析 Radix 颜色刻度
 */
export function resolveRadixColorScales(options: GenerateColorScalesOptions): GenerateColorScalesResult {
  const {
    color,
    space = 'display-p3',
    mode = 'light',
    kind = 'accent',
  } = options

  if ([...RADIX_COLOR_NAMES, 'black', 'white'].includes(color)) {
    return {
      solid: getRadixColorScales({ name: color as RadixColorPureName, mode, space }),
      alpha: getRadixColorScales({ name: color as RadixColorPureName, mode, space, alpha: true }),
    }
  }

  return generateRadixColorScales({
    color,
    space,
    mode,
    kind,
  })
}
