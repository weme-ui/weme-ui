import { describe, it } from 'vitest'
import { masks } from '~/rules/mask'
import { expectUtilities } from './_utils'

describe('mask rules', () => {
  it('resolves clip, composite, mode, origin, repeat and type', () => {
    expectUtilities(masks, {
      'mask-clip-border': { 'mask-clip': 'border-box' },
      'mask-clip-padding': { 'mask-clip': 'padding-box' },
      'mask-clip-fill': { 'mask-clip': 'fill-box' },
      'mask-no-clip': { 'mask-clip': 'no-clip' },
      'mask-add': { 'mask-composite': 'add' },
      'mask-subtract': { 'mask-composite': 'subtract' },
      'mask-intersect': { 'mask-composite': 'intersect' },
      'mask-exclude': { 'mask-composite': 'exclude' },
      'mask-none': { 'mask-image': 'none' },
      'mask-alpha': { 'mask-mode': 'alpha' },
      'mask-luminance': { 'mask-mode': 'luminance' },
      'mask-match': { 'mask-mode': 'match-source' },
      'mask-origin-content': { 'mask-origin': 'content-box' },
      'mask-origin-stroke': { 'mask-origin': 'stroke-box' },
      'mask-repeat': { 'mask-repeat': 'repeat' },
      'mask-no-repeat': { 'mask-repeat': 'no-repeat' },
      'mask-repeat-x': { 'mask-repeat': 'repeat-x' },
      'mask-repeat-space': { 'mask-repeat': 'space' },
      'mask-auto': { 'mask-size': 'auto' },
      'mask-cover': { 'mask-size': 'cover' },
      'mask-contain': { 'mask-size': 'contain' },
      'mask-type-alpha': { 'mask-type': 'alpha' },
      'mask-type-luminance': { 'mask-type': 'luminance' },
    })
  })

  it('resolves gradient masks and positions', () => {
    expectUtilities(masks, {
      'mask-t-from-4': {
        'mask-image': 'var(--un-mask-linear), var(--un-mask-radial), var(--un-mask-conic)',
        'mask-composite': 'intersect',
        '--un-mask-top': 'linear-gradient(to top, var(--un-mask-top-from-color) var(--un-mask-top-from-position), var(--un-mask-top-to-color) var(--un-mask-top-to-position))',
      },
      'mask-linear-from-blue-9': {
        '--un-mask-linear': 'linear-gradient(var(--un-mask-linear-stops))',
      },
      'mask-[url(https://example.com/a.svg)]': { 'mask-image': 'url(https://example.com/a.svg)' },
      'mask-center': { 'mask-position': 'center' },
      'mask-top-left': { 'mask-position': 'top left' },
      'mask-size-4': { 'mask-size': '1rem' },
      'mask-size-cover': undefined,
    })
  })
})
