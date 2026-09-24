import { describe, expect, it } from 'vitest'
import { variantAria, variantTaggedAriaAttributes } from '~/variants/aria'
import { variantDataAttribute, variantTaggedDataAttributes } from '~/variants/data'
import { applyHandle, createContext, matchVariant } from './_utils'

describe('variantAria', () => {
  it('matches theme aria aliases', () => {
    const result = matchVariant(variantAria, 'aria-busy:flex')

    expect(result.matcher).toBe('flex')
    expect(result.selector('.x')).toBe('.x[aria-busy="true"]')
  })

  it('matches arbitrary aria attributes', () => {
    const result = matchVariant(variantAria, 'aria-[expanded=false]:flex')

    expect(result.matcher).toBe('flex')
    expect(result.selector('.x')).toBe('.x[aria-expanded=false]')
  })

  it('ignores unknown aria aliases', () => {
    expect(matchVariant(variantAria, 'aria-unknown:flex')).toBeUndefined()
  })
})

describe('variantTaggedAriaAttributes', () => {
  it('matches group and peer aria variants', () => {
    const [group, peer] = variantTaggedAriaAttributes

    expect(applyHandle(matchVariant(group, 'group-aria-busy:flex'))).toMatchObject({
      parent: '.x',
      selector: '&:is(:where(.group)[aria-busy="true"] *)',
    })
    expect(applyHandle(matchVariant(peer, 'peer-aria-busy:flex'))).toMatchObject({
      parent: '.x',
      selector: '&:is(:where(.peer)[aria-busy="true"] ~ *)',
    })
  })
})

describe('variantDataAttribute', () => {
  it('matches data attributes from theme and brackets', () => {
    const ctx = createContext({ data: { checked: 'state=checked' } })

    expect(matchVariant(variantDataAttribute, 'data-checked:flex', ctx).selector('.x')).toBe('.x[data-state=checked]')
    expect(matchVariant(variantDataAttribute, 'data-[state=open]:flex', ctx).selector('.x')).toBe('.x[data-state=open]')
  })
})

describe('variantTaggedDataAttributes', () => {
  it('matches labelled group data variants', () => {
    const [group] = variantTaggedDataAttributes
    const result = matchVariant(group, 'group-data-checked/sidebar:flex', createContext({ data: { checked: 'state=checked' } }))

    expect(applyHandle(result)).toMatchObject({
      parent: '.x',
      selector: '&:is(:where(.group\\/sidebar)[data-state=checked] *)',
    })
  })
})
