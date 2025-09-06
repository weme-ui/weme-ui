import type { Theme } from '../types'

export const breakpoint = {
  xs: '520px',
  sm: '768px',
  md: '1024px',
  lg: '1280px',
  xl: '1640px',
} satisfies Theme['breakpoint']

export const verticalBreakpoint = { ...breakpoint } satisfies Theme['breakpoint']
