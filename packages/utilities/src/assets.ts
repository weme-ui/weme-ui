import type { AccentColorName, NeutralColorName } from '@weme-ui/colors'
import type { ThemeColorAliasName } from './types'
import { ACCENT_COLOR_NAMES, NEUTRAL_COLOR_NAMES } from '@weme-ui/colors'
import { THEME_COLOR_ALIAS_NAMES } from './constants'
import { themeTokensMap } from './mappings'

/**
 * 是否是可以解析的颜色
 *
 * @param color 颜色
 * @param includeTokens 是否包含主题令牌
 * @returns 是否是可以解析的颜色
 */
export function hasParseableColor(color: string, includeTokens = false): boolean {
  return (
    isRawColor(color) ||
    isThemeColor(color) ||
    isThemeColorAliasName(color) ||
    (includeTokens && isThemeToken(color) && isThemeTokenScope(color))
  )
}

/**
 * 是否是原始颜色
 *
 * @param color 颜色
 * @returns 是否是原始颜色
 */
export function isRawColor(color: string): boolean {
  const prefixes = [
    '#',
    'rgb(',
    'rgba(',
    'hsl(',
    'hsla(',
    'lab(',
    'lch(',
    'oklch(',
    'color(',
    'var(',
  ]
  return prefixes.some((prefix) => color.startsWith(prefix))
}

/**
 * 是否是主题颜色
 *
 * @param color 颜色
 * @returns 是否是主题颜色
 */
export function isThemeColor(color: string): boolean {
  return (
    ACCENT_COLOR_NAMES.includes(color as AccentColorName) ||
    ['black', 'white', 'black-auto', 'white-auto'].includes(color)
  )
}

/**
 * 是否是主题中性颜色
 *
 * @param color 颜色
 * @returns 是否是主题中性颜色
 */
export function isThemeNeutralColor(color: string): boolean {
  return NEUTRAL_COLOR_NAMES.includes(color as NeutralColorName) || color === 'neutral'
}

/**
 * 是否需要反转颜色，因为这些颜色较浅，需要使用较深的前景色方能看清
 *
 * @param color 颜色
 * @returns 是否需要反转颜色
 */
export function isRequiresInvertedColor(color: string): boolean {
  return ['amber', 'yellow', 'lime', 'mint', 'sky'].includes(color)
}

/**
 * 是否是颜色别名
 *
 * @param name 颜色别名
 * @returns 是否是颜色别名
 */
export function isThemeColorAliasName(name: string): name is ThemeColorAliasName {
  return THEME_COLOR_ALIAS_NAMES.includes(name as ThemeColorAliasName)
}

/**
 * 是否是主题令牌名称
 *
 * @param name 令牌名称
 * @returns 是否是主题令牌名称
 */
export function isThemeToken(name: string): boolean {
  return Object.entries(themeTokensMap).some(([scope, tokens]) => {
    const isSingleToken = tokens.includes(name) || isThemeTokenScope(name)
    if (!isSingleToken) {
      return tokens.some((tk) => `${scope}-${tk}` === name)
    }
    return isSingleToken
  })
}

/**
 * 是否是主题令牌范围
 *
 * @param name 令牌
 * @returns 是否是主题令牌范围
 */
export function isThemeTokenScope(name: string): boolean {
  return Object.keys(themeTokensMap).includes(name)
}

/**
 * 是否是自定义 CSS 变量
 *
 * @param name 变量名称
 * @param data 注册的 CSS 变量数据
 * @returns 是否是自定义 CSS 变量
 */
export function isCustomCssVariable(name: string, data: string[]): boolean {
  if (!data || data.length === 0) {
    return false
  }

  return data.some((val) => {
    return val === name || val.startsWith(`${name}-`)
  })
}
