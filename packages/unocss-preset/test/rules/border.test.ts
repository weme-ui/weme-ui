import { describe, expect, it } from 'vitest'
import { borders, borderStyles } from '~/rules/border'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

describe('border rules', () => {
  it('resolves width, color, opacity and style', () => {
    expectUtilities(borders, {
      'border': { 'border-width': '1px' },
      'b-2': { 'border-width': '2px' },
      'border-x-4': { 'border-inline-width': '4px' },
      'border-t-width-3': { 'border-top-width': '3px' },
      'border-block-2': { 'border-block-start-width': '2px', 'border-block-end-width': '2px' },
      'border-blue-9': { 'border-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-border-opacity), transparent)' },
      'border-x-current': { 'border-inline-color': 'currentColor' },
      'border-op-50': { '--un-border-opacity': '50%' },
      'b-t-opacity-25': { '--un-border-top-opacity': '25%' },
      'border-solid': { '--un-border-style': 'solid', 'border-style': 'solid' },
      'border-y-dashed': { '--un-border-style': 'dashed', 'border-block-style': 'dashed' },
    })

    for (const style of borderStyles.filter(style => !globalKeywords.includes(style)))
      expect(matchRule(borders, `border-${style}`), style).toMatchObject([['--un-border-style', style], ['border-style', style]])
  })

  it('resolves radius from theme, full and arbitrary values', () => {
    expectUtilities(borders, {
      'rounded': { 'border-radius': 'var(--radius-DEFAULT)' },
      'rd-lg': { 'border-radius': 'var(--radius-lg)' },
      'rounded-full': { 'border-radius': 'calc(infinity * 1px)' },
      'rounded-t-md': { 'border-top-left-radius': 'var(--radius-md)', 'border-top-right-radius': 'var(--radius-md)' },
      'rounded-tl': { 'border-top-left-radius': 'var(--radius-DEFAULT)' },
      'b-rd-[10px]': { 'border-radius': '10px' },
      'rounded-none': { 'border-radius': 'var(--radius-none)' },
    })
  })

  it('rejects unknown border values', () => {
    expect(matchRule(borders, 'border-not-a-style')).toBeUndefined()
    expect(matchRule(borders, 'rounded-missing')).toBeUndefined()
  })
})
