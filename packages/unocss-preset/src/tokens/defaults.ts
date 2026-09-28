import type { CustomThemeColors, CustomThemeTokens } from './types'

/**
 * 默认主题名称
 *
 * @category Tokens
 */
export const DEFAULT_NAME = 'default'
/**
 * 默认主题颜色
 *
 * @category Tokens
 */
export const DEFAULT_COLORS: CustomThemeColors = {
  primary: 'gunmetal',
  secondary: 'clay',
  neutral: 'iron',
  success: 'green',
  info: 'blue',
  warning: 'orange',
  error: 'red',
}

/**
 * 默认主题令牌
 *
 * @category Tokens
 */
export const DEFAULT_TOKENS: CustomThemeTokens = {
  foreground: {
    highlighted: 'neutral.12',
    base: 'neutral.11',
    subtle: 'neutral.6',
    muted: 'neutral.4',
    inverted: 'neutral.1',
  },
  background: {
    base: 'neutral.1',
    muted: 'neutral.2',
    elevated: 'neutral.3',
    inverted: 'neutral.12',
  },
  border: {
    base: 'neutral.5',
    elevated: 'neutral.6',
    inverted: 'neutral.12',
  },
}

/**
 * 主题令牌映射
 */
export const CUSTOM_THEME_TOKENS_MAP: Record<string, string[]> = {
  text: ['highlighted', 'base', 'subtle', 'muted', 'inverted'],
  background: ['base', 'muted', 'elevated', 'inverted'],
  border: ['base', 'elevated', 'inverted'],
}

/**
 * 模糊 CSS 变量映射
 *
 * - key: CSS 属性名
 * - value: CSS 变量后缀
 *
 * @example
 * ```
 * {
 *   'card-bg': 'neutral.1',
 *   'card-border': 'neutral.5',
 *   'card-text': 'neutral.11',
 *   'card-title-color': 'neutral.12',
 * }
 *
 * `bg-card` -> `background-color: var(--card-bg)`
 * `text-card` -> `color: var(--card-text)`
 * `border-card` -> `border-color: var(--card-border)`
 * `fill-card` -> `fill: var(--card-bg)`
 * `text-card-title` -> `color: var(--card-title)`
 * ```
 */
export const CUSTOM_CSSVAR_FUZZY_MAP: Record<string, string[]> = {
  'color': ['text', 'color'],
  'background-color': ['background', 'bg', 'color', 'fill'],
  'border-color': ['border', 'color'],
  'fill': ['background', 'bg', 'color'],
}
