import type Color from 'colorjs.io'
import type { ColorAppearance, Colors } from './types'
import { getColorNames, getRadixColor } from './utils'

const lightColors = Object.fromEntries(
  getColorNames().map((name: string) => [
    name,
    getRadixColor('light', name),
  ]),
) as Colors<Color>

const darkColors = Object.fromEntries(
  getColorNames().map((name: string) => [
    name,
    getRadixColor('dark', name),
  ]),
) as Colors<Color>

const lightNeutralColors = Object.fromEntries(
  getColorNames('neutral').map((name: string) => [
    name,
    getRadixColor('light', name),
  ]),
) as Colors<Color>

const darkNeutralColors = Object.fromEntries(
  getColorNames('neutral').map((name: string) => [
    name,
    getRadixColor('dark', name),
  ]),
) as Colors<Color>

export function getColors(appearance: ColorAppearance, isNeutral?: boolean) {
  return isNeutral
    ? appearance === 'light' ? lightNeutralColors : darkNeutralColors
    : appearance === 'light' ? lightColors : darkColors
}
