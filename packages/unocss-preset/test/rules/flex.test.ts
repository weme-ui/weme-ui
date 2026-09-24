import { describe, expect, it } from 'vitest'
import { flex } from '~/rules/flex'
import { expectUtilities, matchRule } from './_utils'

describe('flex rules', () => {
  it('resolves display, shorthand, grow, shrink and basis', () => {
    expectUtilities(flex, {
      'flex': { display: 'flex' },
      'inline-flex': { display: 'inline-flex' },
      'flex-inline': { display: 'inline-flex' },
      'flex-1': { flex: '1 1 0%' },
      'flex-auto': { flex: '1 1 auto' },
      'flex-initial': { flex: '0 1 auto' },
      'flex-none': { flex: 'none' },
      'flex-[2_1_auto]': { flex: '2 1 auto' },
      'shrink': { 'flex-shrink': 1 },
      'flex-shrink-0': { 'flex-shrink': 0 },
      'grow-2': { 'flex-grow': 2 },
      'basis-4': { 'flex-basis': 'calc(var(--spacing) * 4)' },
      'basis-1/2': { 'flex-basis': '50%' },
      'basis-auto': { 'flex-basis': 'auto' },
      'basis-sm': undefined,
    })
  })

  it('resolves direction and wrap', () => {
    expect(matchRule(flex, 'flex-row')).toEqual({ 'flex-direction': 'row' })
    expect(matchRule(flex, 'flex-row-reverse')).toEqual({ 'flex-direction': 'row-reverse' })
    expect(matchRule(flex, 'flex-col')).toEqual({ 'flex-direction': 'column' })
    expect(matchRule(flex, 'flex-col-reverse')).toEqual({ 'flex-direction': 'column-reverse' })
    expect(matchRule(flex, 'flex-wrap')).toEqual({ 'flex-wrap': 'wrap' })
    expect(matchRule(flex, 'flex-wrap-reverse')).toEqual({ 'flex-wrap': 'wrap-reverse' })
    expect(matchRule(flex, 'flex-nowrap')).toEqual({ 'flex-wrap': 'nowrap' })
  })
})
