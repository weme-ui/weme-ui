import { describe, expect, it } from 'vitest'
import { cssProperty, cssVariables } from '~/rules/variables'
import { expectUtilities, matchRule } from './_utils'

describe('variable rules', () => {
  it('maps abbreviated properties to css variables', () => {
    expectUtilities(cssVariables, {
      'fw-$weight': { 'font-weight': 'var(--weight)' },
      'select-$mode': { 'user-select': 'var(--mode)' },
      'bg-blend-$mode': { 'background-blend-mode': 'var(--mode)' },
      'write-$mode': { 'writing-mode': 'var(--mode)' },
      'vertical-$align': { 'vertical-align': 'var(--align)' },
      'unknown-$value': undefined,
    })
  })

  it('resolves arbitrary property declarations and rejects urls', () => {
    expect(matchRule(cssProperty, '[color:red]')).toEqual({ color: 'red' })
    expect(matchRule(cssProperty, '[padding:10px]')).toEqual({ padding: '10px' })
    expect(matchRule(cssProperty, '[content:attr(data-x)]')).toEqual({ content: 'attr(data-x)' })
    expect(matchRule(cssProperty, '[https://example.com]')).toBeUndefined()
    expect(matchRule(cssProperty, '[color]')).toBeUndefined()
    expect(matchRule(cssProperty, '[color:red:blue]')).toBeUndefined()
  })
})
