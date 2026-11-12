import { describe, expect, it } from 'vitest'
import { colors } from '../../src/theme'

describe('theme colors', () => {
  it('should return the default colors', () => {
    const themeColors = colors()

    expect(themeColors).toHaveProperty('black')
    expect(themeColors).toHaveProperty('black-auto')
  })

  it('should return the custom colors', () => {
    const themeColors = colors({
      accent: {
        zinc: 'oklch(27.9% 0.041 260.031)',
      },
      neutral: {
        foo: 'oklch(27.9% 0.041 260.031)',
      },
    })

    expect(themeColors).toHaveProperty('zinc')
    expect(themeColors).toHaveProperty('foo')
    expect(themeColors.zinc).not.toEqual(themeColors.foo)
  })
})
