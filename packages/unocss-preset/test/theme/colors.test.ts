import type { ThemeColorScales } from '~/theme/types'
import * as radixColors from '@radix-ui/colors'
import { describe, expect, it } from 'vitest'
import {
  ADDITIONAL_ACCENT_COLORS,
  ADDITIONAL_NEUTRAL_COLORS,
  RADIX_COLOR_NAMES,
} from '~/colors/defaults'
import { colors } from '~/theme/colors'

const SCALE_KEYS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
] as const

const ALPHA_KEYS = [
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'a10',
  'a11',
  'a12',
] as const

function expectFullScale(scale: ThemeColorScales | undefined) {
  expect(scale).toBeDefined()
  for (const key of SCALE_KEYS) {
    expect(scale?.[key]).toEqual(expect.any(String))
  }
}

describe('colors', () => {
  it('builds light and dark scales for radix colors', () => {
    const themeColors = colors({ space: 'srgb' })

    for (const name of RADIX_COLOR_NAMES) {
      expectFullScale(themeColors[name])
      expectFullScale(themeColors[name]?.dark)

      expect(themeColors[name]?.['1']).toBe(
        Object.values(radixColors[name as keyof typeof radixColors] as Record<string, string>)[0],
      )
      expect(themeColors[name]?.dark?.['1']).toBe(
        Object.values(
          radixColors[`${name}Dark` as keyof typeof radixColors] as Record<string, string>,
        )[0],
      )
    }
  })

  it('includes alpha steps for chromatic colors but not black or white', () => {
    const themeColors = colors({ space: 'srgb' })

    for (const key of ALPHA_KEYS) {
      expect(themeColors.blue?.[key]).toEqual(expect.any(String))
      expect(themeColors.blue?.dark?.[key]).toEqual(expect.any(String))
    }

    expect(themeColors.black).toBeDefined()
    expect(themeColors.white).toBeDefined()
    expect('a1' in (themeColors.black ?? {})).toBe(false)
    expect('a1' in (themeColors.white ?? {})).toBe(false)
  })

  it('includes additional accent and neutral colors by default', () => {
    const themeColors = colors({ space: 'srgb' })

    for (const name of Object.keys(ADDITIONAL_ACCENT_COLORS)) {
      expectFullScale(themeColors[name])
      expectFullScale(themeColors[name]?.dark)
    }

    for (const name of Object.keys(ADDITIONAL_NEUTRAL_COLORS)) {
      expectFullScale(themeColors[name])
      expectFullScale(themeColors[name]?.dark)
    }
  })

  it('merges custom accent and neutral colors from options', () => {
    const themeColors = colors({
      space: 'srgb',
      accent: { brand: '#3b82f6' },
      neutral: { mist: '#94a3b8' },
    })

    expectFullScale(themeColors.brand)
    expectFullScale(themeColors.mist)
    expect(themeColors.brand?.['9']).toBe('#3b82f6')
    expect(themeColors.mist?.['9']).toEqual(expect.any(String))
  })

  it('defaults to display-p3 color space', () => {
    const themeColors = colors()

    expect(themeColors.blue?.['1']).toMatch(/^color\(display-p3 /)
    expect(themeColors.blue?.dark?.['1']).toMatch(/^color\(display-p3 /)
  })
})
