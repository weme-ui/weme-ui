import type { AccentColorNames, NeutralColorNames } from '../colors'
import type { FillRecord, LooseAutocomplete } from '../utils/types'

/**
 * 设计令牌值
 *
 * @category Tokens
 */
type TokenValue<T extends string> = FillRecord<string, T>

/**
 * 圆角大小 `[data-radius]` -> `--radius-factor`
 *
 * - `none` -> `0`
 * - `xs` -> `0.5`
 * - `sm` -> `0.75`
 * - `md` -> `1`
 * - `lg` -> `1.5`
 * - `full` -> `3`
 *
 * @category Tokens
 */
export type CustomThemeRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full'

/**
 * 缩放倍率 `[data-scaling]` -> `--scaling`
 *
 * - `90%` -> `0.9`
 * - `95%` -> `0.95`
 * - `100%` -> `1`
 * - `105%` -> `1.05`
 * - `110%` -> `1.1`
 *
 * @category Tokens
 */
export type CustomThemeScaling = '90%' | '95%' | '100%' | '105%' | '110%'

/**
 * 主题颜色名称/值
 *
 * 自定义颜色规则：--colors-primary: var(--custom-colors-primary-9, var(--colors-gunmetal-9))
 *
 * @category Tokens
 */
export type CustomThemeColors = FillRecord<
  LooseAutocomplete<AccentColorNames | NeutralColorNames>,
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
>

/**
 * 设计令牌
 *
 * @category Tokens
 */
export interface CustomThemeTokens {
  /**
   * Text color
   *
   * - `--text-color-highlighted`
   * - `--text-color`
   * - `--text-color-subtle`
   * - `--text-color-muted`
   * - `--text-color-inverted`
   */
  text: TokenValue<'highlighted' | 'base' | 'subtle' | 'muted' | 'inverted'>

  /**
   * Background color
   *
   * - `--bg-color`
   * - `--bg-color-muted`
   * - `--bg-color-elevated`
   * - `--bg-color-inverted`
   */
  background: TokenValue<'base' | 'muted' | 'elevated' | 'inverted'>

  /**
   * Border color
   *
   * - `--border-color`
   * - `--border-color-elevated`
   * - `--border-color-inverted`
   */
  border: TokenValue<'base' | 'elevated' | 'inverted'>
}

/**
 * WemeUI 主题
 *
 * @category Tokens
 */
export interface CustomTheme {
  /**
   * 主题名称
   *
   * @example [data-theme="default"]
   *
   * @default 'default'
   */
  name: string
  /**
   * 主题颜色
   */
  colors: CustomThemeColors
  /**
   * 主题令牌
   */
  tokens: CustomThemeTokens
}
