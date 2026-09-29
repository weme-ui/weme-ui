import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { placeholders } from '~/rules/placeholder'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = placeholders(options)

describe('placeholder rules', () => {
  it('resolves placeholder color and opacity from the internal prefix', () => {
    expectUtilities(rules, {
      '$ placeholder-blue-9': { color: 'var(--blue-9)' },
      '$ placeholder-current': { color: 'currentColor' },
      '$ placeholder-op-50': { '--un-placeholder-opacity': '50%' },
      '$ placeholder-opacity-20': { '--un-placeholder-opacity': '20%' },
      'placeholder-blue-9': undefined,
      '$ placeholder-not-a-color': undefined,
    })
  })

  it('resolves custom theme tokens', () => {
    expectUtilities(rules, {
      '$ placeholder-foreground-base': { color: 'var(--foreground-base)' },
      '$ placeholder-foreground-base/50': {
        color: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
    })
  })

  it('resolves custom css vars through the color fuzzy map', () => {
    expectUtilities(rules, {
      '$ placeholder-card': { color: 'var(--card-text)' },
      '$ placeholder-card/40': {
        color: 'color-mix(in oklab, var(--card-text) 40%, transparent)',
      },
    })
  })

  it('prefers theme colors and tokens over overlapping css vars', () => {
    const withOverlap = placeholders(resolveOptions({
      cssVars: {
        ...cssVars,
        'blue-9': {
          text: 'foreground.base',
        },
        'foreground-base': {
          text: 'primary.9',
        },
      },
    }))

    expectUtilities(withOverlap, {
      '$ placeholder-blue-9': { color: 'var(--blue-9)' },
      '$ placeholder-foreground-base': { color: 'var(--foreground-base)' },
    })
  })

  it('rejects unmatched placeholder colors', () => {
    expect(matchRule(rules, '$ placeholder-panel')).toBeUndefined()
  })
})
