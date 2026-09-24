import { describe, expect, it } from 'vitest'
import { font, fontWeight, leading, text, textStrokeWidth, tracking } from '~/theme/font'

describe('font', () => {
  it('exposes sans, serif and mono stacks', () => {
    expect(font.sans).toContain('system-ui')
    expect(font.serif).toContain('"Times New Roman"')
    expect(font.mono).toContain('"Menlo"')
  })
})

describe('text', () => {
  it('exposes the radix-inspired type scale', () => {
    expect(text.xs).toEqual({
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '0.0025em',
    })
    expect(text.base).toEqual({
      fontSize: '1rem',
      lineHeight: '1.5rem',
    })
    expect(text['5xl']).toEqual({
      fontSize: '3.75rem',
      lineHeight: '1',
      letterSpacing: '-0.025em',
    })
  })
})

describe('fontWeight', () => {
  it('exposes the radix font weights', () => {
    expect(fontWeight).toEqual({
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    })
  })
})

describe('tracking', () => {
  it('exposes letter-spacing tokens', () => {
    expect(tracking.tighter).toBe('-0.05em')
    expect(tracking.normal).toBe('0em')
    expect(tracking.widest).toBe('0.1em')
  })
})

describe('leading', () => {
  it('exposes line-height tokens', () => {
    expect(leading.none).toBe('1')
    expect(leading.normal).toBe('1.5')
    expect(leading.loose).toBe('2')
  })
})

describe('textStrokeWidth', () => {
  it('exposes stroke width tokens', () => {
    expect(textStrokeWidth).toEqual({
      DEFAULT: '1.5rem',
      none: '0',
      sm: 'thin',
      md: 'medium',
      lg: 'thick',
    })
  })
})
