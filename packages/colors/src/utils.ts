import type { ColorAppearance, ColorScalesArray, ColorType } from './types'
import * as RadixColors from '@radix-ui/colors'
import Color from 'colorjs.io'

const SPECIAL_COLOR_NAMES = ['black', 'white'] as const
const NEUTRAL_COLOR_NAMES = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const
const ACCENT_COLOR_NAMES = ['tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'bronze', 'gold', 'brown', 'orange', 'amber', 'yellow', 'lime', 'mint', 'sky'] as const
const COLOR_NAMES = [...SPECIAL_COLOR_NAMES, ...NEUTRAL_COLOR_NAMES, ...ACCENT_COLOR_NAMES] as const

export type RadixColorNames = keyof typeof RadixColors

export type AllColorNames = typeof NEUTRAL_COLOR_NAMES[number] | typeof ACCENT_COLOR_NAMES[number]
export type AccentColorNames = typeof ACCENT_COLOR_NAMES[number]
export type NeutralColorNames = typeof NEUTRAL_COLOR_NAMES[number]

export function isRadixColorName(color: string) {
  return COLOR_NAMES.includes(color as any)
}

export function getColorNames(type?: ColorType) {
  return !type
    ? COLOR_NAMES
    : type === 'accent'
      ? ACCENT_COLOR_NAMES
      : NEUTRAL_COLOR_NAMES
}

export function getRadixColorName(name: string, appearance: ColorAppearance) {
  return name === 'black'
    ? 'blackP3A'
    : name === 'white'
      ? 'whiteP3A'
      : `${name}${appearance === 'light' ? 'P3' : 'DarkP3'}` as RadixColorNames
}

export function getRadixColor<
  S extends boolean = false,
  T extends S extends true ? string : Color = S extends true ? string : Color,
  RT = ColorScalesArray<T>,
>(
  appearance: ColorAppearance,
  name: string,
  stringify?: boolean,
): RT {
  const colorName = getRadixColorName(name, appearance)

  return Object.values(RadixColors[colorName]).map(
    color => stringify
      ? toColorString(color)
      : new Color(color).to('oklch'),
  ) as RT
}

export function toColorString(colorOrStr: Color | string): string {
  const color = typeof colorOrStr === 'string'
    ? new Color(colorOrStr)
    : colorOrStr

  return color
    .to('oklch')
    .toString({ precision: 4 })
}
