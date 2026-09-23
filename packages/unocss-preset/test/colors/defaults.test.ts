import { describe, expect, it } from 'vitest'
import {
  ACCENT_COLOR_NAMES,
  ADDITIONAL_ACCENT_COLORS,
  ADDITIONAL_NEUTRAL_COLORS,
  DEFAULT_BACKGROUND_COLORS,
  NEUTRAL_COLOR_NAMES,
  RADIX_COLOR_NAMES,
  RADIX_NEUTRAL_COLOR_NAMES,
} from '~/colors/defaults'

describe('radixNeutralColorNames', () => {
  it('lists the six radix neutral scales', () => {
    expect(RADIX_NEUTRAL_COLOR_NAMES).toEqual([
      'gray',
      'mauve',
      'slate',
      'sage',
      'olive',
      'sand',
    ])
  })
})

describe('radixColorNames', () => {
  it('starts with neutral names and includes chromatic scales', () => {
    expect(RADIX_COLOR_NAMES.slice(0, RADIX_NEUTRAL_COLOR_NAMES.length)).toEqual([
      ...RADIX_NEUTRAL_COLOR_NAMES,
    ])
    expect(RADIX_COLOR_NAMES).toContain('blue')
    expect(RADIX_COLOR_NAMES).toContain('tomato')
    expect(RADIX_COLOR_NAMES).toContain('sky')
  })

  it('has unique names', () => {
    expect(new Set(RADIX_COLOR_NAMES).size).toBe(RADIX_COLOR_NAMES.length)
  })
})

describe('additional colors', () => {
  it('exposes accent and neutral extras', () => {
    expect(ADDITIONAL_ACCENT_COLORS).toEqual({
      ocean: '#05f',
      clay: '#d97757',
    })
    expect(ADDITIONAL_NEUTRAL_COLORS).toEqual({
      iron: '#86909c',
    })
  })
})

describe('defaultBackgroundColors', () => {
  it('uses white for light and black for dark', () => {
    expect(DEFAULT_BACKGROUND_COLORS).toEqual({
      light: '#fff',
      dark: '#000',
    })
  })
})

describe('composed color name lists', () => {
  it('merges radix names with additional accent and neutral keys', () => {
    expect(ACCENT_COLOR_NAMES).toEqual([
      ...RADIX_COLOR_NAMES,
      ...Object.keys(ADDITIONAL_ACCENT_COLORS),
    ])
    expect(NEUTRAL_COLOR_NAMES).toEqual([
      ...RADIX_NEUTRAL_COLOR_NAMES,
      ...Object.keys(ADDITIONAL_NEUTRAL_COLORS),
    ])
  })
})
