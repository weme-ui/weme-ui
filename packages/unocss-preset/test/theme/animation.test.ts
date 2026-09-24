import { describe, expect, it } from 'vitest'
import { animation } from '~/theme/animation'

describe('animation', () => {
  it('includes core wind4 keyframes', () => {
    expect(animation.keyframes?.pulse).toContain('opacity')
    expect(animation.keyframes?.spin).toContain('rotate(360deg)')
    expect(animation.keyframes?.bounce).toContain('translateY')
    expect(animation.keyframes?.ping).toContain('scale(2)')
  })

  it('keeps keyframes, durations, timing and categories aligned', () => {
    const keyframeNames = Object.keys(animation.keyframes ?? {})
    const durationNames = Object.keys(animation.durations ?? {})
    const timingNames = Object.keys(animation.timingFns ?? {})
    const categoryNames = Object.keys(animation.category ?? {})

    expect(keyframeNames.length).toBeGreaterThan(20)
    expect(durationNames.every(name => keyframeNames.includes(name))).toBe(true)
    expect(timingNames.every(name => keyframeNames.includes(name))).toBe(true)
    expect(categoryNames.every(name => keyframeNames.includes(name))).toBe(true)
  })

  it('marks repeating animations with infinite counts', () => {
    expect(animation.counts?.pulse).toBe('infinite')
    expect(animation.counts?.spin).toBe('infinite')
    expect(animation.counts?.ping).toBe('infinite')
  })
})
