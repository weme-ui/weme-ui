import { describe, expect, it } from 'vitest'
import { isThemeToken, parseColorAlias } from '../../src/custom'

describe('custom utils', () => {
  it('should parse color alias', () => {
    const parsed = parseColorAlias(['accent', '12'])

    expect(parsed).toMatchInlineSnapshot(`
      {
        "color": "var(--accent-12)",
        "keys": [
          "accent",
          "12",
        ],
        "no": "12",
      }
    `)
  })

  it('should check if token is theme token', () => {
    const cases = [
      'highlighted',
      'default',
      'subtle',
      'muted',
      'inverted',
      'elevated',
      'text-highlighted',
      'text-default',
      'text-subtle',
      'text-muted',
      'text-inverted',
      'bg-default',
      'bg-muted',
      'bg-subtle',
      'bg-inverted',
      'border-default',
      'border-elevated',
      'border-inverted',
    ]

    cases.forEach((token) => {
      expect(isThemeToken(token)).toBe(true)
    })
  })
})
