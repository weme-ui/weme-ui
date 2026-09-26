import type { Theme } from '~/theme'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  detectThemeValue,
  generateThemeVariable,
  propertyTracking,
  themeTracking,
  trackedProperties,
  trackedTheme,
} from '~/utils/track'

describe('themeTracking', () => {
  beforeEach(() => {
    trackedTheme.clear()
  })

  it('tracks theme keys with DEFAULT by default', () => {
    themeTracking('spacing')

    expect([...trackedTheme]).toEqual(['spacing:DEFAULT'])
  })

  it('tracks nested theme paths and ignores duplicates', () => {
    themeTracking('colors', ['blue', '9'])
    themeTracking('colors', ['blue', '9'])
    themeTracking('colors', 'red')

    expect([...trackedTheme]).toEqual([
      'colors:blue-9',
      'colors:red',
    ])
  })
})

describe('generateThemeVariable', () => {
  it('builds css variables from theme key paths', () => {
    expect(generateThemeVariable('colors', ['blue', '9'])).toBe('var(--blue-9)')
    expect(generateThemeVariable('spacing', 'DEFAULT')).toBe('var(--spacing-DEFAULT)')
  })
})

describe('detectThemeValue', () => {
  beforeEach(() => {
    trackedTheme.clear()
  })

  it('tracks nested theme variables referenced by var()', () => {
    const theme = {
      colors: {
        brand: 'var(--colors-blue-9)',
        blue: {
          9: '#0090ff',
        },
      },
    } as unknown as Theme

    detectThemeValue('var(--colors-brand)', theme)

    expect([...trackedTheme]).toContain('colors:brand')
    expect([...trackedTheme]).toContain('colors:blue-9')
  })

  it('ignores non-var values and unknown theme paths', () => {
    detectThemeValue('#fff', { colors: {} })
    detectThemeValue('var(--missing-path)', { colors: {} })

    expect(trackedTheme.size).toBe(0)
  })
})

describe('propertyTracking', () => {
  beforeEach(() => {
    trackedProperties.clear()
  })

  it('stores the first value for each property', () => {
    propertyTracking('--un-text-opacity', '100%')
    propertyTracking('--un-text-opacity', '50%')
    propertyTracking('--un-border-opacity', '1')

    expect([...trackedProperties.entries()]).toEqual([
      ['--un-text-opacity', '100%'],
      ['--un-border-opacity', '1'],
    ])
  })
})
