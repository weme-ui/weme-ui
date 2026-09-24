import type { PresetWemeUIOptions } from '..'
import type { ColorMode, ColorScope, ColorSpace } from '../colors'
import type { Theme, ThemeColorScales } from './types'
import { ADDITIONAL_ACCENT_COLORS, ADDITIONAL_NEUTRAL_COLORS, RADIX_COLOR_NAMES, resolveRadixColorScales } from '../colors'

/**
 * 颜色
 *
 * @category Theme
 */
export function colors(options: PresetWemeUIOptions['colors'] = {}) {
  const {
    space = 'display-p3',
    accent,
    neutral,
  } = options

  let colors: Exclude<Theme['colors'], undefined> = {}

  // #region Radix Colors
  Array.from([...RADIX_COLOR_NAMES, 'black', 'white']).forEach((name) => {
    colors = Object.assign(colors, createThemeColors(name, space))
  })
  // #endregion

  // #region Custom Colors
  Object.entries({ ...ADDITIONAL_ACCENT_COLORS, ...(accent || {}) }).forEach(([name, color]) => {
    colors = Object.assign(colors, createThemeColors(name, space, color, 'accent'))
  })

  Object.entries({ ...ADDITIONAL_NEUTRAL_COLORS, ...(neutral || {}) }).forEach(([name, color]) => {
    colors = Object.assign(colors, createThemeColors(name, space, color, 'neutral'))
  })
  // #endregion

  return colors
}

function createThemeColors(
  name: string,
  space: ColorSpace,
  color?: string,
  scope?: ColorScope,
) {
  const colors: Exclude<Theme['colors'], undefined> = {}
  const modes: ColorMode[] = ['light', 'dark']

  modes.forEach((mode) => {
    const colorScales = resolveRadixColorScales({
      color: color || name,
      space,
      mode,
      scope,
    })

    // Solid colors
    colorScales.solid.forEach((c, i) => {
      colors[name] = colors[name] || {}

      if (mode === 'light') {
        colors[name][(i + 1).toString() as keyof ThemeColorScales] = c
      }
      else {
        colors[name][mode] = colors[name][mode] || {} as ThemeColorScales
        colors[name][mode][(i + 1).toString() as keyof ThemeColorScales] = c
      }
    })

    // Alpha colors
    if (name !== 'black' && name !== 'white') {
      colorScales.alpha.forEach((c, i) => {
        colors[name] = colors[name] || {}

        if (mode === 'light') {
          colors[name][`a${i + 1}` as keyof ThemeColorScales] = c
        }
        else {
          colors[name][mode] = colors[name][mode] || {} as ThemeColorScales
          colors[name][mode][`a${i + 1}` as keyof ThemeColorScales] = c
        }
      })
    }
  })

  return colors
}
