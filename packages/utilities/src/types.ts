import type { UserConfig } from '@unocss/core'
import type { AccentColorName, NeutralColorName } from '@weme-ui/colors'

/**
 * 松散的自动补全类型
 *
 * @category Utils
 */
export type LooseAutocomplete<T> = T | (string & {})

/**
 * 填充记录类型
 *
 * @category Utils
 */
export type FillRecord<T, K extends string> = { [key in K]: T }

/**
 * 可用颜色名称
 */
export type AvailableColorName = LooseAutocomplete<AccentColorName | NeutralColorName>

/**
 * 颜色别名名称
 */
export type ThemeColorAliasName = 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'

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
export type ThemeRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full'

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
export type ThemeScaling = '90%' | '95%' | '100%' | '105%' | '110%'

/**
 * 主题颜色别名映射
 */
export type ThemeColorAliasMap = FillRecord<AvailableColorName, ThemeColorAliasName>

/**
 * 主题 tokens
 */
export interface ThemeTokens {
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
 * 主题 CSS 变量
 */
export type ThemeCSSVariables = Record<string, string | Record<string, string>>

/**
 * 扁平化后的主题 CSS 变量，用于拍扁 ThemeCSSVariables 和 ThemeTokens 的结构
 */
export type FlattenedThemeCSSVariables = Record<string, string>

/**
 * Weme UI 主题配置
 */
export interface ThemeConfig {
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
  radius: ThemeRadius

  /**
   * 缩放倍率 [data-scaling] -> `var(--scaling, var(--default-scaling))`
   *
   * @default '100%' -> `1`
   */
  scaling: ThemeScaling

  /**
   * 主题颜色别名
   *
   * 自定义颜色规则：--accent-9: var(--custom-accent-9, var(--puerto-9))
   *
   */
  aliases: ThemeColorAliasMap

  /**
   * 主题 Tokens
   */
  tokens: ThemeTokens

  /**
   * CSS 变量
   */
  cssVars: ThemeCSSVariables
}

/**
 * Weme UI 用户自定义主题配置
 */
export interface UserThemeConfig {
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
  radius?: ThemeRadius

  /**
   * 缩放倍率 [data-scaling] -> `var(--scaling, var(--default-scaling))`
   *
   * @default '100%' -> `1`
   */
  scaling?: ThemeScaling

  /**
   * 主题颜色别名
   *
   * 自定义颜色规则：--accent-9: var(--custom-accent-9, var(--puerto-9))
   *
   */
  aliases?: Partial<ThemeColorAliasMap>

  /**
   * 主题 Tokens
   */
  tokens?: Partial<ThemeTokens>

  /**
   * CSS 变量
   */
  cssVars?: ThemeCSSVariables
}

/**
 * 组件级扩展 UnoCSS 配置
 */
export interface UserExtendUnoConfig<Theme extends object = object> {
  /**
   * UnoCSS shortcuts
   *
   * @description 组件级 shortcuts 配置，简化组件样式的开发提供支持
   */
  shortcuts?: UserConfig<Theme>['shortcuts']

  /**
   * UnoCSS animations
   *
   * @description 组件级 animations 配置，简化组件动画的开发提供支持
   */
  animations?: {
    keyframes?: Record<string, string>
    durations?: Record<string, string>
    timingFns?: Record<string, string>
    properties?: Record<string, object>
    counts?: Record<string, string | number>
    category?: Record<string, string>
  }
}
