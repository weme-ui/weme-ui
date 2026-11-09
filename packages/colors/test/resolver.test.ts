import Color from 'colorjs.io'
import { describe, expect, it } from 'vitest'
import { getRadixColorValue } from '../src/colors'
import { generateRadixColor } from '../src/generator'
import { resolveColor } from '../src/resolver'
import { toOklchString } from '../src/utils'
import { expectTwelveStepScale } from './helpers'

describe('resolveColor', () => {
  it('resolves named radix colors to p3 and oklch scales', () => {
    for (const name of ['blue', 'gray', 'tomato'] as const) {
      const result = resolveColor(name)
      const p3 = getRadixColorValue(name)

      expect(result.p3).toEqual(p3)
      expect(result.oklch).toEqual(p3.map((value) => toOklchString(new Color(value))))
    }
  })

  it('resolves black and white overlay colors', () => {
    const black = resolveColor('black', 'dark')
    const p3 = getRadixColorValue('black', 'dark')

    expect(black.p3).toEqual(p3)
    expect(black.oklch).toEqual(p3.map((value) => toOklchString(new Color(value))))
  })

  it('keeps black and white p3 and oklch scales the same length', () => {
    for (const name of ['black', 'white'] as const) {
      for (const mode of ['light', 'dark'] as const) {
        const result = resolveColor(name, mode)

        expect(result.p3).toHaveLength(12)
        expect(result.oklch).toHaveLength(12)
      }
    }
  })

  it('generates custom scales for non-radix color values', () => {
    const result = resolveColor('#3b82f6')

    expectTwelveStepScale(result.p3)
    expectTwelveStepScale(result.oklch)
    expect(result.p3[0]).toMatch(/^color\(display-p3 /)
    expect(result.oklch[0]).toMatch(/^oklch\(/)

    const distance = new Color('#3b82f6').deltaEOK(new Color(result.oklch[8]))
    expect(distance).toBeLessThan(0.02)
  })

  it('defaults kind to accent for custom colors', () => {
    const hex = '#86909c'
    const defaults = resolveColor(hex)
    const accent = resolveColor(hex, 'light', 'accent')
    const neutral = resolveColor(hex, 'light', 'neutral')

    expect(defaults).toEqual(accent)
    expect(defaults).toEqual(generateRadixColor(hex))
    expect(defaults.oklch).not.toEqual(neutral.oklch)
  })

  it('ignores kind for named radix colors', () => {
    const accent = resolveColor('blue', 'light', 'accent')
    const neutral = resolveColor('blue', 'light', 'neutral')

    expect(accent).toEqual(neutral)
    expect(accent.p3).toEqual(getRadixColorValue('blue'))
  })
})
