import type { Theme } from './types'

/**
 * 尺寸
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/breakpoints}
 */
export const container = {
  '3xs': '16rem',
  '2xs': '18rem',
  'xs': '20rem',
  'sm': '24rem',
  'md': '28rem',
  'lg': '32rem',
  'xl': '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  'prose': '65ch',
} satisfies Theme['container']

/**
 * 断点
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/breakpoints}
 */
export const breakpoint = {
  mobile: '520px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  wide: '1640px',
} satisfies Theme['breakpoint']

/**
 * 垂直断点
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/breakpoints}
 */
export const verticalBreakpoint = { ...breakpoint } satisfies Theme['verticalBreakpoint']
