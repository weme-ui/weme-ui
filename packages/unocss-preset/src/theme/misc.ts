import type { Theme } from '../types'

/**
 * --ui-radius: 0.25rem
 */
export const radius = {
  DEFAULT: 'calc(var(--ui-radius) * 0.5)',
  sm: 'calc(var(--ui-radius) * 0.5)',
  md: 'var(--ui-radius)',
  lg: 'calc(var(--ui-radius) * 1.5)',
  xl: 'calc(var(--ui-radius) * 3)',
} satisfies Theme['radius']
