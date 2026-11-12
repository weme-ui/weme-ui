import type { ColorKind, ColorMode, ColorValue } from '@weme-ui/colors'
import type { PresetWemeUIOptions } from '..'
import type { UnoColorScales, Theme } from './types'
import {
  ADDITIONAL_ACCENT_COLORS,
  ADDITIONAL_NEUTRAL_COLORS,
  RADIX_COLOR_NAMES,
  resolveColor,
} from '@weme-ui/colors'
import { defu } from 'defu'

type ResolvedUnoThemeColors = Exclude<Theme['colors'], undefined>

/**
 * UnoCSS 主题颜色
 *
 * @param options - 选项
 */
export function colors(options: PresetWemeUIOptions['colors'] = {}): ResolvedUnoThemeColors {
  const { accent, neutral } = options

  let colors: ResolvedUnoThemeColors = {}

  // #region Radix Colors
  Array.from(RADIX_COLOR_NAMES).forEach((name) => {
    colors = defu(colors, createThemeColors(name))
  })
  // #endregion

  // #region Black and White Colors
  const blackAuto = createThemeColors('black')
  const whiteAuto = createThemeColors('white')

  const black = createSolidColors('black')
  const white = createSolidColors('white')

  colors = defu(
    colors,
    { black, white },
    // Alpha Black and Alpha White
    {
      'black-auto': blackAuto['black'],
      'white-auto': whiteAuto['white'],
    },
  )
  // #endregion

  // #region Additional Colors
  Object.entries({
    ...ADDITIONAL_ACCENT_COLORS,
    ...accent,
  }).forEach(([name, color]) => {
    colors = defu(colors, createThemeColors(name, color, 'accent'))
  })

  Object.entries({
    ...ADDITIONAL_NEUTRAL_COLORS,
    ...neutral,
  }).forEach(([name, color]) => {
    colors = defu(colors, createThemeColors(name, color, 'neutral'))
  })
  // #endregion

  return colors
}

/**
 * 创建 UnoCSS 主题颜色
 *
 * @param name - 颜色名称
 * @param color - 颜色值
 * @param kind - 颜色类型
 */
function createThemeColors(name: string, color?: string, kind?: ColorKind) {
  const colors: ResolvedUnoThemeColors = {}
  const modes: ColorMode[] = ['light', 'dark']

  const scales = {
    oklch: {} as UnoColorScales,
    p3: {} as UnoColorScales,
    darkOklch: {} as UnoColorScales,
    darkP3: {} as UnoColorScales,
  }

  modes.forEach((mode) => {
    const resolvedColor = resolveColor(color || name, mode, kind)

    const oklchTarget = mode === 'light' ? scales.oklch : scales.darkOklch
    const p3Target = mode === 'light' ? scales.p3 : scales.darkP3

    resolvedColor.oklch.forEach((value, index) => {
      oklchTarget[(index + 1).toString() as keyof UnoColorScales] = value
    })
    resolvedColor.p3.forEach((value, index) => {
      p3Target[(index + 1).toString() as keyof UnoColorScales] = value
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

/**
 * 创建纯色颜色
 *
 * @param color - 颜色名称
 * @returns - 颜色值
 */
function createSolidColors(color: 'black' | 'white') {
  const revertScale = (scale: ColorValue<string>) => {
    const reverted = {} as UnoColorScales

    scale.forEach((value, index) => {
      reverted[(12 - index).toString() as keyof UnoColorScales] = value
    })
    return reverted
  }

  const scale = resolveColor(color === 'black' ? '#000' : '#FFF', 'dark', 'neutral')

  if (color === 'black') {
    const oklch = revertScale(scale.oklch)
    const p3 = revertScale(scale.p3)

    return {
      ...oklch,
      dark: oklch,
      p3: {
        ...p3,
        dark: p3,
      },
    }
  }

  const oklch = scale.oklch.reduce((acc, value, index) => {
    acc[(index + 1).toString() as keyof UnoColorScales] = value
    return acc
  }, {} as UnoColorScales)

  const p3 = scale.p3.reduce((acc, value, index) => {
    acc[(index + 1).toString() as keyof UnoColorScales] = value
    return acc
  }, {} as UnoColorScales)

  return {
    ...oklch,
    dark: oklch,
    p3: {
      ...p3,
      dark: p3,
    },
  }
}
