import * as radixColors from '@radix-ui/colors'
import { describe, expect, it } from 'vitest'
import { getRadixColorScales, resolveRadixColorScales } from '~/colors/color'

describe('getRadixColorScales', () => {
  it('returns the light display-p3 solid scale by default', () => {
    const scales = getRadixColorScales({ name: 'blue' })

    expect(scales).toHaveLength(12)
    expect(scales).toEqual(Object.values(radixColors.blueP3))
  })

  it('supports srgb solid and alpha variants', () => {
    expect(getRadixColorScales({ name: 'blue', space: 'srgb' })).toEqual(
      Object.values(radixColors.blue),
    )
    expect(getRadixColorScales({ name: 'blue', space: 'srgb', alpha: true })).toEqual(
      Object.values(radixColors.blueA),
    )
  })

  it('supports dark mode and display-p3 alpha variants', () => {
    expect(getRadixColorScales({ name: 'blue', mode: 'dark' })).toEqual(
      Object.values(radixColors.blueDarkP3),
    )
    expect(getRadixColorScales({ name: 'blue', mode: 'dark', alpha: true })).toEqual(
      Object.values(radixColors.blueDarkP3A),
    )
  })

  it('always uses alpha scales for black and white', () => {
    expect(getRadixColorScales({ name: 'black' })).toEqual(Object.values(radixColors.blackP3A))
    expect(getRadixColorScales({ name: 'white', space: 'srgb' })).toEqual(
      Object.values(radixColors.whiteA),
    )
  })

  it('swaps black and white in dark mode', () => {
    expect(getRadixColorScales({ name: 'black', mode: 'dark' })).toEqual(
      Object.values(radixColors.whiteP3A),
    )
    expect(getRadixColorScales({ name: 'white', mode: 'dark', space: 'srgb' })).toEqual(
      Object.values(radixColors.blackA),
    )
  })
})

describe('resolveRadixColorScales', () => {
  it('resolves named radix colors to solid and alpha scales', () => {
    for (const name of ['blue', 'gray', 'tomato'] as const) {
      const result = resolveRadixColorScales({ color: name })

      expect(result.solid).toEqual(getRadixColorScales({ name }))
      expect(result.alpha).toEqual(getRadixColorScales({ name, alpha: true }))
    }
  })

  it('resolves black and white overlay colors', () => {
    const black = resolveRadixColorScales({ color: 'black', mode: 'dark', space: 'srgb' })

    expect(black.solid).toEqual(getRadixColorScales({ name: 'black', mode: 'dark', space: 'srgb' }))
    expect(black.alpha).toEqual(getRadixColorScales({
      name: 'black',
      mode: 'dark',
      space: 'srgb',
      alpha: true,
    }))
  })

  it('keeps black and white solid and alpha scales identical', () => {
    for (const name of ['black', 'white'] as const) {
      for (const mode of ['light', 'dark'] as const) {
        const result = resolveRadixColorScales({ color: name, mode, space: 'srgb' })

        expect(result.solid).toEqual(result.alpha)
        expect(result.solid).toHaveLength(12)
      }
    }
  })

  it('generates custom scales for non-radix color values', () => {
    const result = resolveRadixColorScales({ color: '#3b82f6', space: 'srgb' })

    expect(result.solid).toHaveLength(12)
    expect(result.alpha).toHaveLength(12)
    expect(result.solid[8]).toBe('#3b82f6')
    expect(result.solid[0].startsWith('#')).toBe(true)
  })

  it('defaults scope to accent for custom colors', () => {
    const hex = '#86909c'
    const defaults = resolveRadixColorScales({ color: hex, space: 'srgb' })
    const accent = resolveRadixColorScales({ color: hex, space: 'srgb', kind: 'accent' })
    const neutral = resolveRadixColorScales({ color: hex, space: 'srgb', kind: 'neutral' })

    expect(defaults).toEqual(accent)
    expect(defaults.solid).not.toEqual(neutral.solid)
  })

  it('ignores scope for named radix colors', () => {
    const accent = resolveRadixColorScales({ color: 'blue', space: 'srgb', kind: 'accent' })
    const neutral = resolveRadixColorScales({ color: 'blue', space: 'srgb', kind: 'neutral' })

    expect(accent).toEqual(neutral)
    expect(accent.solid).toEqual(getRadixColorScales({ name: 'blue', space: 'srgb' }))
  })
})
