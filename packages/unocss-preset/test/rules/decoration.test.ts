import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { textDecorations } from '~/rules/decoration'
import { globalKeywords } from '~/utils/mappings'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = textDecorations(options)
const decorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy', ...globalKeywords]

describe('decoration rules', () => {
  it('resolves line, thickness, color, offset and style', () => {
    expectUtilities(rules, {
      'underline': { 'text-decoration-line': 'underline' },
      'overline': { 'text-decoration-line': 'overline' },
      'line-through': { 'text-decoration-line': 'line-through' },
      'decoration-2': { 'text-decoration-thickness': '2px' },
      'underline-auto': { 'text-decoration-thickness': 'auto' },
      'decoration-from-font': { 'text-decoration-thickness': 'from-font' },
      'underline-blue-9': {
        'text-decoration-color': 'var(--blue-9)',
        '-webkit-text-decoration-color': 'var(--blue-9)',
      },
      'decoration-op-40': { '--un-line-opacity': '40%' },
      'underline-offset-2': { 'text-underline-offset': '2px' },
      'underline-offset-auto': { 'text-underline-offset': 'auto' },
      'no-underline': { 'text-decoration': 'none' },
      'decoration-none': { 'text-decoration': 'none' },
    })

    for (const style of decorationStyles.filter(style => !globalKeywords.includes(style))) {
      expect(matchRule(rules, `underline-${style}`)).toEqual({ 'text-decoration-style': style })
      expect(matchRule(rules, `decoration-${style}`)).toEqual({ 'text-decoration-style': style })
    }
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

  it('rejects unknown decoration values', () => {
    expect(matchRule(rules, 'decoration-groove')).toBeUndefined()
    expect(matchRule(rules, 'underline-offset-')).toBeUndefined()
    expect(matchRule(rules, 'decoration-panel')).toBeUndefined()
    expect(matchRule(rules, 'underline-panel')).toBeUndefined()
  })
})
