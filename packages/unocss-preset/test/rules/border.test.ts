import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { borders } from '~/rules/border'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = borders(options)

describe('border color rules', () => {
  it('resolves theme colors', () => {
    expectUtilities(rules, {
      'border-blue-9': { 'border-color': 'var(--blue-9)' },
      'border-t-blue-9': {
        'border-top-color': 'var(--blue-9)',
        '--un-border-top-opacity': 'var(--un-border-opacity)',
      },
    })
  })

  it('resolves custom theme tokens', () => {
    expectUtilities(rules, {
      'border-foreground-base': { 'border-color': 'var(--foreground-base)' },
      'border-border-elevated': { 'border-color': 'var(--border-elevated)' },
      'border-elevated': { 'border-color': 'var(--border-elevated)' },
      'border-base': { 'border-color': 'var(--border-base)' },
      'border-foreground-base/50': {
        'border-color': 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
      'border-t-foreground-base': {
        'border-top-color': 'var(--foreground-base)',
        '--un-border-top-opacity': 'var(--un-border-opacity)',
      },
      'border-t-elevated': {
        'border-top-color': 'var(--border-elevated)',
        '--un-border-top-opacity': 'var(--un-border-opacity)',
      },
    })
  })

  it('does not shorthand cross-group tokens under border', () => {
    expect(matchRule(rules, 'border-highlighted')).toBeUndefined()
    expect(matchRule(rules, 'border-muted')).toBeUndefined()
  })

  it('resolves custom css vars through the border-color fuzzy map', () => {
    const colorOnly = borders(resolveOptions({
      cssVars: {
        card: {
          border: 'border.base',
        },
      },
    }))

    expectUtilities(colorOnly, {
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

describe('border size rules', () => {
  it('resolves custom css vars through the size fuzzy map', () => {
    expectUtilities(rules, {
      'border-card': { 'border-width': 'var(--card-border-width)' },
      'border-width-card': { 'border-width': 'var(--card-border-width)' },
      'border-t-card': { 'border-top-width': 'var(--card-border-width)' },
      'border-x-card': { 'border-inline-width': 'var(--card-border-width)' },
    })
  })
})
