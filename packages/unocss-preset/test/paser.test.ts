import { describe, expect, it } from 'vitest'
import { parseColor, parseCssVarValue } from '../src/utils'

describe('parser', () => {
  it('should color parsed', () => {
    [
      ['accent', 'accent', undefined, undefined],
      ['accent-1', 'accent', 1, undefined],
      ['accent/10', 'accent', undefined, 10],
      ['accent-1/10', 'accent', 1, 10],
      ['accent-soft-12', 'accent-soft', 12, undefined],
      ['accent-soft-12/100', 'accent-soft', 12, 100],
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

  it('should css variable value parsed', () => {
    // normal
    expect(parseCssVarValue('ui-', 'light', 'var(--bala-bala)')).toMatchInlineSnapshot(`"var(--bala-bala)"`)

    // hex
    expect(parseCssVarValue('ui-', 'light', '#05f')).toMatchInlineSnapshot(`"oklch(53.32% 0.2596 262.6)"`)

    // color scales
    expect(parseCssVarValue('ui-', 'light', 'gray.2')).toMatchInlineSnapshot(`"oklch(98.1% 0 none)"`)

    // theme colors
    expect(parseCssVarValue('ui-', 'light', 'color.accent.9')).toMatchInlineSnapshot(`"var(--ui-accent-9)"`)

    // theme tokens
    expect(parseCssVarValue('ui-', 'light', 'theme.foreground.default')).toMatchInlineSnapshot(`"var(--ui-fg)"`)
  })
})
