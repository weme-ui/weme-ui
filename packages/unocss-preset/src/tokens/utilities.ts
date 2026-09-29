import type { CSSObject, CSSValueInput } from '@unocss/core'
import type { Theme } from '../theme'
import type { LooseAutocomplete } from '../utils'
import type { CustomThemeCSSVars, CustomThemeTokens } from './types'
import { symbols } from '@unocss/core'
import { colorAliasTracking, defineProperty, generateThemeVariable, parseColor, themeTracking, trackedCssVars } from '../utils'
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
export function parseCustomThemeColorAlias(keys: string[]) {
  const [alias] = keys

  if (!CUSTOM_THEME_COLOR_ALIASES.includes(alias)) {
    return
  }

  if (keys.length === 1) {
    keys.push('9')
  }

  const color: string = resolveAliasCssVar(keys.join('.'))
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
export function resolveAliasCssVar(alias: string): string {
  if (alias.includes('.')) {
    return `var(--${alias.split('.').join('-')})`
  }
  return alias
}

/**
 * 解析自定义主题 CSS 变量
 *
 * @example
 * ```
 * {
 *   'card': {
 *     // 主题颜色 -> `--card-background: var(--primary-1)`
 *     'background': 'primary.1',
 *     // 色卡颜色 -> `--card-error-color: var(--red-9)`
 *     'error-color': 'red.9',
 *     // 主题令牌 -> `--card-text: var(--foreground-base)`
 *     'text': 'foreground.base',
 *   }
 * }
 * ```
 *
 * @category Tokens
 */
export function resolveCustomThemeCssVars(
  cssVars: CustomThemeCSSVars | CustomThemeTokens,
  theme: Theme,
) {
  const result: Record<string, string> = {}

  Object.entries(cssVars).forEach(([scope, vars]) => {
    if (typeof vars === 'string') {
      const body = vars.replace(/\./g, '-')
      const { keys } = parseColor(body, theme) ?? {}

      if (keys && keys.length > 0) {
        themeTracking('colors', keys)
        result[`--${scope}`] = generateThemeVariable('colors', keys)
      }
      else {
        result[`--${scope}`] = resolveAliasCssVar(vars)
      }
    }
    else {
      Object.entries(vars).forEach(([key, value]) => {
        const body = String(value).replace(/\./g, '-')
        const { keys } = parseColor(body, theme) ?? {}

        if (keys && keys.length > 0) {
          themeTracking('colors', keys)
          result[`--${scope}-${key}`] = generateThemeVariable('colors', keys)
        }
        else {
          result[`--${scope}-${key}`] = resolveAliasCssVar(value as string)
        }
      })
    }
  })

  return result
}

/**
 * 解析自定义主题令牌
 *
 * @category Tokens
 */
export function parseCustomThemeToken(
  property: string,
  body: string,
  token?: LooseAutocomplete<keyof CustomThemeTokens>,
) {
  if (body.startsWith('var('))
    return

  const slash = body.indexOf('/')
  let name = body
  let alpha: number | undefined

  if (slash !== -1) {
    const opacityStr = body.slice(slash + 1)

    if (!/^\d+$/.test(opacityStr))
      return

    alpha = Number(opacityStr)

    if (alpha > 100)
      return

    name = body.slice(0, slash)
  }

  const keys = matchCustomThemeTokenKeys(name, property, token)

  return { name, keys, alpha }
}

/**
 * 按完整口令、显式 token、属性后缀的顺序解析主题令牌键
 *
 * @category Tokens
 */
function matchCustomThemeTokenKeys(
  name: string,
  property: string,
  token?: string,
) {
  const dash = name.indexOf('-')

  if (dash > 0) {
    const scope = name.slice(0, dash)
    const variant = name.slice(dash + 1)
    const variants = CUSTOM_THEME_TOKENS_MAP[scope]

    if (variants?.includes(variant))
      return [scope, variant]
  }

  if (token && CUSTOM_THEME_TOKENS_MAP[token]?.includes(name))
    return [token, name]

  const suffixes = CUSTOM_CSSVAR_FUZZY_MAP[property]

  if (suffixes) {
    for (const suffix of suffixes) {
      if (!token && CUSTOM_THEME_TOKENS_MAP[suffix]?.includes(name))
        return [suffix, name]

      if (trackedCssVars.has(`${name}-${suffix}`))
        return [name, suffix]
    }
  }

  return []
}

/**
 * 解析自定义主题令牌及自定义 CSS 变量
 *
 * @category Tokens
 */
export function resolveCustomThemeToken(
  property: string,
  varName: string,
  body: string,
  token?: LooseAutocomplete<keyof CustomThemeTokens>,
) {
  const parsed = parseCustomThemeToken(property, body, token)
  if (!parsed)
    return

  const { alpha, keys } = parsed
  const alphaKey = `--un-${varName}-opacity`

  const css: CSSObject = {}
  const result: [CSSObject, ...CSSValueInput[]] = [css]

  if (keys.length > 0) {
    const value = `var(--${keys.join('-')})`
    const percentage = alpha === undefined ? undefined : `${alpha}%`
    const shadowLike = ['shadow', 'inset-shadow', 'text-shadow', 'drop-shadow'].includes(varName)

    css[property] = percentage === undefined
      ? value
      : `color-mix(in oklab, ${value} ${percentage}, transparent)`

    result.push(defineProperty(alphaKey, { syntax: '<percentage>', initialValue: '100%' }))

    const colorValue = shadowLike
      ? `${percentage === undefined ? value : `color-mix(in oklab, ${value} ${percentage}, transparent)`} var(${alphaKey})`
      : `${value} ${percentage ?? `var(${alphaKey})`}`

    if (shadowLike || percentage !== undefined) {
      result.push({
        [symbols.parent]: '@supports (color: color-mix(in lab, red, red))',
        [symbols.noMerge]: true,
        [property]: `color-mix(in oklab, ${colorValue}, transparent)`,
      })
    }

    return result
  }
}
