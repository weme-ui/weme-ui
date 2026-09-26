import { describe, expect, it } from 'vitest'
import { accents, appearance, carets, imageRenderings, listStyle, outline, overscrolls, scrollBehaviors, willChange } from '~/rules/behaviors'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

describe('behavior rules', () => {
  it('resolves outline width, color, offset and style', () => {
    expectUtilities(outline, {
      'outline': { 'outline-style': 'var(--un-outline-style)', 'outline-width': '1px' },
      'outline-2': { 'outline-style': 'var(--un-outline-style)', 'outline-width': '2px' },
      'outline-blue-9': { 'outline-color': 'var(--blue-9)' },
      'outline-op-25': { '--un-outline-opacity': '25%' },
      'outline-offset-2': { 'outline-offset': '2px' },
      'outline-offset-none': { 'outline-offset': '0' },
      'outline-none': { '--un-outline-style': 'none', 'outline-style': 'none' },
      'outline-dashed': { '--un-outline-style': 'dashed', 'outline-style': 'dashed' },
      'outline-inherit': { 'outline-style': 'var(--un-outline-style)', 'outline-width': 'inherit' },
    })

    const hidden = matchRule(outline, 'outline-hidden') as unknown[]
    expect(hidden[0]).toEqual({ 'outline-style': 'none' })
    expect(hidden[1]).toMatchObject({
      'outline': '2px solid transparent',
      'outline-offset': '2px',
    })
  })

  it('resolves appearance, will-change and list style', () => {
    expect(appearance.map(([name, body]) => [name, body])).toEqual([
      ['appearance-auto', { '-webkit-appearance': 'auto', 'appearance': 'auto' }],
      ['appearance-none', { '-webkit-appearance': 'none', 'appearance': 'none' }],
    ])

    expectUtilities(willChange, {
      'will-change-contents': { 'will-change': 'contents' },
      'will-change-scroll': { 'will-change': 'scroll-position' },
      'will-change-transform': { 'will-change': 'transform' },
      'will-change-auto': { 'will-change': 'auto' },
      'will-change-[margin,padding]': { 'will-change': 'margin,padding' },
      'will-change-not-a-property': undefined,
    })

    expectUtilities(listStyle, {
      'list-disc': { 'list-style-type': 'disc' },
      'list-disc-inside': { 'list-style-position': 'inside', 'list-style-type': 'disc' },
      'list-zero-decimal': { 'list-style-type': 'decimal-leading-zero' },
      'list-upper-roman-outside': { 'list-style-position': 'outside', 'list-style-type': 'upper-roman' },
      'list-inside': { 'list-style-position': 'inside' },
      'list-none': { 'list-style-type': 'none' },
      'list-image-none': { 'list-style-image': 'none' },
      'list-image-[url(https://example.com/dot.svg)]': { 'list-style-image': 'url(https://example.com/dot.svg)' },
      'list-unknown': undefined,
    })

    for (const keyword of globalKeywords)
      expect(matchRule(listStyle, `list-${keyword}`)).toEqual({ 'list-style-type': keyword })
  })

  it('resolves accent, caret, image rendering, overscroll and scroll behavior', () => {
    expectUtilities(accents, {
      'accent-blue-9': { 'accent-color': 'var(--blue-9)' },
      'accent-op-50': { '--un-accent-opacity': '50%' },
      'accent-not-a-color': undefined,
    })
    expectUtilities(carets, {
      'caret-current': { 'caret-color': 'currentColor' },
      'caret-opacity-20': { '--un-caret-opacity': '20%' },
    })

    expect(matchRule(imageRenderings, 'image-render-auto')).toEqual({ 'image-rendering': 'auto' })
    expect(matchRule(imageRenderings, 'image-render-edge')).toEqual({ 'image-rendering': 'crisp-edges' })
    expect(matchRule(imageRenderings, 'image-render-pixel')).toEqual([
      ['-ms-interpolation-mode', 'nearest-neighbor'],
      ['image-rendering', '-webkit-optimize-contrast'],
      ['image-rendering', '-moz-crisp-edges'],
      ['image-rendering', '-o-pixelated'],
      ['image-rendering', 'pixelated'],
    ])

    for (const axis of ['', '-x', '-y']) {
      for (const value of ['auto', 'contain', 'none', ...globalKeywords]) {
        const property = axis ? `overscroll-behavior${axis}` : 'overscroll-behavior'
        expect(matchRule(overscrolls, `overscroll${axis}-${value}`)).toEqual({ [property]: value })
      }
    }

    expect(matchRule(scrollBehaviors, 'scroll-auto')).toEqual({ 'scroll-behavior': 'auto' })
    expect(matchRule(scrollBehaviors, 'scroll-smooth')).toEqual({ 'scroll-behavior': 'smooth' })
    for (const keyword of globalKeywords)
      expect(matchRule(scrollBehaviors, `scroll-${keyword}`)).toEqual({ 'scroll-behavior': keyword })
  })
})
