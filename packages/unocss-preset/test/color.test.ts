import { describe, expect, it } from 'vitest'
import { parseColor } from '../src/utils'

describe('color', () => {
  it('should color parsed', () => {
    [
      ['color', 'color', undefined, undefined],
      ['color-1', 'color', 1, undefined],
      ['color/10', 'color', undefined, 10],
      ['color-1/10', 'color', 1, 10],
      ['color-suffix-12', 'color-suffix', 12, undefined],
      ['color-suffix-12/100', 'color-suffix', 12, 100],
    ].forEach(
      ([raw, color, scale, opacity]) => {
        expect(parseColor(raw as string)).toEqual({
          color,
          scale,
          opacity,
        })
      },
    )
  })
})
