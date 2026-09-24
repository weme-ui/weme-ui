import Color from 'colorjs.io'
import { describe, expect, it } from 'vitest'
import { generateRadixColorScales } from '~/colors/generator'

function expectTwelveStepScale(scale: string[]) {
  expect(scale).toHaveLength(12)
  for (const value of scale) {
    expect(value).toEqual(expect.any(String))
    expect(value.length).toBeGreaterThan(0)
  }
}

describe('generateRadixColorScales', () => {
  it('generates 12-step solid and alpha display-p3 scales', () => {
    const result = generateRadixColorScales({ color: '#3b82f6' })

    expectTwelveStepScale(result.solid)
    expectTwelveStepScale(result.alpha)
    expect(result.solid[0]).toMatch(/^color\(display-p3 /)
    expect(result.alpha[0]).toMatch(/^color\(display-p3 .+ \/ /)
  })

  it('generates srgb hex solid and alpha scales', () => {
    const result = generateRadixColorScales({ color: '#3b82f6', space: 'srgb' })

    expectTwelveStepScale(result.solid)
    expectTwelveStepScale(result.alpha)
    expect(result.solid.every(value => value.startsWith('#'))).toBe(true)
    expect(result.alpha.every(value => value.startsWith('#'))).toBe(true)
    expect(result.solid[8]).toBe('#3b82f6')
  })

  it('keeps accent step 9 close to the source color', () => {
    const source = '#e5484d'
    const result = generateRadixColorScales({ color: source, space: 'srgb' })
    const distance = new Color(source).deltaEOK(new Color(result.solid[8]))

    expect(distance).toBeLessThan(0.02)
  })

  it('produces different light and dark step 1 colors', () => {
    const light = generateRadixColorScales({ color: '#3b82f6', mode: 'light', space: 'srgb' })
    const dark = generateRadixColorScales({ color: '#3b82f6', mode: 'dark', space: 'srgb' })

    expect(light.solid[0]).not.toBe(dark.solid[0])

    const lightL = new Color(light.solid[0]).to('oklch').coords[0] ?? 0
    const darkL = new Color(dark.solid[0]).to('oklch').coords[0] ?? 0

    expect(lightL).toBeGreaterThan(darkL)
  })

  it('supports accent and neutral scopes', () => {
    const accent = generateRadixColorScales({ color: '#3b82f6', scope: 'accent', space: 'srgb' })
    const neutral = generateRadixColorScales({ color: '#3b82f6', scope: 'neutral', space: 'srgb' })

    expectTwelveStepScale(accent.solid)
    expectTwelveStepScale(neutral.solid)
    expect(accent.solid).not.toEqual(neutral.solid)
  })

  it('uses neutral reference scales for pure black and white accents', () => {
    const black = generateRadixColorScales({ color: '#000000', space: 'srgb' })
    const white = generateRadixColorScales({ color: '#ffffff', space: 'srgb' })

    expectTwelveStepScale(black.solid)
    expectTwelveStepScale(white.solid)
    expect(black.solid[8]).toBe('#000')

    const whiteStep9 = new Color(white.solid[8]).to('oklch')
    expect(whiteStep9.coords[1] ?? 0).toBeLessThan(0.05)
  })

  it('is deterministic for the same input', () => {
    const options = { color: '#7c3aed', mode: 'dark', space: 'srgb' } as const

    expect(generateRadixColorScales(options)).toEqual(generateRadixColorScales(options))
  })

  it('generates dark scales for low-chroma and near-black neutrals', () => {
    for (const color of ['#78716c', '#111111', '#0a0a0a', '#86909c'] as const) {
      for (const mode of ['light', 'dark'] as const) {
        const result = generateRadixColorScales({
          color,
          mode,
          space: 'srgb',
          scope: 'neutral',
        })

        expectTwelveStepScale(result.solid)
        expectTwelveStepScale(result.alpha)
        expect(result.solid.every(value => !value.includes('NaN'))).toBe(true)
        expect(result.alpha.every(value => !value.includes('NaN'))).toBe(true)
      }
    }
  })

  it('generates dark scales for pure black and white in both scopes', () => {
    for (const color of ['#000000', '#ffffff'] as const) {
      for (const scope of ['accent', 'neutral'] as const) {
        const result = generateRadixColorScales({
          color,
          mode: 'dark',
          space: 'srgb',
          scope,
        })

        expectTwelveStepScale(result.solid)
        expectTwelveStepScale(result.alpha)
      }
    }
  })
})
