import type { FlattenedThemeCSSVariables, ThemeCSSVariables, ThemeTokens } from './types'
import { isCustomCssVariable, isThemeTokenScope } from './assets'
import { groupedCssVarSuffixesMap, themeTokensMap, tokenShortKeysMap } from './mappings'

/**
 * 扁平化主题 token 或 CSS 变量
 *
 * @param tokens - 主题 token 或 CSS 变量
 * @returns 扁平化的主题 token 或 CSS 变量
 */
export function flattenCssVariables(
  tokens: ThemeTokens | ThemeCSSVariables,
): FlattenedThemeCSSVariables {
  return Object.entries(tokens).reduce((acc, [scope, vals]) => {
    if (typeof vals === 'string') {
      acc[scope] = vals
    } else {
      Object.entries(vals).forEach(([key, value]) => {
        acc[`${scope}-${key}`] = value as string
      })
    }
    return acc
  }, {} as FlattenedThemeCSSVariables)
}

/**
 * 匹配自定义 CSS 变量
 *
 * @param name 变量名称
 * @param data 注册的 CSS 变量数据
 * @returns 匹配的变量名称和变量值
 */
export function matchCustomCssVariable(
  name: string,
  data: string[],
): [string, string[]] | undefined {
  if (isCustomCssVariable(name, data)) {
    return [name, data.filter((val) => val.startsWith(name))]
  }
}

/**
 * 解析 CSS 变量
 *
 * @param matched 匹配的变量名称和变量值，[变量名称, 变量值列表]
 * @param varName 变量后缀
 * @returns 解析后的 CSS 变量，如 `--test-bg`, 未找到则返回空字符串
 */
export function parseCustomCssVariable(matched: [string, string[]], varName: string): string {
  const [name, values] = matched

  if (values.length === 0) {
    return ''
  }

  let variable: string = ''

  const map = groupedCssVarSuffixesMap.get(varName) || []
  if (map.length === 0) {
    const matched = values.find((value) => value === `${name}-${varName}`)
    if (matched) {
      variable = matched
    }
  } else {
    for (const m of map) {
      const matched = values.find((value) => value === `${name}-${m}`)
      if (matched) {
        variable = matched
      }
    }
  }

  if (!variable) {
    variable = name
  }

  return `var(--${applyTokenShortKeys(variable)})`
}

/**
 * 应用 token 短键
 *
 * @param key token 名称
 * @returns 应用 token 短键后的 token 名称
 */
export function applyTokenShortKeys(key: string): string {
  const keys = key.includes('-') ? key.split('-') : key.includes('.') ? key.split('.') : [key]

  return keys
    .map((k) => tokenShortKeysMap[k] ?? k)
    .filter(Boolean)
    .join('-')
}

/**
 * 解析主题 token CSS 变量
 *
 * @param tokens - 主题 token 或 CSS 变量，如 `['test-bg']`
 * @param varName - 变量后缀，如 `bg`
 * @returns - 解析后的 CSS 变量，如 `--test-bg`
 */
export function parseTokenCssVariable(tokens: string[], varName: string): string {
  if (tokens.filter(Boolean).length === 0) {
    return ''
  }

  let variable = ''

  const [scope] = tokens
  const isCrossScope = tokens.length > 1 && isThemeTokenScope(scope) && scope !== varName

  if (isCrossScope) {
    variable = tokens.join('-')
  }

  if (tokens.length === 1) {
    const inScope = Object.entries(themeTokensMap).some(
      ([name, tokens]) => name === varName && tokens.includes(scope),
    )

    if (inScope) {
      variable = `${varName}-${scope}`
    } else if (isThemeTokenScope(scope)) {
      variable = scope
    }
  }

  if (variable) {
    return `var(--${applyTokenShortKeys(variable)})`
  }

  return ''
}

/**
 * 移除 CSS 变量前缀
 *
 * @param variable - CSS 变量，如 `var(--test-bg)`
 * @returns 移除 CSS 变量前缀后的变量，如 `test-bg`
 */
export function unwrapCssVariable(variable: string): string {
  return variable.replace(/var\(\s*--([^)]+)\s*\)/, '$1')
}
