import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { borderStyles } from '~/rules/border'
import { divides } from '~/rules/divide'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = divides(options)

describe('divide rules', () => {
  it('resolves axis width, reverse, color and style', () => {
    expectUtilities(rules, {
      'divide-x': {
        '--un-divide-x-reverse': 0,
        'border-left-width': 'calc(1px * var(--un-divide-x-reverse))',
        'border-right-width': 'calc(1px * calc(1 - var(--un-divide-x-reverse)))',
        'border-left-style': 'var(--un-border-style)',
        'border-right-style': 'var(--un-border-style)',
      },
      'divide-y-2': {
        '--un-divide-y-reverse': 0,
        'border-top-width': 'calc(2px * var(--un-divide-y-reverse))',
        'border-bottom-width': 'calc(2px * calc(1 - var(--un-divide-y-reverse)))',
      },
      'divide-x-reverse': { '--un-divide-x-reverse': '1' },
      'divide-blue-9': {
        'border-color': 'var(--blue-9)',
      },
      'divide-op-30': { '--un-divide-opacity': '30%' },
      'divide-dashed': { 'border-style': 'dashed' },
    })

    for (const style of borderStyles)
      expect(matchRule(rules, `divide-${style}`), style).toBeDefined()
  })

  it('resolves custom theme tokens', () => {
    expectUtilities(rules, {
      'divide-foreground-base': { 'border-color': 'var(--foreground-base)' },
      'divide-foreground-base/50': {
        'border-color': 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
    })
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

  it('rejects unknown divide values', () => {
    expect(matchRule(rules, 'divide-z')).toBeUndefined()
    expect(matchRule(rules, 'divide-not-a-color')).toBeUndefined()
    expect(matchRule(rules, 'divide-panel')).toBeUndefined()
  })
})
