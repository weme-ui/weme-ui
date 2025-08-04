import { describe, expect, it } from 'vitest'
import { createColorCompoundVariants, createColorVariantClasses, createColorVariants } from '../.nuxt/weme/weme.style'

describe('weme.style', () => {
  it('should resolved color variant classes', () => {
    [
      { color: 'accent', variant: 'solid', states: 'normal', expected: ['ui-accent'] },
      { color: 'accent', variant: 'soft', states: 'normal', expected: ['ui-accent-soft'] },
      { color: 'accent', variant: 'solid', states: 'hover', expected: ['ui-accent-hover'] },
      { color: 'accent', variant: 'surface', states: 'active', expected: ['ui-accent-surface-active'] },
    ].forEach(({ color, variant, states, expected }) => {
      expect(createColorVariantClasses({ color, variant, states } as any)).toEqual(expected)
    })
  })

  it('should resolved color variants', () => {
    expect(createColorVariants({ variant: 'solid', states: 'normal' })).toMatchSnapshot()
    expect(createColorVariants({ variant: 'solid', states: 'normal', slot: 'base' })).toMatchSnapshot()
    expect(createColorVariants({ variant: 'solid', states: ['normal', 'hover', 'active'] })).toMatchSnapshot()
    expect(createColorVariants({ variant: 'solid', states: ['normal', 'hover', 'active'], slot: 'base' })).toMatchSnapshot()
    expect(createColorVariants({ defaults: '' })).toMatchSnapshot()
    expect(createColorVariants({ defaults: '', slot: 'base' })).toMatchSnapshot()
  })

  it('should resolved color compound variants', () => {
    expect(createColorCompoundVariants({ variants: 'solid', states: 'normal' })).toMatchSnapshot()
    expect(createColorCompoundVariants({ variants: 'solid', states: 'normal', slot: 'base' })).toMatchSnapshot()
    expect(createColorCompoundVariants({ variants: ['solid', 'soft', 'surface'], states: ['normal'] })).toMatchSnapshot()
    expect(createColorCompoundVariants({ variants: ['solid', 'soft', 'surface'], states: ['normal'], slot: 'base' })).toMatchSnapshot()
  })
})
