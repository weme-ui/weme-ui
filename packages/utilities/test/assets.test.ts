import { describe, it, expect } from 'vitest'
import {
  isRawColor,
  isThemeColorAliasName,
  isThemeTokenScope,
  isThemeToken,
  isCustomCssVariable,
} from '../src'

describe('assets', () => {
  const data = [
    'test',
    'test-bg',
    'test-border',
    'test-width',
    'test-height',
    'test-hover-bg',
    'test-hover',
  ]

  it('should be raw color', () => {
    const tests = [
      '#fff',
      'rgb(255, 255, 255)',
      'rgba(255, 255, 255, 1)',
      'hsl(0, 0%, 100%)',
      'hsla(0, 0%, 100%, 1)',
      'lab(100% 0 0)',
      'lch(100% 0 0)',
      'oklch(100% 0 0)',
      'color(display-p3 1 1 1)',
      'color(srgb 1 1 1)',
      'var(--color)',
    ]

    for (const test of tests) {
      expect(isRawColor(test)).toBe(true)
    }
  })

  it('should be theme color alias name', () => {
    const tests = [
      'accent',
      'neutral',
      'info',
      'success',
      'warning',
      'error',
      'accent/60',
      'neutral/60',
      'info/60',
      'success/60',
      'warning/60',
      'error/60',
    ]

    for (const test of tests) {
      expect(isThemeColorAliasName(test)).toBe(true)
    }
  })

  it('should be theme token name', () => {
    const tests = [
      'highlighted',
      'default',
      'muted',
      'subtle',
      'inverted',
      'text',
      'text-highlighted',
      'text-default',
      'text-muted',
      'text-subtle',
      'text-inverted',
      'bg',
      'bg-default',
      'bg-muted',
      'bg-elevated',
      'bg-inverted',
      'border',
      'border-default',
      'border-elevated',
      'border-inverted',
      'border-default/60',
      'border-elevated/60',
      'border-inverted/60',
    ]

    for (const test of tests) {
      expect(isThemeToken(test)).toBe(true)
    }
  })

  it('should be theme token scope', () => {
    const tests = ['text', 'bg', 'border', 'text/60', 'bg/60', 'border/60']

    for (const test of tests) {
      expect(isThemeTokenScope(test)).toBe(true)
    }
  })

  it('should be custom css variable', () => {
    const tests = [
      'test',
      'test-bg',
      'test-border',
      'test-width',
      'test-height',
      'test-bg/60',
      'test-border/60',
      'test-width/60',
      'test-height/60',
    ]

    for (const test of tests) {
      expect(isCustomCssVariable(test, data)).toBe(true)
    }
  })
})
