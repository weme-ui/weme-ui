import { describe, expect, it } from 'vitest'
import {
  DEFAULT_THEME,
  getCustomCSSVarVariable,
  isCustomCSSVar,
  parseCustomCSSVar,
} from '../../src/custom'
import { theme } from '../../src/theme'

describe('theme custom', () => {
  it('should get theme by key', () => {
    const myTheme = theme({
      themes: [
        {
          ...DEFAULT_THEME,
          cssVars: {
            test: {
              base: '#f00',
              default: '#f00',
              background: '#fff',
              color: '#fff',
            },
          },
        },
      ],
      cssVars: {
        test: {
          base: '#000',
          default: '#f00',
          background: '#000',
          color: '#fff',
        },
      },
    })

    expect(isCustomCSSVar('test', myTheme)).toBe(true)
    expect(isCustomCSSVar('test-bg', myTheme)).toBe(true)
    expect(isCustomCSSVar('test-base', myTheme)).toBe(true)
    expect(isCustomCSSVar('test-default', myTheme)).toBe(true)
    expect(isCustomCSSVar('test-background', myTheme)).toBe(true)
    expect(isCustomCSSVar('test-color', myTheme)).toBe(true)

    expect(parseCustomCSSVar('test', myTheme)).toMatchInlineSnapshot(`
      [
        "test",
        [
          "test",
          "test-bg",
        ],
      ]
    `)

    expect(isCustomCSSVar('test-missed', myTheme)).toBe(false)

    const matched = getCustomCSSVarVariable(['test', ['test', 'test-bg']], 'bg')
    expect(matched).toMatchInlineSnapshot(`"var(--test-bg)"`)
  })

  it('should get theme by key with invalid key', () => {
    const myTheme = theme({
      themes: [
        {
          ...DEFAULT_THEME,
          cssVars: {
            test: {
              base: '#f00',
            },
          },
        },
      ],
      cssVars: {
        test: {
          base: '#000',
        },
      },
    })

    expect(isCustomCSSVar('tes', myTheme)).toBe(false)
    expect(isCustomCSSVar('te', myTheme)).toBe(false)
    expect(isCustomCSSVar('t', myTheme)).toBe(false)
  })
})
