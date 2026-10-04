import { describe, expect, it } from 'vitest'
import { useButtonStyle } from './button.style'

describe('button', () => {
  it('applies default size, radius, and primary solid compound', () => {
    const ui = useButtonStyle({})
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('rounded-sm')
    expect(ui.root()).toContain('fancy-primary')
  })

  it('applies size variants', () => {
    expect(useButtonStyle({ size: 'sm' }).root()).toContain('h-6')
    expect(useButtonStyle({ size: 'lg' }).root()).toContain('h-10')
    expect(useButtonStyle({ size: 'sm' }).icon()).toContain('size-3')
    expect(useButtonStyle({ size: 'lg' }).icon()).toContain('size-4')
  })

  it('applies color and variant compounds', () => {
    expect(useButtonStyle({ color: 'error', variant: 'solid' }).root()).toContain('fancy-error')
    expect(useButtonStyle({ color: 'primary', variant: 'soft' }).root()).toContain('fancy-primary-soft')
    expect(useButtonStyle({ color: 'info', variant: 'outline' }).root()).toContain('fancy-info-outline')
    expect(useButtonStyle({ color: 'success', variant: 'ghost' }).root()).toContain('fancy-success-ghost')
    expect(useButtonStyle({ color: 'warning', variant: 'inverse' }).root()).toContain('fancy-warning-inverse')
  })

  it('applies disabled and loading states', () => {
    const disabled = useButtonStyle({ disabled: true })
    expect(disabled.root()).toContain('is-disabled')

    const loading = useButtonStyle({ loading: true })
    expect(loading.root()).toContain('is-loading')
    expect(loading.icon()).toContain('animate-spin')
  })
})
