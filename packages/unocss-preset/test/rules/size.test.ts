import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { sizes } from '~/rules/size'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const rules = sizes(options)

describe('size rules', () => {
  it('resolves custom css vars through the width and height fuzzy maps', () => {
    expectUtilities(rules, {
      'w-card': { width: 'var(--card-width)' },
      'h-card': { height: 'var(--card-height)' },
      'size-card': {
        width: 'var(--card-width)',
        height: 'var(--card-height)',
      },
      'min-w-card': { 'min-width': 'var(--card-width)' },
      'max-h-card': { 'max-height': 'var(--card-height)' },
    })
  })

  it('resolves explicit min and max size css var names', () => {
    expectUtilities(rules, {
      'w-card-min': { width: 'var(--card-min-width)' },
      'w-card-max': { width: 'var(--card-max-width)' },
      'h-card-min': { height: 'var(--card-min-height)' },
      'h-card-max': { height: 'var(--card-max-height)' },
      'size-card-min': {
        width: 'var(--card-min-width)',
        height: 'var(--card-min-height)',
      },
      'size-card-max': {
        width: 'var(--card-max-width)',
        height: 'var(--card-max-height)',
      },
      'min-w-card-min': { 'min-width': 'var(--card-min-width)' },
      'max-h-card-max': { 'max-height': 'var(--card-max-height)' },
    })
  })

  it('prefers theme spacing over size css vars when both exist', () => {
    const withOverlap = sizes(resolveOptions({
      cssVars: {
        4: {
          width: '20rem',
          height: '10rem',
        },
      },
    }))

    expectUtilities(withOverlap, {
      'w-4': { width: 'calc(var(--spacing) * 4)' },
      'h-4': { height: 'calc(var(--spacing) * 4)' },
    })
  })

  it('rejects unmatched size css vars', () => {
    expect(matchRule(rules, 'w-panel')).toBeUndefined()
    expect(matchRule(rules, 'h-panel')).toBeUndefined()
    expect(matchRule(rules, 'size-panel')).toBeUndefined()
  })
})
