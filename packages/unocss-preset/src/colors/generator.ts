import type { ColorKind, ColorMode, ColorScales, ColorSpace, ColorValueScales, RadixColorPureName, RadixNeutralColorPureName } from './types'
import BezierEasing from 'bezier-easing'
import Color from 'colorjs.io'
import { getRadixColorScales } from './color'
import { DEFAULT_BACKGROUND_COLORS, RADIX_COLOR_NAMES, RADIX_NEUTRAL_COLOR_NAMES } from './defaults'
import { toAlphaP3String, toAlphaSrgbString, toP3String } from './utils'

export type RadixColorScales<T extends RadixColorPureName> = ColorScales<Color, T>

const lightColors = Object.fromEntries(
  RADIX_COLOR_NAMES.map(name => [
    name,
    getRadixColorScales({ name }).map(
      c => new Color(c).to('oklch'),
    ) as ColorValueScales<Color>,
  ]),
) as RadixColorScales<RadixColorPureName>

const darkColors = Object.fromEntries(
  RADIX_COLOR_NAMES.map(name => [
    name,
    getRadixColorScales({ name, mode: 'dark' }).map(
      c => new Color(c).to('oklch'),
    ) as ColorValueScales<Color>,
  ]),
) as RadixColorScales<RadixColorPureName>

const lightNeutralColors = Object.fromEntries(
  RADIX_NEUTRAL_COLOR_NAMES.map(name => [
    name,
    getRadixColorScales({ name }).map(
      c => new Color(c).to('oklch'),
    ) as ColorValueScales<Color>,
  ]),
) as RadixColorScales<RadixNeutralColorPureName>

const darkNeutralColors = Object.fromEntries(
  RADIX_NEUTRAL_COLOR_NAMES.map(name => [
    name,
    getRadixColorScales({ name, mode: 'dark' }).map(
      c => new Color(c).to('oklch'),
    ) as ColorValueScales<Color>,
  ]),
) as RadixColorScales<RadixNeutralColorPureName>

export interface GenerateColorScalesOptions {
  /**
   * 颜色名称或颜色值
   */
  color: string
  /**
   * 颜色空间
   *
   * @default 'display-p3'
   */
  space?: ColorSpace
  /**
   * 颜色模式
   *
   * @default 'light'
   */
  mode?: ColorMode
  /**
   * 颜色种类
   *
   * @default 'accent'
   */
  kind?: ColorKind
}

export type GenerateColorScalesResult = ColorScales<string, 'solid' | 'alpha'>

/**
 * 生成 Radix 颜色刻度
 */
export function generateRadixColorScales(options: GenerateColorScalesOptions): GenerateColorScalesResult {
  const {
    color,
    space = 'display-p3',
    mode = 'light',
    kind = 'accent',
  } = options

  const allScales = mode === 'light' ? lightColors : darkColors
  const neutralScales = mode === 'light' ? lightNeutralColors : darkNeutralColors
  const bgColor = new Color(mode === 'light' ? DEFAULT_BACKGROUND_COLORS.light : DEFAULT_BACKGROUND_COLORS.dark).to('oklch')
  const bgHex = bgColor.toString({ format: 'hex' })

  const baseColor = new Color(color).to('oklch')
  const baseHex = baseColor.toString({ format: 'hex' })

  const colorScales = kind === 'accent'
    ? getScaleFromColor(baseColor, baseHex === '#000' || baseHex === '#fff' ? neutralScales : allScales, bgColor)
    : getScaleFromColor(baseColor, neutralScales, bgColor)

  if (kind === 'accent') {
    const [step9Color] = getStep9Colors(colorScales, baseColor)

    colorScales[8] = step9Color
    colorScales[9] = getButtonHoverColor(step9Color, [colorScales])

    colorScales[10].coords[1] = Math.min(
      Math.max(colorScales[8].coords[1] ?? 0, colorScales[7].coords[1] ?? 0),
      colorScales[10].coords[1] ?? 0,
    )

    colorScales[11].coords[1] = Math.min(
      Math.max(colorScales[9].coords[1] ?? 0, colorScales[10].coords[1] ?? 0),
      colorScales[11].coords[1] ?? 0,
    )
  }

  const hex = colorScales.map(c => c.to('srgb').toString({ format: 'hex' })) as ColorValueScales<string>

  if (space === 'srgb') {
    return {
      solid: hex,
      alpha: hex.map(c => toAlphaSrgbString(c, bgHex)) as ColorValueScales<string>,
    }
  }

  return {
    solid: colorScales.map(toP3String) as ColorValueScales<string>,
    alpha: hex.map(c => toAlphaP3String(c, bgHex)) as ColorValueScales<string>,
  }
}

const lightModeEasing = [0, 2, 0, 2] as [number, number, number, number]
const darkModeEasing = [1, 0, 1, 0] as [number, number, number, number]

