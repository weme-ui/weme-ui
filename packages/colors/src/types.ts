import type * as colors from '@radix-ui/colors'
import {
  ACCENT_COLOR_NAMES,
  NEUTRAL_COLOR_NAMES,
  RADIX_COLOR_NAMES,
  RADIX_NEUTRAL_COLOR_NAMES,
} from './constants'

/**
 * 原始 Radix 颜色名称
 */
export type OriginalRadixColorName = keyof typeof colors

/**
 * Radix 强调色名称
 */
export type RadixColorName = (typeof RADIX_COLOR_NAMES)[number]

/**
 * Radix 中性色名称
 */
export type RadixNeutralColorName = (typeof RADIX_NEUTRAL_COLOR_NAMES)[number]

/**
 * 可用强调色名称
 */
export type AccentColorName = (typeof ACCENT_COLOR_NAMES)[number]

/**
 * 可用中性色名称
 */
export type NeutralColorName = (typeof NEUTRAL_COLOR_NAMES)[number]

/**
 * 颜色模式
 */
export type ColorMode = 'light' | 'dark'

/**
 * 颜色种类
 */
export type ColorKind = 'accent' | 'neutral'

/**
 * 颜色刻度
 */
export type ColorValue<T> = [T, T, T, T, T, T, T, T, T, T, T, T]

/**
 * 具名颜色刻度
 */
export type ColorScales<T = string, K extends string = string> = Record<K, ColorValue<T>>

/**
 * 生成的颜色值刻度
 */
export type GeneratedColor = ColorScales<string, 'oklch' | 'p3'>
