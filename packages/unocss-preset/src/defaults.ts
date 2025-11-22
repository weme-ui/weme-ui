import type { WemePresetTheme, WemePresetThemeColorNames } from './types'

export const BG_WHITE = '#fff'
export const BG_BLACK = '#111'

export const THEME: WemePresetTheme = {
  id: 'ROOT',
  name: 'ROOT',
  priority: 1000,
  radius: '0.25rem',
  appearance: 'light',
  colors: {
    primary: 'gunmetal',
    secondary: 'ocean',
    neutral: 'iron',
    info: 'blue',
    success: 'green',
    warning: 'orange',
    danger: 'ruby',
  },
  tokens: {
    foreground: {
      muted: 'neutral.7',
      toned: 'neutral.9',
      default: 'neutral.11',
      highlighted: 'neutral.12',
    },
    background: {
      default: 'neutral.1',
      dimmed: 'neutral.2',
      muted: 'neutral.3',
      elevated: 'neutral.4',
    },
    border: {
      default: 'neutral.5',
      elevated: 'neutral.6',
    },
    ring: '$border.default',
  },
}

export const PRIORITY = 1

export const THEME_COLORS = Object.keys(THEME.colors) as WemePresetThemeColorNames[]
