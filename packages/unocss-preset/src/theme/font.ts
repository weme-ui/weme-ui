import type { Theme } from './types'

/**
 * 字体
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
  serif: ['"Times New Roman"', '"Times"', 'serif'].join(','),
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
 * @link {@see https://www.radix-ui.com/themes/docs/theme/typography#type-scale}
 */
export const text = {
  // 12px  16px
  xs: { fontSize: '0.75rem', lineHeight: '1rem', letterSpacing: '0.0025em' },
  // 14px  20px
  sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
  // 16px  24px
  base: { fontSize: '1rem', lineHeight: '1.5rem' },
  // 18px  26px
  lg: { fontSize: '1.125rem', lineHeight: '1.625rem', letterSpacing: '-0.0025em' },
  // 20px  28px
  xl: { fontSize: '1.25rem', lineHeight: '1.75rem', letterSpacing: '-0.005em' },
  // 24px  30px
  '2xl': { fontSize: '1.5rem', lineHeight: '1.875rem', letterSpacing: '-0.00625em' },
  // 28px  36px
  '3xl': { fontSize: '1.75rem', lineHeight: '2.25rem', letterSpacing: '-0.0075em' },
  // 32px  40px
  '4xl': { fontSize: '2rem', lineHeight: '2.5rem', letterSpacing: '-0.01em' },
  // 36px  48px
  '5xl': { fontSize: '2.25rem', lineHeight: '3rem', letterSpacing: '-0.025em' },
  // 40px  52px
  '6xl': { fontSize: '2.5rem', lineHeight: '3.25rem', letterSpacing: '-0.03125em' },
  // 48px  64px
  '7xl': { fontSize: '3rem', lineHeight: '4rem', letterSpacing: '-0.0375em' },
  // 56px  72px
  '8xl': { fontSize: '3.5rem', lineHeight: '4.5rem', letterSpacing: '-0.04375em' },
  // 64px  80px
  '9xl': { fontSize: '4rem', lineHeight: '5rem', letterSpacing: '-0.05em' },
} satisfies Theme['text']

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} satisfies Theme['fontWeight']

export const tracking = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} satisfies Theme['tracking']

export const leading = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} satisfies Theme['leading']

export const textStrokeWidth = {
  DEFAULT: '1.5rem',
  none: '0',
  sm: 'thin',
  md: 'medium',
  lg: 'thick',
} satisfies Theme['textStrokeWidth']
