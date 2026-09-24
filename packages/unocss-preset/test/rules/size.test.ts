import { describe, expect, it } from 'vitest'
import { aspectRatio, sizes } from '~/rules/size'
import { expectUtilities, matchRule } from './_utils'

describe('size rules', () => {
  it('resolves width, height, size and logical sizes', () => {
    expectUtilities(sizes, {
      'w-4': { width: 'calc(var(--spacing) * 4)' },
      'h-sm': { height: 'var(--container-sm)' },
      'w-lg': { width: 'var(--container-lg)' },
      'size-10': { width: 'calc(var(--spacing) * 10)', height: 'calc(var(--spacing) * 10)' },
      'size-full': { width: '100%', height: '100%' },
      'w-screen': { width: '100vw' },
      'h-screen': { height: '100vh' },
      'min-w-fit': { 'min-width': 'fit-content' },
      'max-h-min': { 'max-height': 'min-content' },
      'w-stretch': { width: 'stretch' },
      'size-min-10': { 'min-width': 'calc(var(--spacing) * 10)', 'min-height': 'calc(var(--spacing) * 10)' },
      'block-8': { 'block-size': 'calc(var(--spacing) * 8)' },
      'inline-full': { 'inline-size': '100%' },
      'max-inline-sm': { 'max-inline-size': 'var(--container-sm)' },
      'w-screen-mobile': { width: '520px' },
      'h-screen-tablet': { height: '768px' },
      'min-w-screen-laptop': { 'min-width': '1024px' },
      'w-[10px]': { width: '10px' },
      'h-1/2': { height: '50%' },
    })
  })

  it('resolves aspect ratios', () => {
    expectUtilities(aspectRatio, {
      'aspect-square': { 'aspect-ratio': '1/1' },
      'aspect-video': { 'aspect-ratio': '16/9' },
      'aspect-16/9': { 'aspect-ratio': '16/9' },
      'aspect-ratio-square': { 'aspect-ratio': '1/1' },
      'size-aspect-auto': { 'aspect-ratio': 'auto' },
      'aspect-[4/3]': { 'aspect-ratio': '4/3' },
    })
    expect(matchRule(aspectRatio, 'aspect-')).toBeUndefined()
  })
})
