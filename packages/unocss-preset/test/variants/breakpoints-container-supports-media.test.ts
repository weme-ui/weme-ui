import { describe, expect, it } from 'vitest'
import { variantBreakpoints } from '~/variants/breakpoints'
import { variantContainerQuery } from '~/variants/container'
import { variantCustomMedia, variantScripting } from '~/variants/media'
import { variantSupports } from '~/variants/supports'
import { applyHandle, createContext } from './_utils'

describe('variantBreakpoints', () => {
  it('matches min, max and ranged breakpoints', () => {
    const variant = variantBreakpoints()
    const ctx = createContext()

    expect(applyHandle(variant.match?.('mobile:flex', ctx))).toMatchObject({
      parent: '@media (min-width: 520px)',
      parentOrder: 3001,
    })
    expect(applyHandle(variant.match?.('lt-tablet:flex', ctx))).toMatchObject({
      parent: '@media (max-width: 767.9px)',
      parentOrder: 2998,
    })
    expect(applyHandle(variant.match?.('at-tablet:flex', ctx))).toMatchObject({
      parent: '@media (min-width: 768px) and (max-width: 1023.9px)',
      parentOrder: 3002,
    })
  })

  it('matches arbitrary min/max width variants and skips container utility', () => {
    const variant = variantBreakpoints()
    const ctx = createContext()

    expect(applyHandle(variant.match?.('max-[42rem]:flex', ctx))).toMatchObject({
      parent: '@media (max-width: 42rem)',
    })
    expect(variant.match?.('mobile:container', ctx)).toBeUndefined()
  })
})

describe('variantContainerQuery', () => {
  it('matches theme and arbitrary container queries', () => {
    const ctx = createContext()

    expect(applyHandle(variantContainerQuery.match?.('@sm:flex', ctx))).toMatchObject({
      parent: '@container (min-width: 24rem)',
      parentOrder: 1003,
    })
    expect(applyHandle(variantContainerQuery.match?.('@[40rem]/sidebar:flex', ctx))).toMatchObject({
      parent: '@container sidebar (min-width: 40rem)',
      parentOrder: 1999,
    })
  })

  it('does not consume @container', () => {
    expect(variantContainerQuery.match?.('@container:flex', createContext())).toBeUndefined()
  })
})

describe('variantSupports', () => {
  it('normalizes named and arbitrary supports queries', () => {
    const ctx = createContext({ supports: { grid: '(display: grid)', subgrid: 'grid-template-columns' } })

    expect(applyHandle(variantSupports.match?.('supports-grid:flex', ctx))).toMatchObject({
      parent: '@supports (display: grid)',
    })
    expect(applyHandle(variantSupports.match?.('supports-subgrid:flex', ctx))).toMatchObject({
      parent: '@supports (grid-template-columns: var(--un))',
    })
    expect(applyHandle(variantSupports.match?.('supports-[display:grid_and_not(display:flex)]:flex', ctx))).toMatchObject({
      parent: '@supports (display:grid and not (display:flex))',
    })
  })
})

describe('media variants', () => {
  it('matches custom media and scripting variants', () => {
    const ctx = createContext()

    expect(applyHandle(variantCustomMedia.match?.('media-motion_not_ok:flex', ctx))).toMatchObject({
      parent: '@media (prefers-reduced-motion: reduce)',
    })
    expect(applyHandle(variantScripting.match?.('script-enabled:flex', ctx))).toMatchObject({
      parent: '@media (scripting: enabled)',
    })
  })
})
