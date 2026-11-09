import * as radixColors from '@radix-ui/colors'
import { describe, expect, it } from 'vitest'
import {
  darkColors,
  darkNeutralColors,
  getRadixColorValue,
  lightColors,
  lightNeutralColors,
} from '../src/colors'
import { RADIX_COLOR_NAMES, RADIX_NEUTRAL_COLOR_NAMES } from '../src/constants'

describe('getRadixColorValue', () => {
  it('returns the light display-p3 scale by default', () => {
    const scales = getRadixColorValue('blue')

    expect(scales).toHaveLength(12)
    expect(scales).toEqual(Object.values(radixColors.blueP3))
  })

  it('returns the dark display-p3 scale', () => {
    expect(getRadixColorValue('blue', 'dark')).toEqual(Object.values(radixColors.blueDarkP3))
  })

  it('uses alpha scales for black and white', () => {
    expect(getRadixColorValue('black')).toEqual(Object.values(radixColors.blackP3A))
    expect(getRadixColorValue('white')).toEqual(Object.values(radixColors.whiteP3A))
  })

  it('swaps black and white in dark mode', () => {
    expect(getRadixColorValue('black', 'dark')).toEqual(Object.values(radixColors.whiteP3A))
    expect(getRadixColorValue('white', 'dark')).toEqual(Object.values(radixColors.blackP3A))
  })
})

describe('precomputed radix color maps', () => {
  it('stores every radix scale as 12 oklch colors', () => {
    expect(Object.keys(lightColors)).toEqual([...RADIX_COLOR_NAMES])
    expect(Object.keys(darkColors)).toEqual([...RADIX_COLOR_NAMES])

    for (const name of RADIX_COLOR_NAMES) {
      expect(lightColors[name]).toHaveLength(12)
      expect(darkColors[name]).toHaveLength(12)
      expect(lightColors[name][0].spaceId).toBe('oklch')
      expect(darkColors[name][0].spaceId).toBe('oklch')
    }
  })

  it('stores neutral scales separately from the full set', () => {
    expect(Object.keys(lightNeutralColors)).toEqual([...RADIX_NEUTRAL_COLOR_NAMES])
    expect(Object.keys(darkNeutralColors)).toEqual([...RADIX_NEUTRAL_COLOR_NAMES])

    for (const name of RADIX_NEUTRAL_COLOR_NAMES) {
      expect(lightNeutralColors[name]).toEqual(lightColors[name])
      expect(darkNeutralColors[name]).toEqual(darkColors[name])
    }
  })
})
