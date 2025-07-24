import type { ColorAppearance } from '@weme-ui/colors'
import type { HaloPresetOptions, HaloTheme, HaloThemeColors, HaloThemeDefinition, UserPresetOptions } from './types'
import { transformColor } from '@weme-ui/colors'
import { parseTokenValue } from './utils'

export function resolveThemes(
  themes: UserPresetOptions['themes'],
  background: HaloPresetOptions['background'],
  prefix: HaloPresetOptions['prefix'],
): HaloTheme[] {
  if (!themes)
    return []

  return themes.map((theme) => {
    const {
      id,
      name,
      appearance = 'light',
      translucent = false,
      radius = '0.25rem',
      colors,
      tokens,
    } = theme as HaloThemeDefinition

    return {
      id,
      name,
      appearance,
      translucent,
      radius,
      colors: resolveThemeColors(colors, appearance, background),
      tokens: resolveThemeTokens(tokens, appearance, background, prefix),
    } as HaloTheme
  })
}

function resolveThemeColors(
  colors: HaloThemeDefinition['colors'],
  appearance: ColorAppearance,
  background: HaloPresetOptions['background'],
): HaloTheme['colors'] {
  const normalized: HaloThemeColors = {
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
    {} as HaloTheme['colors'],
  )
}

function resolveThemeTokens(
  tokens: HaloThemeDefinition['tokens'],
  appearance: ColorAppearance,
  background: HaloPresetOptions['background'],
  prefix: HaloPresetOptions['prefix'],
): HaloTheme['tokens'] {
  function resolveThemeToken(value?: string, defaultValue: string = '') {
    return value
      ? parseTokenValue(value, appearance, prefix)
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
    header: {
      height: resolveThemeToken(tokens?.header?.height, '3rem'),
      background: resolveThemeToken(tokens?.header?.background, cssVar('panel-bg')),
    },
    brand: {
      foreground: resolveThemeToken(tokens?.brand?.foreground, cssVar('accent-9')),
      background: resolveThemeToken(tokens?.brand?.background, cssVar('panel-bg')),
    },
    activity: {
      width: resolveThemeToken(tokens?.activity?.width, '3.5rem'),
      foreground: {
        default: resolveThemeToken(tokens?.activity?.foreground?.default, cssVar('fg')),
        highlighted: resolveThemeToken(tokens?.activity?.foreground?.highlighted, cssVar('accent-9')),
      },
      background: resolveThemeToken(tokens?.activity?.background, cssVar('panel-bg')),
    },
    sidebar: {
      width: resolveThemeToken(tokens?.sidebar?.width, '15rem'),
      background: resolveThemeToken(tokens?.sidebar?.background, cssVar('panel-bg')),
    },
    panel: {
      foreground: {
        default: resolveThemeToken(tokens?.panel?.foreground?.default, cssVar('fg')),
        highlighted: resolveThemeToken(tokens?.panel?.foreground?.highlighted, cssVar('fg-highlighted')),
      },
      background: resolveThemeToken(tokens?.panel?.background, 'white'),
    },
  }
}
