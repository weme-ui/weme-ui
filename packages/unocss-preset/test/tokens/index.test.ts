import { describe, expect, it } from 'vitest'
import * as tokens from '~/tokens'
import {
  DEFAULT_COLORS,
  DEFAULT_NAME,
  DEFAULT_RADIUS,
  DEFAULT_SCALING,
  DEFAULT_TOKENS,
} from '~/tokens/defaults'

describe('tokens index', () => {
  it('re-exports defaults', () => {
    expect(tokens.DEFAULT_NAME).toBe(DEFAULT_NAME)
    expect(tokens.DEFAULT_SCALING).toBe(DEFAULT_SCALING)
    expect(tokens.DEFAULT_RADIUS).toBe(DEFAULT_RADIUS)
    expect(tokens.DEFAULT_COLORS).toEqual(DEFAULT_COLORS)
    expect(tokens.DEFAULT_TOKENS).toEqual(DEFAULT_TOKENS)
  })
})
