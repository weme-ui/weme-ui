import { describe, expect, it } from 'vitest'
import { isThemeToken, parseThemeTokenVariable } from '../../src/custom'

describe('custom utils', () => {
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
      'bg-elevated',
      'bg-inverted',
      'border-default',
      'border-elevated',
      'border-inverted',
    ]

    cases.forEach((token) => {
      expect(isThemeToken(token)).toBe(true)
    })
  })

  it('should parse theme token variable', () => {
    const matches: [string[], string, string][] = [
      // text
      [['highlighted'], 'text', 'var(--text-highlighted)'], // text-highlighted
      [['default'], 'text', 'var(--text)'], // text-default
      [['subtle'], 'text', 'var(--text-subtle)'], // text-subtle
      [['muted'], 'text', 'var(--text-muted)'], // text-muted
      [['inverted'], 'text', 'var(--text-inverted)'], // text-inverted

      // text <- background
      [['bg'], 'text', 'var(--bg)'], // text-bg
      [['bg', 'default'], 'text', 'var(--bg)'], // text-bg-default
      [['bg', 'muted'], 'text', 'var(--bg-muted)'], // text-bg-muted
      [['bg', 'elevated'], 'text', 'var(--bg-elevated)'], // text-bg-elevated
      [['bg', 'inverted'], 'text', 'var(--bg-inverted)'], // text-bg-inverted

      // text <- border
      [['border'], 'text', 'var(--border)'], // text-border
      [['border', 'elevated'], 'text', 'var(--border-elevated)'], // text-border-elevated
      [['border', 'inverted'], 'text', 'var(--border-inverted)'], // text-border-inverted

      // background
      [['default'], 'bg', 'var(--bg)'], // bg-default
      [['muted'], 'bg', 'var(--bg-muted)'], // bg-muted
      [['elevated'], 'bg', 'var(--bg-elevated)'], // bg-elevated
      [['inverted'], 'bg', 'var(--bg-inverted)'], // bg-inverted

      // background <- text
      [['text'], 'bg', 'var(--text)'], // bg-text
      [['text', 'default'], 'bg', 'var(--text)'], // bg-text-default
      [['text', 'subtle'], 'bg', 'var(--text-subtle)'], // bg-text-subtle
      [['text', 'muted'], 'bg', 'var(--text-muted)'], // bg-text-muted
      [['text', 'inverted'], 'bg', 'var(--text-inverted)'], // bg-text-inverted
      [['text', 'highlighted'], 'bg', 'var(--text-highlighted)'], // bg-text-highlighted

      // background <- border
      [['border'], 'bg', 'var(--border)'], // bg-border
      [['border', 'default'], 'bg', 'var(--border)'], // bg-border-default
      [['border', 'elevated'], 'bg', 'var(--border-elevated)'], // bg-border-elevated
      [['border', 'inverted'], 'bg', 'var(--border-inverted)'], // bg-border-inverted

      // border
      [['default'], 'border', 'var(--border)'], // b-default
      [['elevated'], 'border', 'var(--border-elevated)'], // b-elevated
      [['inverted'], 'border', 'var(--border-inverted)'], // b-inverted

      // border <- text
      [['text'], 'border', 'var(--text)'], // border-text
      [['text', 'default'], 'border', 'var(--text)'], // border-text-default
      [['text', 'subtle'], 'border', 'var(--text-subtle)'], // border-text-subtle
      [['text', 'muted'], 'border', 'var(--text-muted)'], // border-text-muted
      [['text', 'inverted'], 'border', 'var(--text-inverted)'], // border-text-inverted
      [['text', 'highlighted'], 'border', 'var(--text-highlighted)'], // border-text-highlighted

      // border <- background
      [['bg'], 'border', 'var(--bg)'], // border-bg
      [['bg', 'default'], 'border', 'var(--bg)'], // border-bg-default
      [['bg', 'muted'], 'border', 'var(--bg-muted)'], // border-bg-muted
      [['bg', 'elevated'], 'border', 'var(--bg-elevated)'], // border-bg-elevated
      [['bg', 'inverted'], 'border', 'var(--bg-inverted)'], // border-bg-inverted
    ]

    matches.forEach(([tokens, varName, result]) => {
      expect(parseThemeTokenVariable(tokens, varName)).toBe(result)
    })
  })

  it('should return empty for invalid theme variable names.', () => {
    expect(parseThemeTokenVariable([''], '')).toBe('')
    expect(parseThemeTokenVariable(['highlighted'], 'bg')).toBe('')
    expect(parseThemeTokenVariable(['elevated'], 'text')).toBe('')
    expect(parseThemeTokenVariable(['highlighted'], 'border')).toBe('')
  })
})
