import type { DeepPartial } from '@unocss/core'
import type { CustomTheme, CustomThemeTokens } from './types'
import { defu } from 'defu'
import { DEFAULT_THEME } from './default'

type DefineThemeOptions = DeepPartial<Omit<CustomTheme, 'name'>> & {
  name: string
}

/**
 * 定义主题
 *
 * @param options - 主题选项
 */
export function defineTheme(options: DefineThemeOptions): CustomTheme {
  const theme: CustomTheme = {
    name: options.name,
    radius: options.radius ?? DEFAULT_THEME.radius,
    scaling: options.scaling ?? DEFAULT_THEME.scaling,
    aliases: defu({}, options.aliases, DEFAULT_THEME.aliases),
    tokens: defu({}, options.tokens || {}, DEFAULT_THEME.tokens) as CustomThemeTokens,
    cssVars: defu({}, options.cssVars, DEFAULT_THEME.cssVars),
  }

  return theme
}
