import { describe, expect, it } from 'vitest'
import { rings } from '~/rules/ring'
import { expectUtilities, matchRule } from './_utils'

describe('ring rules', () => {
  it('resolves ring, inset ring, offset and color', () => {
    expectUtilities(rings, {
      'ring': {
        '--un-ring-shadow': 'var(--un-ring-inset,) 0 0 0 calc(1px + var(--un-ring-offset-width)) var(--un-ring-color, currentColor)',
        'box-shadow': 'var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
      },
      'ring-2': {
        '--un-ring-shadow': 'var(--un-ring-inset,) 0 0 0 calc(2px + var(--un-ring-offset-width)) var(--un-ring-color, currentColor)',
      },
      'ring-blue-9': {
        '--un-ring-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-ring-opacity), transparent)',
      },
      'ring-op-40': { '--un-ring-opacity': '40%' },
      'inset-ring': {
        '--un-inset-ring-shadow': 'inset 0 0 0 1px var(--un-inset-ring-color, currentColor)',
      },
      'inset-ring-blue-9': {
        '--un-inset-ring-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-inset-ring-opacity), transparent)',
      },
      'inset-ring-opacity-10': { '--un-inset-ring-opacity': '10%' },
      'ring-offset': {
        '--un-ring-offset-width': '1px',
        '--un-ring-offset-shadow': 'var(--un-ring-inset,) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)',
      },
      'ring-offset-4': { '--un-ring-offset-width': '4px' },
      'ring-offset-blue-9': {
        '--un-ring-offset-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-ring-offset-opacity), transparent)',
      },
      'ring-offset-op-20': { '--un-ring-offset-opacity': '20%' },
      'ring-inset': { '--un-ring-inset': 'inset' },
    })
  })

  it('rejects ring widths that are not lengths', () => {
    expect(matchRule(rings, 'ring-wide')).toBeUndefined()
  })
})
