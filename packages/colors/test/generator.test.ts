import Color from 'colorjs.io'
import { describe, expect, it } from 'vitest'
import { ADDITIONAL_ACCENT_COLORS, ADDITIONAL_NEUTRAL_COLORS } from '../src/constants'
import { generateRadixColor } from '../src/generator'
import { expectTwelveStepScale } from './helpers'

describe('generateRadixColor', () => {
  it('generates 12-step oklch and display-p3 scales', () => {
    const result = generateRadixColor('#3b82f6')

    expectTwelveStepScale(result.oklch)
    expectTwelveStepScale(result.p3)
    expect(result.oklch[0]).toMatch(/^oklch\(/)
    expect(result.p3[0]).toMatch(/^color\(display-p3 /)
  })

  it('keeps accent step 9 close to the source color', () => {
    const source = '#e5484d'
    const result = generateRadixColor(source)
    const distance = new Color(source).deltaEOK(new Color(result.oklch[8]))

    expect(distance).toBeLessThan(0.02)
  })

  it('produces different light and dark step 1 colors', () => {
    const light = generateRadixColor('#3b82f6', 'light')
    const dark = generateRadixColor('#3b82f6', 'dark')

    expect(light.oklch[0]).not.toBe(dark.oklch[0])

    const lightL = new Color(light.oklch[0]).to('oklch').coords[0] ?? 0
    const darkL = new Color(dark.oklch[0]).to('oklch').coords[0] ?? 0

    expect(lightL).toBeGreaterThan(darkL)
  })

  it('supports accent and neutral kinds', () => {
    const accent = generateRadixColor('#3b82f6', 'light', 'accent')
    const neutral = generateRadixColor('#3b82f6', 'light', 'neutral')

    expectTwelveStepScale(accent.oklch)
    expectTwelveStepScale(neutral.oklch)
    expect(accent.oklch).not.toEqual(neutral.oklch)
    expect(accent.p3).not.toEqual(neutral.p3)
  })

  it('uses neutral reference scales for pure black and white accents', () => {
    const black = generateRadixColor('#000000')
    const white = generateRadixColor('#ffffff')

    expectTwelveStepScale(black.oklch)
    expectTwelveStepScale(white.oklch)

    const blackStep9 = new Color(black.oklch[8]).to('oklch')
    const whiteStep9 = new Color(white.oklch[8]).to('oklch')

    expect(blackStep9.coords[0] ?? 1).toBeLessThan(0.05)
    expect(whiteStep9.coords[1] ?? 0).toBeLessThan(0.05)
  })

  it('is deterministic for the same input', () => {
    expect(generateRadixColor('#7c3aed', 'dark')).toEqual(generateRadixColor('#7c3aed', 'dark'))
  })

  it('generates scales for low-chroma and near-black neutrals', () => {
    for (const color of ['#78716c', '#111111', '#0a0a0a', '#86909c'] as const) {
      for (const mode of ['light', 'dark'] as const) {
        const result = generateRadixColor(color, mode, 'neutral')

        expectTwelveStepScale(result.oklch)
        expectTwelveStepScale(result.p3)
      }
    }
  })

  it('generates dark scales for pure black and white in both kinds', () => {
    for (const color of ['#000000', '#ffffff'] as const) {
      for (const kind of ['accent', 'neutral'] as const) {
        const result = generateRadixColor(color, 'dark', kind)

        expectTwelveStepScale(result.oklch)
        expectTwelveStepScale(result.p3)
      }
    }
  })

  it('generates scales for the additional accent and neutral colors', () => {
    for (const color of Object.values(ADDITIONAL_ACCENT_COLORS)) {
      const result = generateRadixColor(color)

      expectTwelveStepScale(result.oklch)
      expectTwelveStepScale(result.p3)
    }

    for (const color of Object.values(ADDITIONAL_NEUTRAL_COLORS)) {
      const result = generateRadixColor(color, 'light', 'neutral')

      expectTwelveStepScale(result.oklch)
      expectTwelveStepScale(result.p3)
    }
  })
})
