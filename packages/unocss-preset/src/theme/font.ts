import type { Theme } from '../types'

export const font = {
  sans: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"PingFang SC"',
    '"Hiragino Sans GB"',
    '"Noto Sans"',
    '"Microsoft YaHei"',
    '"Helvetica Neue"',
    'Helvetica',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ].join(','),

  serif: [
    'ui-serif',
    'Georgia',
    'Cambria',
    '"Times New Roman"',
    'Times',
    'serif',
  ].join(','),

  mono: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Consolas',
    'monospace',
  ].join(','),
} satisfies Theme['font']

export const text = {
  'xs': { fontSize: '0.75rem', lineHeight: '1rem', letterSpacing: '0.0025em' },
  'sm': { fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0' },
  'base': { fontSize: '1rem', lineHeight: '1.5rem', letterSpacing: '0' },
  'lg': { fontSize: '1.125rem', lineHeight: '1.625rem', letterSpacing: '-0.0025em' },
  'xl': { fontSize: '1.25rem', lineHeight: '1.75rem', letterSpacing: '-0.005em' },
  '2xl': { fontSize: '1.5rem', lineHeight: '2rem', letterSpacing: '-0.00625em' },
  '3xl': { fontSize: '1.75rem', lineHeight: '2.25rem', letterSpacing: '-0.0075em' },
  '4xl': { fontSize: '2.1875rem', lineHeight: '2.5rem', letterSpacing: '-0.01em' },
  '5xl': { fontSize: '3.75rem', lineHeight: '3.75rem', letterSpacing: '-0.025em' },
} satisfies Theme['text']

export const leading = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.75',
  loose: '2',
} satisfies Theme['leading']
