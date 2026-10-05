/**
 * Radix Colors 中性色名称
 */
export const RADIX_NEUTRAL_COLOR_NAMES = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const

/**
 * Radix Colors 主色名称
 */
export const RADIX_COLOR_NAMES = [...RADIX_NEUTRAL_COLOR_NAMES, 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'] as const

/**
 * 额外的主色颜色
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
 * 额外的中性色颜色
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
 * 默认背景色
 */
export const DEFAULT_BACKGROUND_COLORS = {
  /**
   * 亮色
   */
  light: '#fff',
  /**
   * 暗色
   */
  dark: '#000',
} as const

/**
 * 额外的主色颜色名称
 */
const ADDITIONAL_ACCENT_COLORS_NAMES = Object.keys(ADDITIONAL_ACCENT_COLORS) as (keyof typeof ADDITIONAL_ACCENT_COLORS)[]

/**
 * 主色名称
 */
export const ACCENT_COLOR_NAMES = [...RADIX_COLOR_NAMES, ...ADDITIONAL_ACCENT_COLORS_NAMES] as const

/**
 * 额外的中性色颜色名称
 */
const ADDITIONAL_NEUTRAL_COLORS_NAMES = Object.keys(ADDITIONAL_NEUTRAL_COLORS) as (keyof typeof ADDITIONAL_NEUTRAL_COLORS)[]

/**
 * 中性色名称
 */
export const NEUTRAL_COLOR_NAMES = [...RADIX_NEUTRAL_COLOR_NAMES, ...ADDITIONAL_NEUTRAL_COLORS_NAMES] as const
