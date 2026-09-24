import { describe, expect, it } from 'vitest'
import { margins, paddings, spaces } from '~/rules/spacing'
import { expectUtilities, matchRule } from './_utils'

describe('spacing rules', () => {
  it('resolves padding and margin directions', () => {
    expectUtilities(paddings, {
      'p-4': { padding: 'calc(var(--spacing) * 4)' },
      'px-sm': { 'padding-inline': 'var(--spacing-sm)' },
      'pt': { 'padding-top': 'calc(var(--spacing) * 4)' },
      'p-block-2': { 'padding-block-start': 'calc(var(--spacing) * 2)', 'padding-block-end': 'calc(var(--spacing) * 2)' },
      'pbs-1': { 'padding-block-start': 'calc(var(--spacing) * 1)' },
      'p-[10px]': { padding: '10px' },
    })
    expectUtilities(margins, {
      'm-4': { margin: 'calc(var(--spacing) * 4)' },
      'm--4': { margin: 'calc(var(--spacing) * -4)' },
      'm-auto': { margin: 'auto' },
      'mx-sm': { 'margin-inline': 'var(--spacing-sm)' },
      'm-inline-8': { 'margin-inline-start': 'calc(var(--spacing) * 8)', 'margin-inline-end': 'calc(var(--spacing) * 8)' },
    })
  })

  it('resolves space between children', () => {
    expectUtilities(spaces, {
      'space-x-4': {
        '--un-space-x-reverse': '0',
        'margin-inline-start': 'calc(calc(var(--spacing) * 4) * var(--un-space-x-reverse))',
        'margin-inline-end': 'calc(calc(var(--spacing) * 4) * calc(1 - var(--un-space-x-reverse)))',
      },
      'space-y-sm': {
        '--un-space-y-reverse': '0',
        'margin-block-start': 'calc(calc(0.5rem * var(--scaling)) * var(--un-space-y-reverse))',
        'margin-block-end': 'calc(calc(0.5rem * var(--scaling)) * calc(1 - var(--un-space-y-reverse)))',
      },
      'space-x-reverse': { '--un-space-x-reverse': '1' },
      'space-y-reverse': { '--un-space-y-reverse': '1' },
    })
    expect(matchRule(spaces, 'space-z-4')).toBeUndefined()
  })
})
