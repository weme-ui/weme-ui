import type { WemePresetTheme, WemePresetThemeColorNames } from './types'

export const BG_LIGHT = '#fff'
export const BG_DARK = '#111'

export const EXTRA_COLORS: Record<string, string> = {
  ocean: '#05f',
  gunmetal: '#1d2129',
  iron: '#86909c',
}

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

export const VARIANT_MAP: Record<string, string[]> = {
  btn: ['solid', 'soft', 'surface', 'outline', 'ghost', 'plain', 'inverse'],
  box: ['solid', 'soft', 'surface', 'outline', 'inverse'],
}

export const DEFAULT_COLOR_NAMES = ['tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'bronze', 'gold', 'brown', 'orange', 'sky', 'mint', 'lime', 'yellow', 'amber'] as const
export const DEFAULT_GRAY_COLOR_NAMES = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const
export const ALL_COLOR_NAMES = [...DEFAULT_GRAY_COLOR_NAMES, ...DEFAULT_COLOR_NAMES] as const

export const COLOR_NAMES = [...DEFAULT_COLOR_NAMES, 'gunmetal', 'ocean'] as const
export const GRAY_COLOR_NAMES = [...DEFAULT_GRAY_COLOR_NAMES, 'iron'] as const
