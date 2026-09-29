import type { LooseAutocomplete } from '../utils'
import type { CUSTOM_CSSVAR_FUZZY_MAP_KEYS } from './defaults'
import type { CustomThemeTokens, ResolvedCustomThemeCSSVars } from './types'
import { colorAliasTracking } from '../utils'
import { CUSTOM_CSSVAR_FUZZY_MAP, CUSTOM_THEME_COLOR_ALIASES, CUSTOM_THEME_TOKENS_MAP } from './defaults'

/**
 * 检查是否为原始颜色
 *
 * @category Tokens
 */
export function isRawColor(color: string): boolean {
  return color.startsWith('#')
    || color.startsWith('rgb(')
    || color.startsWith('hsl(')
    || color.startsWith('lab(')
    || color.startsWith('lch(')
    || color.startsWith('oklch(')
    || color.startsWith('color(')
    || color.startsWith('var(')
}

/**
 * 解析自定义主题颜色别名
 *
 * @category Tokens
 */
export function parseColorAlias(keys: string[]) {
  const [alias] = keys

  if (!CUSTOM_THEME_COLOR_ALIASES.includes(alias)) {
    return
  }

  if (keys.length === 1) {
    keys.push('9')
  }

  const color: string = generateColorAliasCssVar(keys.join('.'))
  const no = keys.at(-1)

  colorAliasTracking(alias, no)

  return {
    color,
    no,
    keys,
  }
}

/**
 * 解析别名 CSS 变量
 *
 * @category Tokens
 */
export function generateColorAliasCssVar(alias: string): string {
  if (alias.includes('.')) {
    return `var(--${alias.split('.').join('-')})`
  }
  return alias
}

/**
 * 分割自定义主题令牌键
 *
 * @category Tokens
 */
export function splitCustomThemeTokenKey(match: string) {
  if (match.startsWith('var('))
    return

  const slash = match.indexOf('/')
  let name = match
  let alpha: number | undefined

  if (slash !== -1) {
    const opacityStr = match.slice(slash + 1)

    if (!/^\d+$/.test(opacityStr))
      return

    alpha = Number(opacityStr)

    if (alpha > 100)
      return

    name = match.slice(0, slash)
  }

  return { name, alpha }
}

/**
 * 解析自定义主题令牌
 *
 * @category Tokens
 */
export function parseCustomThemeToken(
  match: string,
  front?: LooseAutocomplete<keyof CustomThemeTokens>,
) {
  const splitted = splitCustomThemeTokenKey(match)

  if (!splitted)
    return

  const { name, alpha } = splitted

  let keys: string[] = []

  const dash = name.indexOf('-')

  if (dash > 0) {
    const k = name.slice(0, dash)
    const v = name.slice(dash + 1)
    const values = CUSTOM_THEME_TOKENS_MAP[k]

    if (values?.includes(v))
      keys = [k, v]
  }

  if (front && CUSTOM_THEME_TOKENS_MAP[front]?.includes(name))
    keys = [front, name]

  return { name, keys, alpha }
}

type FuzzyMapKey = (typeof CUSTOM_CSSVAR_FUZZY_MAP_KEYS)[number]

/**
 * 解析自定义 CSS 变量
 *
 * @category Tokens
 */
export function parseCustomCssVar(
  varName: FuzzyMapKey,
  match: string,
  cssVars: ResolvedCustomThemeCSSVars,
) {
  const splitted = splitCustomThemeTokenKey(match)

  if (!splitted)
    return

  const { name, alpha } = splitted

  const suffixes = CUSTOM_CSSVAR_FUZZY_MAP[varName]
  if (!suffixes)
    return

  const variable = Object.keys(cssVars).find(
    k => suffixes.some(suffix => k === `${name}-${suffix}`),
  )

  if (!variable)
    return

  return {
    name,
    keys: variable.split('-'),
    alpha,
  }
}
