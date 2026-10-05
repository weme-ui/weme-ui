import { beforeEach, describe, expect, it } from 'vitest'
import { resolveRadixColorScales } from '~/colors'
import { resolveOptions } from '~/options'
import { custom as customPreflight } from '~/preflights/custom'
import { DEFAULT_COLOR_ALIASES, DEFAULT_NAME, DEFAULT_TOKENS } from '~/tokens'
import { trackedColorAliases, trackedTheme } from '~/utils/track'
import { createPreflightContext, resetTracking } from './_utils'

describe('custom preflight', () => {
  beforeEach(resetTracking)

  it('stays on the theme layer and emits default theme tokens', () => {
    const options = resolveOptions({})
    const preflight = customPreflight(options)

    expect(preflight?.layer).toBe('theme')

    const css = preflight?.getCSS(createPreflightContext())

    expect(css).toContain(`:root, :where([data-theme='${DEFAULT_NAME}'])`)
    expect(css).toContain('--foreground-base: var(--neutral-11)')
    expect(css).toContain('--background-base: var(--neutral-1)')
    expect(css).toContain('--border-base: var(--neutral-5)')
    expect(trackedTheme.has('colors:neutral-11')).toBe(true)
  })

  it('returns undefined when themes is empty', () => {
    expect(customPreflight({ ...resolveOptions({}), themes: [] })).toBeUndefined()
  })

  it('emits color aliases for tracked theme color names', () => {
    trackedColorAliases.add('primary:9')
    trackedColorAliases.add('error:1')

    const options = resolveOptions({
      themes: [{
        name: DEFAULT_NAME,
        colors: DEFAULT_COLOR_ALIASES,
        tokens: DEFAULT_TOKENS,
      }],
    })

    const css = customPreflight(options)?.getCSS(createPreflightContext())

    expect(css).toContain('--primary-9: var(--custom-primary-9, var(--clay-9))')
    expect(css).toContain('--error-1: var(--custom-error-1, var(--tomato-1))')
    expect(css).toContain(`.dark:where([data-theme='${DEFAULT_NAME}'])`)
    expect(trackedTheme.has('colors:clay-9')).toBe(true)
    expect(trackedTheme.has('colors:tomato-1')).toBe(true)
  })

  it('emits raw color aliases with light and dark scales', () => {
    trackedColorAliases.add('primary:9')

    const raw = '#3b82f6'
    const lightScales = resolveRadixColorScales({ color: raw, mode: 'light' })
    const darkScales = resolveRadixColorScales({ color: raw, mode: 'dark' })

    const options = resolveOptions({
      themes: [{
        name: DEFAULT_NAME,
        colors: {
          ...DEFAULT_COLOR_ALIASES,
          primary: raw,
        },
        tokens: DEFAULT_TOKENS,
      }],
    })

    const css = customPreflight(options)?.getCSS(createPreflightContext())

    expect(css).toContain(`--primary-9: var(--custom-primary-9, ${lightScales.p3[8]})`)
    expect(css).toContain(`--primary-9: var(--custom-primary-9, ${darkScales.p3[8]})`)
  })

  it('emits named theme selectors without :root', () => {
    trackedColorAliases.add('primary:9')

    const options = resolveOptions({
      themes: [{
        name: 'brand',
        colors: DEFAULT_COLOR_ALIASES,
        tokens: DEFAULT_TOKENS,
      }],
    })

    const css = customPreflight(options)?.getCSS(createPreflightContext())

    expect(css).toContain(':where([data-theme=\'brand\'])')
    expect(css).toContain('.dark:where([data-theme=\'brand\'])')
    expect(css).not.toContain(':root, :where([data-theme=\'brand\'])')
  })

  it('emits multiple themes', () => {
    const options = resolveOptions({
      themes: [
        {
          name: DEFAULT_NAME,
          colors: DEFAULT_COLOR_ALIASES,
          tokens: DEFAULT_TOKENS,
        },
        {
          name: 'brand',
          colors: {
            ...DEFAULT_COLOR_ALIASES,
            primary: 'blue',
          },
          tokens: DEFAULT_TOKENS,
        },
      ],
    })

    trackedColorAliases.add('primary:9')

    const css = customPreflight(options)?.getCSS(createPreflightContext())

    expect(css).toContain(`:root, :where([data-theme='${DEFAULT_NAME}'])`)
    expect(css).toContain(':where([data-theme=\'brand\'])')
    expect(css).toContain('--primary-9: var(--custom-primary-9, var(--clay-9))')
    expect(css).toContain('--primary-9: var(--custom-primary-9, var(--blue-9))')
  })

  it('emits global cssVars under :root', () => {
    const options = resolveOptions({
      cssVars: {
        brand: 'blue.9',
        card: {
          text: 'foreground.base',
        },
      },
    })

    const css = customPreflight(options)?.getCSS(createPreflightContext())

    expect(css).toContain(':root {')
    expect(css).toContain('--brand: var(--blue-9)')
    expect(css).toContain('--card-text: var(--foreground-base)')
    expect(trackedTheme.has('colors:blue-9')).toBe(true)
  })

  it('emits theme-local cssVars with theme tokens', () => {
    const options = resolveOptions({
      themes: [{
        name: 'brand',
        colors: DEFAULT_COLOR_ALIASES,
        tokens: DEFAULT_TOKENS,
        cssVars: {
          label: 'primary.9',
        },
      }],
    })

    const css = customPreflight(options)?.getCSS(createPreflightContext())

    expect(css).toContain(':where([data-theme=\'brand\'])')
    expect(css).toContain('--label: var(--primary-9)')
    expect(css).toContain('--foreground-base: var(--neutral-11)')
  })

  it('keeps whitespace in development', () => {
    trackedColorAliases.add('primary:9')

    const options = resolveOptions({})
    const css = customPreflight(options)?.getCSS(createPreflightContext({ envMode: 'dev' }))

    expect(css).toContain(`:root, :where([data-theme='${DEFAULT_NAME}']) {`)
    expect(css).toContain('--primary-9: var(--custom-primary-9, var(--clay-9));')
    expect(css).toContain('\n')
  })
})
