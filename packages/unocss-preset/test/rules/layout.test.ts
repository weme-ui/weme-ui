import { describe, expect, it } from 'vitest'
import { overflows } from '~/rules/layout'
import { globalKeywords } from '~/utils/mappings'
import { matchRule } from './_utils'

const overflowValues = ['auto', 'hidden', 'clip', 'visible', 'scroll', 'overlay', ...globalKeywords]

describe('layout rules', () => {
  it('resolves overflow on both axes and each axis', () => {
    for (const value of overflowValues) {
      expect(matchRule(overflows, `overflow-${value}`)).toEqual({ overflow: value })
      expect(matchRule(overflows, `of-${value}`)).toEqual({ overflow: value })
      expect(matchRule(overflows, `overflow-x-${value}`)).toEqual({ 'overflow-x': value })
      expect(matchRule(overflows, `of-y-${value}`)).toEqual({ 'overflow-y': value })
    }
  })

  it('rejects unknown overflow values', () => {
    expect(matchRule(overflows, 'overflow-none')).toBeUndefined()
    expect(matchRule(overflows, 'of-x-none')).toBeUndefined()
  })
})
