import type { CSSObject, CSSValueInput } from '@unocss/core'
import type { LooseAutocomplete, Prettify } from '../utils'
import type { CUSTOM_CSSVAR_FUZZY_MAP_KEYS } from './defaults'
import type { CustomThemeTokens, ResolvedCustomThemeCSSVars } from './types'
import { symbols } from '@unocss/core'
import { colorAliasTracking, defineProperty } from '../utils'
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

type FuzzyMapKey = Prettify<(typeof CUSTOM_CSSVAR_FUZZY_MAP_KEYS)[number]>

interface CustomThemeParsedResult {
  name: string
  keys: string[]
  alpha: number | undefined
}

/**
 * 解析自定义主题令牌
 *
 * 支持三种匹配：
 * 1. 全称 `{group}-{variant}`，如 `background-elevated` / `foreground-base`
 * 2. 同源简写：传入 `front` 后，裸 `variant` 会补全为该 group
 *    （如 `front: 'background'` 时 `elevated` → `background-elevated`）
 * 3. foreground 特例：裸 `foreground` ≡ `foreground-base`
 *    （规避 `text-base` 字号占用，可用 `text-foreground`）
 *
 * 跨组无简写：`bg-foreground-base` 只能走全称，不会被 `front: 'background'` 改写。
 *
 * @category Tokens
 */
export function parseCustomThemeToken(
  match: string,
  front?: LooseAutocomplete<keyof CustomThemeTokens>,
): CustomThemeParsedResult | undefined {
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

  // foreground 特例：`text-foreground` ≡ `text-foreground-base`
  if (!keys.length && name === 'foreground' && CUSTOM_THEME_TOKENS_MAP.foreground?.includes('base'))
    keys = ['foreground', 'base']

  if (front && CUSTOM_THEME_TOKENS_MAP[front]?.includes(name))
    keys = [front, name]

  return { name, keys, alpha }
}

/**
 * 解析自定义 CSS 变量
 *
 * @category Tokens
 */
export function parseCustomThemeColorCssVar(
  varName: FuzzyMapKey,
  match: string,
  cssVars: ResolvedCustomThemeCSSVars,
): CustomThemeParsedResult | undefined {
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

const WidthKeys = ['border-width', 'width', 'height', 'padding', 'margin'] as const

/**
 * 解析自定义主题尺寸
 *
 * @category Tokens
 */
export function parseCustomThemeSize(
  match: string,
  cssVars: ResolvedCustomThemeCSSVars,
  varName?: typeof WidthKeys[number],
) {
  const splitted = splitCustomThemeTokenKey(match)

  if (!splitted)
    return

  const { name } = splitted

  const widthKeys = (varName ? [varName] : WidthKeys) as string[]
  const suffixes = Object.entries(CUSTOM_CSSVAR_FUZZY_MAP)
    .filter(([key]) => widthKeys.includes(key))
    .reduce((acc, [, value]) => {
      acc.push(...value)
      return acc
    }, [] as string[])

  const variable = Object.keys(cssVars).find(
    k => suffixes.some(suffix => k === `${name}-${suffix}`),
  )

  if (!variable)
    return

  return `var(--${variable.split('-').join('-')})`
}

/**
 * 生成自定义主题 CSS
 *
 * @category Tokens
 */
export function customThemeColorCSSGenerator(
  data: CustomThemeParsedResult,
  property: string,
): [CSSObject, ...CSSValueInput[]] | undefined {
  const { keys, alpha } = data

  if (keys.length === 0)
    return

  const css: CSSObject = {}
  const result: [CSSObject, ...CSSValueInput[]] = [css]

  const value = `var(--${keys.join('-')})`
  const varName = property.replace(/-color/g, '')
  const alphaKey = `--un-${varName}-opacity`
  const percentage = alpha === undefined ? undefined : `${alpha}%`

  css[property] = percentage === undefined
    ? value
    : `color-mix(in oklab, ${value} ${percentage}, transparent)`

  result.push(defineProperty(alphaKey, { syntax: '<percentage>', initialValue: '100%' }))

  const colorValue = `${value} ${percentage ?? `var(${alphaKey})`}`

  if (percentage !== undefined) {
    result.push({
      [symbols.parent]: '@supports (color: color-mix(in lab, red, red))',
      [symbols.noMerge]: true,
      [property]: `color-mix(in oklab, ${colorValue}, transparent)`,
    })
  }

  return result
}

/**
 * 自定义主题 CSS 变量解析器
 *
 * @param property - 输出的 CSS 属性名
 * @param varName - CssVars 模糊匹配键
 * @param front - 同源简写的 token group（见 {@link CUSTOM_THEME_TOKENS_MAP}）
 *   - `bg-*` → `background`（`bg-elevated` ≡ `bg-background-elevated`）
 *   - `text-*` / `placeholder-*` → `foreground`
 *   - `border-*` / `divide-*` → `border`
 *
 * @category Tokens
 */
export function customThemeColorResolver(
  property: string,
  varName: FuzzyMapKey,
  front?: LooseAutocomplete<keyof CustomThemeTokens>,
) {
  return (match: string, cssVars: ResolvedCustomThemeCSSVars): [CSSObject, ...CSSValueInput[]] | undefined => {
    const token = parseCustomThemeToken(match, front)
    const data = token?.keys.length
      ? token
      : parseCustomThemeColorCssVar(varName, match, cssVars)

    if (!data?.keys.length)
      return

    return customThemeColorCSSGenerator(data, property)
  }
}
