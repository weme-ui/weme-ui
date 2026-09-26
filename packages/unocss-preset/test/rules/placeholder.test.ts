import { describe, it } from 'vitest'
import { placeholders } from '~/rules/placeholder'
import { expectUtilities } from './_utils'

describe('placeholder rules', () => {
  it('resolves placeholder color and opacity from the internal prefix', () => {
    expectUtilities(placeholders, {
      '$ placeholder-blue-9': { color: 'var(--blue-9)' },
      '$ placeholder-current': { color: 'currentColor' },
      '$ placeholder-op-50': { '--un-placeholder-opacity': '50%' },
      '$ placeholder-opacity-20': { '--un-placeholder-opacity': '20%' },
      'placeholder-blue-9': undefined,
      '$ placeholder-not-a-color': undefined,
    })
  })
})
