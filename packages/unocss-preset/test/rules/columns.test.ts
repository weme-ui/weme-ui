import { describe, expect, it } from 'vitest'
import { columns } from '~/rules/columns'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

const breakBefore = ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column']
const breakInside = ['auto', 'avoid', 'avoid-page', 'avoid-column']
const breakAfter = ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column']

describe('column rules', () => {
  it('resolves column counts from numbers, theme and arbitrary values', () => {
    expectUtilities(columns, {
      'columns-3': { columns: 3 },
      'columns-sm': { columns: 'var(--container-sm)' },
      'columns-auto': { columns: 'auto' },
      'columns-[200px]': { columns: '200px' },
      'columns-$count': { columns: 'var(--count)' },
      'columns-': undefined,
    })
  })

  it('resolves break-before, break-inside and break-after', () => {
    for (const value of [...breakBefore, ...globalKeywords])
      expect(matchRule(columns, `break-before-${value}`)).toEqual({ 'break-before': value })
    for (const value of [...breakInside, ...globalKeywords])
      expect(matchRule(columns, `break-inside-${value}`)).toEqual({ 'break-inside': value })
    for (const value of [...breakAfter, ...globalKeywords])
      expect(matchRule(columns, `break-after-${value}`)).toEqual({ 'break-after': value })

    expect(matchRule(columns, 'break-before-middle')).toBeUndefined()
    expect(matchRule(columns, 'break-inside-page')).toBeUndefined()
  })
})
