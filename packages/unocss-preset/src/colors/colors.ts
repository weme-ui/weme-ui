import type { WemeColorArray } from '../types'
import * as RadixColors from '@radix-ui/colors'
import Color from 'colorjs.io'
import { ALL_COLOR_NAMES, GRAY_COLOR_NAMES } from '../defaults'

export const lightColors = Object.fromEntries(
  ALL_COLOR_NAMES.map(scaleName => [
    scaleName,
    Object.values(RadixColors[`${scaleName}P3`]).map(str =>
      new Color(str).to('oklch'),
    ),
  ]),
) as Record<(typeof ALL_COLOR_NAMES)[number], WemeColorArray<Color>>

export const darkColors = Object.fromEntries(
  ALL_COLOR_NAMES.map(scaleName => [
    scaleName,
    Object.values(RadixColors[`${scaleName}DarkP3`]).map(str =>
      new Color(str).to('oklch'),
    ),
  ]),
) as Record<(typeof ALL_COLOR_NAMES)[number], WemeColorArray<Color>>

export const lightGrayColors = Object.fromEntries(
  GRAY_COLOR_NAMES.map(scaleName => [
    scaleName,
    Object.values(RadixColors[`${scaleName}P3`]).map(str =>
      new Color(str).to('oklch'),
    ),
  ]),
) as Record<(typeof GRAY_COLOR_NAMES)[number], WemeColorArray<Color>>

export const darkGrayColors = Object.fromEntries(
  GRAY_COLOR_NAMES.map(scaleName => [
    scaleName,
    Object.values(RadixColors[`${scaleName}DarkP3`]).map(str =>
      new Color(str).to('oklch'),
    ),
  ]),
) as Record<(typeof GRAY_COLOR_NAMES)[number], WemeColorArray<Color>>

export const blackColors = Object.values(RadixColors.blackP3A).map(str =>
  new Color(str).to('oklch'),
) as WemeColorArray<Color>

export const whiteColors = Object.values(RadixColors.whiteP3A).map(str =>
  new Color(str).to('oklch'),
) as WemeColorArray<Color>
