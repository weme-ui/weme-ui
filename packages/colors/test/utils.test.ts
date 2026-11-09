import Color from 'colorjs.io'
import { describe, expect, it } from 'vitest'
import { toOklchString, toP3String } from '../src/utils'

describe('toOklchString', () => {
  it('formats lightness as a percentage with one decimal place', () => {
    expect(toOklchString(new Color('#ff0000'))).toBe('oklch(62.8% 0.2577 29.23)')
  })

  it('keeps a zero lightness percentage', () => {
    expect(toOklchString(new Color('oklch', [0, 0, 0]))).toBe('oklch(0% 0 0)')
  })
})

describe('toP3String', () => {
  it('serializes colors as display-p3', () => {
    expect(toP3String(new Color('#ff0000'))).toBe('color(display-p3 0.9175 0.2003 0.1386)')
  })
})
