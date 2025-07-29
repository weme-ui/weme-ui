export const DEFAULT_PREFIX = 'ui-'

export const DEFAULT_BACKGROUND_LIGHT = '#fff'
export const DEFAULT_BACKGROUND_DARK = '#111'

export const DEFAULT_THEME_COLORS = [
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
]

export const DEFAULT_THEMES = [
  // Default Theme
  {
    id: 'default',
    name: 'Default',
    appearance: 'light',
    translucent: true,
    radius: '0.25rem',
    colors: {
      accent: '#1d2129',
      neutral: '#86909c',
      info: 'blue',
      success: 'grass',
      warning: 'orange',
      error: 'red',
    },
    tokens: {
      foreground: {
        dimmed: 'color.neutral.5',
        muted: 'color.neutral.7',
        toned: 'color.neutral.9',
        default: 'color.neutral.11',
        highlighted: 'color.neutral.12',
      },
      background: {
        default: '#f2f3f5',
        dimmed: 'color.neutral.2',
        muted: 'color.neutral.3',
        elevated: 'color.neutral.4',
      },
      border: {
        default: 'color.neutral.5',
        elevated: 'color.neutral.6',
      },
      ring: {
        default: 'color.neutral.5',
        elevated: 'color.neutral.6',
      },
    },
  },
]
