import type { Theme } from '../theme'
import type { CustomThemeCSSVars, CustomThemeTokens } from './types'
import { colorAliasTracking, generateThemeVariable, parseColor, themeTracking } from '../utils'
import { CUSTOM_THEME_COLOR_ALIASES } from './defaults'

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

export function parseCustomThemeColorAlias(keys: string[]) {
  const [alias] = keys

  if (!CUSTOM_THEME_COLOR_ALIASES.includes(alias)) {
    return
  }

  if (keys.length === 1) {
    keys.push('9')
  }

  const color: string = resolveAliasCssVar(keys.join('-'))
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
  return `var(--${alias})`
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

      if (keys) {
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

        if (keys) {
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
