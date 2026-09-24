import { describe, expect, it } from 'vitest'
import {
  basePositionMap,
  cornerMap,
  cssMathFnRE,
  cssVarFnRE,
  directionMap,
  globalKeywords,
  insetMap,
  positionMap,
  xyzArray,
  xyzMap,
} from '~/utils/mappings'

describe('directionMap', () => {
  it('maps physical and logical directions', () => {
    expect(directionMap.l).toEqual(['-left'])
    expect(directionMap.x).toEqual(['-inline'])
    expect(directionMap.y).toEqual(['-block'])
    expect(directionMap.block).toEqual(['-block-start', '-block-end'])
    expect(directionMap['']).toEqual([''])
  })
})

describe('insetMap', () => {
  it('overrides axial and logical inset directions', () => {
    expect(insetMap.x).toEqual(['-inset-inline'])
    expect(insetMap.y).toEqual(['-inset-block'])
    expect(insetMap.start).toEqual(['-inset-inline-start'])
    expect(insetMap.end).toEqual(['-inset-inline-end'])
  })
})

describe('cornerMap', () => {
  it('maps physical and logical corners', () => {
    expect(cornerMap.tl).toEqual(['-top-left'])
    expect(cornerMap.lt).toEqual(['-top-left'])
    expect(cornerMap.t).toEqual(['-top-left', '-top-right'])
    expect(cornerMap.ss).toEqual(['-start-start'])
    expect(cornerMap['bs-is']).toEqual(['-start-start'])
  })
})

describe('xyzMap', () => {
  it('maps xyz axes and defaults to x/y', () => {
    expect(xyzMap.x).toEqual(['-x'])
    expect(xyzMap.z).toEqual(['-z'])
    expect(xyzMap['']).toEqual(['-x', '-y'])
    expect(xyzArray).toEqual(['x', 'y', 'z'])
  })
})

describe('positionMap', () => {
  it('builds hyphenated and abbreviated position aliases', () => {
    expect(basePositionMap).toContain('top left')
    expect(positionMap['top-left']).toBe('top left')
    expect(positionMap.tl).toBe('top left')
    expect(positionMap.center).toBe('center')
    expect(positionMap.cc).toBe('center center')
  })
})

describe('globalKeywords', () => {
  it('lists css global keywords', () => {
    expect(globalKeywords).toEqual([
      'inherit',
      'initial',
      'revert',
      'revert-layer',
      'unset',
    ])
  })
})

describe('css function regexes', () => {
  it('matches css math functions', () => {
    expect(cssMathFnRE.test('calc(1px + 2px)')).toBe(true)
    expect(cssMathFnRE.test('clamp(1px, 2vw, 3rem)')).toBe(true)
    expect(cssMathFnRE.test('min(1px, 2px)')).toBe(true)
    expect(cssMathFnRE.test('max(1px, 2px)')).toBe(true)
    expect(cssMathFnRE.test('var(--x)')).toBe(false)
  })

  it('matches css var functions', () => {
    expect(cssVarFnRE.test('var(--foo)')).toBe(true)
    expect(cssVarFnRE.test('var(--foo, 1px)')).toBe(true)
    expect(cssVarFnRE.test('calc(1px + 2px)')).toBe(false)
  })
})
