import { describe, expect, it } from 'vitest'
import { borderStyles } from '~/rules/border'
import { gapRules, gaps } from '~/rules/gap'
import { globalKeywords } from '~/utils/mappings'
import { css, expectUtilities, matchRule } from './_utils'

describe('gap rules', () => {
  it('resolves gap and directional gap', () => {
    expectUtilities(gaps, {
      'gap-4': { gap: 'calc(var(--spacing) * 4)' },
      'gap-sm': { gap: 'var(--spacing-sm)' },
      'gap-x-2': { 'column-gap': 'calc(var(--spacing) * 2)' },
      'gap-y-sm': { 'row-gap': 'var(--spacing-sm)' },
      'gap-col-1': { 'column-gap': 'calc(var(--spacing) * 1)' },
      'gap-row-3': { 'row-gap': 'calc(var(--spacing) * 3)' },
      'flex-gap-2': { gap: 'calc(var(--spacing) * 2)' },
      'grid-gap-x-8': { 'column-gap': 'calc(var(--spacing) * 8)' },
      'gap-[10px]': { gap: '10px' },
    })
  })

  it('resolves css rule shorthand, size, color, opacity and style', () => {
    expectUtilities(gapRules, {
      'rule-1': { 'rule-width': '1px' },
      'rule-x-4': { 'row-rule-width': '4px' },
      'rule-col-2': { 'column-rule-width': '2px' },
      'rule-solid': { 'rule-style': 'solid' },
      'rule-y-dashed': { 'column-rule-style': 'dashed' },
      'rule-op-50': { '--un-rule-opacity': '50%' },
      'rule-x-opacity-25': { '--un-row-rule-opacity': '25%' },
      'rule-blue-9': { 'rule-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-rule-opacity), transparent)' },
      'rule-break-normal': { 'rule-break': 'normal' },
      'rule-x-break-none': { 'row-rule-break': 'none' },
      'rule-visibility-between': { 'rule-visibility-items': 'between' },
      'rule-inset-4': { 'rule-inset': '4px' },
      'rule-inset-cap-start-2': { 'rule-inset-cap-start': '2px' },
      'rule-overlap-row': { 'rule-overlap': 'row-over-column' },
      'rule-overlap-column': { 'rule-overlap': 'column-over-row' },
    })

    for (const style of borderStyles.filter(style => !globalKeywords.includes(style)))
      expect(css(matchRule(gapRules, `rule-${style}`)), style).toMatchObject({ 'rule-style': style })
  })

  it('rejects unknown rule values', () => {
    expect(matchRule(gapRules, 'rule-not-a-style')).toBeUndefined()
    expect(matchRule(gapRules, 'rule-break-always')).toBeUndefined()
    expect(matchRule(gaps, 'gap-')).toBeUndefined()
  })
})
