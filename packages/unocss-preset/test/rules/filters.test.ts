import { describe, expect, it } from 'vitest'
import { filters } from '~/rules/filters'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

const filterValue = 'var(--un-blur,) var(--un-brightness,) var(--un-contrast,) var(--un-grayscale,) var(--un-hue-rotate,) var(--un-invert,) var(--un-saturate,) var(--un-sepia,) var(--un-drop-shadow,)'
const backdropValue = 'var(--un-backdrop-blur,) var(--un-backdrop-brightness,) var(--un-backdrop-contrast,) var(--un-backdrop-grayscale,) var(--un-backdrop-hue-rotate,) var(--un-backdrop-invert,) var(--un-backdrop-opacity,) var(--un-backdrop-saturate,) var(--un-backdrop-sepia,)'

describe('filter rules', () => {
  it('resolves filter functions and backdrop variants', () => {
    expectUtilities(filters, {
      'blur': { '--un-blur': 'blur(8px)', 'filter': filterValue },
      'blur-sm': { '--un-blur': 'blur(8px)', 'filter': filterValue },
      'blur-lg': { '--un-blur': 'blur(16px)', 'filter': filterValue },
      'filter-blur-none': { '--un-blur': 'blur(0)', 'filter': filterValue },
      'backdrop-blur': { '--un-backdrop-blur': 'blur(8px)', 'backdrop-filter': backdropValue },
      'brightness-50': { '--un-brightness': 'brightness(50%)', 'filter': filterValue },
      'contrast-200': { '--un-contrast': 'contrast(200%)', 'filter': filterValue },
      'grayscale': { '--un-grayscale': 'grayscale(100%)', 'filter': filterValue },
      'hue-rotate-90': { '--un-hue-rotate': 'hue-rotate(90deg)', 'filter': filterValue },
      'invert': { '--un-invert': 'invert(100%)', 'filter': filterValue },
      'saturate-0': { '--un-saturate': 'saturate(0%)', 'filter': filterValue },
      'sepia-50': { '--un-sepia': 'sepia(50%)', 'filter': filterValue },
      'backdrop-opacity-40': { '--un-backdrop-opacity': 'opacity(40%)', 'backdrop-filter': backdropValue },
      'drop-shadow-sm': { '--un-drop-shadow': 'drop-shadow(0 1px 2px var(--un-drop-shadow-color, rgb(0 0 0 / 0.15)))', 'filter': filterValue },
      'drop-shadow-blue-9': { '--un-drop-shadow-color': 'color-mix(in srgb, var(--colors-blue-9) var(--un-drop-shadow-opacity), transparent)' },
      'drop-shadow-op-25': { '--un-drop-shadow-opacity': '25%' },
      'filter': { filter: filterValue },
      'backdrop-filter': { 'backdrop-filter': backdropValue, '-webkit-backdrop-filter': backdropValue },
      'filter-none': { filter: 'none' },
      'backdrop-filter-none': { 'backdrop-filter': 'none', '-webkit-backdrop-filter': 'none' },
    })

    for (const keyword of globalKeywords) {
      expect(matchRule(filters, `filter-${keyword}`)).toEqual({ filter: keyword })
      expect(matchRule(filters, `backdrop-filter-${keyword}`)).toEqual({
        '-webkit-backdrop-filter': keyword,
        'backdrop-filter': keyword,
      })
    }
  })

  it('rejects filter values that cannot be parsed', () => {
    expect(matchRule(filters, 'brightness-nope')).toBeUndefined()
    expect(matchRule(filters, 'hue-rotate-sideways')).toBeUndefined()
  })
})
