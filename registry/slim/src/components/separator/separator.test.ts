import { describe, expect, it } from 'vitest'
import { useSeparatorStyle } from './separator.style'

describe('separator', () => {
  it('applies default color, variant, and orientation', () => {
    const ui = useSeparatorStyle({})
    expect(ui.line()).toContain('b-solid')
    expect(ui.line()).toContain('b-base')
    expect(ui.line()).toContain('b-t')
    expect(ui.line()).toContain('w-full')
    expect(ui.line()).toContain('h-px')
    expect(ui.label()).toContain('text-subtle')
  })

  it('applies orientation variants', () => {
    expect(useSeparatorStyle({ orientation: 'horizontal' }).line()).toContain('w-full')
    expect(useSeparatorStyle({ orientation: 'horizontal' }).line()).toContain('h-px')
    expect(useSeparatorStyle({ orientation: 'horizontal' }).line()).toContain('b-t')

    expect(useSeparatorStyle({ orientation: 'vertical' }).line()).toContain('w-px')
    expect(useSeparatorStyle({ orientation: 'vertical' }).line()).toContain('h-full')
    expect(useSeparatorStyle({ orientation: 'vertical' }).line()).toContain('b-r')
  })

  it('applies line style variants', () => {
    expect(useSeparatorStyle({ variant: 'solid' }).line()).toContain('b-solid')
    expect(useSeparatorStyle({ variant: 'dashed' }).line()).toContain('b-dashed')
    expect(useSeparatorStyle({ variant: 'dotted' }).line()).toContain('b-dotted')
    expect(useSeparatorStyle({ variant: 'double' }).line()).toContain('b-double')
  })

  it('applies color compound classes for border variants', () => {
    expect(useSeparatorStyle({ color: 'base', variant: 'solid' }).line()).toContain('b-base')
    expect(useSeparatorStyle({ color: 'elevated', variant: 'dashed' }).line()).toContain('b-elevated')
    expect(useSeparatorStyle({ color: 'inverted', variant: 'dotted' }).line()).toContain('b-inverted')
  })

  it('applies gradient variant classes', () => {
    const none = useSeparatorStyle({ variant: 'gradient', labelPosition: 'none' })
    expect(none.line()).toContain('from-transparent')
    expect(none.line()).toContain('to-transparent')
    expect(none.line()).toContain('via-border-base')
    expect(none.line()).toContain('bg-linear-to-r')

    expect(useSeparatorStyle({
      color: 'elevated',
      variant: 'gradient',
      labelPosition: 'none',
    }).line()).toContain('via-border-elevated')

    expect(useSeparatorStyle({
      color: 'base',
      variant: 'gradient',
      labelPosition: 'start',
    }).line()).toContain('from-border-base')

    expect(useSeparatorStyle({
      color: 'inverted',
      variant: 'gradient',
      labelPosition: 'end',
    }).line()).toContain('to-border-inverted')

    expect(useSeparatorStyle({
      orientation: 'vertical',
      variant: 'gradient',
    }).line()).toContain('bg-linear-to-b')
  })

  it('applies label position layout classes', () => {
    const center = useSeparatorStyle({
      orientation: 'horizontal',
      labelPosition: 'center',
    })
    expect(center.root()).toContain('flex')
    expect(center.root()).toContain('items-center')
    expect(center.line()).toContain('w-auto')
    expect(center.line()).toContain('flex-1')

    expect(useSeparatorStyle({ labelPosition: 'none' }).root() || '').not.toContain('flex')
  })
})
