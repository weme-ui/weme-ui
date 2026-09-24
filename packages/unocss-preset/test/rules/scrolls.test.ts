import { describe, expect, it } from 'vitest'
import { scrolls } from '~/rules/scrolls'
import { expectUtilities, matchRule } from './_utils'

describe('scroll rules', () => {
  it('resolves scrollbar gutter and snap utilities', () => {
    expect(matchRule(scrolls, 'scrollbar-gutter-auto')).toEqual({ 'scrollbar-gutter': 'auto' })
    expect(matchRule(scrolls, 'scrollbar-gutter-stable')).toEqual({ 'scrollbar-gutter': 'stable' })
    expect(matchRule(scrolls, 'scrollbar-gutter-both')).toEqual({ 'scrollbar-gutter': 'stable both-edges' })

    expectUtilities(scrolls, {
      'snap-x': { 'scroll-snap-type': 'x var(--un-scroll-snap-strictness)' },
      'snap-y': { 'scroll-snap-type': 'y var(--un-scroll-snap-strictness)' },
      'snap-both': { 'scroll-snap-type': 'both var(--un-scroll-snap-strictness)' },
      'snap-mandatory': { '--un-scroll-snap-strictness': 'mandatory' },
      'snap-proximity': { '--un-scroll-snap-strictness': 'proximity' },
      'snap-none': { 'scroll-snap-type': 'none' },
      'snap-start': { 'scroll-snap-align': 'start' },
      'snap-end': { 'scroll-snap-align': 'end' },
      'snap-center': { 'scroll-snap-align': 'center' },
      'snap-align-none': { 'scroll-snap-align': 'none' },
      'snap-normal': { 'scroll-snap-stop': 'normal' },
      'snap-always': { 'scroll-snap-stop': 'always' },
    })
  })

  it('resolves scroll margin and padding', () => {
    expectUtilities(scrolls, {
      'scroll-m-4': { 'scroll-margin': 'calc(var(--spacing) * 4)' },
      'scroll-ma-sm': { 'scroll-margin': 'var(--spacing-sm)' },
      'scroll-mx-2': { 'scroll-margin-inline': 'calc(var(--spacing) * 2)' },
      'scroll-mt-1': { 'scroll-margin-top': 'calc(var(--spacing) * 1)' },
      'scroll-m-block-8': { 'scroll-margin-block-start': 'calc(var(--spacing) * 8)', 'scroll-margin-block-end': 'calc(var(--spacing) * 8)' },
      'scroll-p-4': { 'scroll-padding': 'calc(var(--spacing) * 4)' },
      'scroll-px-2': { 'scroll-padding-inline': 'calc(var(--spacing) * 2)' },
      'scroll-p-inline-sm': { 'scroll-padding-inline-start': 'var(--spacing-sm)', 'scroll-padding-inline-end': 'var(--spacing-sm)' },
    })
  })
})
