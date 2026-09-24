import { describe, expect, it } from 'vitest'
import { h, handler, valueHandlers } from '~/utils/handlers'

describe('handlers index', () => {
  it('exposes the composed value handler and raw handlers', () => {
    expect(handler).toBe(h)
    expect(h.rem('4')).toBe('1rem')
    expect(h.px('4')).toBe('4px')
    expect(valueHandlers.rem('4')).toBe('1rem')
    expect(valueHandlers.fraction('1/2')).toBe('50%')
  })
})
