import type { ThemeColorScales } from '~/theme/types'
import { describe, expect, it } from 'vitest'
import { getRadixColorScales, resolveRadixColorScales } from '~/colors/color'
import {
  ADDITIONAL_ACCENT_COLORS,
  ADDITIONAL_NEUTRAL_COLORS,
  RADIX_COLOR_NAMES,
  RADIX_NEUTRAL_COLOR_NAMES,
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

type ThemeColor = ThemeColorScales & {
  dark?: ThemeColorScales
  p3?: ThemeColorScales & { dark?: ThemeColorScales }
}

function expectScale(scale: ThemeColorScales | undefined) {
  expect(scale).toBeDefined()
  expect(Object.keys(scale ?? {}).filter(key => key !== 'dark' && key !== 'p3').sort()).toEqual([...SCALE_KEYS].sort())

  for (const key of SCALE_KEYS) {
    expect(scale?.[key]).toEqual(expect.any(String))
    expect(scale?.[key]?.length).toBeGreaterThan(0)
  }
}

function expectThemeColor(
  themeColor: ThemeColor | undefined,
  options: { color: string, kind?: 'accent' | 'neutral' },
) {
  const light = resolveRadixColorScales({ color: options.color, mode: 'light', kind: options.kind })
  const dark = resolveRadixColorScales({ color: options.color, mode: 'dark', kind: options.kind })

  expectScale(themeColor)
  expectScale(themeColor?.dark)
  expectScale(themeColor?.p3)
  expectScale(themeColor?.p3?.dark)

  for (const [index, key] of SCALE_KEYS.entries()) {
    expect(themeColor?.[key]).toBe(light.oklch[index])
    expect(themeColor?.dark?.[key]).toBe(dark.oklch[index])
    expect(themeColor?.p3?.[key]).toBe(light.p3[index])
    expect(themeColor?.p3?.dark?.[key]).toBe(dark.p3[index])
  }
}

describe('colors', () => {
  describe('defaults', () => {
    it('treats undefined options the same as an empty object', () => {
      expect(colors()).toEqual(colors({}))
      expect(colors(undefined)).toEqual(colors({}))
    })

    it('snapshots generated scales for each color source', () => {
      const themeColors = colors({
        accent: { brand: '#3b82f6' },
        neutral: { mist: '#94a3b8' },
      })

      expect({
        blue: themeColors.blue,
        gray: themeColors.gray,
        black: themeColors.black,
        white: themeColors.white,
        ocean: themeColors.ocean,
        iron: themeColors.iron,
        brand: themeColors.brand,
        mist: themeColors.mist,
      }).toMatchSnapshot()
    })

    it('stores oklch scales at the top level and display-p3 scales under p3', () => {
      const themeColors = colors()

      expect(themeColors.blue?.['1']).toMatch(/^oklch\(/)
      expect(themeColors.blue?.p3?.['1']).toMatch(/^color\(display-p3 |^color\(p3 /)
      expect(themeColors.blue?.dark?.['1']).toMatch(/^oklch\(/)
      expect(themeColors.blue?.p3?.dark?.['1']).toBe(getRadixColorScales({ name: 'blue', mode: 'dark' })[0])
    })

    it('keeps additional accent and neutral colors when accent/neutral are empty', () => {
      const themeColors = colors({
        accent: {},
        neutral: {},
      })

      for (const name of Object.keys(ADDITIONAL_ACCENT_COLORS))
        expect(themeColors[name]).toBeDefined()

      for (const name of Object.keys(ADDITIONAL_NEUTRAL_COLORS))
        expect(themeColors[name]).toBeDefined()
    })
  })

  describe('radix colors', () => {
    it('builds light and dark oklch and p3 scales for every radix color', () => {
      const themeColors = colors()

      for (const name of RADIX_COLOR_NAMES) {
        expectThemeColor(themeColors[name], { color: name })
        expect(themeColors[name]?.p3?.['1']).toBe(getRadixColorScales({ name })[0])
        expect(themeColors[name]?.p3?.dark?.['1']).toBe(getRadixColorScales({ name, mode: 'dark' })[0])
      }
    })

    it('includes both chromatic and neutral radix names', () => {
      const names = Object.keys(colors())

      for (const name of RADIX_NEUTRAL_COLOR_NAMES)
        expect(names).toContain(name)

      expect(names).toContain('blue')
      expect(names).toContain('tomato')
      expect(names).toContain('sky')
    })
  })

  describe('black and white overlays', () => {
    it('exposes only the 12 solid steps', () => {
      const themeColors = colors()

      for (const name of ['black', 'white'] as const) {
        expectScale(themeColors[name])
        expectScale(themeColors[name]?.dark)
        expect(themeColors[name]).not.toHaveProperty('a1')
        expect(themeColors[name]?.dark).not.toHaveProperty('a1')
      }
    })

    it('swaps black and white scales in dark mode', () => {
      const themeColors = colors()

      expect(themeColors.black?.p3?.['1']).toBe(getRadixColorScales({ name: 'black' })[0])
      expect(themeColors.black?.p3?.dark?.['1']).toBe(getRadixColorScales({ name: 'black', mode: 'dark' })[0])
      expect(themeColors.white?.p3?.['1']).toBe(getRadixColorScales({ name: 'white' })[0])
      expect(themeColors.white?.p3?.dark?.['1']).toBe(getRadixColorScales({ name: 'white', mode: 'dark' })[0])

      expect(themeColors.black?.p3?.['1']).toBe(themeColors.white?.p3?.dark?.['1'])
      expect(themeColors.white?.p3?.['1']).toBe(themeColors.black?.p3?.dark?.['1'])
    })
  })

  describe('additional built-in colors', () => {
    it('includes additional accent colors with accent kind', () => {
      const themeColors = colors()

      for (const [name, value] of Object.entries(ADDITIONAL_ACCENT_COLORS)) {
        expectThemeColor(themeColors[name], {
          color: value,
          kind: 'accent',
        })
      }
    })

    it('includes additional neutral colors with neutral kind', () => {
      const themeColors = colors()

      for (const [name, value] of Object.entries(ADDITIONAL_NEUTRAL_COLORS)) {
        expectThemeColor(themeColors[name], {
          color: value,
          kind: 'neutral',
        })
      }
    })
  })

  describe('custom accent and neutral options', () => {
    it('merges custom accent and neutral colors', () => {
      const themeColors = colors({
        accent: { brand: '#3b82f6' },
        neutral: { mist: '#94a3b8' },
      })

      expectThemeColor(themeColors.brand, { color: '#3b82f6', kind: 'accent' })
      expectThemeColor(themeColors.mist, { color: '#94a3b8', kind: 'neutral' })
      expect(themeColors.brand?.['9']).toMatch(/^oklch\(/)
    })

    it('supports multiple custom colors at once', () => {
      const themeColors = colors({
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
        accent: { ocean: '#112233' },
        neutral: { iron: '#445566' },
      })

      expectThemeColor(themeColors.ocean, { color: '#112233', kind: 'accent' })
      expectThemeColor(themeColors.iron, { color: '#445566', kind: 'neutral' })
    })

    it('overrides radix color names when provided as custom accent or neutral', () => {
      const themeColors = colors({
        accent: { blue: '#ff0000' },
        neutral: { gray: '#111111' },
      })

      expectThemeColor(themeColors.blue, { color: '#ff0000', kind: 'accent' })
      expectThemeColor(themeColors.gray, { color: '#111111', kind: 'neutral' })
      expect(themeColors.blue?.p3?.['9']).not.toBe(getRadixColorScales({ name: 'blue' })[8])
    })

    it('uses accent and neutral kinds differently for the same source color', () => {
      const hex = '#86909c'
      const themeColors = colors({
        accent: { accented: hex },
        neutral: { muted: hex },
      })

      expect(themeColors.accented?.['9']).not.toBe(themeColors.muted?.['9'])
      expect(themeColors.accented).not.toEqual(themeColors.muted)
    })

    it('keeps built-in colors when only custom accent is provided', () => {
      const themeColors = colors({
        accent: { brand: '#3b82f6' },
      })

      expect(themeColors.brand).toBeDefined()
      expect(themeColors.blue).toBeDefined()
      expect(themeColors.ocean).toBeDefined()
      expect(themeColors.iron).toBeDefined()
      expect(themeColors.black).toBeDefined()
      expect(themeColors.white).toBeDefined()
    })

    it('keeps built-in colors when only custom neutral is provided', () => {
      const themeColors = colors({
        neutral: { mist: '#94a3b8' },
      })

      expect(themeColors.mist).toBeDefined()
      expect(themeColors.gray).toBeDefined()
      expect(themeColors.ocean).toBeDefined()
      expect(themeColors.iron).toBeDefined()
    })
  })

  describe('structure invariants', () => {
    it('keeps light and dark scales different for chromatic colors', () => {
      const themeColors = colors()

      expect(themeColors.blue?.['1']).not.toBe(themeColors.blue?.dark?.['1'])
      expect(themeColors.ocean?.['1']).not.toBe(themeColors.ocean?.dark?.['1'])
      expect(themeColors.iron?.['1']).not.toBe(themeColors.iron?.dark?.['1'])
    })

    it('never puts light scales under a light key', () => {
      const themeColors = colors()

      expect(themeColors.blue).not.toHaveProperty('light')
      expect(themeColors.black).not.toHaveProperty('light')
      expect(themeColors.ocean).not.toHaveProperty('light')
    })

    it('always nests dark scales under dark', () => {
      const themeColors = colors({
        accent: { brand: '#3b82f6' },
        neutral: { mist: '#94a3b8' },
      })

      for (const name of ['blue', 'black', 'white', 'ocean', 'iron', 'brand', 'mist'] as const) {
        expect(themeColors[name]?.dark).toBeDefined()
        expect(themeColors[name]?.p3?.dark).toBeDefined()
      }
    })

    it('exposes the expected top-level color names by default', () => {
      const names = Object.keys(colors()).sort()

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
