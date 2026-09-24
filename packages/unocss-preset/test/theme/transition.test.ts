import { describe, expect, it } from 'vitest'
import { ease, property } from '~/theme/transition'

describe('ease', () => {
  it('exposes the standard easing curves', () => {
    expect(ease).toEqual({
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
    })
  })
})

describe('property', () => {
  it('composes transition property groups', () => {
    expect(property.none).toBe('none')
    expect(property.all).toBe('all')
    expect(property.colors).toContain('background-color')
    expect(property.opacity).toBe('opacity')
    expect(property.shadow).toBe('box-shadow')
    expect(property.transform).toContain('translate')
    expect(property.DEFAULT).toContain(property.colors)
    expect(property.DEFAULT).toContain('backdrop-filter')
  })
})
