import { describe, expect, it } from 'vitest'
import { textAligns, verticalAligns } from '~/rules/align'
import { globalKeywords } from '~/utils/mappings'
import { matchRule } from './_utils'

const verticalAlignAlias: Record<string, string> = {
  'mid': 'middle',
  'base': 'baseline',
  'btm': 'bottom',
  'baseline': 'baseline',
  'top': 'top',
  'start': 'top',
  'middle': 'middle',
  'bottom': 'bottom',
  'end': 'bottom',
  'text-top': 'text-top',
  'text-bottom': 'text-bottom',
  'sub': 'sub',
  'super': 'super',
  ...Object.fromEntries(globalKeywords.map(keyword => [keyword, keyword])),
}

const textAlignValues = ['center', 'left', 'right', 'justify', 'start', 'end']
const verticalPrefixes = ['vertical', 'align', 'v'] as const

describe('align rules', () => {
  it('resolves vertical-align aliases from official targets', () => {
    expect(matchRule(verticalAligns, 'vertical-baseline')).toEqual({ 'vertical-align': 'baseline' })
    expect(matchRule(verticalAligns, 'vertical-super')).toEqual({ 'vertical-align': 'super' })
    expect(matchRule(verticalAligns, 'vertical-inherit')).toEqual({ 'vertical-align': 'inherit' })
    expect(matchRule(verticalAligns, 'align-text-bottom')).toEqual({ 'vertical-align': 'text-bottom' })
    expect(matchRule(verticalAligns, 'align-revert')).toEqual({ 'vertical-align': 'revert' })
    expect(matchRule(verticalAligns, 'align-start')).toEqual({ 'vertical-align': 'top' })
    expect(matchRule(verticalAligns, 'v-top')).toEqual({ 'vertical-align': 'top' })
    expect(matchRule(verticalAligns, 'v-mid')).toEqual({ 'vertical-align': 'middle' })
    expect(matchRule(verticalAligns, 'v-unset')).toEqual({ 'vertical-align': 'unset' })
    expect(matchRule(verticalAligns, 'v-end')).toEqual({ 'vertical-align': 'bottom' })
  })

  it('resolves every vertical-align alias for all prefixes', () => {
    for (const [alias, value] of Object.entries(verticalAlignAlias)) {
      for (const prefix of verticalPrefixes) {
        expect(matchRule(verticalAligns, `${prefix}-${alias}`), `${prefix}-${alias}`).toEqual({
          'vertical-align': value,
        })
      }
    }
  })

  it('resolves vertical-align arbitrary, cssvar and unit values', () => {
    expect(matchRule(verticalAligns, 'v-1.25em')).toEqual({ 'vertical-align': '1.25em' })
    expect(matchRule(verticalAligns, 'v-50%')).toEqual({ 'vertical-align': '50%' })
    expect(matchRule(verticalAligns, 'v-10px')).toEqual({ 'vertical-align': '10px' })
    expect(matchRule(verticalAligns, 'v-2rem')).toEqual({ 'vertical-align': '2rem' })
    expect(matchRule(verticalAligns, 'v--2px')).toEqual({ 'vertical-align': '-2px' })
    expect(matchRule(verticalAligns, 'align-[2px]')).toEqual({ 'vertical-align': '2px' })
    expect(matchRule(verticalAligns, 'vertical-[length:2px]')).toEqual({ 'vertical-align': '2px' })
    expect(matchRule(verticalAligns, 'align-[calc(1px+2px)]')).toEqual({ 'vertical-align': 'calc(1px + 2px)' })
    expect(matchRule(verticalAligns, 'align-[--spacing.md]')).toEqual({ 'vertical-align': 'var(--spacing-md)' })
    expect(matchRule(verticalAligns, 'align-[--variable]')).toEqual({ 'vertical-align': 'var(--variable)' })
    expect(matchRule(verticalAligns, 'align-[var(--variable)]')).toEqual({ 'vertical-align': 'var(--variable)' })
    expect(matchRule(verticalAligns, 'align-$variable')).toEqual({ 'vertical-align': 'var(--variable)' })
    expect(matchRule(verticalAligns, 'align---offset')).toEqual({ 'vertical-align': 'var(--offset)' })
    expect(matchRule(verticalAligns, 'align-$foo,10px')).toEqual({ 'vertical-align': 'var(--foo, 10px)' })
  })

  it('rejects unknown vertical-align values', () => {
    expect(matchRule(verticalAligns, 'v-random')).toBeUndefined()
    expect(matchRule(verticalAligns, 'v-foo-100%')).toBeUndefined()
    expect(matchRule(verticalAligns, 'vertical-x-100%')).toBeUndefined()
    expect(matchRule(verticalAligns, 'v-4')).toBeUndefined()
    expect(matchRule(verticalAligns, 'align-[]')).toBeUndefined()
  })

  it('exposes vertical-align autocomplete hints', () => {
    const meta = verticalAligns[0]?.[2] as { autocomplete?: string[] } | undefined

    expect(meta?.autocomplete).toEqual([
      `(vertical|align|v)-(${Object.keys(verticalAlignAlias).join('|')})`,
      '(vertical|align|v)-<percentage>',
    ])
  })

  it('resolves every text-align utility', () => {
    for (const value of textAlignValues)
      expect(matchRule(textAligns, `text-${value}`)).toEqual({ 'text-align': value })

    for (const value of [...globalKeywords, ...textAlignValues])
      expect(matchRule(textAligns, `text-align-${value}`)).toEqual({ 'text-align': value })
  })

  it('rejects unknown text-align utilities', () => {
    expect(matchRule(textAligns, 'text-middle')).toBeUndefined()
    expect(matchRule(textAligns, 'text-align-middle')).toBeUndefined()
    expect(matchRule(textAligns, 'text-foo')).toBeUndefined()
    expect(matchRule(textAligns, 'text-align-foo')).toBeUndefined()
  })
})
