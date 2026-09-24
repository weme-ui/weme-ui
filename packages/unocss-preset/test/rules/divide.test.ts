import { describe, expect, it } from 'vitest'
import { borderStyles } from '~/rules/border'
import { divides } from '~/rules/divide'
import { expectUtilities, matchRule } from './_utils'

describe('divide rules', () => {
  it('resolves axis width, reverse, color and style', () => {
    expectUtilities(divides, {
      'divide-x': {
        '--un-divide-x-reverse': 0,
        'border-left-width': 'calc(1px * var(--un-divide-x-reverse))',
        'border-right-width': 'calc(1px * calc(1 - var(--un-divide-x-reverse)))',
        'border-left-style': 'var(--un-border-style)',
        'border-right-style': 'var(--un-border-style)',
      },
      'divide-y-2': {
        '--un-divide-y-reverse': 0,
        'border-top-width': 'calc(2px * var(--un-divide-y-reverse))',
        'border-bottom-width': 'calc(2px * calc(1 - var(--un-divide-y-reverse)))',
      },
      'divide-x-reverse': { '--un-divide-x-reverse': '1' },
      'divide-blue-9': {
        'border-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-divide-opacity), transparent)',
      },
      'divide-op-30': { '--un-divide-opacity': '30%' },
      'divide-dashed': { 'border-style': 'dashed' },
    })

    for (const style of borderStyles)
      expect(matchRule(divides, `divide-${style}`), style).toBeDefined()
  })

  it('rejects unknown divide values', () => {
    expect(matchRule(divides, 'divide-z')).toBeUndefined()
    expect(matchRule(divides, 'divide-not-a-color')).toBeUndefined()
  })
})
