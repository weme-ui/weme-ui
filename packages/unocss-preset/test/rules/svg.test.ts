import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { svgUtilities } from '~/rules/svg'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = svgUtilities(options)

describe('svg rules', () => {
  it('resolves theme colors and local stroke aliases', () => {
    expectUtilities(rules, {
      'fill-blue-9': { fill: 'var(--blue-9)' },
      'stroke-blue-9': { stroke: 'var(--blue-9)' },
      'stroke-cap-auto': { 'stroke-linecap': 'butt' },
      'stroke-join-auto': { 'stroke-linejoin': 'miter' },
      'stroke-join-arcs': { 'stroke-linejoin': 'arcs' },
      'stroke-join-clip': { 'stroke-linejoin': 'miter-clip' },
    })
  })

  it('resolves custom theme tokens', () => {
    expectUtilities(rules, {
      'fill-foreground-base': { fill: 'var(--foreground-base)' },
      'fill-foreground-base/50': {
        fill: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
      'stroke-foreground-base': { stroke: 'var(--foreground-base)' },
      'stroke-foreground-base/50': {
        stroke: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
      },
    })
  })

  it('resolves custom css vars through fill and border-color fuzzy maps', () => {
    expectUtilities(rules, {
      'fill-card': { fill: 'var(--card-background)' },
      'fill-card/40': {
        fill: 'color-mix(in oklab, var(--card-background) 40%, transparent)',
      },
      'stroke-card': { stroke: 'var(--card-border)' },
      'stroke-card/40': {
        stroke: 'color-mix(in oklab, var(--card-border) 40%, transparent)',
      },
    })
  })

  it('prefers theme colors and tokens over overlapping css vars', () => {
    const withOverlap = svgUtilities(resolveOptions({
      cssVars: {
        ...cssVars,
        'blue-9': {
          fill: 'background.base',
          border: 'border.base',
        },
        'foreground-base': {
          fill: 'background.muted',
          border: 'border.elevated',
        },
      },
    }))

    expectUtilities(withOverlap, {
      'fill-blue-9': { fill: 'var(--blue-9)' },
      'fill-foreground-base': { fill: 'var(--foreground-base)' },
      'stroke-blue-9': { stroke: 'var(--blue-9)' },
      'stroke-foreground-base': { stroke: 'var(--foreground-base)' },
    })
  })

  it('rejects unmatched svg colors and non-alias stroke caps', () => {
    expect(matchRule(rules, 'fill-panel')).toBeUndefined()
    expect(matchRule(rules, 'stroke-panel')).toBeUndefined()
    expect(matchRule(rules, 'stroke-cap-butt')).toBeUndefined()
  })
})
