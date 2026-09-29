import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { textDecorations } from '~/rules/decoration'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = textDecorations(options)

describe('decoration rules', () => {
  it('resolves theme colors', () => {
    expectUtilities(rules, {
      'underline-blue-9': {
        'text-decoration-color': 'var(--blue-9)',
        '-webkit-text-decoration-color': 'var(--blue-9)',
      },
    })
  })

  it('resolves custom theme tokens', () => {
    expectUtilities(rules, {
      'underline-foreground-base': {
        'text-decoration-color': 'var(--foreground-base)',
        '-webkit-text-decoration-color': 'var(--foreground-base)',
      },
      'decoration-foreground-base/50': {
        'text-decoration-color': 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
        '-webkit-text-decoration-color': 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
    })
  })

  it('resolves custom css vars through the border-color fuzzy map', () => {
    expectUtilities(rules, {
      'underline-card': {
        'text-decoration-color': 'var(--card-border)',
        '-webkit-text-decoration-color': 'var(--card-border)',
      },
      'decoration-card/40': {
        'text-decoration-color': 'color-mix(in oklab, var(--card-border) 40%, transparent)',
        '-webkit-text-decoration-color': 'color-mix(in oklab, var(--card-border) 40%, transparent)',
      },
    })
  })

  it('prefers theme colors and tokens over overlapping css vars', () => {
    const withOverlap = textDecorations(resolveOptions({
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
      'underline-blue-9': {
        'text-decoration-color': 'var(--blue-9)',
        '-webkit-text-decoration-color': 'var(--blue-9)',
      },
      'decoration-foreground-base': {
        'text-decoration-color': 'var(--foreground-base)',
        '-webkit-text-decoration-color': 'var(--foreground-base)',
      },
    })
  })

  it('rejects unmatched decoration colors', () => {
    expect(matchRule(rules, 'decoration-panel')).toBeUndefined()
    expect(matchRule(rules, 'underline-panel')).toBeUndefined()
  })
})
