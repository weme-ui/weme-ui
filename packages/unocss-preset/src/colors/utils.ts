import type { Coords } from 'colorjs.io'
import Color from 'colorjs.io'

/**
 * Convert color to oklch color string.
 */
export function toOklchString(color: Color): string {
  const oklch = color.to('oklch')
  const L = +((oklch.coords?.[0] ?? 0) * 100).toFixed(1)

  return oklch
    .toString({ precision: 4 })
    // eslint-disable-next-line regexp/no-misleading-capturing-group
    .replace(/(\S+)(.+)/, `oklch(${L}%$2`)
}

/**
 * Convert color to oklch string with alpha channel.
 */
export function toAlphaOklchString(targetColor: string, backgroundColor: string, targetAlpha?: number): string {
  const [r, g, b, a] = getAlphaColor(
    new Color(targetColor).to('p3').coords,
    new Color(backgroundColor).to('p3').coords,
    255,
    1000,
    targetAlpha,
  )

  return toOklchString(new Color('p3', [r, g, b], a))
}

/**
 * Convert color to P3 color string.
 */
export function toP3String(color: Color): string {
  return color
    .to('p3')
    .toString({ precision: 4 })
    .replace('color(p3 ', 'color(display-p3 ')
}

/**
 * Convert color to p3 string with alpha channel.
 */
export function toAlphaP3String(targetColor: string, backgroundColor: string, targetAlpha?: number): string {
  const [r, g, b, a] = getAlphaColor(
    new Color(targetColor).to('p3').coords,
    new Color(backgroundColor).to('p3').coords,
    255,
    1000,
    targetAlpha,
  )

  return (
    new Color('p3', [r, g, b], a)
      .toString({ precision: 4 })
      .replace('color(p3 ', 'color(display-p3 ')
  )
}

/**
 * Convert color to srgb string with alpha channel.
 */
export function toAlphaSrgbString(targetColor: string, backgroundColor: string, targetAlpha?: number): string {
  const [r, g, b, a] = getAlphaColor(
    new Color(targetColor).to('srgb').coords,
    new Color(backgroundColor).to('srgb').coords,
    255,
    255,
    targetAlpha,
  )

  return formatHex(new Color('srgb', [r, g, b], a).toString({ format: 'hex' }))
}

function getAlphaColor(
  targetRgb: Coords,
  backgroundRgb: Coords,
  rgbPrecision: number,
  alphaPrecision: number,
  targetAlpha?: number,
) {
  const [tr, tg, tb] = targetRgb.map(c => Math.round((c ?? 0) * rgbPrecision))
  const [br, bg, bb] = backgroundRgb.map(c => Math.round((c ?? 0) * rgbPrecision))

  if (
    tr === undefined
    || tg === undefined
    || tb === undefined
    || br === undefined
    || bg === undefined
    || bb === undefined
  ) {
    throw new Error('Color is undefined')
  }

  let desiredRgb = 0
  if (tr > br) {
    desiredRgb = rgbPrecision
  }
  else if (tg > bg) {
    desiredRgb = rgbPrecision
  }
  else if (tb > bb) {
    desiredRgb = rgbPrecision
  }

  const alphaR = (tr - br) / (desiredRgb - br)
  const alphaG = (tg - bg) / (desiredRgb - bg)
  const alphaB = (tb - bb) / (desiredRgb - bb)

  const isPureGray = [alphaR, alphaG, alphaB].every(
    alpha => alpha === alphaR,
  )

  if (!targetAlpha && isPureGray) {
    const V = desiredRgb / rgbPrecision
    return [V, V, V, alphaR] as const
  }

  const clampRgb = (n: number) =>
    Number.isNaN(n) ? 0 : Math.min(rgbPrecision, Math.max(0, n))
  const clampA = (n: number) =>
    Number.isNaN(n) ? 0 : Math.min(alphaPrecision, Math.max(0, n))
  const maxAlpha = targetAlpha ?? Math.max(alphaR, alphaG, alphaB)

  const A = clampA(Math.ceil(maxAlpha * alphaPrecision)) / alphaPrecision
  let R = clampRgb(((br * (1 - A) - tr) / A) * -1)
  let G = clampRgb(((bg * (1 - A) - tg) / A) * -1)
  let B = clampRgb(((bb * (1 - A) - tb) / A) * -1)

  R = Math.ceil(R)
  G = Math.ceil(G)
  B = Math.ceil(B)

  const blendedR = blendAlpha(R, A, br)
  const blendedG = blendAlpha(G, A, bg)
  const blendedB = blendAlpha(B, A, bb)

  if (desiredRgb === 0) {
    if (tr <= br && tr !== blendedR) {
      R = tr > blendedR ? R + 1 : R - 1
    }

    if (tg <= bg && tg !== blendedG) {
      G = tg > blendedG ? G + 1 : G - 1
    }

    if (tb <= bb && tb !== blendedB) {
      B = tb > blendedB ? B + 1 : B - 1
    }
  }

  if (desiredRgb === rgbPrecision) {
    if (tr >= br && tr !== blendedR) {
      R = tr > blendedR ? R + 1 : R - 1
    }

    if (tg >= bg && tg !== blendedG) {
      G = tg > blendedG ? G + 1 : G - 1
    }

    if (tb >= bb && tb !== blendedB) {
      B = tb > blendedB ? B + 1 : B - 1
    }
  }

  R = R / rgbPrecision
  G = G / rgbPrecision
  B = B / rgbPrecision

  return [R, G, B, A] as const
}

function blendAlpha(
  foreground: number,
  alpha: number,
  background: number,
  round = true,
) {
  if (round) {
    return (
      Math.round(background * (1 - alpha)) + Math.round(foreground * alpha)
    )
  }

  return background * (1 - alpha) + foreground * alpha
}

function formatHex(str: string) {
  if (!str.startsWith('#')) {
    return str
  }

  if (str.length === 4) {
    const hash = str.charAt(0)
    const r = str.charAt(1)
    const g = str.charAt(2)
    const b = str.charAt(3)
    return hash + r + r + g + g + b + b
  }

  if (str.length === 5) {
    const hash = str.charAt(0)
    const r = str.charAt(1)
    const g = str.charAt(2)
    const b = str.charAt(3)
    const a = str.charAt(4)
    return hash + r + r + g + g + b + b + a + a
  }

  return str
}
