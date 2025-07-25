import type { Colors } from '@weme-ui/colors'
import type { Theme, WemePresetOptions } from '../types'
import { transformColor } from '@weme-ui/colors'

export function colors(options: WemePresetOptions) {
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
