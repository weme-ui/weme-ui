import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { bgColors } from '~/rules/color'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = bgColors(options)

describe('bg color rules', () => {
  it('resolves custom theme tokens', () => {
    expectUtilities(rules, {
      'bg-foreground-base': { 'background-color': 'var(--foreground-base)' },
      'bg-foreground': { 'background-color': 'var(--foreground-base)' },
      'bg-background-elevated': { 'background-color': 'var(--background-elevated)' },
      'bg-elevated': { 'background-color': 'var(--background-elevated)' },
      'bg-base': { 'background-color': 'var(--background-base)' },
      'bg-elevated/50': {
        'background-color': 'color-mix(in oklab, var(--background-elevated) 50%, transparent)',
      },
      'bg-foreground-base/50': {
        'background-color': 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
    })
  })

  it('does not shorthand cross-group tokens under bg', () => {
    expect(matchRule(rules, 'bg-highlighted')).toBeUndefined()
  })

  it('resolves custom css vars through the background-color fuzzy map', () => {
    expectUtilities(rules, {
      'bg-card': { 'background-color': 'var(--card-background)' },
      'bg-card/40': {
        'background-color': 'color-mix(in oklab, var(--card-background) 40%, transparent)',
      },
    })
  })

  it('prefers theme colors and tokens over overlapping css vars', () => {
    const withOverlap = bgColors(resolveOptions({
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
      'bg-blue-9': { 'background-color': 'var(--blue-9)' },
      'bg-foreground-base': { 'background-color': 'var(--foreground-base)' },
    })
  })

  it('rejects unmatched background colors', () => {
    expect(matchRule(rules, 'bg-panel')).toBeUndefined()
    expect(matchRule(rules, 'bg-not-a-color')).toBeUndefined()
  })
})
