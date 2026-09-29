import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { fonts, textShadows, textStrokes } from '~/rules/typography'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

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
      'text-foreground-base/50': {
        color: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
      'c-foreground-muted': { color: 'var(--foreground-muted)' },
      'color-background-elevated': { color: 'var(--background-elevated)' },
    })
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
          text: 'primary.9',
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
