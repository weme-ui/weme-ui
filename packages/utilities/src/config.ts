import type { ThemeConfig, UserThemeConfig } from './types'
import { defu } from 'defu'
import { DEFAULT_THEME } from './constants'

/**
 * 定义主题
 *
 * @param config - 主题选项
 */
export function defineTheme(config: UserThemeConfig): ThemeConfig {
  const theme: ThemeConfig = {
    name: config.name ?? 'default',
    radius: config.radius ?? DEFAULT_THEME.radius,
    scaling: config.scaling ?? DEFAULT_THEME.scaling,
    aliases: defu({}, config.aliases, DEFAULT_THEME.aliases),
    tokens: defu({}, config.tokens || {}, DEFAULT_THEME.tokens),
    cssVars: defu({}, config.cssVars, DEFAULT_THEME.cssVars),
  }

  return theme
}
