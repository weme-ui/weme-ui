import type { Theme } from '../types'

export const spacing = {
  'xs': '0.25rem',
  'sm': '0.5rem',
  'md': '0.75rem',
  'lg': '1rem',
  'xl': '1.5rem',
  '2xl': '2rem',
  '3xl': '2.5rem',
  '4xl': '3rem',
  '5xl': '4rem',
  '6xl': '5rem',
  '7xl': '6rem',
  '8xl': '7rem',
} satisfies Theme['spacing']

export function radius(prefix: string) {
  return {
    sm: `calc(var(--${prefix}-radius) * 0.5)`,
    md: `var(--${prefix}-radius)`,
    lg: `calc(var(--${prefix}-radius) * 1.5)`,
    xl: `calc(var(--${prefix}-radius) * 3)`,
  } satisfies Theme['radius']
}
