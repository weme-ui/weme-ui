import type { ThemeColorAliasName } from './types'
import { THEME_COLOR_ALIAS_NAMES } from './constants'
import { themeTokensMap } from './mappings'

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
  return data.some((val) => {
    return val === name || val.startsWith(`${name}-`)
  })
}
