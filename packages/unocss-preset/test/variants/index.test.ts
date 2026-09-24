import { describe, expect, it } from 'vitest'
import * as variantsEntry from '~/variants'
import { variants } from '~/variants/default'

describe('variants index', () => {
  it('exports the variants factory and individual modules', () => {
    expect(variantsEntry.variants).toBe(variants)
    expect(variantsEntry.variantAria).toBeDefined()
    expect(variantsEntry.variantBreakpoints).toBeDefined()
    expect(variantsEntry.variantNegative).toBeDefined()
    expect(variantsEntry.variantSupports).toBeDefined()
  })
})

describe('variants', () => {
  it('composes the preset variant list', () => {
    const list = variants({ dark: 'class' })
    const names = list.map((variant: any) => variant.name).filter(Boolean)

    expect(list.length).toBeGreaterThan(40)
    expect(names).toContain('aria')
    expect(names).toContain('data')
    expect(names).toContain('breakpoints')
    expect(names).toContain('negative')
    expect(names).toContain('important')
    expect(names).toContain('supports')
  })
})
