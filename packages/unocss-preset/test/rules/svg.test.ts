import { describe, expect, it } from 'vitest'
import { svgUtilities } from '~/rules/svg'
import { expectUtilities, matchRule } from './_utils'

describe('svg rules', () => {
  it('resolves fill, stroke, line cap and line join', () => {
    expectUtilities(svgUtilities, {
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

  it('rejects unknown svg values', () => {
    expect(matchRule(svgUtilities, 'fill-not-a-color')).toBeUndefined()
    expect(matchRule(svgUtilities, 'stroke-cap-butt')).toBeUndefined()
  })
})
