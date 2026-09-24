import { describe, expect, it } from 'vitest'
import { transforms } from '~/rules/transform'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

const transformCpu = 'var(--un-rotate-x) var(--un-rotate-y) var(--un-rotate-z) var(--un-skew-x) var(--un-skew-y)'

describe('transform rules', () => {
  it('resolves origin, perspective and base transforms', () => {
    expectUtilities(transforms, {
      'origin-center': { 'transform-origin': 'center' },
      'transform-origin-top-left': { 'transform-origin': 'top left' },
      'perspective-dramatic': { perspective: 'var(--perspective-dramatic)' },
      'transform-perspective-near': {
        '--un-perspective': 'perspective(var(--perspective-near))',
        'transform': `var(--un-perspective) ${transformCpu}`,
      },
      'perspective-origin-center': { 'perspective-origin': 'center' },
      'transform-3d': { 'transform-style': 'preserve-3d' },
      'transform-flat': { 'transform-style': 'flat' },
      'transform-border': { 'transform-box': 'border-box' },
      'transform-view': { 'transform-box': 'view-box' },
      'transform': { transform: transformCpu },
      'transform-cpu': { transform: transformCpu },
      'transform-gpu': { transform: `translateZ(0) ${transformCpu}` },
      'transform-none': { transform: 'none' },
      'zoom-150': { zoom: '150%' },
    })

    for (const keyword of globalKeywords)
      expect(matchRule(transforms, `transform-${keyword}`)).toEqual({ transform: keyword })
  })

  it('resolves translate, rotate, scale and skew', () => {
    expectUtilities(transforms, {
      'translate-x-4': {
        '--un-translate-x': 'calc(var(--spacing) * 4)',
        'translate': 'var(--un-translate-x) var(--un-translate-y)',
      },
      'translate-full': {
        '--un-translate-x': '100%',
        '--un-translate-y': '100%',
        'translate': 'var(--un-translate-x) var(--un-translate-y)',
      },
      'translate-none': { translate: 'none' },
      'rotate-45': { rotate: '45deg' },
      'rotate-x-45': {
        '--un-rotate-x': 'rotateX(45deg)',
        'transform': transformCpu,
      },
      'rotate-none': { rotate: 'none' },
      'scale-50': {
        '--un-scale-x': '50%',
        '--un-scale-y': '50%',
        'scale': 'var(--un-scale-x) var(--un-scale-y)',
      },
      'scale-x-150': {
        '--un-scale-x': '150%',
        'scale': 'var(--un-scale-x) var(--un-scale-y)',
      },
      'skew-x-12': {
        '--un-skew-x': 'skewX(12deg)',
        'transform': transformCpu,
      },
      'skew-y-[10deg]': {
        '--un-skew-y': 'skewY(10deg)',
      },
    })
  })
})
