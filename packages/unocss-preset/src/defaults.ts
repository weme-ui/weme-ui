import type { WemeTheme } from './types'

export const defaultThemeColors = [
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
]

export const defaultTheme: WemeTheme = {
  id: 'ROOT',
  name: 'ROOT',
  priority: 1000,
  translucent: false,
  radius: '0.25rem',
  colors: {
    accent: 'gunmetal',
    neutral: 'iron',
    info: 'ocean',
    success: 'grass',
    warning: 'orange',
    error: 'red',
  },
  tokens: {
    foreground: {
      muted: 'color.neutral.7',
      toned: 'color.neutral.9',
      default: 'color.neutral.11',
      highlighted: 'color.neutral.12',
    },
    background: {
      default: 'color.neutral.1',
      dimmed: 'color.neutral.2',
      muted: 'color.neutral.3',
      elevated: 'color.neutral.4',
    },
    border: {
      default: 'color.neutral.5',
      elevated: 'color.neutral.6',
    },
    ring: '$border.default',
  },
}
