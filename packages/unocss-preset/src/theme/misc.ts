import type { Theme } from './types'

/**
 * 间距
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/spacing}
 */
export const spacing = {
  'DEFAULT': 'calc(0.25rem * var(--scaling, 1))',
  'xs': 'calc(0.25rem * var(--scaling, 1))',
  'sm': 'calc(0.5rem * var(--scaling, 1))',
  'md': 'calc(0.75rem * var(--scaling, 1))',
  'lg': 'calc(1rem * var(--scaling, 1))',
  'xl': 'calc(1.5rem * var(--scaling, 1))',
  '2xl': 'calc(2rem * var(--scaling, 1))',
  '3xl': 'calc(2.5rem * var(--scaling, 1))',
  '4xl': 'calc(3rem * var(--scaling, 1))',
  '5xl': 'calc(4rem * var(--scaling, 1))',
} satisfies Theme['spacing']

/**
 * 圆角
 *
 * @category Theme
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/radius}
 */
export const radius = {
  'DEFAULT': 'calc(0.25rem * var(--scaling, 1) * var(--radius-factor, 0.5))',
  'none': '0',
  'xs': 'calc(0.125rem * var(--scaling, 1) * var(--radius-factor, 0.5))',
  'sm': 'calc(0.25rem * var(--scaling, 1) * var(--radius-factor, 0.5))',
  'md': 'calc(0.375rem * var(--scaling, 1) * var(--radius-factor, 0.5))',
  'lg': 'calc(0.5rem * var(--scaling, 1) * var(--radius-factor, 0.5))',
  'xl': 'calc(0.75rem * var(--scaling, 1) * var(--radius-factor, 0.5))',
  '2xl': 'calc(1rem * var(--scaling, 1) * var(--radius-factor, 0.5))',
} satisfies Theme['radius']

/**
 * 阴影
 *
 * @category Theme
 */
export const shadow = {
  DEFAULT: [
    '0 0 0 1px #0000000F',
    '0 2px 3px -2px #0000000F',
    '0 3px 12px -4px rgba(0, 0, 0, 0.1)',
    '0 4px 16px -8px rgba(0, 0, 0, 0.1)',
  ],
  xs: [
    '0 0 0 1px #0000000F',
    '0 0 0 0.5px rgba(0, 0, 0, 0.05)',
    '0 1px 1px 0 #00000006',
    '0 2px 1px -1px rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  ],
  sm: [
    '0 0 0 1px #0000000F',
    '0 2px 3px -2px #0000000F',
    '0 3px 12px -4px rgba(0, 0, 0, 0.1)',
    '0 4px 16px -8px rgba(0, 0, 0, 0.1)',
  ],
  md: [
    '0 0 0 1px #0000000F',
    '0 8px 40px rgba(0, 0, 0, 0.05)',
    '0 12px 32px -16px #0000000F',
  ],
  lg: [
    '0 0 0 1px #0000000F',
    '0 12px 60px rgba(0, 0, 0, 0.15)',
    '0 12px 32px -16px #0000001F',
  ],
  xl: [
    '0 0 0 1px #0000000F',
    '0 12px 60px rgba(0, 0, 0, 0.15)',
    '0 16px 64px #00000006',
    '0 16px 36px -20px #00000031',
  ],
  inner: [
    'inset 0 0 0 1px #0000001F',
    'inset 0 1.5px 2px 0 #00000006',
    'inset 0 1.5px 2px 0 rgba(0, 0, 0, 0.1)',
  ],
  none: '0 0 rgb(0 0 0 / 0)',
} satisfies Theme['shadow']

/**
 * 内阴影
 *
 * @category Theme
 */
export const insetShadow = {
  '2xs': 'inset 0 1px rgb(0 0 0 / 0.05)',
  'xs': 'inset 0 1px 1px rgb(0 0 0 / 0.05)',
  'sm': 'inset 0 2px 4px rgb(0 0 0 / 0.05)',
  'none': '0 0 rgb(0 0 0 / 0)',
} satisfies Theme['insetShadow']

/**
 * 外阴影
 *
 * @category Theme
 */
export const dropShadow = {
  'xs': '0 1px 1px rgb(0 0 0 / 0.05)',
  'sm': '0 1px 2px rgb(0 0 0 / 0.15)',
  'md': '0 3px 3px rgb(0 0 0 / 0.12)',
  'lg': '0 4px 4px rgb(0 0 0 / 0.15)',
  'xl': '0 9px 7px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
} satisfies Theme['dropShadow']

/**
 * 文本阴影
 *
 * @category Theme
 */
export const textShadow = {
  'none': '0 0 rgb(0 0 0 / 0)',
  '2xs': '0 1px 0 rgb(0 0 0 / 0.15)',
  'xs': '0 1px 1px rgb(0 0 0 / 0.2)',
  'sm': ['0 1px 0 rgb(0 0 0 / 0.075)', '0 1px 1px rgb(0 0 0 / 0.075)', '0 2px 2px rgb(0 0 0 / 0.075)'],
  'md': ['0 1px 1px rgb(0 0 0 / 0.1)', '0 1px 2px rgb(0 0 0 / 0.1)', '0 2px 4px rgb(0 0 0 / 0.1)'],
  'lg': ['0 1px 2px rgb(0 0 0 / 0.1)', '0 3px 2px rgb(0 0 0 / 0.1)', '0 4px 8px rgb(0 0 0 / 0.1)'],
} satisfies Theme['textShadow']

/**
 * 透视
 *
 * @category Theme
 */
export const perspective = {
  dramatic: '100px',
  near: '300px',
  normal: '500px',
  midrange: '800px',
  distant: '1200px',
} satisfies Theme['perspective']

/**
 * 默认值(用于重置 CSS)
 *
 * @category Theme
 */
export const defaults = {
  transition: {
    duration: '150ms',
    timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  font: {
    family: 'var(--font-sans)',
    featureSettings: 'var(--font-sans--font-feature-settings)',
    variationSettings: 'var(--font-sans--font-variation-settings)',
  },
  monoFont: {
    family: 'var(--font-mono)',
    featureSettings: 'var(--font-mono--font-feature-settings)',
    variationSettings: 'var(--font-mono--font-variation-settings)',
  },
} satisfies Theme['default']
