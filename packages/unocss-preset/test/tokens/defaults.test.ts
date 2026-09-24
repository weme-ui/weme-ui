import { describe, expect, it } from 'vitest'
import {
  DEFAULT_COLORS,
  DEFAULT_NAME,
  DEFAULT_RADIUS,
  DEFAULT_SCALING,
  DEFAULT_TOKENS,
} from '~/tokens/defaults'

describe('default name, scaling and radius', () => {
  it('exposes the default theme identity tokens', () => {
    expect(DEFAULT_NAME).toBe('default')
    expect(DEFAULT_SCALING).toBe('100%')
    expect(DEFAULT_RADIUS).toBe('md')
  })
})

describe('default colors', () => {
  it('maps semantic roles to accent and neutral color names', () => {
    expect(DEFAULT_COLORS).toEqual({
      primary: 'gunmetal',
      secondary: 'clay',
      neutral: 'iron',
      success: 'green',
      info: 'blue',
      warning: 'orange',
      error: 'red',
    })
  })

  it('covers every semantic color role', () => {
    expect(Object.keys(DEFAULT_COLORS).sort()).toEqual([
      'error',
      'info',
      'neutral',
      'primary',
      'secondary',
      'success',
      'warning',
    ])
  })
})

describe('default tokens', () => {
  it('exposes text, background and border semantic tokens', () => {
    expect(DEFAULT_TOKENS).toEqual({
      text: {
        highlighted: 'neutral.12',
        base: 'neutral.11',
        subtle: 'neutral.6',
        muted: 'neutral.4',
        inverted: 'neutral.1',
      },
      background: {
        base: 'neutral.1',
        muted: 'neutral.2',
        elevated: 'neutral.3',
        inverted: 'neutral.12',
      },
      border: {
        base: 'neutral.5',
        elevated: 'neutral.6',
        inverted: 'neutral.12',
      },
    })
  })

  it('references semantic color roles with scale steps', () => {
    const values = [
      ...Object.values(DEFAULT_TOKENS.text),
      ...Object.values(DEFAULT_TOKENS.background),
      ...Object.values(DEFAULT_TOKENS.border),
    ]

    for (const value of values) {
      expect(value).toMatch(/^(neutral|primary|secondary|success|info|warning|error)\.\d+$/)
    }
  })
})
