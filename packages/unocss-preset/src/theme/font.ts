import type { Theme } from './types'

/**
 * 字体
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/typography#font-family}
 */
export const font = {
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    '"Open Sans"',
    'system-ui',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
  ].join(','),
  serif: [
    '"Times New Roman"',
    '"Times"',
    'serif',
  ].join(','),
  mono: [
    '"Menlo"',
    '"Consolas"',
    '"Bitstream Vera Sans Mono"',
    'monospace',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
  ].join(','),
} satisfies Theme['font']

/**
 * 文本
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/typography#type-scale}
 */
export const text = {
  'xs': { fontSize: '0.75rem', lineHeight: '1rem', letterSpacing: '0.0025em' },
  'sm': { fontSize: '0.875rem', lineHeight: '1.25rem' },
  'base': { fontSize: '1rem', lineHeight: '1.5rem' },
  'lg': { fontSize: '1.125rem', lineHeight: '1.625rem', letterSpacing: '-0.0025em' },
  'xl': { fontSize: '1.25rem', lineHeight: '1.75rem', letterSpacing: '-0.005em' },
  '2xl': { fontSize: '1.5rem', lineHeight: '1.875rem', letterSpacing: '-0.00625em' },
  '3xl': { fontSize: '1.75rem', lineHeight: '2.25rem', letterSpacing: '-0.0075em' },
  '4xl': { fontSize: '2.1875rem', lineHeight: '2.5rem', letterSpacing: '-0.01em' },
  '5xl': { fontSize: '3.75rem', lineHeight: '1', letterSpacing: '-0.025em' },
} satisfies Theme['text']

/**
 * 字体粗细
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/typography#font-weight}
 */
export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} satisfies Theme['fontWeight']

/**
 * 字间距
 *
 * @category Theme
 */
export const tracking = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} satisfies Theme['tracking']

/**
 * 行高
 *
 * @category Theme
 */
export const leading = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} satisfies Theme['leading']

/**
 * 文本描边宽度
 *
 * @category Theme
 */
export const textStrokeWidth: Theme['textStrokeWidth'] = {
  DEFAULT: '1.5rem',
  none: '0',
  sm: 'thin',
  md: 'medium',
  lg: 'thick',
} satisfies Theme['textStrokeWidth']
