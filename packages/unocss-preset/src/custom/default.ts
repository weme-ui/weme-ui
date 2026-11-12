import type {
  CustomTheme,
  CustomThemeColorAliases,
  CustomThemeColorName,
  CustomThemeTokens,
} from './types'

/**
 * 默认主题圆角
 */
export const DEFAULT_RADIUS_FACTOR = 1

/**
 * 默认主题缩放
 */
export const DEFAULT_SCALING = 1

/**
 * 默认主题颜色
 */
export const DEFAULT_COLOR_ALIASES: Readonly<CustomThemeColorAliases> = {
  accent: 'puerto',
  neutral: 'iron',
  success: 'green',
  info: 'indigo',
  warning: 'brown',
  error: 'tomato',
}

/**
 * 主题颜色别名
 */
export const COLOR_ALIAS_NAMES: Readonly<CustomThemeColorName[]> = [
  'accent',
  'neutral',
  'success',
  'info',
  'warning',
  'error',
]

/**
 * 默认主题令牌
 */
export const DEFAULT_TOKENS: Readonly<CustomThemeTokens> = {
  foreground: {
    highlighted: 'neutral.12',
    base: 'neutral.11',
    subtle: 'neutral.9',
    muted: 'neutral.7',
    inverted: 'neutral.1',
  },
  background: {
    base: 'neutral.1',
    muted: 'neutral.3',
    elevated: 'neutral.4',
    inverted: 'neutral.12',
  },
  border: {
    base: 'neutral.5',
    elevated: 'neutral.6',
    inverted: 'neutral.12',
  },
}

/**
 * 默认主题
 */
export const DEFAULT_THEME: Readonly<CustomTheme> = {
  name: 'default',
  radius: 'md',
  scaling: '100%',
  aliases: DEFAULT_COLOR_ALIASES,
  tokens: DEFAULT_TOKENS,
  cssVars: {},
}
