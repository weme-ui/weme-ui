import { describe, expect, it } from 'vitest'
import { useIconStackStyle } from './icon-stack.style'

describe('icon-stack', () => {
  it('applies default size and base slots', () => {
    const ui = useIconStackStyle({})
    expect(ui.root()).toContain('w-14')
    expect(ui.root()).toContain('h-16')
    expect(ui.root()).toContain('text-foreground')
    expect(ui.icon()).toContain('size-3.5')
    expect(ui.layerWrapper()).toContain('size-full')
    expect(ui.ellipse()).toContain('blur-xs')
    expect(ui.iconWrapper()).toContain('top-$icon-stack-content-y')
    expect(ui.iconWrapper()).toContain('left-$icon-stack-content-x')
    expect(ui.iconWrapper()).toContain('pointer-events-none')
  })

  it('applies size variants', () => {
    expect(useIconStackStyle({ size: 'xs' }).root()).toContain('w-11')
    expect(useIconStackStyle({ size: 'xs' }).icon()).toContain('size-3')
    expect(useIconStackStyle({ size: 'md' }).root()).toContain('w-18')
    expect(useIconStackStyle({ size: 'md' }).icon()).toContain('size-4')
    expect(useIconStackStyle({ size: 'lg' }).root()).toContain('w-24')
    expect(useIconStackStyle({ size: 'lg' }).icon()).toContain('size-6')
  })

  it('applies color variants', () => {
    expect(useIconStackStyle({ color: 'accent' }).root()).toContain('text-accent')
    expect(useIconStackStyle({ color: 'neutral' }).root()).toContain('text-neutral-11')
    expect(useIconStackStyle({ color: 'info' }).root()).toContain('text-info')
    expect(useIconStackStyle({ color: 'success' }).root()).toContain('text-success')
    expect(useIconStackStyle({ color: 'warning' }).root()).toContain('text-warning')
    expect(useIconStackStyle({ color: 'error' }).root()).toContain('text-error')
  })
})
