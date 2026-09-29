import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { borders } from '~/rules/border'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = borders(options)

describe('border color rules', () => {
  it('resolves custom theme tokens', () => {
    expectUtilities(rules, {
      'border-foreground-base': { 'border-color': 'var(--foreground-base)' },
      'border-foreground-base/50': {
        'border-color': 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
      'border-t-foreground-base': {
        'border-top-color': 'var(--foreground-base)',
        '--un-border-top-opacity': 'var(--un-border-opacity)',
      },
    })
  })

  it('resolves custom css vars through the border-color fuzzy map', () => {
    expectUtilities(rules, {
      'border-card': { 'border-color': 'var(--card-border)' },
      'border-card/40': {
        'border-color': 'color-mix(in oklab, var(--card-border) 40%, transparent)',
      },
      'border-x-card': {
        'border-inline-color': 'var(--card-border)',
        '--un-border-inline-opacity': 'var(--un-border-opacity)',
      },
    })
  })

  it('prefers theme colors and tokens over overlapping css vars', () => {
    const withOverlap = borders(resolveOptions({
      cssVars: {
        ...cssVars,
        'blue-9': {
          border: 'border.base',
        },
        'foreground-base': {
          border: 'border.elevated',
        },
      },
    }))

    expectUtilities(withOverlap, {
      'border-blue-9': { 'border-color': 'var(--blue-9)' },
      'border-foreground-base': { 'border-color': 'var(--foreground-base)' },
    })
  })

  it('rejects unmatched border colors', () => {
    expect(matchRule(rules, 'border-panel')).toBeUndefined()
    expect(matchRule(rules, 'border-t-panel')).toBeUndefined()
  })
})
