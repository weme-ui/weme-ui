import { describe, expect, it } from 'vitest'
import { transitions } from '~/rules/transition'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

const timing = 'var(--un-ease, var(--default-transition-timingFunction))'
const duration = 'var(--un-duration, var(--default-transition-duration))'
const all = 'color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter'

describe('transition rules', () => {
  it('resolves transition shorthand, timing and behavior', () => {
    expectUtilities(transitions, {
      'transition': {
        'transition-property': all,
        'transition-timing-function': timing,
        'transition-duration': duration,
      },
      'transition-colors': {
        'transition-property': 'color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to',
        'transition-timing-function': timing,
        'transition-duration': duration,
      },
      'transition-200': {
        '--un-duration': '200ms',
        'transition-property': all,
        'transition-duration': duration,
      },
      'duration-150': { '--un-duration': '150ms', 'transition-duration': '150ms' },
      'delay-75': { 'transition-delay': '75ms' },
      'ease-in': { '--un-ease': 'var(--ease-in)', 'transition-timing-function': 'var(--ease-in)' },
      'ease': { '--un-ease': 'var(--ease-DEFAULT)', 'transition-timing-function': 'var(--ease-DEFAULT)' },
      'property-opacity': { 'transition-property': 'opacity' },
      'property-all': { 'transition-property': 'all' },
      'transition-none': {
        'transition-property': 'none',
        'transition-timing-function': timing,
        'transition-duration': duration,
      },
      'transition-discrete': { 'transition-behavior': 'allow-discrete' },
      'transition-normal': { 'transition-behavior': 'normal' },
    })

    for (const keyword of globalKeywords)
      expect(matchRule(transitions, `transition-${keyword}`)).toEqual({ transition: keyword })
  })

  it('rejects unknown timing values', () => {
    expect(matchRule(transitions, 'duration-later')).toBeUndefined()
  })
})
