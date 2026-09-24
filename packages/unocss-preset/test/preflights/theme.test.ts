import { beforeEach, describe, expect, it } from 'vitest'
import { theme as themePreflight } from '~/preflights/theme'
import { radius, spacing } from '~/theme/misc'
import { trackedTheme } from '~/utils/track'
import { createPreflightContext, resetTracking } from './_utils'

describe('theme preflight', () => {
  beforeEach(resetTracking)

  it('stays on the theme layer and emits nothing until tokens are used', () => {
    const preflight = themePreflight({})

    expect(preflight.layer).toBe('theme')
    expect(preflight.getCSS(createPreflightContext())).toBeUndefined()
  })

  it('can be disabled', () => {
    trackedTheme.add('radius:lg')

    expect(themePreflight({ preflights: { theme: false } }).getCSS(createPreflightContext())).toBeUndefined()
  })

  it('emits only tracked theme variables in on-demand mode', () => {
    trackedTheme.add('radius:lg')
    trackedTheme.add('spacing:DEFAULT')

    expect(themePreflight({ preflights: { theme: 'on-demand' } }).getCSS(createPreflightContext())).toBe(
      `:root, :host { --radius-lg: ${radius.lg}; --spacing: ${spacing.DEFAULT}; }`,
    )
  })

  it('tracks safelist theme keys before generating on-demand variables', () => {
    const css = themePreflight({}).getCSS(createPreflightContext({
      safelist: ['radius:sm', () => ['leading:tight']],
    }))

    expect(trackedTheme.has('radius:sm')).toBe(true)
    expect(trackedTheme.has('leading:tight')).toBe(true)
    expect(css).toContain('--radius-sm:')
    expect(css).toContain('--leading-tight:')
  })

  it('emits the full theme variable map when mode is enabled', () => {
    const css = themePreflight({ preflights: { theme: true } }).getCSS(createPreflightContext())

    expect(css).toContain('--spacing:')
    expect(css).toContain('--radius-lg:')
    expect(css).toContain('--font-sans:')
    expect(css).toContain('--colors-blue-9:')
    expect(css).not.toContain('--shadow-')
    expect(css).not.toContain('--breakpoint-')
    expect(css).not.toContain('--animation-')
  })

  it('lets process hooks rewrite entries before they are serialized', () => {
    trackedTheme.add('radius:md')

    const css = themePreflight({
      preflights: {
        theme: {
          mode: 'on-demand',
          process: (entry) => {
            entry[1] = 'rewritten'
          },
        },
      },
    }).getCSS(createPreflightContext())

    expect(css).toContain('--radius-md: rewritten;')
  })

  it('keeps whitespace in development', () => {
    trackedTheme.add('radius:none')

    const css = themePreflight({}).getCSS(createPreflightContext({ envMode: 'dev' }))

    expect(css).toContain(':root, :host {')
    expect(css).toContain(`--radius-none: ${radius.none};`)
  })
})
