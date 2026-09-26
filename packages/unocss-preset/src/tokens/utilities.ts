import type { ThemeColors } from './types'
import { DEFAULT_COLORS } from './defaults'

const CSSVAR_SHORTCUTS: Record<string, string> = {
  background: 'bg',
  foreground: 'text',
  color: '',
  default: '',
}

/**
 * 检查是否为主题颜色名称
 */
export function isThemeColorName(name: string): name is keyof ThemeColors {
  return name in DEFAULT_COLORS
}

/**
 * 获取 CSS 变量名称
 *
 * - ['background', 'name', 9] -> '--bg-name-9'
 * - ['foreground', 'name', 9] -> '--text-name-9'
 * - ['name', 'color', 9] -> '--name-9'
 * - ['name', 'default'] -> '--name'
 * - ['--css-variable'] -> '--css-variable'
 * - ['--card-background'] -> '--card-bg'
 */
export function getCSSVarName(...args: Array<string | number | undefined>): string {
  return `--${args
    .map(c => c !== undefined ? String(c).toLowerCase() : '')
    .map(c => c.split('-').map(n => CSSVAR_SHORTCUTS[n] ?? n).filter(Boolean).join('-'))
    .filter(Boolean)
    .join('-')
    .replace(/^--/, '')}`
}
