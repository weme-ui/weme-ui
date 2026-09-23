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

  it('generates custom scales for non-radix color values', () => {
    const result = resolveRadixColorScales({ color: '#3b82f6', space: 'srgb' })

    expect(result.solid).toHaveLength(12)
    expect(result.alpha).toHaveLength(12)
    expect(result.solid[8]).toBe('#3b82f6')
    expect(result.solid[0].startsWith('#')).toBe(true)
  })
})
