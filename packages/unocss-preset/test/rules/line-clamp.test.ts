import { describe, expect, it } from 'vitest'
import { lineClamps } from '~/rules/line-clamp'
import { matchRule } from './_utils'

describe('line-clamp rules', () => {
  it('resolves numbered clamps and none', () => {
    expect(matchRule(lineClamps, 'line-clamp-3')).toEqual({
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '3',
    })
    expect(matchRule(lineClamps, 'line-clamp-none')).toEqual({
      'overflow': 'visible',
      'display': 'block',
      '-webkit-box-orient': 'horizontal',
      '-webkit-line-clamp': 'unset',
    })
  })

  it('rejects non-numeric clamps', () => {
    expect(matchRule(lineClamps, 'line-clamp-two')).toBeUndefined()
    expect(matchRule(lineClamps, 'line-clamp-')).toBeUndefined()
  })
})
