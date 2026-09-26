import type { ColorKind, ColorMode } from '../colors'
import type { Theme, ThemeColorScales } from './types'
import type { PresetWemeUIOptions } from '~/options'
import { ADDITIONAL_ACCENT_COLORS, ADDITIONAL_NEUTRAL_COLORS, RADIX_COLOR_NAMES, resolveRadixColorScales } from '../colors'

/**
 * 颜色
 *
 * @category Theme
 */
export function colors(options: PresetWemeUIOptions['colors'] = {}) {
  const {
    accent,
    neutral,
  } = options

  let colors: Exclude<Theme['colors'], undefined> = {}

  // #region Radix Colors
  Array.from([...RADIX_COLOR_NAMES, 'black', 'white']).forEach((name) => {
    colors = Object.assign(colors, createThemeColors(name))
  })
  // #endregion

  // #region Custom Colors
  Object.entries({ ...ADDITIONAL_ACCENT_COLORS, ...(accent || {}) }).forEach(([name, color]) => {
    colors = Object.assign(colors, createThemeColors(name, color, 'accent'))
  })

  Object.entries({ ...ADDITIONAL_NEUTRAL_COLORS, ...(neutral || {}) }).forEach(([name, color]) => {
    colors = Object.assign(colors, createThemeColors(name, color, 'neutral'))
  })
  // #endregion

  return colors
}

function createThemeColors(
  name: string,
  color?: string,
  kind?: ColorKind,
) {
  const colors: Exclude<Theme['colors'], undefined> = {}
  const modes: ColorMode[] = ['light', 'dark']
  const scales = {
    oklch: {} as ThemeColorScales,
    p3: {} as ThemeColorScales,
    darkOklch: {} as ThemeColorScales,
    darkP3: {} as ThemeColorScales,
  }

  modes.forEach((mode) => {
    const colorScales = resolveRadixColorScales({
      color: color || name,
      mode,
      kind,
    })
    const oklchTarget = mode === 'light' ? scales.oklch : scales.darkOklch
    const p3Target = mode === 'light' ? scales.p3 : scales.darkP3

    colorScales.oklch.forEach((value, index) => {
      oklchTarget[(index + 1).toString() as keyof ThemeColorScales] = value
    })
    colorScales.p3.forEach((value, index) => {
      p3Target[(index + 1).toString() as keyof ThemeColorScales] = value
    })
  })

  colors[name] = {
    ...scales.oklch,
    dark: scales.darkOklch,
    p3: {
      ...scales.p3,
      dark: scales.darkP3,
    },
  }

  return colors
}
