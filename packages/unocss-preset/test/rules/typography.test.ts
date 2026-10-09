import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { fonts, textShadows, textStrokes } from '~/rules/typography'
import { cssVars } from '../../uno.config'
import { css, expectUtilities, matchAllRules, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const fontRules = fonts(options)

describe('typography rules', () => {
  it('resolves theme colors', () => {
    expectUtilities(fontRules, {
      'text-blue': { color: 'var(--blue-9)' },
      'text-blue-9': { color: 'var(--blue-9)' },
      'c-blue-9': { color: 'var(--blue-9)' },
    })
    expectUtilities(textStrokes, {
      'text-stroke-blue': { '-webkit-text-stroke-color': 'var(--blue-9)' },
      'text-stroke-blue-9': { '-webkit-text-stroke-color': 'var(--blue-9)' },
    })
    expectUtilities(textShadows, {
      'text-shadow-blue': { '--un-text-shadow-color': 'var(--blue-9)' },
      'text-shadow-blue-9': { '--un-text-shadow-color': 'var(--blue-9)' },
    })
  })

  it('resolves custom theme tokens', () => {
    expectUtilities(fontRules, {
      'text-foreground-base': { color: 'var(--foreground-base)' },
      'text-foreground': { color: 'var(--foreground-base)' },
      'text-foreground/50': {
        color: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
      'text-foreground-base/50': {
        color: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
      'text-highlighted': { color: 'var(--foreground-highlighted)' },
      'text-color-base': { color: 'var(--foreground-base)' },
      'c-foreground': { color: 'var(--foreground-base)' },
      'c-foreground-muted': { color: 'var(--foreground-muted)' },
      'c-muted': { color: 'var(--foreground-muted)' },
      'c-base': { color: 'var(--foreground-base)' },
      'color-background-elevated': { color: 'var(--background-elevated)' },
    })
  })

  it('keeps text-base as font-size and never emits foreground color', () => {
    expectUtilities(fontRules, {
      'text-base': {
        'font-size': 'var(--text-base-fontSize)',
        'line-height': 'var(--un-leading, var(--text-base-lineHeight))',
      },
    })

    for (const utility of ['text-base', 'text-base/50'] as const) {
      const results = matchAllRules(fontRules, utility)
      expect(results.length, utility).toBeGreaterThan(0)
      for (const result of results)
        expect(css(result), utility).not.toHaveProperty('color', 'var(--foreground-base)')
    }
  })

  it('does not shorthand cross-group tokens under text/c', () => {
    expect(matchRule(fontRules, 'c-elevated')).toBeUndefined()
    expect(matchRule(fontRules, 'color-elevated')).toBeUndefined()
  })

  it('resolves custom css vars through the color fuzzy map', () => {
    expectUtilities(fontRules, {
      'text-card': { color: 'var(--card-text)' },
      'text-card/40': {
        color: 'color-mix(in oklab, var(--card-text) 40%, transparent)',
      },
      'c-card': { color: 'var(--card-text)' },
      'color-card': { color: 'var(--card-text)' },
    })
  })

  it('prefers theme colors and tokens over overlapping css vars', () => {
    const withOverlap = fonts(resolveOptions({
      cssVars: {
        ...cssVars,
        'blue-9': {
          text: 'foreground.base',
        },
        'foreground-base': {
          text: 'accent.9',
        },
      },
    }))

    expectUtilities(withOverlap, {
      'text-blue-9': { color: 'var(--blue-9)' },
      'c-foreground-base': { color: 'var(--foreground-base)' },
    })
  })

  it('rejects unmatched text colors', () => {
    expect(matchRule(fontRules, 'text-panel')).toBeUndefined()
    expect(matchRule(fontRules, 'c-panel')).toBeUndefined()
    expect(matchRule(fontRules, 'color-panel')).toBeUndefined()
  })
})
