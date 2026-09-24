import type { Theme } from '~/theme'
import { describe, expect, it } from 'vitest'
import {
  auto,
  bracket,
  bracketOfColor,
  bracketOfFamily,
  bracketOfLength,
  bracketOfNumber,
  bracketOfPosition,
  cssvar,
  degree,
  fraction,
  global,
  none,
  number,
  numberWithUnit,
  percent,
  position,
  properties,
  px,
  rem,
  time,
} from '~/utils/handlers/handlers'

const theme = {
  colors: {
    blue: {
      9: '#0090ff',
    },
  },
  spacing: {
    DEFAULT: '0.25rem',
  },
} as unknown as Theme

describe('numberWithUnit', () => {
  it('returns number+unit pairs and rejects bare numbers', () => {
    expect(numberWithUnit('10px')).toBe('10px')
    expect(numberWithUnit('-1.5rem')).toBe('-1.5rem')
    expect(numberWithUnit('4')).toBeUndefined()
    expect(numberWithUnit('foo')).toBeUndefined()
  })
})

describe('auto', () => {
  it('accepts auto aliases', () => {
    expect(auto('auto')).toBe('auto')
    expect(auto('a')).toBe('auto')
    expect(auto('none')).toBeUndefined()
  })
})

describe('rem', () => {
  it('converts bare numbers to rem and preserves units', () => {
    expect(rem('4')).toBe('1rem')
    expect(rem('0')).toBe('0')
    expect(rem('10px')).toBe('10px')
    expect(rem('vw')).toBe('100vw')
    expect(rem('')).toBeUndefined()
    expect(rem('foo')).toBeUndefined()
  })
})

describe('px', () => {
  it('converts bare numbers to px and preserves units', () => {
    expect(px('4')).toBe('4px')
    expect(px('10%')).toBe('10%')
    expect(px('vh')).toBe('100vh')
    expect(px('foo')).toBeUndefined()
  })
})

describe('number', () => {
  it('parses numeric strings', () => {
    expect(number('1.5')).toBe(1.5)
    expect(number('-2')).toBe(-2)
    expect(number('10px')).toBeUndefined()
  })
})

describe('percent', () => {
  it('normalizes percent values', () => {
    expect(percent('50')).toBe('50%')
    expect(percent('50%')).toBe('50%')
    expect(percent('foo')).toBeUndefined()
  })
})

describe('fraction', () => {
  it('converts fractions and full to percentages', () => {
    expect(fraction('1/2')).toBe('50%')
    expect(fraction('1/3')).toBe('33.3333333333%')
    expect(fraction('full')).toBe('100%')
    expect(fraction('0/1')).toBe('0')
    expect(fraction('')).toBeUndefined()
    expect(fraction('a/b')).toBeUndefined()
  })
})

describe('bracket handlers', () => {
  it('parses plain and typed brackets', () => {
    expect(bracket('[10px]')).toBe('10px')
    expect(bracket('[string:hello_world]')).toBe('hello world')
    expect(bracket('[quoted:hi]')).toBe('"hi"')
    expect(bracket('[color:#fff]')).toBe('#fff')
    expect(bracketOfColor('[color:#fff]', theme)).toBe('#fff')
    expect(bracketOfColor('[length:10px]', theme)).toBeUndefined()
    expect(bracketOfLength('[length:10px]', theme)).toBe('10px')
    expect(bracketOfLength('[size:1rem]', theme)).toBe('1rem')
    expect(bracketOfLength('[width:2px]', theme)).toBe('2px')
    expect(bracketOfPosition('[position:center]', theme)).toBe('center')
    expect(bracketOfFamily('[family:sans]', theme)).toBe('sans')
    expect(bracketOfNumber('[number:1.5]', theme)).toBe('1.5')
  })

  it('rejects empty, unbalanced and invalid brackets', () => {
    expect(bracket('[]')).toBeUndefined()
    expect(bracket('[=""]')).toBeUndefined()
    expect(bracket('[a[b]')).toBeUndefined()
    expect(bracket('10px')).toBeUndefined()
  })

  it('spaces calc operators and resolves theme css vars', () => {
    expect(bracket('[calc(1px+2px)]')).toBe('calc(1px + 2px)')
    expect(bracket('[--colors.blue.9]', theme)).toBe('var(--colors-blue-9)')
    expect(bracket('[--colors.blue.9,red]', theme)).toBe('var(--colors-blue-9, red)')
    expect(bracket('[--spacing.DEFAULT(2)]', theme)).toBe('calc(var(--spacing-DEFAULT) * 2)')
  })
})

describe('cssvar', () => {
  it('wraps $ and -- custom properties', () => {
    expect(cssvar('$foo')).toBe('var(--foo)')
    expect(cssvar('--bar')).toBe('var(--bar)')
    expect(cssvar('var(--already)')).toBe('var(--already)')
  })

  it('keeps comma-separated fallbacks intact', () => {
    expect(cssvar('$foo,rgba(0,0,0,.5)')).toBe('var(--foo, rgba(0,0,0,.5))')
    expect(cssvar('$shadow,0_1px_2px_#000')).toBe('var(--shadow, 0_1px_2px_#000)')
  })

  it('rejects invalid cssvar tokens', () => {
    expect(cssvar('foo')).toBeUndefined()
    expect(cssvar('$')).toBeUndefined()
  })
})

describe('time', () => {
  it('defaults bare numbers to ms', () => {
    expect(time('150')).toBe('150ms')
    expect(time('1s')).toBe('1s')
    expect(time('0')).toBe('0s')
    expect(time('foo')).toBeUndefined()
  })
})

describe('degree', () => {
  it('defaults bare numbers to deg', () => {
    expect(degree('45')).toBe('45deg')
    expect(degree('1rad')).toBe('1rad')
    expect(degree('0')).toBe('0deg')
    expect(degree('foo')).toBeUndefined()
  })
})

describe('keyword handlers', () => {
  it('accepts global keywords, positions, none and known properties', () => {
    expect(global('inherit')).toBe('inherit')
    expect(global('foo')).toBeUndefined()
    expect(position('top')).toBe('top')
    expect(position('middle')).toBeUndefined()
    expect(none('none')).toBe('none')
    expect(none('hidden')).toBeUndefined()
    expect(properties('color,opacity')).toBe('color,opacity')
    expect(properties('color,foo')).toBeUndefined()
  })
})
