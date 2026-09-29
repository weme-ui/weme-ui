import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { svgUtilities } from '~/rules/svg'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = svgUtilities(options)

describe('svg rules', () => {
  it('resolves fill, stroke, line cap and line join', () => {
    expectUtilities(rules, {
      'fill-none': { fill: 'none' },
      'fill-blue-9': { fill: 'var(--blue-9)' },
      'fill-op-40': { '--un-fill-opacity': '40%' },
      'stroke-none': { stroke: 'none' },
      'stroke-2': { 'stroke-width': '2px' },
      'stroke-blue-9': { stroke: 'var(--blue-9)' },
      'stroke-opacity-25': { '--un-stroke-opacity': '25%' },
      'stroke-dash-4': { 'stroke-dasharray': 4 },
      'stroke-offset-2': { 'stroke-dashoffset': '2px' },
      'stroke-cap-square': { 'stroke-linecap': 'square' },
      'stroke-cap-round': { 'stroke-linecap': 'round' },
      'stroke-cap-auto': { 'stroke-linecap': 'butt' },
      'stroke-join-arcs': { 'stroke-linejoin': 'arcs' },
      'stroke-join-bevel': { 'stroke-linejoin': 'bevel' },
      'stroke-join-clip': { 'stroke-linejoin': 'miter-clip' },
      'stroke-join-round': { 'stroke-linejoin': 'round' },
      'stroke-join-auto': { 'stroke-linejoin': 'miter' },
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

  it('rejects unknown svg values', () => {
    expect(matchRule(rules, 'fill-not-a-color')).toBeUndefined()
    expect(matchRule(rules, 'fill-panel')).toBeUndefined()
    expect(matchRule(rules, 'stroke-panel')).toBeUndefined()
    expect(matchRule(rules, 'stroke-cap-butt')).toBeUndefined()
  })
})
