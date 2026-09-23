import Color from 'colorjs.io'
import { describe, expect, it } from 'vitest'
import {
  toAlphaOklchString,
  toAlphaP3String,
  toAlphaSrgbString,
  toOklchString,
  toP3String,
} from '~/colors/utils'

describe('toOklchString', () => {
  it('formats lightness as a percentage with one decimal place', () => {
    expect(toOklchString(new Color('#ff0000'))).toBe('oklch(62.8% 0.2577 29.23)')
  })
})

describe('toP3String', () => {
  it('serializes colors as display-p3', () => {
    expect(toP3String(new Color('#ff0000'))).toBe('color(display-p3 0.9175 0.2003 0.1386)')
  })
})

describe('toAlphaSrgbString', () => {
  it('returns an 8-digit hex that blends toward the target on white', () => {
    const alpha = toAlphaSrgbString('#3b82f6', '#ffffff')

    expect(alpha).toMatch(/^#[0-9a-f]{8}$/i)

    const foreground = new Color(alpha).to('srgb')
    const target = new Color('#3b82f6').to('srgb')
    const a = foreground.alpha

    for (let i = 0; i < 3; i++) {
      const blended = (foreground.coords[i] ?? 0) * a + (1 - a)
      expect(blended).toBeCloseTo(target.coords[i] ?? 0, 2)
    }
  })

  it('expands short hex alpha values from colorjs', () => {
    const alpha = toAlphaSrgbString('#000000', '#ffffff', 0.05)

    expect(alpha.length).toBeGreaterThanOrEqual(7)
    expect(alpha.startsWith('#')).toBe(true)
  })
})

describe('toAlphaP3String', () => {
  it('returns a display-p3 color with an alpha channel', () => {
    const alpha = toAlphaP3String('#3b82f6', '#ffffff')

    expect(alpha).toMatch(/^color\(display-p3 .+ \/ .+\)$/)
  })
})

describe('toAlphaOklchString', () => {
  it('returns an oklch color with an alpha channel', () => {
    const alpha = toAlphaOklchString('#3b82f6', '#ffffff')

    expect(alpha).toMatch(/^oklch\(.+% .+ \/ .+\)$/)
  })
})
