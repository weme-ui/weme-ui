import { describe, expect, it } from 'vitest'
import { bgColors, colorScheme, opacity } from '~/rules/color'
import { expectUtilities, matchRule } from './_utils'

describe('color rules', () => {
  it('resolves opacity percentages and arbitrary values', () => {
    expectUtilities(opacity, {
      'op-50': { opacity: '50%' },
      'opacity-100': { opacity: '100%' },
      'op10': { opacity: '10%' },
      'op-[var(--a)]': { opacity: 'var(--a)' },
      'op-[.5]': { opacity: '.5' },
      'op-nope': undefined,
    })
  })

  it('resolves background colors, images and opacity', () => {
    expectUtilities(bgColors, {
      'bg-blue-9': { 'background-color': 'var(--blue-9)' },
      'bg-transparent': { 'background-color': 'transparent' },
      'bg-current': { 'background-color': 'currentColor' },
      'bg-op-50': { '--un-bg-opacity': '50%' },
      'bg-opacity-20': { '--un-bg-opacity': '20%' },
      'bg-[url(https://example.com/a.png)]': { '--un-url': 'url(https://example.com/a.png)', 'background-image': 'var(--un-url)' },
      'bg-[length:10px_20px]': { 'background-size': '10px 20px' },
      'bg-[position:center_top]': { 'background-position': 'center top' },
      'bg-[linear-gradient(red,blue)]': { 'background-image': 'linear-gradient(red,blue)' },
      'bg-not-a-color': undefined,
    })
  })

  it('resolves color scheme keywords', () => {
    expect(matchRule(colorScheme, 'scheme-dark')).toEqual({ 'color-scheme': 'dark' })
    expect(matchRule(colorScheme, 'color-scheme-light-dark')).toEqual({ 'color-scheme': 'light dark' })
    expect(matchRule(colorScheme, 'scheme-only-light')).toEqual({ 'color-scheme': 'only light' })
  })
})
