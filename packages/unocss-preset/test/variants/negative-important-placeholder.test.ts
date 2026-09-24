import { describe, expect, it } from 'vitest'
import { CONTROL_NO_NEGATIVE } from '~/utils'
import { variantImportant } from '~/variants/important'
import { variantNegative } from '~/variants/negative'
import { placeholderModifier } from '~/variants/placeholder'
import { createContext, matchVariant } from './_utils'

describe('variantImportant', () => {
  it('marks prefix and suffix important utilities', () => {
    const prefixed = matchVariant(variantImportant(), '!m-1')
    const suffixed = matchVariant(variantImportant(), 'm-1!')

    expect(prefixed.matcher).toBe('m-1')
    expect(prefixed.body([['margin', '1rem']])).toEqual([['margin', '1rem !important']])
    expect(suffixed.matcher).toBe('m-1')
  })
})

describe('variantNegative', () => {
  it('negates numeric values and math functions', () => {
    const result = matchVariant(variantNegative, '-m-1')

    expect(result.matcher).toBe('m-1')
    expect(result.body([
      ['margin', '1rem'],
      ['translate', 'calc(100% - 1rem)'],
      ['filter', 'blur(1rem)'],
    ])).toEqual([
      ['margin', '-1rem'],
      ['translate', 'calc(calc(100% - 1rem) * -1)'],
      ['filter', 'blur(1rem)'],
    ])
  })

  it('does not negate protected entries or zero-like unchanged values', () => {
    const result = matchVariant(variantNegative, '-m-1')

    expect(result.body([[CONTROL_NO_NEGATIVE, ''], ['margin', '1rem']])).toBeUndefined()
    expect(result.body([['margin', '0']])).toEqual([])
    expect(result.body([['margin', '1rem', CONTROL_NO_NEGATIVE]])).toEqual([])
  })
})

describe('placeholderModifier', () => {
  it('rewrites placeholder color and opacity utilities', () => {
    const ctx = createContext()

    expect(placeholderModifier('placeholder-blue-9', ctx)).toEqual({
      matcher: 'placeholder-$ placeholder-blue-9',
    })
    expect(placeholderModifier('placeholder-opacity-50', ctx)).toEqual({
      matcher: 'placeholder-$ placeholder-opacity-50',
    })
  })

  it('ignores non-placeholder and non-color bodies', () => {
    const ctx = createContext()

    expect(placeholderModifier('text-blue-9', ctx)).toBeUndefined()
    expect(placeholderModifier('placeholder-not-a-color', ctx)).toBeUndefined()
  })
})
