import { describe, expect, it } from 'vitest'
import { fonts, fontVariantNumeric, tabSizes, textIndents, textShadows, textStrokes } from '~/rules/typography'
import { globalKeywords } from '~/utils/mappings'
import { css, expectUtilities, matchRule } from './_utils'

describe('typography rules', () => {
  it('resolves text size, color, weight, leading and tracking', () => {
    expectUtilities(fonts, {
      'text-base': {
        'font-size': 'var(--text-base-fontSize)',
        'line-height': 'var(--un-leading, var(--text-base-lineHeight))',
      },
      'text-xs': {
        'font-size': 'var(--text-xs-fontSize)',
        'line-height': 'var(--un-leading, var(--text-xs-lineHeight))',
        'letter-spacing': 'var(--text-xs-letterSpacing)',
      },
      'text-4': { 'font-size': '1rem' },
      'text-size-lg': {
        'font-size': 'var(--text-lg-fontSize)',
        'line-height': 'var(--un-leading, var(--text-lg-lineHeight))',
      },
      'text-blue': { color: 'var(--blue-9)' },
      'text-blue-9': { color: 'var(--blue-9)' },
      'c-current': { color: 'currentColor' },
      'text-op-50': { '--un-text-opacity': '50%' },
      'color-opacity-20': { '--un-text-opacity': '20%' },
      'fw-bold': { '--un-font-weight': 'var(--fontWeight-bold)', 'font-weight': 'var(--fontWeight-bold)' },
      'font-700': { '--un-font-weight': 700, 'font-weight': 700 },
      'leading-tight': { '--un-leading': 'var(--leading-tight)', 'line-height': 'var(--leading-tight)' },
      'lh-4': { '--un-leading': 'calc(var(--spacing) * 4)', 'line-height': 'calc(var(--spacing) * 4)' },
      'tracking-wide': { '--un-tracking': 'var(--tracking-wide)', 'letter-spacing': 'var(--tracking-wide)' },
      'word-spacing-4': { '--un-word-spacing': '1rem', 'word-spacing': '1rem' },
      'font-sans': { 'font-family': 'var(--font-sans)' },
      'font-medium': { '--un-font-weight': 'var(--fontWeight-medium)', 'font-weight': 'var(--fontWeight-medium)' },
      'font-synthesis-none': { 'font-synthesis': 'none' },
      'font-synthesis-weight': { 'font-synthesis': 'weight' },
      'font-stretch-condensed': { 'font-stretch': 'condensed' },
      'font-stretch-[50%]': { 'font-stretch': '50%' },
    })

    for (const keyword of globalKeywords)
      expect(css(matchRule(fonts, `c-${keyword}`))).toEqual({ color: keyword })
  })

  it('resolves tab size, indent, stroke and text shadow', () => {
    expect(matchRule(tabSizes, 'tab')).toEqual({ '-moz-tab-size': 4, '-o-tab-size': 4, 'tab-size': 4 })
    expect(matchRule(tabSizes, 'tab-8')).toEqual({ '-moz-tab-size': 8, '-o-tab-size': 8, 'tab-size': 8 })
    expect(matchRule(textIndents, 'indent-4')).toEqual({ 'text-indent': 'calc(var(--spacing) * 4)' })
    expect(matchRule(textIndents, 'indent-[2rem]')).toEqual({ 'text-indent': '2rem' })
    expect(matchRule(textIndents, 'indent-sm')).toBeUndefined()

    expectUtilities(textStrokes, {
      'text-stroke': { '-webkit-text-stroke-width': 'var(--textStrokeWidth-DEFAULT)' },
      'text-stroke-sm': { '-webkit-text-stroke-width': 'var(--textStrokeWidth-sm)' },
      'text-stroke-blue': { '-webkit-text-stroke-color': 'var(--blue-9)' },
      'text-stroke-blue-9': { '-webkit-text-stroke-color': 'var(--blue-9)' },
      'text-stroke-op-40': { '--un-text-stroke-opacity': '40%' },
    })
    expectUtilities(textShadows, {
      'text-shadow-sm': {
        'text-shadow': 'var(--un-text-shadow)',
        '--un-text-shadow': '0 1px 0 var(--un-text-shadow-color, rgb(0 0 0 / 0.075)),0 1px 1px var(--un-text-shadow-color, rgb(0 0 0 / 0.075)),0 2px 2px var(--un-text-shadow-color, rgb(0 0 0 / 0.075))',
      },
      'text-shadow-blue': { '--un-text-shadow-color': 'var(--blue-9)' },
      'text-shadow-blue-9': { '--un-text-shadow-color': 'var(--blue-9)' },
      'text-shadow-op-50': { '--un-text-shadow-opacity': '50%' },
    })
  })

  it('resolves font variant numeric utilities', () => {
    const numeric = 'var(--un-ordinal,) var(--un-slashed-zero,) var(--un-numeric-figure,) var(--un-numeric-spacing,) var(--un-numeric-fraction,)'
    expect(css(matchRule(fontVariantNumeric, 'ordinal'))).toMatchObject({ '--un-ordinal': 'ordinal', 'font-variant-numeric': numeric })
    expect(css(matchRule(fontVariantNumeric, 'slashed-zero'))).toMatchObject({ '--un-slashed-zero': 'slashed-zero', 'font-variant-numeric': numeric })
    expect(css(matchRule(fontVariantNumeric, 'lining-nums'))).toMatchObject({ '--un-numeric-figure': 'lining-nums' })
    expect(css(matchRule(fontVariantNumeric, 'tabular-nums'))).toMatchObject({ '--un-numeric-spacing': 'tabular-nums' })
    expect(css(matchRule(fontVariantNumeric, 'diagonal-fractions'))).toMatchObject({ '--un-numeric-fraction': 'diagonal-fractions' })
    expect(css(matchRule(fontVariantNumeric, 'normal-nums'))).toEqual({ 'font-variant-numeric': 'normal' })
  })
})
