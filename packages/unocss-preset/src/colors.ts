import type { Colors } from '@weme-ui/colors'
import type { DeepPartial, HaloPresetOptions } from './types'
import { getColorNames, transformColor } from '@weme-ui/colors'

export function resolveColors(
  colors: DeepPartial<Record<string, string>> | undefined,
  background: HaloPresetOptions['background'],
  isNeutral: boolean = false,
): Colors {
  const defaultColors = isNeutral
    ? resolveDefaultNeutralColors(background)
    : resolveDefaultAccentColors(background)

  if (!colors)
    return defaultColors

  const resolvedColors: Record<string, string> = {}

  Object.keys(colors).forEach((name) => {
    if (colors[name])
      resolvedColors[name] = colors[name]
  })

  return {
    ...defaultColors,
    ...Object.entries(resolvedColors).reduce((acc, color) => {
      const [name, value] = color

      acc[name] = transformColor({
        appearance: 'light',
        color: value,
        isNeutral,
        background: background.light,
      })

      acc[`${name}Dark`] = transformColor({
        appearance: 'dark',
        color: value,
        isNeutral,
        background: background.dark,
      })

      return acc
    }, {} as Colors),
  }
}

function resolveDefaultAccentColors(background: HaloPresetOptions['background']): Colors {
  const accents = getColorNames('accent')

  return accents.reduce((acc, name) => {
    acc[name] = transformColor({
      appearance: 'light',
      color: name,
      background: background.light,
    })

    acc[`${name}Dark`] = transformColor({
      appearance: 'dark',
      color: name,
      background: background.dark,
    })

    return acc
  }, {} as Colors)
}

function resolveDefaultNeutralColors(background: HaloPresetOptions['background']): Colors {
  const neutrals = getColorNames('neutral')

  return neutrals.reduce((acc, name) => {
    acc[name] = transformColor({
      appearance: 'light',
      color: name,
      isNeutral: true,
      background: background.light,
    })

    acc[`${name}Dark`] = transformColor({
      appearance: 'dark',
      color: name,
      isNeutral: true,
      background: background.dark,
    })

    return acc
  }, {} as Colors)
}
