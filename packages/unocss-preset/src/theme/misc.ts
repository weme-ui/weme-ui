import type { Theme } from './types'

export const SCALING_VAR = 'var(--scaling, var(--default-scaling, 1))'
export const RADIUS_FACTOR_VAR = 'var(--radius-factor, var(--default-radius-factor, 1))'

/**
 * 间距
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/spacing}
 */
export const spacing = {
  // 4px
  DEFAULT: `calc(0.25rem * ${SCALING_VAR})`,
  // 4px
  xs: `calc(0.25rem * ${SCALING_VAR})`,
  // 8px
  sm: `calc(0.5rem * ${SCALING_VAR})`,
  // 12px
  md: `calc(0.75rem * ${SCALING_VAR})`,
  // 16px
  lg: `calc(1rem * ${SCALING_VAR})`,
  // 24px
  xl: `calc(1.5rem * ${SCALING_VAR})`,
  // 32px
  '2xl': `calc(2rem * ${SCALING_VAR})`,
  // 40px
  '3xl': `calc(2.5rem * ${SCALING_VAR})`,
  // 48px
  '4xl': `calc(3rem * ${SCALING_VAR})`,
  // 56px
  '5xl': `calc(4rem * ${SCALING_VAR})`,
  // 72px
  '6xl': `calc(4.5rem * ${SCALING_VAR})`,
  // 80px
  '7xl': `calc(5rem * ${SCALING_VAR})`,
  // 96px
  '8xl': `calc(6rem * ${SCALING_VAR})`,
  // 128px
  '9xl': `calc(8rem * ${SCALING_VAR})`,
} satisfies Theme['spacing']

/**
 * 圆角
 *
 * @link {@see https://www.radix-ui.com/themes/docs/theme/radius}
 */
export const radius = {
  // 4px
  DEFAULT: `calc(0.25rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
  none: '0',
  // 3px
  xs: `calc(0.1875rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
  // 4px
  sm: `calc(0.25rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
  // 6px
  md: `calc(0.375rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
  // 8px
  lg: `calc(0.5rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
  // 12px
  xl: `calc(0.75rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
  // 16px
  '2xl': `calc(1rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
  // 24px
  '3xl': `calc(1.5rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
  // 32px
  '4xl': `calc(2rem * ${SCALING_VAR} * ${RADIUS_FACTOR_VAR})`,
} satisfies Theme['radius']

/**
 * 阴影
 *
 * @category Theme
 */
export const shadow = {
  DEFAULT: [
    '0 2px 3px -2px rgba(0, 0, 0, 0.05)',
    '0 3px 12px -4px rgba(0, 0, 0, 0.1)',
    '0 4px 16px -8px rgba(0, 0, 0, 0.1)',
  ],
  '2xs': `0 1px rgb(0 0 0 / 0.05)`,
  xs: [
    '0 0 0 0.5px rgba(0, 0, 0, 0.05)',
    '0 1px 1px 0 rgba(0, 0, 0, 0.02)',
    '0 2px 1px -1px rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  ],
  sm: [
    '0 2px 3px -2px rgba(0, 0, 0, 0.05)',
    '0 3px 12px -4px rgba(0, 0, 0, 0.1)',
    '0 4px 16px -8px rgba(0, 0, 0, 0.1)',
  ],
  md: ['0 8px 40px rgba(0, 0, 0, 0.05)', '0 12px 32px -16px rgba(0, 0, 0, 0.05)'],
  lg: ['0 12px 60px rgba(0, 0, 0, 0.15)', '0 12px 32px -16px rgba(0, 0, 0, 0.12)'],
  xl: [
    '0 12px 60px rgba(0, 0, 0, 0.15)',
    '0 16px 64px rgba(0, 0, 0, 0.02)',
    '0 16px 36px -20px rgba(0, 0, 0, 0.19)',
  ],
  none: '0 0 rgb(0 0 0 / 0)',
  inner: ['inset 0 1.5px 2px 0 rgba(0, 0, 0, 0.02)', 'inset 0 1.5px 2px 0 rgba(0, 0, 0, 0.1)'],
} satisfies Theme['shadow']

export const insetShadow = {
  '2xs': 'inset 0 1px rgb(0 0 0 / 0.05)',
  xs: 'inset 0 1px 1px rgb(0 0 0 / 0.05)',
  sm: 'inset 0 2px 4px rgb(0 0 0 / 0.05)',
  none: '0 0 rgb(0 0 0 / 0)',
} satisfies Theme['insetShadow']

export const dropShadow = {
  /* @deprecated see: https://github.com/tailwindlabs/tailwindcss/blob/bea843c90ab77b47622200daafb918f7044d9f88/packages/tailwindcss/theme.css#L459 */
  DEFAULT: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
  xs: '0 1px 1px rgb(0 0 0 / 0.05)',
  sm: '0 1px 2px rgb(0 0 0 / 0.15)',
  md: '0 3px 3px rgb(0 0 0 / 0.12)',
  lg: '0 4px 4px rgb(0 0 0 / 0.15)',
  xl: '0 9px 7px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
} satisfies Theme['dropShadow']

export const textShadow = {
  none: '0 0 rgb(0 0 0 / 0)',
  '2xs': '0 1px 0 rgb(0 0 0 / 0.15)',
  xs: '0 1px 1px rgb(0 0 0 / 0.2)',
  sm: [
    '0 1px 0 rgb(0 0 0 / 0.075)',
    '0 1px 1px rgb(0 0 0 / 0.075)',
    '0 2px 2px rgb(0 0 0 / 0.075)',
  ],
  md: ['0 1px 1px rgb(0 0 0 / 0.1)', '0 1px 2px rgb(0 0 0 / 0.1)', '0 2px 4px rgb(0 0 0 / 0.1)'],
  lg: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 3px 2px rgb(0 0 0 / 0.1)', '0 4px 8px rgb(0 0 0 / 0.1)'],
} satisfies Theme['textShadow']

export const perspective = {
  dramatic: '100px',
  near: '300px',
  normal: '500px',
  midrange: '800px',
  distant: '1200px',
} satisfies Theme['perspective']

/** For reset css */
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
