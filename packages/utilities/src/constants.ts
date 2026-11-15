import type { ThemeColorAliasName, ThemeConfig } from './types'

/**
 * 主题颜色别名
 */
export const THEME_COLOR_ALIAS_NAMES: Readonly<ThemeColorAliasName[]> = [
  'accent',
  'neutral',
  'success',
  'info',
  'warning',
  'error',
]

/**
 * 默认主题
 */
export const DEFAULT_THEME: Readonly<ThemeConfig> = {
  name: 'default',
  radius: 'md',
  scaling: '100%',
  aliases: {
    accent: 'puerto',
    neutral: 'iron',
    success: 'green',
    info: 'indigo',
    warning: 'brown',
    error: 'tomato',
  },
  tokens: {
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
  },
  cssVars: {},
}
