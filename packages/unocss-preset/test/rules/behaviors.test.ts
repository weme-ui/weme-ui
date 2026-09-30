import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { accents, carets, outline } from '~/rules/behaviors'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const outlineRules = outline(options)
const accentRules = accents(options)
const caretRules = carets(options)

describe('behavior color rules', () => {
  it('resolves theme colors', () => {
    expectUtilities(outlineRules, {
      'outline-blue-9': { 'outline-color': 'var(--blue-9)' },
    })
    expectUtilities(accentRules, {
      'accent-blue-9': { 'accent-color': 'var(--blue-9)' },
    })
    expectUtilities(caretRules, {
      'caret-blue-9': { 'caret-color': 'var(--blue-9)' },
    })
  })

  it('resolves custom theme tokens', () => {
    expectUtilities(outlineRules, {
      'outline-foreground-base': { 'outline-color': 'var(--foreground-base)' },
      'outline-foreground-base/50': {
        'outline-color': 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
    })
    expectUtilities(accentRules, {
      'accent-background-elevated': { 'accent-color': 'var(--background-elevated)' },
    })
    expectUtilities(caretRules, {
      'caret-foreground-muted': { 'caret-color': 'var(--foreground-muted)' },
    })
  })

  it('resolves css vars with border-color for outline and color for accent/caret', () => {
    const colorOnly = resolveOptions({
      cssVars: {
        card: {
          text: 'foreground.base',
          border: 'border.base',
        },
      },
    })

    expectUtilities(outline(colorOnly), {
      'outline-card': { 'outline-color': 'var(--card-border)' },
      'outline-card/40': {
        'outline-color': 'color-mix(in oklab, var(--card-border) 40%, transparent)',
      },
    })
    expectUtilities(outlineRules, {
      'outline-color-card': { 'outline-color': 'var(--card-border)' },
    })
    expectUtilities(accents(colorOnly), {
      'accent-card': { 'accent-color': 'var(--card-text)' },
    })
    expectUtilities(carets(colorOnly), {
      'caret-card': { 'caret-color': 'var(--card-text)' },
    })
  })

  it('prefers theme colors and tokens over overlapping css vars', () => {
    const overlapped = resolveOptions({
      cssVars: {
        'blue-9': {
          text: 'foreground.base',
          border: 'border.base',
        },
        'foreground-base': {
          text: 'primary.9',
          border: 'border.elevated',
        },
      },
    })

    expectUtilities(outline(overlapped), {
      'outline-blue-9': { 'outline-color': 'var(--blue-9)' },
      'outline-foreground-base': { 'outline-color': 'var(--foreground-base)' },
    })
    expectUtilities(accents(overlapped), {
      'accent-blue-9': { 'accent-color': 'var(--blue-9)' },
      'accent-foreground-base': { 'accent-color': 'var(--foreground-base)' },
    })
    expectUtilities(carets(overlapped), {
      'caret-blue-9': { 'caret-color': 'var(--blue-9)' },
      'caret-foreground-base': { 'caret-color': 'var(--foreground-base)' },
    })
  })

  it('rejects unmatched colors', () => {
    expect(matchRule(outlineRules, 'outline-panel')).toBeUndefined()
    expect(matchRule(accentRules, 'accent-panel')).toBeUndefined()
    expect(matchRule(caretRules, 'caret-panel')).toBeUndefined()
  })
})

describe('outline size rules', () => {
  it('resolves custom css vars through the border-width fuzzy map', () => {
    expectUtilities(outlineRules, {
      'outline-card': {
        'outline-style': 'var(--un-outline-style)',
        'outline-width': 'var(--card-border-width)',
      },
      'outline-width-card': {
        'outline-style': 'var(--un-outline-style)',
        'outline-width': 'var(--card-border-width)',
      },
    })
  })
})
