import type { Colors, ColorScalesArray } from './types'
import BezierEasing from 'bezier-easing'
import Color from 'colorjs.io'
import { getColorNames, toColorString } from './utils'

export function generateColor(
  color: string,
  colors: Colors<Color>,
  background: string,
): ColorScalesArray {
  const sourceColor = new Color(color).to('oklch')
  const backgroundColor = new Color(background).to('oklch')

  const scales = getScaleColors(sourceColor, colors, backgroundColor)

  scales[8] = sourceColor
  scales[9] = getHoverColor(sourceColor, [scales])

  scales[10].coords[1] = Math.min(
    Math.max(scales[8].coords[1], scales[7].coords[1]),
    scales[10].coords[1],
  )

  scales[11].coords[1] = Math.min(
    Math.max(scales[8].coords[1], scales[7].coords[1]),
    scales[11].coords[1],
  )

  return scales.map(toColorString) as ColorScalesArray
}

function getScaleColors(
  source: Color,
  colors: Record<string, ColorScalesArray<Color>>,
  backgroundColor: Color,
): ColorScalesArray<Color> {
  const allColors: { name: string, color: Color, distance: number }[] = []

  Object.entries(colors).forEach(([name, scale]) => {
    for (const color of scale) {
      const distance = source.deltaEOK(color)
      allColors.push({ name, distance, color })
    }
  })

  allColors.sort((a, b) => a.distance - b.distance)

  const closestColors = allColors.filter(
    (color, i, arr) => i === arr.findIndex(value => value.name === color.name),
  )

  const grayColorNames = getColorNames('neutral') as readonly string[]
  const allAreGrays = closestColors.every(color =>
    grayColorNames.includes(color.name),
  )
  if (!allAreGrays && grayColorNames.includes(closestColors[0].name)) {
    while (grayColorNames.includes(closestColors[1].name)) {
      closestColors.splice(1, 1)
    }
  }

  const closestA = closestColors[0]
  const closestB = closestColors[1]

  const a = closestB.distance
  const b = closestA.distance
  const c = closestA.color.deltaEOK(closestB.color)

  const cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c)
  const radA = Math.acos(cosA)
  const sinA = Math.sin(radA)

  const cosB = (a ** 2 + c ** 2 - b ** 2) / (2 * a * c)
  const radB = Math.acos(cosB)
  const sinB = Math.sin(radB)

  const tanC1 = cosA / sinA
  const tanC2 = cosB / sinB
  const ratio = Math.max(0, tanC1 / tanC2) * 0.5

  const colorA = colors[closestA.name]
  const colorB = colors[closestB.name]

  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i =>
    new Color(Color.mix(colorA[i], colorB[i], ratio)).to('oklch'),
  ) as ColorScalesArray<Color>

  const baseColor = scale.slice()
    .sort((a, b) => source.deltaEOK(a) - source.deltaEOK(b))[0]

  const ratioC = source.coords[1] / baseColor.coords[1]

  scale.forEach((color) => {
    color.coords[1] = Math.min(
      source.coords[1] * 1.5,
      color.coords[1] * ratioC,
    )
    color.coords[2] = source.coords[2]
  })

  // Light
  if (scale[0].coords[0] > 0.5) {
    const lightnessScale = scale.map(({ coords }) => coords[0])
    const backgroundL = Math.max(0, Math.min(1, backgroundColor.coords[0]))
    const newLightnessScale = transposeProgressionStart(
      backgroundL,
      [1, ...lightnessScale],
      [0, 2, 0, 2] as [number, number, number, number],
    )

    newLightnessScale.shift()

    newLightnessScale.forEach((lightness, i) => {
      scale[i].coords[0] = lightness
    })

    return scale
  }

  // Dark
  const ease: [number, number, number, number] = [1, 0, 1, 0]
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

function getHoverColor(source: Color, scales: ColorScalesArray<Color>[]) {
  const [L, C, H] = source.coords
  const newL = L > 0.4 ? L - 0.03 / (L + 0.1) : L + 0.03 / (L + 0.1)
  const newC = L > 0.4 && !Number.isNaN(H) ? C * 0.93 + 0 : C
  const hoverColor = new Color('oklch', [newL, newC, H])

  let closestColor = hoverColor
  let minDistance = Infinity

  scales.forEach((scale) => {
    for (const color of scale) {
      const distance = hoverColor.deltaEOK(color)
      if (distance < minDistance) {
        minDistance = distance
        closestColor = color
      }
    }
  })

  hoverColor.coords[1] = closestColor.coords[1]
  hoverColor.coords[2] = closestColor.coords[2]

  return hoverColor
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
