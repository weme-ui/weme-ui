import type * as colors from '@radix-ui/colors'
import type { FillRecord } from '../utils/types'
import type { RADIX_COLOR_NAMES, RADIX_NEUTRAL_COLOR_NAMES } from './defaults'

export type RadixColorName = keyof typeof colors
export type RadixColorPureName = typeof RADIX_COLOR_NAMES[number]
export type RadixNeutralColorPureName = typeof RADIX_NEUTRAL_COLOR_NAMES[number]

/**
 * 颜色空间
 *
 * @category Colors
 */
export type ColorSpace = 'srgb' | 'display-p3'

/**
 * 颜色模式
 *
 * @category Colors
 */
export type ColorMode = 'light' | 'dark'

/**
 * 颜色范围
 *
 * @category Colors
 */
export type ColorScope = 'accent' | 'neutral'

/**
 * 颜色值元组
 *
 * @category Colors
 */
export type ColorValueScales<T> = [T, T, T, T, T, T, T, T, T, T, T, T]

/**
 * 颜色刻度
 *
 * @category Colors
 */
export type ColorScales<T = string, K extends string = string> = Record<K, ColorValueScales<T>>

/**
 * 主题颜色名称/值
 *
 * @category Colors
 */
export type ThemeColorNames = FillRecord<string, 'primary' | 'secondary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'>

/**
 * 自定义颜色
 *
 * @category Colors
 */
export interface CustomColors {
  /**
   * 颜色空间
   *
   * @default 'display-p3'
   */
  space?: ColorSpace
  /**
   * 颜色
   */
  accent?: Record<string, string>
  /**
   * 中性色
   */
  neutral?: Record<string, string>
}
