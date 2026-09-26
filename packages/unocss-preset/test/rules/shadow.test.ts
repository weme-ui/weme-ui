import { describe, expect, it } from 'vitest'
import { boxShadows } from '~/rules/shadow'
import { expectUtilities, matchRule } from './_utils'

describe('shadow rules', () => {
  it('resolves theme shadows, colors and inset shadows', () => {
    expectUtilities(boxShadows, {
      'shadow': {
        'box-shadow': 'var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
        '--un-shadow': '0 0 0 1px var(--un-shadow-color, rgb(0 0 0 / 0.06)),0 2px 3px -2px var(--un-shadow-color, rgb(0 0 0 / 0.06)),0 3px 12px -4px var(--un-shadow-color, rgba(0, 0, 0, 0.1)),0 4px 16px -8px var(--un-shadow-color, rgba(0, 0, 0, 0.1))',
      },
      'shadow-sm': {
        '--un-shadow': '0 0 0 1px var(--un-shadow-color, rgb(0 0 0 / 0.06)),0 2px 3px -2px var(--un-shadow-color, rgb(0 0 0 / 0.06)),0 3px 12px -4px var(--un-shadow-color, rgba(0, 0, 0, 0.1)),0 4px 16px -8px var(--un-shadow-color, rgba(0, 0, 0, 0.1))',
      },
      'shadow-none': {
        '--un-shadow': '0 0 var(--un-shadow-color, rgb(0 0 0 / 0))',
      },
      'shadow-blue-9': {
        '--un-shadow-color': 'var(--blue-9)',
      },
      'shadow-op-40': { '--un-shadow-opacity': '40%' },
      'inset-shadow-xs': {
        '--un-inset-shadow': 'inset 0 1px 1px var(--un-inset-shadow-color, rgb(0 0 0 / 0.05))',
      },
      'inset-shadow-none': {
        '--un-inset-shadow': '0 0 var(--un-inset-shadow-color, rgb(0 0 0 / 0))',
      },
      'inset-shadow-op-20': { '--un-inset-shadow-opacity': '20%' },
    })
  })

  it('rejects unknown shadow names that are not colors', () => {
    expect(matchRule(boxShadows, 'shadow-missing')).toBeUndefined()
    expect(matchRule(boxShadows, 'inset-shadow-giant')).toBeUndefined()
  })
})
