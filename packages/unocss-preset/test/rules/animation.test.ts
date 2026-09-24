import { describe, expect, it } from 'vitest'
import { animations } from '~/rules/animation'
import { animation } from '~/theme/animation'
import { css, expectUtilities, matchRule } from './_utils'

describe('animation rules', () => {
  it('expands theme keyframes into animation shorthand', () => {
    const spin = matchRule(animations, 'animate-spin') as [string, Record<string, unknown>]

    expect(spin[0]).toBe(`@keyframes spin${animation.keyframes.spin}`)
    expect(css(spin)).toEqual({ animation: 'spin 1s linear infinite' })
    expect(css(matchRule(animations, 'animate-bounce'))).toEqual({ animation: 'bounce 1s linear infinite' })
    expect(css(matchRule(animations, 'keyframes-spin'))).toEqual({ animation: 'spin' })
  })

  it('resolves timing, fill, direction, count and play state', () => {
    expectUtilities(animations, {
      'animate-duration-150': { 'animation-duration': '150ms' },
      'animate-delay-75': { 'animation-delay': '75ms' },
      'animate-ease': { 'animation-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)' },
      'animate-ease-in': { 'animation-timing-function': 'cubic-bezier(0.4, 0, 1, 1)' },
      'animate-forwards': { 'animation-fill-mode': 'forwards' },
      'animate-fill-both': { 'animation-fill-mode': 'both' },
      'animate-reverse': { 'animation-direction': 'reverse' },
      'animate-direction-alternate': { 'animation-direction': 'alternate' },
      'animate-count-infinite': { 'animation-iteration-count': 'infinite' },
      'animate-iteration-2-3': { 'animation-iteration-count': '2,3' },
      'animate-paused': { 'animation-play-state': 'paused' },
      'animate-play-running': { 'animation-play-state': 'running' },
      'animate-name-[slide]': { 'animation-name': 'slide' },
      'animate-[spin_1s_linear]': { animation: 'spin 1s linear' },
    })
  })

  it('treats animate-none as a fill mode because that rule is matched first', () => {
    expect(css(matchRule(animations, 'animate-none'))).toEqual({ 'animation-fill-mode': 'none' })
  })

  it('rejects unknown animation fragments', () => {
    expect(matchRule(animations, 'animate-duration-foo')).toBeUndefined()
    expect(matchRule(animations, 'keyframes-missing')).toBeUndefined()
  })
})
