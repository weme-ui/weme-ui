import type { ThemeColors, ThemeRadius, ThemeScaling, ThemeTokens } from './types'

/**
 * 默认主题名称
 *
 * @category Tokens
 */
export const DEFAULT_NAME = 'default'

/**
 * 默认缩放倍率
 *
 * @category Tokens
 */
export const DEFAULT_SCALING: ThemeScaling = '100%'

/**
 * 默认圆角大小
 *
 * @category Tokens
 */
export const DEFAULT_RADIUS: ThemeRadius = 'md'

/**
 * 默认主题颜色
 *
 * @category Tokens
 */
export const DEFAULT_COLORS: ThemeColors = {
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
export const DEFAULT_TOKENS: ThemeTokens = {
  text: {
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
