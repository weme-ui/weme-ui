/**
 * 额外的中性色
 */
export const ADDITIONAL_NEUTRAL_COLORS = {
  /**
   * 铁灰色
   *
   * @see {@link https://www.color-name.com/hex/53595d}
   */
  iron: '#53595d',
  /**
   *  covert 黑色
   *
   * @see {@link https://www.color-name.com/hex/13151a}
   */
  covert: '#13151a',
} as const

/**
 * 额外的强调色
 */
export const ADDITIONAL_ACCENT_COLORS = {
  /**
   * 粘土色
   *
   * @see {@link https://www.color-name.com/hex/d97757}
   */
  clay: '#d97757',
  /**
   * 摩洛哥蓝
   *
   * @see {@link https://www.color-name.com/hex/065aed}
   */
  moroccan: '#065aed',
  /**
   * 波多黎各绿
   *
   * @see {@link https://www.color-name.com/hex/3fc1aa}
   */
  puerto: '#3fc1aa',
} as const

/**
 * 额外的中性色颜色名称
 */
const ADDITIONAL_NEUTRAL_COLORS_NAMES = Object.keys(
  ADDITIONAL_NEUTRAL_COLORS,
) as (keyof typeof ADDITIONAL_NEUTRAL_COLORS)[]

/**
 * 额外的强调色颜色名称
 */
const ADDITIONAL_ACCENT_COLORS_NAMES = Object.keys(
  ADDITIONAL_ACCENT_COLORS,
) as (keyof typeof ADDITIONAL_ACCENT_COLORS)[]

/**
 * Radix 中性色名称
 */
export const RADIX_NEUTRAL_COLOR_NAMES = [
  'gray',
  'mauve',
  'slate',
  'sage',
  'olive',
  'sand',
] as const

/**
 * Radix 强调色名称
 */
export const RADIX_ACCENT_COLOR_NAMES = [
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'sky',
  'teal',
  'jade',
  'green',
  'mint',
  'grass',
  'lime',
  'bronze',
  'gold',
  'brown',
  'orange',
  'amber',
  'yellow',
] as const

/**
 * Radix 颜色名称
 */
export const RADIX_COLOR_NAMES = [
  ...RADIX_NEUTRAL_COLOR_NAMES,
  ...RADIX_ACCENT_COLOR_NAMES,
] as const

/**
 * 全部中性色名称
 */
export const NEUTRAL_COLOR_NAMES = [
  ...RADIX_NEUTRAL_COLOR_NAMES,
  ...ADDITIONAL_NEUTRAL_COLORS_NAMES,
] as const

/**
 * 全部强调色名称
 */
export const ACCENT_COLOR_NAMES = [...RADIX_COLOR_NAMES, ...ADDITIONAL_ACCENT_COLORS_NAMES] as const

/**
 * 背景颜色
 */
export const BACKGROUND_COLORS = {
  /**
   * 亮色
   */
  light: '#fff',
  /**
   * 暗色
   */
  dark: '#000',
} as const
