import type { FillRecord } from '../utils'

/**
 * 主题实色颜色
 *
 * @category Theme
 */
export type ThemeColorScales = FillRecord<string, '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' | 'a9' | 'a10' | 'a11' | 'a12'>

/**
 * 主题颜色
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/colors}
 */
export interface ThemeColors {
  [key: string]: ThemeColorScales & {
    dark?: ThemeColorScales
  }
}

/**
 * 主题动画
 *
 * @category Theme
 */
export interface ThemeAnimations {
  keyframes?: Record<string, string>
  durations?: Record<string, string>
  timingFns?: Record<string, string>
  properties?: Record<string, object>
  counts?: Record<string, string | number>
  category?: Record<string, string>
}

/**
 * 主题
 *
 * @category Theme
 */
export interface Theme {
  font?: Record<string, string>
  colors?: ThemeColors
  spacing?: Record<string, string>
  breakpoint?: Record<string, string>
  verticalBreakpoint?: Record<string, string>
  container?: Record<string, string>
  text?: Record<string, { fontSize?: string, lineHeight?: string, letterSpacing?: string }>
  fontWeight?: Record<string, string>
  tracking?: Record<string, string>
  leading?: Record<string, string>
  radius?: Record<string, string>
  shadow?: Record<string, string | string[]>
  insetShadow?: Record<string, string | string[]>
  dropShadow?: Record<string, string | string[]>
  textShadow?: Record<string, string | string[]>
  ease?: Record<string, string>
  blur?: Record<string, string>
  perspective?: Record<string, string>
  textStrokeWidth?: Record<string, string>
  property?: Record<string, string>
  default?: Record<string, Record<string, string>>

  animation?: ThemeAnimations
  duration?: Record<string, string>

  // container
  containers?: {
    center?: boolean
    padding?: string | Record<string, string>
    maxWidth?: Record<string, string>
  }

  // for variant
  aria?: Record<string, string>
  data?: Record<string, string>
  media?: Record<string, string>
  supports?: Record<string, string>
}
