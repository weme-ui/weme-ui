import type { Theme } from '../theme'
import type {
  CustomThemeColorName,
  CustomThemeCSSVars,
  CustomThemeTokens,
  FlattenedCustomThemeCSSVars,
} from './types'
import { colorAliasTracking, cssVarTracking, generateThemeVariable, getThemeByKey } from '../utils'
import { COLOR_ALIAS_NAMES } from './default'
import { cssVarNameMap, cssVarShortKeysMap, themeTokensMap } from './mappings'

// #region color alias

/**
 * 是否是原始颜色
 *
 * @param color 颜色
 * @returns 是否是原始颜色
 */
export function isRawColor(color: string): boolean {
  return (
    color.startsWith('#') ||
    color.startsWith('rgb(') ||
    color.startsWith('hsl(') ||
    color.startsWith('lab(') ||
    color.startsWith('lch(') ||
    color.startsWith('oklch(') ||
    color.startsWith('color(') ||
    color.startsWith('var(')
  )
}

/**
 * 是否是颜色别名
 *
 * @param alias 颜色别名
 * @returns 是否是颜色别名
 */
export function isColorAlias(alias: string): alias is CustomThemeColorName {
  return COLOR_ALIAS_NAMES.includes(alias as CustomThemeColorName)
}

/**
 * 解析颜色别名
 *
 * @example
 * ```ts
 * parseColorAlias(['accent']) // { color: 'var(--accent-9)', keys: ['accent', '9'], no: '9' }
 * parseColorAlias(['accent', '12']) // { color: 'var(--accent-12)', keys: ['accent', '12'], no: '12' }
 * parseColorAlias(['accent', 'base']) // undefined
 * ```
 *
 * @param keys 拆分键值，如：bg-accent-7 -> ['accent', '7']
 * @returns 颜色别名信息
 */
export function parseColorAlias(keys: string[]) {
  const [alias, ...rest] = keys

  if (!isColorAlias(alias)) {
    return
  }

  if (rest.length === 0) {
    keys.push('9')
  }

  const color: string = generateThemeVariable('colors', keys)
  const no = keys.at(-1)

  if (isNaN(Number(no))) {
    return
  }

  colorAliasTracking(alias, no)

  return {
    color,
    no,
    keys,
  }
}

// #endregion

// #region theme token

/**
 * 是否是主题令牌
 *
 * @param token 令牌
 * @returns 是否是主题令牌
 */
export function isThemeToken(token: string): boolean {
  return Object.entries(themeTokensMap).some(([scope, tokens]) => {
    const isSingleToken = tokens.includes(token) || isThemeScopeToken(token)
    if (!isSingleToken) {
      return tokens.some((tk) => `${scope}-${tk}` === token)
    }
    return isSingleToken
  })
}

/**
 * 是否是主题令牌作用域
 *
 * @param token 令牌
 * @returns 是否是主题令牌作用域
 */
export function isThemeScopeToken(token: string): boolean {
  return Object.keys(themeTokensMap).includes(token)
}

/**
 * 解析主题令牌变量
 *
 * @param tokens 令牌
 * @param varName 变量名
 * @returns 主题令牌变量
 */
export function parseThemeTokenVariable(tokens: string[], varName: string): string {
  if (tokens.filter(Boolean).length === 0) {
    return ''
  }

  let variable = ''

  const [scope] = tokens
  const isCrossScope = tokens.length > 1 && isThemeScopeToken(scope) && scope !== varName

  if (isCrossScope) {
    variable = applyShortKeys(tokens.join('-'))
  }

  if (tokens.length === 1) {
    const inScope = Object.entries(themeTokensMap).some(
      ([name, tokens]) => name === varName && tokens.includes(scope),
    )

    if (inScope) {
      variable = applyShortKeys(`${varName}-${scope}`)
    } else if (isThemeScopeToken(scope)) {
      variable = applyShortKeys(scope)
    }
  }

  if (variable) {
    cssVarTracking(variable)
    return `var(--${variable})`
  }

  return ''
}

// #endregion

// #region custom css var

/**
 * 是否是自定义 CSS 变量
 *
 * @param token 令牌
 * @returns 是否是自定义 CSS 变量
 */
export function isCustomCSSVar(token: string, theme: Theme): boolean {
  const originalCssVars: string[] = getThemeByKey(theme, 'cssVars', ['_']) || []
  const cssVarKeys: string[] = getThemeByKey(theme, 'cssVars', ['keys']) || []

  const inArray = (array: string[]) =>
    array.some((val) => {
      if (!token.includes('-')) {
        return val.startsWith(token + '-')
      }
      return val === token
    })

  return inArray(originalCssVars) || inArray(cssVarKeys)
}

/**
 * 解析自定义 CSS 变量键
 *
 * @example
 * ```ts
 * parseCustomCSSVar('test', theme) // ['test', ['test-1', 'test-2']]
 * ```
 *
 * @param token - CSS 变量键
 * @param theme - 主题
 * @returns 解析后的 CSS 变量键
 */
export function parseCustomCSSVar(token: string, theme: Theme): [string, string[]] | undefined {
  if (isCustomCSSVar(token, theme)) {
    const cssVarKeys: string[] = getThemeByKey(theme, 'cssVars', ['keys']) || []
    return [token, cssVarKeys.filter((key) => key.startsWith(token))]
  }
}

/**
 * 获取自定义 CSS 变量变量
 *
 * @param cssVars - 自定义 CSS 变量
 * @param varName - 变量名
 * @returns 解析后的 CSS 变量值
 */
export function getCustomCSSVarVariable(cssVars: [string, string[]], varName: string): string {
  const [token, variants] = cssVars

  if (variants.length === 0) {
    return ''
  }

  const map = cssVarNameMap.get(varName) || []
  if (map.length === 0) {
    const matched = variants.find((variant) => variant === `${token}-${varName}`)
    if (matched) {
      cssVarTracking(applyShortKeys(matched))
      return `var(--${applyShortKeys(matched)})`
    }
  }

  for (const m of map) {
    const matched = variants.find((variant) => variant === `${token}-${m}`)
    if (matched) {
      cssVarTracking(applyShortKeys(matched))
      return `var(--${applyShortKeys(matched)})`
    }
  }

  cssVarTracking(applyShortKeys(token))

  return `var(--${applyShortKeys(token)})`
}

// #endregion

// #region utilities

/**
 * 应用短键
 *
 * @param key CSS 变量键
 * @returns 应用短键后的 CSS 变量键
 */
export function applyShortKeys(key: string): string {
  const keys = key.includes('-') ? key.split('-') : key.includes('.') ? key.split('.') : [key]

  return keys
    .map((k) => cssVarShortKeysMap[k] ?? k)
    .filter(Boolean)
    .join('-')
}

/**
 * 扁平化 CSS 变量
 *
 * @param cssVars - CSS 变量
 * @returns 扁平化的 CSS 变量
 */
export function flattenCssVars(
  cssVars: CustomThemeTokens | CustomThemeCSSVars,
): FlattenedCustomThemeCSSVars {
  return Object.entries(cssVars).reduce((acc, [scope, vals]) => {
    if (typeof vals === 'string') {
      acc[scope] = vals
    } else {
      Object.entries(vals).forEach(([key, value]) => {
        acc[`${scope}-${key}`] = value as string
      })
    }
    return acc
  }, {} as FlattenedCustomThemeCSSVars)
}

// #endregion
