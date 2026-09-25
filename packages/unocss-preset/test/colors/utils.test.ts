import Color from 'colorjs.io'
import { describe, expect, it } from 'vitest'
import { toOklchString, toP3String } from '~/colors/utils'

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
