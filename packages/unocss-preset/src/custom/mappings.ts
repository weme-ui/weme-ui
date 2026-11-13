/**
 * Css 变量短键映射，用于将 css 变量名映射为短键名
 *
 * @example
 * ```
 * `background-base` -> `bg`
 * `background-default` -> `bg`
 * `background-color` -> `bg`
 * `background-muted` -> `bg-muted`
 * `foreground-base` -> `text`
 * `foreground-muted` -> `text-muted`
 * `skip-name` -> `skip-name`
 * ```
 */
export const cssVarShortKeysMap: Record<string, string> = {
  background: 'bg',
  foreground: 'text',
  text: 'text',
  color: '',
  base: '',
  default: '',
}

/**
 * CSS 变量名映射
 */
export const cssVarNameMap: Map<string, string[]> = new Map([
  ['accent', ['color', 'text']],
  ['bg', ['bg', 'color']],
  ['border', ['border', 'color']],
  ['caret', ['color']],
  ['colors', ['bg', 'color']],
  ['divide', ['border', 'color']],
  ['drop-shadow', ['bg', 'color']],
  ['fill', ['bg', 'color']],
  ['inset-ring', ['bg', 'color']],
  ['line', ['border', 'color']],
  ['outline', ['bg', 'color']],
  ['placeholder', ['text', 'color']],
  ['ring', ['bg', 'color']],
  ['rule', ['border', 'color']],
  ['shadow', ['bg', 'color']],
  ['stroke', ['border', 'color']],
  ['text', ['text', 'color']],
  ['size', ['width', 'height', 'size']],
  ['width', ['width', 'size']],
  ['height', ['height', 'size']],
])

/**
 * 主题令牌映射
 */
export const themeTokensMap: Record<string, string[]> = {
  // text-highlighted, text-default, text-subtle, text-muted, text-inverted
  text: ['highlighted', 'default', 'subtle', 'muted', 'inverted'],
  // bg-default, bg-muted, bg-elevated, bg-inverted
  bg: ['default', 'muted', 'elevated', 'inverted'],
  // border-default, border-elevated, border-inverted
  border: ['default', 'elevated', 'inverted'],
}

/**
 * 主题圆角大小映射
 *
 * @default 'md'
 */
export const themeRadiusMap: Record<string, string> = {
  none: '0',
  xs: '0.5',
  sm: '0.75',
  md: '1',
  lg: '1.5',
  full: '3',
}

/**
 * 主题缩放大小映射
 *
 * @default '100%'
 */
export const themeScalingMap: Record<string, string> = {
  '90%': '0.9',
  '95%': '0.95',
  '100%': '1',
  '105%': '1.05',
  '110%': '1.1',
}
