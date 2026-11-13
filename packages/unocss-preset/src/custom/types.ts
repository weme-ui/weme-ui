import type { DeepPartial } from '@unocss/core'
import type { AccentColorName, NeutralColorName } from '@weme-ui/colors'
import type { FillRecord, LooseAutocomplete } from '../utils/types'

/**
 * 自定义主题可用颜色值
 */
export type CustomThemeAvailableColorValue = LooseAutocomplete<AccentColorName | NeutralColorName>

/**
 * 自定义主题颜色名称
 */
export type CustomThemeColorName = 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'

/**
 * 圆角大小 [data-radius] -> `var(--radius-factor, var(--default-radius-factor))`
 *
 * - `none` -> `0`
 * - `xs` -> `0.5`
 * - `sm` -> `0.75`
 * - `md` -> `1`
 * - `lg` -> `1.5`
 * - `full` -> `3`
 *
 * @default 'md' -> `1`
 */
export type CustomThemeRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full'

/**
 * 缩放倍率 [data-scaling] -> `var(--scaling, var(--default-scaling))`
 *
 * - `90%` -> `0.9`
 * - `95%` -> `0.95`
 * - `100%` -> `1`
 * - `105%` -> `1.05`
 * - `110%` -> `1.1`
 *
 * @default '100%' -> `1`
 */
export type CustomThemeScaling = '90%' | '95%' | '100%' | '105%' | '110%'

/**
 * 自定义主题颜色别名
 */
export type CustomThemeColorAliases = FillRecord<
  CustomThemeAvailableColorValue,
  CustomThemeColorName
>

/**
 * 自定义主题 tokens
 */
export interface CustomThemeTokens {
  /**
   * Text color
   *
   * - `--text-highlighted`
   * - `--text`
   * - `--text-subtle`
   * - `--text-muted`
   * - `--text-inverted`
   */
  foreground: FillRecord<string, 'highlighted' | 'base' | 'subtle' | 'muted' | 'inverted'>

  /**
   * Background color
   *
   * - `--bg`
   * - `--bg-muted`
   * - `--bg-elevated`
   * - `--bg-inverted`
   */
  background: FillRecord<string, 'base' | 'muted' | 'elevated' | 'inverted'>

  /**
   * Border color
   *
   * - `--border`
   * - `--border-elevated`
   * - `--border-inverted`
   */
  border: FillRecord<string, 'base' | 'elevated' | 'inverted'>
}

/**
 * 自定义主题 CSS 变量
 */
export type CustomThemeCSSVars = Record<string, string | Record<string, string>>

/**
 * 扁平化后的自定义主题 CSS 变量，用于拍扁 CustomThemeCSSVars 和 CustomThemeTokens 的结构
 */
export type FlattenedCustomThemeCSSVars = Record<string, string>

/**
 * 自定义 Weme UI 主题
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
   * 圆角大小 [data-radius] -> `var(--radius-factor, var(--default-radius-factor))`
   *
   * @default 'md' -> `1`
   */
  radius: CustomThemeRadius

  /**
   * 缩放倍率 [data-scaling] -> `var(--scaling, var(--default-scaling))`
   *
   * @default '100%' -> `1`
   */
  scaling: CustomThemeScaling

  /**
   * 主题颜色别名
   *
   * 自定义颜色规则：--accent-9: var(--custom-accent-9, var(--puerto-9))
   *
   */
  aliases: CustomThemeColorAliases

  /**
   * 主题 Tokens
   */
  tokens: CustomThemeTokens

  /**
   * CSS 变量
   */
  cssVars: CustomThemeCSSVars
}

/**
 * 定义主题选项
 */
export type DefineThemeOptions = DeepPartial<Omit<CustomTheme, 'name'>> & {
  /**
   * 主题名称
   */
  name: string
}
