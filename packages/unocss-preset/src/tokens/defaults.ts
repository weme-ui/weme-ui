import type { CustomThemeColorAlias, CustomThemeTokens } from './types'

/**
 * 默认主题名称
 *
 * @category Tokens
 */
export const DEFAULT_NAME = 'default'

/**
 * 默认主题颜色
 *
 * @category Tokens
 */
export const DEFAULT_COLOR_ALIASES: CustomThemeColorAlias = {
  accent: 'clay',
  neutral: 'iron',
  success: 'green',
  info: 'indigo',
  warning: 'brown',
  error: 'tomato',
}

/**
 * 默认主题令牌
 *
 * @category Tokens
 */
export const DEFAULT_TOKENS: CustomThemeTokens = {
  foreground: {
    highlighted: 'neutral.12',
    base: 'neutral.11',
    subtle: 'neutral.6',
    muted: 'neutral.4',
    inverted: 'neutral.1',
  },
  background: {
    base: 'neutral.1',
    muted: 'neutral.2',
    elevated: 'neutral.3',
    inverted: 'neutral.12',
  },
  border: {
    base: 'neutral.5',
    elevated: 'neutral.6',
    inverted: 'neutral.12',
  },
}

/**
 * 自定义主题颜色别名
 *
 * @category Tokens
 */
export const CUSTOM_THEME_COLOR_ALIASES: string[] = [
  'accent',
  'neutral',
  'success',
  'info',
  'warning',
  'error',
]

/**
 * 主题令牌映射，限定颜色相关的类名匹配
 *
 * @category Tokens
 */
export const CUSTOM_THEME_TOKENS_MAP: Record<string, string[]> = {
  foreground: ['highlighted', 'base', 'subtle', 'muted', 'inverted'],
  background: ['base', 'muted', 'elevated', 'inverted'],
  border: ['base', 'elevated', 'inverted'],
}

/**
 * 模糊 CSS 变量映射，限定 CSS 属性的后缀匹配
 *
 * @category Tokens
 */
export const CUSTOM_CSSVAR_FUZZY_MAP = {
  /**
   * 颜色变量映射
   *
   * - **Priority**:
   *   - `text` > `color`
   * - **Examples**:
   *   - `text-card` -> `color: var(--card-text)`
   *   - `text-card` -> `color: var(--card-color)`
   */
  'color': ['text', 'color'],

  /**
   * 背景变量映射
   *
   * - **Priority**:
   *   - `background` > `bg` > `color`
   * - **Examples**:
   *   - `bg-card` -> `background-color: var(--card-background)`
   *   - `bg-card` -> `background-color: var(--card-bg)`
   *   - `bg-card` -> `background-color: var(--card-color)`
   */
  'background-color': ['background', 'bg', 'color'],

  /**
   * 边框变量映射
   *
   * - **Priority**:
   *   - `border-color` > `border`
   * - **Examples**:
   *   - `border-card` -> `border-color: var(--card-border-color)`
   *   - `border-card` -> `border-color: var(--card-border)`
   */
  'border-color': ['border-color', 'border'],

  /**
   * 填充变量映射
   *
   * - **Priority**:
   *   - `fill` > `background` > `bg` > `color`
   * - **Examples**:
   *   - `fill-card` -> `fill: var(--card-fill)`
   *   - `fill-card` -> `fill: var(--card-background)`
   *   - `fill-card` -> `fill: var(--card-bg)`
   *   - `fill-card` -> `fill: var(--card-color)`
   */
  'fill': ['fill', 'background', 'bg', 'color'],

  /**
   * 边框宽度变量映射
   *
   * - **Priority**:
   *   - `border-width`
   * - **Examples**:
   *   - `border-width-card` -> `border-width: var(--card-border-width)`
   */
  'border-width': ['border-width'],

  /**
   * 宽度变量映射
   *
   * - **Priority**:
   *   - `width` > `w` > `size` > `max-width` > `max-w` > `min-width` > `min-w`
   * - **Examples**:
   *   - `width-card` -> `width: var(--card-width)`
   *   - `width-card` -> `width: var(--card-w)`
   *   - `width-card` -> `width: var(--card-size)`
   *   - `width-card` -> `width: var(--card-max-width)`
   */
  'width': ['width', 'w', 'size', 'max-width', 'max-w', 'min-width', 'min-w'],

  /**
   * 高度变量映射
   *
   * - **Priority**:
   *   - `height` > `h` > `size` > `max-height` > `max-h` > `min-height` > `min-h`
   * - **Examples**:
   *   - `height-card` -> `height: var(--card-height)`
   *   - `height-card` -> `height: var(--card-h)`
   *   - `height-card` -> `height: var(--card-size)`
   *   - `height-card` -> `height: var(--card-max-height)`
   */
  'height': ['height', 'h', 'size', 'max-height', 'max-h', 'min-height', 'min-h'],

  /**
   * 内边距变量映射
   *
   * - **Priority**:
   *   - `padding` > `p` > `space`
   * - **Examples**:
   *   - `p-card` -> `padding: var(--card-padding)`
   *   - `p-card` -> `padding: var(--card-p)`
   *   - `p-card` -> `padding: var(--card-space)`
   */
  'padding': ['padding', 'p', 'space'],

  /**
   * 外边距变量映射
   *
   * - **Priority**:
   *   - `margin` > `m` > `space`
   * - **Examples**:
   *   - `m-card` -> `margin: var(--card-margin)`
   *   - `m-card` -> `margin: var(--card-m)`
   *   - `m-card` -> `margin: var(--card-space)`
   */
  'margin': ['margin', 'm', 'space'],
}

/**
 * 模糊 CSS 变量映射键
 *
 * @category Tokens
 */
export const CUSTOM_CSSVAR_FUZZY_MAP_KEYS = Object.keys(CUSTOM_CSSVAR_FUZZY_MAP) as (keyof typeof CUSTOM_CSSVAR_FUZZY_MAP)[]
