import { describe, expect, it } from 'vitest'
import {
  bracketTypeRe,
  cssVarsRE,
  numberRE,
  numberWithUnitRE,
  remRE,
  splitComma,
  unitOnlyMap,
  unitOnlyRE,
} from '~/utils/handlers/regex'

describe('numberWithUnitRE', () => {
  it('matches numbers with and without css units', () => {
    expect('10px'.match(numberWithUnitRE)?.slice(1)).toEqual(['10', 'px'])
    expect('-1.5rem'.match(numberWithUnitRE)?.slice(1)).toEqual(['-1.5', 'rem'])
    expect('50%'.match(numberWithUnitRE)?.slice(1)).toEqual(['50', '%'])
    expect('4'.match(numberWithUnitRE)?.slice(1)).toEqual(['4', undefined])
    expect('abc'.match(numberWithUnitRE)).toBeNull()
  })
})

describe('numberRE', () => {
  it('matches bare numbers only', () => {
    expect(numberRE.test('1.25')).toBe(true)
    expect(numberRE.test('-3')).toBe(true)
    expect(numberRE.test('10px')).toBe(false)
  })
})

describe('unitOnlyRE and unitOnlyMap', () => {
  it('recognizes unit-only tokens and their default magnitudes', () => {
    expect(unitOnlyRE.test('px')).toBe(true)
    expect(unitOnlyRE.test('vw')).toBe(true)
    expect(unitOnlyRE.test('svh')).toBe(true)
    expect(unitOnlyRE.test('rem')).toBe(false)
    expect(unitOnlyMap.px).toBe(1)
    expect(unitOnlyMap.vh).toBe(100)
  })
})

describe('bracketTypeRe', () => {
  it('captures bracket type hints', () => {
    expect('[color:#fff]'.match(bracketTypeRe)?.[1]).toBe('color')
    expect('[length:10px]'.match(bracketTypeRe)?.[1]).toBe('length')
    expect('[10px]'.match(bracketTypeRe)).toBeNull()
  })
})

describe('splitComma', () => {
  it('splits on commas outside parentheses', () => {
    expect('a,b,c'.split(splitComma)).toEqual(['a', 'b', 'c'])
    expect('rgb(0,0,0),red'.split(splitComma)).toEqual(['rgb(0,0,0)', 'red'])
  })
})

describe('remRE', () => {
  it('matches rem numeric tokens globally', () => {
    expect('1rem 2.5rem'.match(remRE)).toEqual(['1rem', '2.5rem'])
    expect('-0.25rem'.match(remRE)).toEqual(['-0.25rem'])
  })
})

describe('cssVarsRE', () => {
  it('matches bare custom properties but not nested var()', () => {
    expect([...'--foo'.matchAll(cssVarsRE)].map(match => match[1])).toEqual(['foo'])
    expect([...'color:--bar,#fff'.matchAll(cssVarsRE)].map(match => match[1])).toEqual(['bar'])
    expect([...'var(--already)'.matchAll(cssVarsRE)]).toEqual([])
  })
})
