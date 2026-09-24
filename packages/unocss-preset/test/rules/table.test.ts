import { describe, expect, it } from 'vitest'
import { tables } from '~/rules/table'
import { expectUtilities, matchRule } from './_utils'

describe('table rules', () => {
  it('resolves table display and layout utilities', () => {
    const displays = [
      'inline-table',
      'table',
      'table-caption',
      'table-cell',
      'table-column',
      'table-column-group',
      'table-footer-group',
      'table-header-group',
      'table-row',
      'table-row-group',
    ]
    for (const value of displays)
      expect(matchRule(tables, value)).toEqual({ display: value })

    expect(matchRule(tables, 'border-collapse')).toEqual({ 'border-collapse': 'collapse' })
    expect(matchRule(tables, 'border-separate')).toEqual({ 'border-collapse': 'separate' })
    expect(matchRule(tables, 'caption-top')).toEqual({ 'caption-side': 'top' })
    expect(matchRule(tables, 'caption-bottom')).toEqual({ 'caption-side': 'bottom' })
    expect(matchRule(tables, 'table-auto')).toEqual({ 'table-layout': 'auto' })
    expect(matchRule(tables, 'table-fixed')).toEqual({ 'table-layout': 'fixed' })
    expect(matchRule(tables, 'table-empty-cells-visible')).toEqual({ 'empty-cells': 'show' })
    expect(matchRule(tables, 'table-empty-cells-hidden')).toEqual({ 'empty-cells': 'hide' })
  })

  it('resolves border spacing', () => {
    expectUtilities(tables, {
      'border-spacing-4': {
        '--un-border-spacing-x': 'calc(var(--spacing) * 4)',
        '--un-border-spacing-y': 'calc(var(--spacing) * 4)',
        'border-spacing': 'var(--un-border-spacing-x) var(--un-border-spacing-y)',
      },
      'border-spacing-x-sm': {
        '--un-border-spacing-x': 'calc(0.5rem * var(--scaling))',
        'border-spacing': 'var(--un-border-spacing-x) var(--un-border-spacing-y)',
      },
      'border-spacing-y-2': {
        '--un-border-spacing-y': 'calc(var(--spacing) * 2)',
      },
    })
  })
})
