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
   * 海洋蓝
   */
  ocean: '#05f',
  /**
   * 粘土色
   */
  clay: '#d97757',
} as const

/**
 * 额外的中性色颜色
 */
export const ADDITIONAL_NEUTRAL_COLORS = {
  /**
   * 铁色
   */
  iron: '#86909c',
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
 * 主色名称
 */
export const ACCENT_COLOR_NAMES = [...RADIX_COLOR_NAMES, ...Object.keys(ADDITIONAL_ACCENT_COLORS)] as const

/**
 * 中性色名称
 */
export const NEUTRAL_COLOR_NAMES = [...RADIX_NEUTRAL_COLOR_NAMES, ...Object.keys(ADDITIONAL_NEUTRAL_COLORS)] as const
