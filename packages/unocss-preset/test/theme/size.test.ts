import { describe, expect, it } from 'vitest'
import { breakpoint, container, verticalBreakpoint } from '~/theme/size'

describe('container', () => {
  it('exposes named container widths including prose', () => {
    expect(container.xs).toBe('20rem')
    expect(container['7xl']).toBe('80rem')
    expect(container.prose).toBe('65ch')
  })
})

describe('breakpoint', () => {
  it('uses radix-themes inspired named breakpoints', () => {
    expect(breakpoint).toEqual({
      mobile: '520px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
      wide: '1640px',
    })
  })
})

describe('verticalBreakpoint', () => {
  it('mirrors the horizontal breakpoint scale', () => {
    expect(verticalBreakpoint).toEqual(breakpoint)
  })
})
