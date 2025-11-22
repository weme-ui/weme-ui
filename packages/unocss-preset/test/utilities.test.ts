import { describe, expect, it } from 'vitest'
import { cssVarName, parseColorStr, transformColors } from '../src/utils'

describe('utilities', () => {
  it('should color parsed', () => {
    [
      ['color', 'color', undefined, undefined],
      ['color-1', 'color', 1, undefined],
      ['color/10', 'color', undefined, 10],
      ['color-1/10', 'color', 1, 10],
      ['color-suffix-12', 'color-suffix', 12, undefined],
      ['color-suffix-12/100', 'color-suffix', 12, 100],
    ].forEach(
      ([raw, name, scale, opacity]) => {
        expect(parseColorStr(raw as string)).toEqual({
          name,
          scale,
          opacity,
        })
      },
    )
  })

  it('should transform colors', () => {
    expect(transformColors('#1D2129')).toMatchSnapshot()
  })

  it('should contact css var name', () => {
    [
      [['background', 'primary'], '--bg-primary'],
      [['background', 'Primary-9'], '--bg-primary-9'],
      [['background', 'primary', '9'], '--bg-primary-9'],
      [['color', 'primary', '9'], '--primary-9'],
      [['color', 'primary', 'default'], '--primary'],
    ].forEach(([args, expected]) => {
      expect(cssVarName(...args as string[])).toBe(expected)
    })
  })
})
