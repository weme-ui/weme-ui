import { describe, expect, it } from 'vitest'
import {
  defaults,
  dropShadow,
  insetShadow,
  perspective,
  radius,
  shadow,
  spacing,
  textShadow,
} from '~/theme/misc'

describe('spacing', () => {
  it('scales with --scaling', () => {
    expect(spacing.DEFAULT).toBe('calc(0.25rem * var(--scaling))')
    expect(spacing.lg).toBe('calc(1rem * var(--scaling))')
    expect(spacing['5xl']).toBe('calc(4rem * var(--scaling))')
  })
})

describe('radius', () => {
  it('scales with --scaling and --radius-factor', () => {
    expect(radius.none).toBe('0')
    expect(radius.DEFAULT).toBe('calc(0.25rem * var(--scaling) * var(--radius-factor))')
    expect(radius['2xl']).toBe('calc(1rem * var(--scaling) * var(--radius-factor))')
  })
})

describe('shadow', () => {
  it('exposes layered box shadows including inner', () => {
    expect(Array.isArray(shadow.DEFAULT)).toBe(true)
    expect(shadow.DEFAULT).toHaveLength(4)
    expect(shadow.inner.every(layer => layer.startsWith('inset '))).toBe(true)
  })
})

describe('insetShadow', () => {
  it('exposes inset shadow tokens', () => {
    expect(insetShadow.xs).toBe('inset 0 1px 1px rgb(0 0 0 / 0.05)')
    expect(insetShadow.none).toBe('0 0 rgb(0 0 0 / 0)')
  })
})

describe('dropShadow', () => {
  it('exposes drop-shadow tokens', () => {
    expect(dropShadow.sm).toBe('0 1px 2px rgb(0 0 0 / 0.15)')
    expect(dropShadow['2xl']).toBe('0 25px 25px rgb(0 0 0 / 0.15)')
  })
})

describe('textShadow', () => {
  it('exposes text-shadow tokens', () => {
    expect(textShadow.none).toBe('0 0 rgb(0 0 0 / 0)')
    expect(Array.isArray(textShadow.md)).toBe(true)
  })
})

describe('perspective', () => {
  it('exposes perspective distance tokens', () => {
    expect(perspective).toEqual({
      dramatic: '100px',
      near: '300px',
      normal: '500px',
      midrange: '800px',
      distant: '1200px',
    })
  })
})

describe('defaults', () => {
  it('exposes transition and font reset defaults', () => {
    expect(defaults.transition).toEqual({
      duration: '150ms',
      timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    })
    expect(defaults.font.family).toBe('var(--font-sans)')
    expect(defaults.monoFont.family).toBe('var(--font-mono)')
  })
})
