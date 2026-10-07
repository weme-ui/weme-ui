import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { divides } from '~/rules/divide'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = divides(options)

describe('divide rules', () => {
  it('resolves theme colors', () => {
    expectUtilities(rules, {
      'divide-blue-9': { 'border-color': 'var(--blue-9)' },
    })
  })

  it('resolves custom theme tokens', () => {
    expectUtilities(rules, {
      'divide-foreground-base': { 'border-color': 'var(--foreground-base)' },
      'divide-border-elevated': { 'border-color': 'var(--border-elevated)' },
      'divide-elevated': { 'border-color': 'var(--border-elevated)' },
      'divide-base': { 'border-color': 'var(--border-base)' },
      'divide-foreground-base/50': {
        'border-color': 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
    })
  })

  it('does not shorthand cross-group tokens under divide', () => {
    expect(matchRule(rules, 'divide-highlighted')).toBeUndefined()
    expect(matchRule(rules, 'divide-muted')).toBeUndefined()
  })

  it('resolves custom css vars through the border-color fuzzy map', () => {
    expectUtilities(rules, {
      'divide-card': { 'border-color': 'var(--card-border)' },
      'divide-card/40': {
        'border-color': 'color-mix(in oklab, var(--card-border) 40%, transparent)',
      },
    })
  })

  it('prefers theme colors and tokens over overlapping css vars', () => {
    const withOverlap = divides(resolveOptions({
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
      'divide-blue-9': { 'border-color': 'var(--blue-9)' },
      'divide-foreground-base': { 'border-color': 'var(--foreground-base)' },
    })
  })

  it('rejects unmatched divide colors', () => {
    expect(matchRule(rules, 'divide-panel')).toBeUndefined()
  })
})
