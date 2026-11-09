import { describe, expect, it } from 'vitest'
import {
  ACCENT_COLOR_NAMES,
  BACKGROUND_COLORS,
  generateRadixColor,
  NEUTRAL_COLOR_NAMES,
  RADIX_COLOR_NAMES,
  resolveColor,
} from '../src'

describe('public exports', () => {
  it('exposes color name lists, backgrounds, and the color functions', () => {
    expect(RADIX_COLOR_NAMES.length).toBeGreaterThan(0)
    expect(ACCENT_COLOR_NAMES.length).toBeGreaterThan(RADIX_COLOR_NAMES.length)
    expect(NEUTRAL_COLOR_NAMES).toContain('gray')
    expect(BACKGROUND_COLORS.light).toBe('#fff')
    expect(generateRadixColor).toEqual(expect.any(Function))
    expect(resolveColor).toEqual(expect.any(Function))
  })
})
