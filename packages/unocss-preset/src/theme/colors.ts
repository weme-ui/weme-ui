import type { Colors } from '@haloapp/colors'
import type { HaloPresetOptions, Theme } from '../types'
import { transformColor } from '@haloapp/colors'

export function colors(options: HaloPresetOptions) {
  return {
    ...createDefaultColors(),
    ...createUserColors(options.accentColors),
    ...createUserColors(options.neutralColors),
  }
}

function createDefaultColors(): Theme['colors'] {
  const colors = [
    'black',
    'white',
  ] as const

  return colors.reduce(
    (acc, color) => {
      const transformed = transformColor({ color })

      return {
        ...acc,

        [color]: {
          ...Object.fromEntries(
            transformed.map((color, i) => [i + 1, color]),
          ),
        },
      }
    },
    {} as Theme['colors'],
  )
}

function createUserColors(colors: Colors) {
  return Object.entries(colors).reduce(
    (acc, color) => {
      const [name, scales] = color

      return {
        ...acc,

        [name]: {
          ...Object.fromEntries(
            scales.map((color, i) => [i + 1, color]),
          ),
        },
      }
    },
    {} as Theme['colors'],
  )
}
