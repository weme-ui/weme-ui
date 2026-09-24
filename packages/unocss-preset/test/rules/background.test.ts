import { describe, expect, it } from 'vitest'
import { backgroundStyles } from '~/rules/background'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

describe('background rules', () => {
  it('resolves gradients, stops and positions', () => {
    expectUtilities(backgroundStyles, {
      'bg-linear-45': {
        '--un-gradient-position': 'from 45deg in oklab;',
        'background-image': 'linear-gradient(var(--un-gradient-stops))',
      },
      'bg-linear-to-r': {
        '--un-gradient-position': 'to right in oklab',
        'background-image': 'linear-gradient(var(--un-gradient-stops))',
      },
      'bg-gradient': {
        'background-image': 'linear-gradient(var(--un-gradient-stops))',
      },
      'bg-repeating-linear': {
        'background-image': 'repeating-linear-gradient(var(--un-gradient, var(--un-gradient-stops, rgb(255 255 255 / 0))))',
      },
      'from-blue-9': {
        '--un-gradient-from': 'color-mix(in oklab, var(--colors-blue-9) var(--un-from-opacity), transparent)',
      },
      'via-transparent': {
        '--un-gradient-via': 'transparent',
      },
      'to-op-40': { '--un-to-opacity': '40%' },
      'from-20%': { '--un-gradient-from-position': '20%' },
      'bg-none': { 'background-image': 'none' },
    })
  })

  it('resolves size, attachment, clip, position, repeat and origin', () => {
    expectUtilities(backgroundStyles, {
      'bg-auto': { 'background-size': 'auto' },
      'bg-cover': { 'background-size': 'cover' },
      'bg-contain': { 'background-size': 'contain' },
      'bg-size-[auto_100%]': { 'background-size': 'auto 100%' },
      'bg-fixed': { 'background-attachment': 'fixed' },
      'bg-local': { 'background-attachment': 'local' },
      'bg-scroll': { 'background-attachment': 'scroll' },
      'bg-clip-text': { '-webkit-background-clip': 'text', 'background-clip': 'text' },
      'bg-center': { 'background-position': 'center' },
      'bg-top-left': { 'background-position': 'top left' },
      'bg-repeat': { 'background-repeat': 'repeat' },
      'bg-no-repeat': { 'background-repeat': 'no-repeat' },
      'bg-repeat-x': { 'background-repeat': 'repeat-x' },
      'bg-repeat-round': { 'background-repeat': 'round' },
      'bg-origin-border': { 'background-origin': 'border-box' },
      'bg-origin-padding': { 'background-origin': 'padding-box' },
      'box-decoration-slice': { 'box-decoration-break': 'slice' },
      'box-decoration-clone': { 'box-decoration-break': 'clone' },
    })

    for (const keyword of globalKeywords) {
      expect(matchRule(backgroundStyles, `bg-clip-${keyword}`)).toEqual({
        '-webkit-background-clip': keyword,
        'background-clip': keyword,
      })
      expect(matchRule(backgroundStyles, `bg-repeat-${keyword}`)).toEqual({ 'background-repeat': keyword })
      expect(matchRule(backgroundStyles, `bg-origin-${keyword}`)).toEqual({ 'background-origin': keyword })
      expect(matchRule(backgroundStyles, `box-decoration-${keyword}`)).toEqual({ 'box-decoration-break': keyword })
    }
  })

  it('rejects unknown background positions', () => {
    expect(matchRule(backgroundStyles, 'bg-middle')).toBeUndefined()
    expect(matchRule(backgroundStyles, 'bg-size-')).toBeUndefined()
  })
})
