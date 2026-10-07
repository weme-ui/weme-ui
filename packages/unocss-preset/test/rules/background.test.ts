import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { backgroundStyles } from '~/rules/background'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = backgroundStyles(options)

describe('background rules', () => {
  it('resolves theme colors in gradient stops', () => {
    expectUtilities(rules, {
      'from-blue-9': {
        '--un-gradient-from': 'color-mix(in oklab, var(--blue-9) var(--un-from-opacity), transparent)',
      },
    })
  })

  it('resolves custom theme tokens in gradient stops', () => {
    expectUtilities(rules, {
      'from-foreground-base': {
        '--un-gradient-from': 'color-mix(in oklab, var(--foreground-base) var(--un-from-opacity), transparent)',
      },
      'via-background-muted': {
        '--un-gradient-via': 'color-mix(in oklab, var(--background-muted) var(--un-via-opacity), transparent)',
      },
      'via-muted': {
        '--un-gradient-via': 'color-mix(in oklab, var(--background-muted) var(--un-via-opacity), transparent)',
      },
      'to-background-elevated': {
        '--un-gradient-to': 'color-mix(in oklab, var(--background-elevated) var(--un-to-opacity), transparent)',
      },
      'to-elevated': {
        '--un-gradient-to': 'color-mix(in oklab, var(--background-elevated) var(--un-to-opacity), transparent)',
      },
      'from-foreground-base/50': {
        '--un-from-opacity': '50%',
        '--un-gradient-from': 'color-mix(in oklab, var(--foreground-base) var(--un-from-opacity), transparent)',
      },
      'to-border-inverted/0': {
        '--un-to-opacity': '0%',
        '--un-gradient-to': 'color-mix(in oklab, var(--border-inverted) var(--un-to-opacity), transparent)',
      },
    })
  })

  it('does not shorthand cross-group tokens in gradient stops', () => {
    expect(matchRule(rules, 'from-highlighted')).toBeUndefined()
  })

  it('resolves custom css vars in gradient stops through the background-color fuzzy map', () => {
    expectUtilities(rules, {
      'from-card': {
        '--un-gradient-from': 'color-mix(in oklab, var(--card-background) var(--un-from-opacity), transparent)',
      },
      'via-card/40': {
        '--un-via-opacity': '40%',
        '--un-gradient-via': 'color-mix(in oklab, var(--card-background) var(--un-via-opacity), transparent)',
      },
    })
  })

  it('prefers theme colors and theme tokens over css vars', () => {
    const withOverlap = backgroundStyles(resolveOptions({
      cssVars: {
        ...cssVars,
        'blue-9': {
          background: 'background.base',
        },
        'foreground-base': {
          background: 'background.muted',
        },
      },
    }))

    expectUtilities(withOverlap, {
      'from-blue-9': {
        '--un-gradient-from': 'color-mix(in oklab, var(--blue-9) var(--un-from-opacity), transparent)',
      },
      'from-foreground-base': {
        '--un-gradient-from': 'color-mix(in oklab, var(--foreground-base) var(--un-from-opacity), transparent)',
      },
    })
  })

  it('rejects unmatched color stops', () => {
    expect(matchRule(rules, 'from-nope')).toBeUndefined()
    expect(matchRule(rules, 'from-panel')).toBeUndefined()
  })
})
