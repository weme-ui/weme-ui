import { describe, expect, it } from 'vitest'
import { preflights } from '~/preflights/default'

describe('preflights', () => {
  it('includes reset, theme and property by default', () => {
    expect(preflights({}).map(item => item.layer)).toEqual(['base', 'theme', 'properties'])
  })

  it('drops disabled reset and property preflights', () => {
    expect(preflights({
      preflights: {
        reset: false,
        property: false,
      },
    }).map(item => item.layer)).toEqual(['theme'])
  })
})
