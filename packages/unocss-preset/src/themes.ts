import type { ColorAppearance } from '@weme-ui/colors'
import type { UserPresetOptions, WemePresetOptions, WemeTheme, WemeThemeDefinition } from './types'
import { transformColor } from '@weme-ui/colors'
import { DEFAULT_THEMES } from './constants'
import { parseCssVarValue } from './utils'

export function resolveThemes(
  themes: UserPresetOptions['themes'],
  background: WemePresetOptions['background'],
  prefix: WemePresetOptions['prefix'],
  injectDefaultThemes: boolean,
): WemeTheme[] {
  themes = themes || []

  if (themes.length === 0 && injectDefaultThemes) {
    themes = DEFAULT_THEMES as WemeThemeDefinition[]
  }

  return themes.map((theme) => {
    const {
      id,
      name,
      appearance = 'light',
      translucent = false,
      radius = '0.25rem',
      colors,
      tokens,
    } = theme as WemeThemeDefinition

    return {
      id,
      name,
      appearance,
      translucent,
      radius,
      colors: resolveThemeColors(colors, appearance, background),
      tokens: resolveThemeTokens(tokens, appearance, background, prefix),
    } as WemeTheme
  })
}

function resolveThemeColors(
  colors: WemeThemeDefinition['colors'],
  appearance: ColorAppearance,
  background: WemePresetOptions['background'],
): WemeTheme['colors'] {
  const normalized: WemeThemeDefinition['colors'] = {
    accent: colors?.accent ?? 'indigo',
    neutral: colors?.neutral ?? 'gray',
    info: colors?.info ?? 'blue',
    success: colors?.success ?? 'green',
    warning: colors?.warning ?? 'orange',
    error: colors?.error ?? 'red',
  }

  return Object.entries(normalized).reduce(
    (acc, [name, color]) => ({
      ...acc,

      [name]: transformColor({
        appearance,
        color,
        background: background[appearance],
      }),
    }),
    {} as WemeTheme['colors'],
  )
}

function resolveThemeTokens(
  tokens: WemeThemeDefinition['tokens'],
  appearance: ColorAppearance,
  background: WemePresetOptions['background'],
  prefix: WemePresetOptions['prefix'],
): WemeTheme['tokens'] {
  function resolveThemeToken(value?: string, defaultValue: string = '') {
    return value
      ? parseCssVarValue(prefix, appearance, value)
      : defaultValue
  }

  function cssVar(name: string) {
    return `var(--${prefix}${name})`
  }

  return {
    foreground: {
      dimmed: resolveThemeToken(tokens?.foreground?.dimmed, cssVar('neutral-5')),
      muted: resolveThemeToken(tokens?.foreground?.muted, cssVar('neutral-7')),
      toned: resolveThemeToken(tokens?.foreground?.toned, cssVar('neutral-9')),
      default: resolveThemeToken(tokens?.foreground?.default, cssVar('neutral-11')),
      highlighted: resolveThemeToken(tokens?.foreground?.highlighted, cssVar('neutral-12')),
    },
    background: {
      default: resolveThemeToken(tokens?.background?.default, background[appearance]),
      dimmed: resolveThemeToken(tokens?.background?.dimmed, cssVar('neutral-2')),
      muted: resolveThemeToken(tokens?.background?.muted, cssVar('neutral-3')),
      elevated: resolveThemeToken(tokens?.background?.elevated, cssVar('neutral-4')),
    },
    border: {
      default: resolveThemeToken(tokens?.border?.default, cssVar('neutral-5')),
      elevated: resolveThemeToken(tokens?.border?.elevated, cssVar('neutral-6')),
    },
    ring: {
      default: resolveThemeToken(tokens?.ring?.default, cssVar('neutral-5')),
      elevated: resolveThemeToken(tokens?.ring?.elevated, cssVar('neutral-6')),
    },
  }
}
