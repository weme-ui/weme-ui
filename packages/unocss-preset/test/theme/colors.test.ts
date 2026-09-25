import type { ThemeColorScales } from '~/theme/types'
import * as radixColors from '@radix-ui/colors'
import { describe, expect, it } from 'vitest'
import { getRadixColorScales, resolveRadixColorScales } from '~/colors/color'
import {
  ADDITIONAL_ACCENT_COLORS,
  ADDITIONAL_NEUTRAL_COLORS,
  RADIX_COLOR_NAMES,
  RADIX_NEUTRAL_COLOR_NAMES,
} from '~/colors/defaults'
import { colors } from '~/theme/colors'

const SOLID_KEYS = [
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

const ALL_SCALE_KEYS = [...SOLID_KEYS, ...ALPHA_KEYS] as const

function scaleKeys(scale: ThemeColorScales | undefined, withAlpha: boolean) {
  const keys = Object.keys(scale ?? {}).filter(key => key !== 'dark').sort()
  const expected = (withAlpha ? ALL_SCALE_KEYS : SOLID_KEYS).slice().sort()
  return { keys, expected }
}

function expectScaleShape(
  scale: ThemeColorScales | undefined,
  withAlpha: boolean,
) {
  expect(scale).toBeDefined()

  const { keys, expected } = scaleKeys(scale, withAlpha)
  expect(keys).toEqual(expected)

  for (const key of SOLID_KEYS) {
    expect(scale?.[key]).toEqual(expect.any(String))
    expect(scale?.[key]?.length).toBeGreaterThan(0)
  }

  if (withAlpha) {
    for (const key of ALPHA_KEYS) {
      expect(scale?.[key]).toEqual(expect.any(String))
      expect(scale?.[key]?.length).toBeGreaterThan(0)
    }
  }
  else {
    for (const key of ALPHA_KEYS) {
      expect(scale?.[key]).toBeUndefined()
    }
  }
}

function expectMatchesResolved(
  themeColor: (ThemeColorScales & { dark?: ThemeColorScales }) | undefined,
  options: {
    color: string
    space?: 'srgb' | 'display-p3'
    scope?: 'accent' | 'neutral'
    withAlpha: boolean
  },
) {
  const { color, space = 'srgb', scope, withAlpha } = options
  const light = resolveRadixColorScales({ color, space, mode: 'light', kind: scope })
  const dark = resolveRadixColorScales({ color, space, mode: 'dark', kind: scope })

  expectScaleShape(themeColor, withAlpha)
  expectScaleShape(themeColor?.dark, withAlpha)

  for (const [index, key] of SOLID_KEYS.entries()) {
    expect(themeColor?.[key]).toBe(light.solid[index])
    expect(themeColor?.dark?.[key]).toBe(dark.solid[index])
  }

  if (withAlpha) {
    for (const [index, key] of ALPHA_KEYS.entries()) {
      expect(themeColor?.[key]).toBe(light.alpha[index])
      expect(themeColor?.dark?.[key]).toBe(dark.alpha[index])
    }
  }
}

describe('colors', () => {
  describe('defaults', () => {
    it('treats undefined options the same as an empty object', () => {
      expect(colors()).toEqual(colors({}))
      expect(colors(undefined)).toEqual(colors({}))
    })

    it('defaults to display-p3 color space', () => {
      const themeColors = colors()

      expect(themeColors.blue?.['1']).toMatch(/^color\(display-p3 /)
      expect(themeColors.blue?.a1).toMatch(/^color\(display-p3 /)
      expect(themeColors.blue?.dark?.['1']).toMatch(/^color\(display-p3 /)
      expect(themeColors.blue?.dark?.a1).toMatch(/^color\(display-p3 /)
    })

    it('keeps additional accent and neutral colors when accent/neutral are empty', () => {
      const themeColors = colors({
        space: 'srgb',
        accent: {},
        neutral: {},
      })

      for (const name of Object.keys(ADDITIONAL_ACCENT_COLORS)) {
        expect(themeColors[name]).toBeDefined()
      }

      for (const name of Object.keys(ADDITIONAL_NEUTRAL_COLORS)) {
        expect(themeColors[name]).toBeDefined()
      }
    })
  })

  describe('radix colors', () => {
    it('builds light top-level and dark nested scales for every radix color', () => {
      const themeColors = colors({ space: 'srgb' })

      for (const name of RADIX_COLOR_NAMES) {
        expectMatchesResolved(themeColors[name], {
          color: name,
          space: 'srgb',
          withAlpha: true,
        })

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

    it('includes both chromatic and neutral radix names', () => {
      const themeColors = colors({ space: 'srgb' })
      const names = Object.keys(themeColors)

      for (const name of RADIX_NEUTRAL_COLOR_NAMES) {
        expect(names).toContain(name)
      }

      expect(names).toContain('blue')
      expect(names).toContain('tomato')
      expect(names).toContain('sky')
    })

    it('matches getRadixColorScales for display-p3 and srgb', () => {
      for (const space of ['srgb', 'display-p3'] as const) {
        const themeColors = colors({ space })

        expect(themeColors.blue?.['1']).toBe(getRadixColorScales({ name: 'blue', space })[0])
        expect(themeColors.blue?.a12).toBe(
          getRadixColorScales({ name: 'blue', space, alpha: true })[11],
        )
        expect(themeColors.blue?.dark?.['1']).toBe(
          getRadixColorScales({ name: 'blue', space, mode: 'dark' })[0],
        )
        expect(themeColors.blue?.dark?.a12).toBe(
          getRadixColorScales({ name: 'blue', space, mode: 'dark', alpha: true })[11],
        )
      }
    })
  })

  describe('black and white overlays', () => {
    it('exposes solid steps only and omits alpha keys', () => {
      const themeColors = colors({ space: 'srgb' })

      for (const name of ['black', 'white'] as const) {
        expectScaleShape(themeColors[name], false)
        expectScaleShape(themeColors[name]?.dark, false)
        expect(themeColors[name]).not.toHaveProperty('a1')
        expect(themeColors[name]?.dark).not.toHaveProperty('a1')
      }
    })

    it('swaps black and white solid scales in dark mode', () => {
      const themeColors = colors({ space: 'srgb' })

      expect(themeColors.black?.['1']).toBe(getRadixColorScales({ name: 'black', space: 'srgb' })[0])
      expect(themeColors.black?.dark?.['1']).toBe(
        getRadixColorScales({ name: 'black', space: 'srgb', mode: 'dark' })[0],
      )
      expect(themeColors.white?.['1']).toBe(getRadixColorScales({ name: 'white', space: 'srgb' })[0])
      expect(themeColors.white?.dark?.['1']).toBe(
        getRadixColorScales({ name: 'white', space: 'srgb', mode: 'dark' })[0],
      )

      expect(themeColors.black?.['1']).toBe(themeColors.white?.dark?.['1'])
      expect(themeColors.white?.['1']).toBe(themeColors.black?.dark?.['1'])
    })

    it('uses alpha overlay values as the solid scale for black and white', () => {
      const themeColors = colors({ space: 'srgb' })

      expect(themeColors.black?.['1']).toBe(Object.values(radixColors.blackA)[0])
      expect(themeColors.white?.['1']).toBe(Object.values(radixColors.whiteA)[0])
      expect(themeColors.black?.dark?.['1']).toBe(Object.values(radixColors.whiteA)[0])
      expect(themeColors.white?.dark?.['1']).toBe(Object.values(radixColors.blackA)[0])
    })
  })

  describe('additional built-in colors', () => {
    it('includes additional accent colors with accent scope', () => {
      const themeColors = colors({ space: 'srgb' })

      for (const [name, value] of Object.entries(ADDITIONAL_ACCENT_COLORS)) {
        expectMatchesResolved(themeColors[name], {
          color: value,
          space: 'srgb',
          scope: 'accent',
          withAlpha: true,
        })
      }
    })

    it('includes additional neutral colors with neutral scope', () => {
      const themeColors = colors({ space: 'srgb' })

      for (const [name, value] of Object.entries(ADDITIONAL_NEUTRAL_COLORS)) {
        expectMatchesResolved(themeColors[name], {
          color: value,
          space: 'srgb',
          scope: 'neutral',
          withAlpha: true,
        })
      }
    })
  })

  describe('custom accent and neutral options', () => {
    it('merges custom accent and neutral colors', () => {
      const themeColors = colors({
        space: 'srgb',
        accent: { brand: '#3b82f6' },
        neutral: { mist: '#94a3b8' },
      })

      expectMatchesResolved(themeColors.brand, {
        color: '#3b82f6',
        space: 'srgb',
        scope: 'accent',
        withAlpha: true,
      })
      expectMatchesResolved(themeColors.mist, {
        color: '#94a3b8',
        space: 'srgb',
        scope: 'neutral',
        withAlpha: true,
      })
      expect(themeColors.brand?.['9']).toBe('#3b82f6')
    })

    it('supports multiple custom colors at once', () => {
      const themeColors = colors({
        space: 'srgb',
        accent: {
          brand: '#3b82f6',
          danger: '#e5484d',
        },
        neutral: {
          mist: '#94a3b8',
          stone: '#78716c',
        },
      })

      expect(themeColors.brand).toBeDefined()
      expect(themeColors.danger).toBeDefined()
      expect(themeColors.mist).toBeDefined()
      expect(themeColors.stone).toBeDefined()
      expect(themeColors.ocean).toBeDefined()
      expect(themeColors.iron).toBeDefined()
    })

    it('overrides additional built-in accent and neutral colors', () => {
      const themeColors = colors({
        space: 'srgb',
        accent: { ocean: '#112233' },
        neutral: { iron: '#445566' },
      })

      expectMatchesResolved(themeColors.ocean, {
        color: '#112233',
        space: 'srgb',
        scope: 'accent',
        withAlpha: true,
      })
      expectMatchesResolved(themeColors.iron, {
        color: '#445566',
        space: 'srgb',
        scope: 'neutral',
        withAlpha: true,
      })
      expect(themeColors.ocean?.['9']).toBe('#123')
    })

    it('overrides radix color names when provided as custom accent or neutral', () => {
      const themeColors = colors({
        space: 'srgb',
        accent: { blue: '#ff0000' },
        neutral: { gray: '#111111' },
      })

      expectMatchesResolved(themeColors.blue, {
        color: '#ff0000',
        space: 'srgb',
        scope: 'accent',
        withAlpha: true,
      })
      expectMatchesResolved(themeColors.gray, {
        color: '#111111',
        space: 'srgb',
        scope: 'neutral',
        withAlpha: true,
      })

      expect(themeColors.blue?.['9']).toBe('#f00')
      expect(themeColors.blue?.['9']).not.toBe(Object.values(radixColors.blue)[8])
    })

    it('uses accent and neutral scopes differently for the same source color', () => {
      const hex = '#86909c'
      const themeColors = colors({
        space: 'srgb',
        accent: { accented: hex },
        neutral: { muted: hex },
      })

      expect(themeColors.accented?.['9']).toBe(hex)
      expect(themeColors.muted?.['9']).not.toBe(themeColors.accented?.['9'])
      expect(themeColors.accented).not.toEqual(themeColors.muted)
    })

    it('keeps built-in colors when only custom accent is provided', () => {
      const themeColors = colors({
        space: 'srgb',
        accent: { brand: '#3b82f6' },
      })

      expect(themeColors.brand).toBeDefined()
      expect(themeColors.blue).toBeDefined()
      expect(themeColors.ocean).toBeDefined()
      expect(themeColors.clay).toBeDefined()
      expect(themeColors.gunmetal).toBeDefined()
      expect(themeColors.iron).toBeDefined()
      expect(themeColors.black).toBeDefined()
      expect(themeColors.white).toBeDefined()
    })

    it('keeps built-in colors when only custom neutral is provided', () => {
      const themeColors = colors({
        space: 'srgb',
        neutral: { mist: '#94a3b8' },
      })

      expect(themeColors.mist).toBeDefined()
      expect(themeColors.gray).toBeDefined()
      expect(themeColors.ocean).toBeDefined()
      expect(themeColors.gunmetal).toBeDefined()
      expect(themeColors.iron).toBeDefined()
    })
  })

  describe('color spaces', () => {
    it('emits srgb hex values when space is srgb', () => {
      const themeColors = colors({ space: 'srgb' })

      expect(themeColors.blue?.['1']).toMatch(/^#/)
      expect(themeColors.blue?.a1).toMatch(/^#/)
      expect(themeColors.ocean?.['9']).toMatch(/^#/)
      expect(themeColors.black?.['1']).toMatch(/^rgba?\(/)
    })

    it('emits display-p3 values when space is display-p3', () => {
      const themeColors = colors({ space: 'display-p3' })

      expect(themeColors.blue?.['1']).toMatch(/^color\(display-p3 /)
      expect(themeColors.blue?.a1).toMatch(/^color\(display-p3 /)
      expect(themeColors.ocean?.['1']).toMatch(/^color\(display-p3 /)
      expect(themeColors.black?.['1']).toMatch(/^color\(display-p3 /)
    })

    it('keeps light and dark scales different for chromatic colors', () => {
      const themeColors = colors({ space: 'srgb' })

      expect(themeColors.blue?.['1']).not.toBe(themeColors.blue?.dark?.['1'])
      expect(themeColors.ocean?.['1']).not.toBe(themeColors.ocean?.dark?.['1'])
      expect(themeColors.iron?.['1']).not.toBe(themeColors.iron?.dark?.['1'])
    })
  })

  describe('structure invariants', () => {
    it('never puts light scales under a light key', () => {
      const themeColors = colors({ space: 'srgb' })

      expect(themeColors.blue).not.toHaveProperty('light')
      expect(themeColors.black).not.toHaveProperty('light')
      expect(themeColors.ocean).not.toHaveProperty('light')
    })

    it('always nests dark scales under dark', () => {
      const themeColors = colors({
        space: 'srgb',
        accent: { brand: '#3b82f6' },
        neutral: { mist: '#94a3b8' },
      })

      for (const name of ['blue', 'black', 'white', 'ocean', 'iron', 'brand', 'mist'] as const) {
        expect(themeColors[name]?.dark).toBeDefined()
        expect(typeof themeColors[name]?.dark).toBe('object')
      }
    })

    it('exposes the expected top-level color names by default', () => {
      const themeColors = colors({ space: 'srgb' })
      const names = Object.keys(themeColors).sort()

      expect(names).toEqual([
        ...RADIX_COLOR_NAMES,
        'black',
        'white',
        ...Object.keys(ADDITIONAL_ACCENT_COLORS),
        ...Object.keys(ADDITIONAL_NEUTRAL_COLORS),
      ].sort())
    })
  })
})
