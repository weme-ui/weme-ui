import { describe, expect, it } from 'vitest'
import { touchActions } from '~/rules/touch-actions'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

const touch = 'var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)'

describe('touch action rules', () => {
  it('resolves pan, pinch and keywords', () => {
    expectUtilities(touchActions, {
      'touch-pan-x': { '--un-pan-x': 'pan-x', 'touch-action': touch },
      'touch-pan-left': { '--un-pan-x': 'pan-left', 'touch-action': touch },
      'touch-pan-right': { '--un-pan-x': 'pan-right', 'touch-action': touch },
      'touch-pan-y': { '--un-pan-y': 'pan-y', 'touch-action': touch },
      'touch-pan-up': { '--un-pan-y': 'pan-up', 'touch-action': touch },
      'touch-pan-down': { '--un-pan-y': 'pan-down', 'touch-action': touch },
      'touch-pinch-zoom': { '--un-pinch-zoom': 'pinch-zoom', 'touch-action': touch },
      'touch-auto': { 'touch-action': 'auto' },
      'touch-manipulation': { 'touch-action': 'manipulation' },
      'touch-none': { 'touch-action': 'none' },
    })

    for (const keyword of globalKeywords)
      expect(matchRule(touchActions, `touch-${keyword}`)).toEqual({ 'touch-action': keyword })
  })
})
