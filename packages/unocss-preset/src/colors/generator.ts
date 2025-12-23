import type { WemeColorArray, WemeColorMode } from '../types'
import BezierEasing from 'bezier-easing'
import Color from 'colorjs.io'
import { BG_DARK, BG_LIGHT, DEFAULT_GRAY_COLOR_NAMES } from '../defaults'
import { darkColors, darkGrayColors, lightColors, lightGrayColors } from './colors'

const darkModeEasing = [1, 0, 1, 0] as [number, number, number, number]
const lightModeEasing = [0, 2, 0, 2] as [number, number, number, number]

export function generateColor(color: string, mode: WemeColorMode): WemeColorArray<string> {
  const allScales = mode === 'light' ? lightColors : darkColors
  const backgroundColor = new Color(mode === 'light' ? BG_LIGHT : BG_DARK).to('oklch')
  const baseColor = new Color(color).to('oklch')

  let scaleColors = getScaleFromColor(
    baseColor,
    allScales,
    backgroundColor,
  )

  const baseHex = baseColor.to('srgb').toString({ format: 'hex' })

  if (baseHex === '#000' || baseHex === '#fff') {
    const grayScales = mode === 'light' ? lightGrayColors : darkGrayColors
    const grayBaseColor = new Color('#888').to('oklch')

    scaleColors = getScaleFromColor(
      grayBaseColor,
      grayScales,
      backgroundColor,
    )
  }

  const step9Color = getStep9Colors(scaleColors, baseColor)

  scaleColors[8] = step9Color
  scaleColors[9] = getButtonHoverColor(step9Color, [scaleColors])

  scaleColors[10].coords[1] = Math.min(
    Math.max(scaleColors[8].coords[1], scaleColors[7].coords[1]),
    scaleColors[10].coords[1],
  )

  scaleColors[11].coords[1] = Math.min(
    Math.max(scaleColors[8].coords[1], scaleColors[7].coords[1]),
    scaleColors[11].coords[1],
  )

  return scaleColors.map(
    toOklchString,
  ) as WemeColorArray<string>
}

export function generateGrayColor(color: string, mode: WemeColorMode) {
  const allScales = mode === 'light' ? lightGrayColors : darkGrayColors
  const baseColor = new Color(color).to('oklch')
  const backgroundColor = new Color(mode === 'light' ? BG_LIGHT : BG_DARK).to('oklch')

  const scaleColors = getScaleFromColor(
    baseColor,
    allScales,
    backgroundColor,
  )

  return scaleColors.map(
    toOklchString,
  ) as WemeColorArray<string>
}

function getScaleFromColor(
  source: Color,
  scales: Record<string, WemeColorArray<Color>>,
  backgroundColor: Color,
) {
  const allColors: { scale: string, color: Color, distance: number }[] = []

  Object.entries(scales).forEach(([name, scale]) => {
    for (const color of scale) {
      const distance = source.deltaEOK(color)
      allColors.push({ scale: name, distance, color })
    }
  })

  allColors.sort((a, b) => a.distance - b.distance)

  const closestColors = allColors.filter(
    (c, i, arr) =>
      i === arr.findIndex(v => v.scale === c.scale),
  )

  const grayScaleNamesStr = DEFAULT_GRAY_COLOR_NAMES as readonly string[]
  const allAreGrays = closestColors.every(color =>
    grayScaleNamesStr.includes(color.scale),
  )
  if (!allAreGrays && grayScaleNamesStr.includes(closestColors[0].scale)) {
    while (grayScaleNamesStr.includes(closestColors[1].scale)) {
      closestColors.splice(1, 1)
    }
  }

  const colorA = closestColors[0]
  const colorB = closestColors[1]

  const a = colorB.distance
  const b = colorA.distance
  const c = colorA.color.deltaEOK(colorB.color)

  const cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c)
  const radA = Math.acos(cosA)
  const sinA = Math.sin(radA)

  const cosB = (a ** 2 + c ** 2 - b ** 2) / (2 * a * c)
  const radB = Math.acos(cosB)
  const sinB = Math.sin(radB)

  const tanC1 = cosA / sinA
  const tanC2 = cosB / sinB

  const ratio = Math.max(0, tanC1 / tanC2) * 0.5

  const scaleA = scales[colorA.scale]
  const scaleB = scales[colorB.scale]
  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i =>
    new Color(Color.mix(scaleA[i], scaleB[i], ratio)).to('oklch'),
  ) as WemeColorArray<Color>

  const baseColor = scale
    .slice()
    .sort((a, b) => source.deltaEOK(a) - source.deltaEOK(b))[0]

  const ratioC = source.coords[1] / baseColor.coords[1]

  scale.forEach((color) => {
    color.coords[1] = Math.min(
      source.coords[1] * 1.5,
      color.coords[1] * ratioC,
    )
    color.coords[2] = source.coords[2]
  })

  if (scale[0].coords[0] > 0.5) {
    const lightnessScale = scale.map(({ coords }) => coords[0])
    const backgroundL = Math.max(0, Math.min(1, backgroundColor.coords[0]))
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
  const referenceBackgroundColorL = scale[0].coords[0]
  const backgroundColorL = Math.max(0, Math.min(1, backgroundColor.coords[0]))
  const ratioL = backgroundColorL / referenceBackgroundColorL

  if (ratioL > 1) {
    const maxRatio = 1.5

    for (let i = 0; i < ease.length; i++) {
      const metaRatio = (ratioL - 1) * (maxRatio / (maxRatio - 1))
      ease[i] = ratioL > maxRatio ? 0 : Math.max(0, ease[i] * (1 - metaRatio))
    }
  }

  const lightnessScale = scale.map(({ coords }) => coords[0])
  const backgroundL = backgroundColor.coords[0]
  const newLightnessScale = transposeProgressionStart(
    backgroundL,
    lightnessScale,
    ease,
  )

  newLightnessScale.forEach((lightness, i) => {
    scale[i].coords[0] = lightness
  })

  return scale
}

function getStep9Colors(
  scale: WemeColorArray<Color>,
  accentBaseColor: Color,
): Color {
  const referenceBackgroundColor = scale[0]
  const distance = accentBaseColor.deltaEOK(referenceBackgroundColor) * 100

  if (distance < 25) {
    return scale[8]
  }

  return accentBaseColor
}

function getButtonHoverColor(source: Color, scales: WemeColorArray<Color>[]) {
  const [L, C, H] = source.coords
  const newL = L > 0.4 ? L - 0.03 / (L + 0.1) : L + 0.03 / (L + 0.1)
  const newC = L > 0.4 && !Number.isNaN(H) ? C * 0.93 + 0 : C
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

export function toOklchString(color: Color) {
  const L = +(color.coords[0] * 100).toFixed(1)
  return color
    .to('oklch')
    .toString({ precision: 4 })
    // eslint-disable-next-line regexp/no-misleading-capturing-group
    .replace(/(\S+)(.+)/, `oklch(${L}%$2`)
}
