import * as radixColors from '@radix-ui/colors'
import Color from 'colorjs.io'
import { describe, expect, it } from 'vitest'
import { getRadixColorScales, resolveRadixColorScales } from '~/colors/color'
import { toOklchString } from '~/colors/utils'

describe('getRadixColorScales', () => {
  it('returns the light display-p3 scale by default', () => {
    const scales = getRadixColorScales({ name: 'blue' })

    expect(scales).toHaveLength(12)
    expect(scales).toEqual(Object.values(radixColors.blueP3))
  })

  it('returns the dark display-p3 scale', () => {
    expect(getRadixColorScales({ name: 'blue', mode: 'dark' })).toEqual(
      Object.values(radixColors.blueDarkP3),
    )
  })

  it('uses alpha scales for black and white', () => {
    expect(getRadixColorScales({ name: 'black' })).toEqual(Object.values(radixColors.blackP3A))
    expect(getRadixColorScales({ name: 'white' })).toEqual(Object.values(radixColors.whiteP3A))
  })

  it('swaps black and white in dark mode', () => {
    expect(getRadixColorScales({ name: 'black', mode: 'dark' })).toEqual(
      Object.values(radixColors.whiteP3A),
    )
    expect(getRadixColorScales({ name: 'white', mode: 'dark' })).toEqual(
      Object.values(radixColors.blackP3A),
    )
  })
})

describe('resolveRadixColorScales', () => {
  it('resolves named radix colors to p3 and oklch scales', () => {
    for (const name of ['blue', 'gray', 'tomato'] as const) {
      const result = resolveRadixColorScales({ color: name })
      const p3 = getRadixColorScales({ name })

      expect(result.p3).toEqual(p3)
      expect(result.oklch).toEqual(p3.map(value => toOklchString(new Color(value))))
    }
  })

  it('resolves black and white overlay colors', () => {
    const black = resolveRadixColorScales({ color: 'black', mode: 'dark' })
    const p3 = getRadixColorScales({ name: 'black', mode: 'dark' })

    expect(black.p3).toEqual(p3)
    expect(black.oklch).toEqual(p3.map(value => toOklchString(new Color(value))))
  })

  it('keeps black and white p3 and oklch scales the same length', () => {
    for (const name of ['black', 'white'] as const) {
      for (const mode of ['light', 'dark'] as const) {
        const result = resolveRadixColorScales({ color: name, mode })

        expect(result.p3).toHaveLength(12)
        expect(result.oklch).toHaveLength(12)
      }
    }
  })

  it('generates custom scales for non-radix color values', () => {
    const result = resolveRadixColorScales({ color: '#3b82f6' })

    expect(result.p3).toHaveLength(12)
    expect(result.oklch).toHaveLength(12)
    expect(result.p3[0]).toMatch(/^color\(display-p3 /)
    expect(result.oklch[0]).toMatch(/^oklch\(/)

    const distance = new Color('#3b82f6').deltaEOK(new Color(result.oklch[8]))
    expect(distance).toBeLessThan(0.02)
  })

  it('defaults kind to accent for custom colors', () => {
    const hex = '#86909c'
    const defaults = resolveRadixColorScales({ color: hex })
    const accent = resolveRadixColorScales({ color: hex, kind: 'accent' })
    const neutral = resolveRadixColorScales({ color: hex, kind: 'neutral' })

    expect(defaults).toEqual(accent)
    expect(defaults.oklch).not.toEqual(neutral.oklch)
  })

  it('ignores kind for named radix colors', () => {
    const accent = resolveRadixColorScales({ color: 'blue', kind: 'accent' })
    const neutral = resolveRadixColorScales({ color: 'blue', kind: 'neutral' })

    expect(accent).toEqual(neutral)
    expect(accent.p3).toEqual(getRadixColorScales({ name: 'blue' }))
  })
})
