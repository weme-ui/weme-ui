import { describe, expect, it } from 'vitest'
import { animateInOutShortcuts, animateModifiers } from '~/rules/animate'
import { animations } from '~/rules/animation'
import { createRuleContext, css, expectUtilities, matchRule } from './_utils'

function matchShortcut(matcher: string) {
  const context = createRuleContext()
  for (const shortcut of animateInOutShortcuts) {
    const [pattern, body] = shortcut
    if (typeof pattern === 'string') {
      if (pattern !== matcher)
        continue
      return typeof body === 'function' ? body([matcher] as unknown as RegExpMatchArray, context) : body
    }
    const match = matcher.match(pattern)
    if (!match)
      continue
    const result = typeof body === 'function' ? body(match, context) : body
    if (result)
      return result
  }
}

describe('animate enter/exit modifiers', () => {
  it('resolves fade / zoom / spin defaults and values', () => {
    expectUtilities(animateModifiers, {
      'fade-in': { '--un-enter-opacity': '0%' },
      'fade-in-50': { '--un-enter-opacity': '50%' },
      'fade-out': { '--un-exit-opacity': '0%' },
      'fade-out-25': { '--un-exit-opacity': '25%' },
      'zoom-in': { '--un-enter-scale': '0%' },
      'zoom-in-50': { '--un-enter-scale': '50%' },
      'zoom-out': { '--un-exit-scale': '0%' },
      'zoom-out-75': { '--un-exit-scale': '75%' },
      'spin-in': { '--un-enter-rotate': '30deg' },
      'spin-in-90': { '--un-enter-rotate': '90deg' },
      'spin-out': { '--un-exit-rotate': '30deg' },
      'spin-out-45': { '--un-exit-rotate': '45deg' },
    })
  })

  it('resolves slide-in-from and slide-out-to directions', () => {
    expectUtilities(animateModifiers, {
      'slide-in-from-top': { '--un-enter-translate-y': '-100%' },
      'slide-in-from-bottom': { '--un-enter-translate-y': '100%' },
      'slide-in-from-left': { '--un-enter-translate-x': '-100%' },
      'slide-in-from-right': { '--un-enter-translate-x': '100%' },
      'slide-in-from-top-8': { '--un-enter-translate-y': 'calc(var(--spacing) * 8 * -1)' },
      'slide-out-to-left': { '--un-exit-translate-x': '-100%' },
      'slide-out-to-top-8': { '--un-exit-translate-y': 'calc(var(--spacing) * 8 * -1)' },
    })
  })

  it('does not match negative zoom/spin or rtl start/end slides', () => {
    expectUtilities(animateModifiers, {
      '-zoom-in-50': undefined,
      '-spin-in-30': undefined,
      'slide-in-from-start': undefined,
      'slide-out-to-end': undefined,
    })
  })
})

describe('animate-in / animate-out shortcuts', () => {
  it('expands animate-in to keyframes-un-enter and animation longhands', () => {
    const result = matchShortcut('animate-in')
    expect(result).toBeTruthy()
    expect(result).toContain('keyframes-un-enter')
    expect(result).toContain('__un-animate-enter')

    const styles = css(result)
    expect(styles).toMatchObject({
      'animation-name': 'un-enter',
      'animation-duration': 'var(--un-animation-duration, 150ms)',
      'animation-timing-function': 'var(--un-animation-ease, ease)',
      'animation-delay': 'var(--un-animation-delay, 0s)',
      'animation-iteration-count': 'var(--un-animation-iteration-count, 1)',
      'animation-direction': 'var(--un-animation-direction, normal)',
      'animation-fill-mode': 'var(--un-animation-fill-mode, none)',
    })
  })

  it('expands animate-out to keyframes-un-exit', () => {
    const result = matchShortcut('animate-out')
    expect(result).toBeTruthy()
    expect(result).toContain('keyframes-un-exit')
    expect(result).toContain('__un-animate-exit')

    const styles = css(result)
    expect(styles).toMatchObject({
      'animation-name': 'un-exit',
    })
  })

  it('keeps animate-in off the theme catch-all path', () => {
    // Without shortcut, catch-all looks up keyframe "in" and yields nothing useful.
    // Real usage goes through animateInOutShortcuts instead.
    expect(matchRule(animations, 'animate-in')).toBeUndefined()
  })
})

describe('animation parameter dual-write', () => {
  it('dual-writes duration / delay / ease to --un-animation-*', () => {
    expectUtilities(animations, {
      'animate-duration-300': {
        'animation-duration': '300ms',
        '--un-animation-duration': '300ms',
      },
      'animate-delay-150': {
        'animation-delay': '150ms',
        '--un-animation-delay': '150ms',
      },
    })

    const ease = matchRule(animations, 'animate-ease-in')
    const styles = css(ease)
    expect(styles['animation-timing-function']).toBeTruthy()
    expect(styles['--un-animation-ease']).toBe(styles['animation-timing-function'])
  })

  it('still resolves classic theme keyframes like animate-fade-in', () => {
    const result = matchRule(animations, 'animate-fade-in')
    expect(result).toBeTruthy()
    const entries = Array.isArray(result) ? result : [result]
    expect(entries.some(item => typeof item === 'string' && item.includes('@keyframes fade-in'))).toBe(true)
    expect(css(result).animation).toMatch(/^fade-in /)
  })
})