function getScaleFromColor(
  source: Color,
  scales: Record<string, ColorValueScales<Color>>,
  bgColor: Color,
): ColorValueScales<Color> {
  const allColors: { scale: string, color: Color, distance: number }[] = []

  Object.entries(scales).forEach(([name, scale]) => {
    for (const color of scale) {
      const distance = source.deltaEOK(color)
      allColors.push({ scale: name, distance, color })
    }
  })

  allColors.sort((a, b) => a.distance - b.distance)

  const closestColors = allColors.filter(
    (c, i, arr) => i === arr.findIndex(v => v.scale === c.scale),
  )

  const grayScaleNamesStr = RADIX_NEUTRAL_COLOR_NAMES as readonly string[]
  const allAreGrays = closestColors.every(color =>
    grayScaleNamesStr.includes(color.scale),
  )
  if (!allAreGrays && grayScaleNamesStr.includes(closestColors[0].scale)) {
    while (grayScaleNamesStr.includes(closestColors[1].scale)) {
      closestColors.splice(1, 1)
    }
  }

  const colorA = closestColors[0]
  const colorB = closestColors[1] ?? closestColors[0]

  const a = colorB.distance
  const b = colorA.distance
  const c = colorA.color.deltaEOK(colorB.color)

  // 三角几何在共线/重合时可能产生越界余弦或除零，需钳制后再求混合比
  const denomA = 2 * b * c
  const denomB = 2 * a * c
  const cosA = denomA === 0 ? 1 : Math.min(1, Math.max(-1, (b ** 2 + c ** 2 - a ** 2) / denomA))
  const radA = Math.acos(cosA)
  const sinA = Math.sin(radA)

  const cosB = denomB === 0 ? 1 : Math.min(1, Math.max(-1, (a ** 2 + c ** 2 - b ** 2) / denomB))
  const radB = Math.acos(cosB)
  const sinB = Math.sin(radB)

  const tanC1 = sinA === 0 ? 0 : cosA / sinA
  const tanC2 = sinB === 0 ? 0 : cosB / sinB

  const ratio = tanC2 === 0 ? 0 : Math.max(0, tanC1 / tanC2) * 0.5

  const scaleA = scales[colorA.scale]
  const scaleB = scales[colorB.scale]
  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i =>
    new Color(Color.mix(scaleA[i], scaleB[i], ratio)).to('oklch'),
  ) as ColorValueScales<Color>

  const baseColor = scale
    .slice()
    .sort((a, b) => source.deltaEOK(a) - source.deltaEOK(b))[0]

  const sourceChroma = source.coords?.[1] ?? 0
  const baseChroma = baseColor.coords?.[1] ?? 0
  // 参考色无彩度时（如纯灰）不能做除法，否则会得到 Infinity/NaN
  const ratioC = baseChroma > 0 ? sourceChroma / baseChroma : 0

  scale.forEach((color) => {
    color.coords[1] = baseChroma > 0
      ? Math.min(sourceChroma * 1.5, (color.coords?.[1] ?? 0) * ratioC)
      : sourceChroma
    color.coords[2] = source.coords?.[2] ?? 0
  })

  if ((scale[0].coords?.[0] ?? 0) > 0.5) {
    const lightnessScale = scale.map(({ coords }) => coords[0] ?? 0)
    const backgroundL = Math.max(0, Math.min(1, bgColor.coords?.[0] ?? 0))
    const newLightnessScale = transposeProgressionStart(
      backgroundL,
      [1, ...lightnessScale],
      lightModeEasing,
    )

    newLightnessScale.shift()
    newLightnessScale.forEach((lightness, i) => {
      scale[i].coords[0] = lightness
    })

    return scale
  }

  const ease: typeof darkModeEasing = [...darkModeEasing]
  const referenceBackgroundColorL = scale[0].coords[0] ?? 0
  const backgroundColorL = Math.max(0, Math.min(1, bgColor.coords[0] ?? 0))
  const ratioL = backgroundColorL / referenceBackgroundColorL

  if (ratioL > 1) {
    const maxRatio = 1.5

    for (let i = 0; i < ease.length; i++) {
      const metaRatio = (ratioL - 1) * (maxRatio / (maxRatio - 1))
      ease[i] = ratioL > maxRatio ? 0 : Math.max(0, ease[i] * (1 - metaRatio))
    }
  }

  const lightnessScale = scale.map(({ coords }) => coords[0] ?? 0)
  const newLightnessScale = transposeProgressionStart(
    backgroundColorL,
    lightnessScale,
    ease,
  )

  newLightnessScale.forEach((lightness, i) => {
    scale[i].coords[0] = lightness
  })

  return scale
}

function getStep9Colors(
  scale: ColorValueScales<Color>,
  baseColor: Color,
): [Color, Color] {
  const referenceBackgroundColor = scale[0]
  const distance = baseColor.deltaEOK(referenceBackgroundColor) * 100

  if (distance < 25) {
    return [scale[8], getTextColor(scale[8])]
  }

  return [baseColor, getTextColor(baseColor)]
}

function getButtonHoverColor(source: Color, scales: ColorValueScales<Color>[]) {
  const [L, C, H] = source.coords
  const lightness = L ?? 0
  const chroma = C ?? 0
  const newL = lightness > 0.4
    ? lightness - 0.03 / (lightness + 0.1)
    : lightness + 0.03 / (lightness + 0.1)
  const newC = lightness > 0.4 && !Number.isNaN(H) ? chroma * 0.93 : chroma
  const buttonHoverColor = new Color('oklch', [newL, newC, H])

  let closestColor = buttonHoverColor
  let minDistance = Infinity

  scales.forEach((scale) => {
    for (const color of scale) {
      const distance = buttonHoverColor.deltaEOK(color)
      if (distance < minDistance) {
        minDistance = distance
        closestColor = color
      }
    }
  })

  buttonHoverColor.coords[1] = closestColor.coords[1]
  buttonHoverColor.coords[2] = closestColor.coords[2]
  return buttonHoverColor
}

function getTextColor(background: Color) {
  const white = new Color('oklch', [1, 0, 0])

  if (Math.abs(white.contrastAPCA(background)) < 40) {
    const [_, C, H] = background.coords
    return new Color('oklch', [0.25, Math.max(C ? 0.08 * C : 0, 0.04), H])
  }

  return white
}

function transposeProgressionStart(
  to: number,
  arr: number[],
  curve: [number, number, number, number],
) {
  return arr.map((n, i, arr) => {
    const lastIndex = arr.length - 1
    const diff = arr[0] - to
    const fn = BezierEasing(...curve)
    return n - diff * fn(1 - i / lastIndex)
  })
}
