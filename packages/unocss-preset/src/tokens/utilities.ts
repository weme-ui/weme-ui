import type { CustomThemeCSSVars, CustomThemeTokens } from './types'

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
 *     // 色卡颜色 -> `--card-background: var(--red-9)`
 *     'error-color': 'red.9',
 *     // 主题令牌 -> `--card-text: var(--foreground-base)`
 *     'text': 'foreground.base',
 *   }
 * }
 * ```
 *
 * @category Tokens
 */
export function resolveCustomThemeCssVars(cssVars: CustomThemeCSSVars | CustomThemeTokens) {
  const result: Record<string, string> = {}

  Object.entries(cssVars).forEach(([scope, vars]) => {
    if (typeof vars === 'string') {
      result[`--${scope}`] = resolveAliasCssVar(vars)
    }
    else {
      Object.entries(vars).forEach(([key, value]) => {
        result[`--${scope}-${key}`] = resolveAliasCssVar(value as string)
      })
    }
  })

  return result
}
