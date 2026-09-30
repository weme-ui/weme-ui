import { describe, expect, it } from 'vitest'
import { resolveOptions } from '~/options'
import { margins, paddings } from '~/rules/spacing'
import { cssVars } from '../../uno.config'
import { expectUtilities, matchRule } from './_utils'

const options = resolveOptions({ cssVars })
const paddingRules = paddings(options)
const marginRules = margins(options)

describe('spacing rules', () => {
  it('resolves custom css vars through the padding and margin fuzzy maps', () => {
    expectUtilities(paddingRules, {
      'p-card': { padding: 'var(--card-padding)' },
      'px-card': { 'padding-inline': 'var(--card-padding)' },
      'pt-card': { 'padding-top': 'var(--card-padding)' },
    })
    expectUtilities(marginRules, {
      'm-card': { margin: 'var(--card-margin)' },
      'mx-card': { 'margin-inline': 'var(--card-margin)' },
      'mt-card': { 'margin-top': 'var(--card-margin)' },
    })
  })

  it('prefers theme spacing over size css vars when both exist', () => {
    const overlapped = resolveOptions({
      cssVars: {
        4: {
          padding: '3rem',
          margin: '3rem',
        },
      },
    })

    expectUtilities(paddings(overlapped), {
      'p-4': { padding: 'calc(var(--spacing) * 4)' },
    })
    expectUtilities(margins(overlapped), {
      'm-4': { margin: 'calc(var(--spacing) * 4)' },
    })
  })

  it('rejects unmatched spacing css vars', () => {
    expect(matchRule(paddingRules, 'p-panel')).toBeUndefined()
    expect(matchRule(marginRules, 'm-panel')).toBeUndefined()
  })
})
