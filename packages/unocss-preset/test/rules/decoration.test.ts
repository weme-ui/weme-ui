import { describe, expect, it } from 'vitest'
import { textDecorations } from '~/rules/decoration'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

const decorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy', ...globalKeywords]

describe('decoration rules', () => {
  it('resolves line, thickness, color, offset and style', () => {
    expectUtilities(textDecorations, {
      'underline': { 'text-decoration-line': 'underline' },
      'overline': { 'text-decoration-line': 'overline' },
      'line-through': { 'text-decoration-line': 'line-through' },
      'decoration-2': { 'text-decoration-thickness': '2px' },
      'underline-auto': { 'text-decoration-thickness': 'auto' },
      'decoration-from-font': { 'text-decoration-thickness': 'from-font' },
      'underline-blue-9': {
        'text-decoration-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-line-opacity), transparent)',
        '-webkit-text-decoration-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-line-opacity), transparent)',
      },
      'decoration-op-40': { '--un-line-opacity': '40%' },
      'underline-offset-2': { 'text-underline-offset': '2px' },
      'underline-offset-auto': { 'text-underline-offset': 'auto' },
      'no-underline': { 'text-decoration': 'none' },
      'decoration-none': { 'text-decoration': 'none' },
    })

    for (const style of decorationStyles.filter(style => !globalKeywords.includes(style))) {
      expect(matchRule(textDecorations, `underline-${style}`)).toEqual({ 'text-decoration-style': style })
      expect(matchRule(textDecorations, `decoration-${style}`)).toEqual({ 'text-decoration-style': style })
    }
  })

  it('rejects unknown decoration values', () => {
    expect(matchRule(textDecorations, 'decoration-groove')).toBeUndefined()
    expect(matchRule(textDecorations, 'underline-offset-')).toBeUndefined()
  })
})
