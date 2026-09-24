import { describe, expect, it } from 'vitest'
import { supports } from '~/theme/supports'

describe('supports', () => {
  it('exposes the grid support query', () => {
    expect(supports).toEqual({
      grid: '(display: grid)',
    })
  })
})
