import { describe, expect, it } from 'vitest'
import { useButtonStyle } from './button.style'

describe('button', () => {
  it('applies default size, radius, primary variant, and scalable press style', () => {
    const ui = useButtonStyle({})
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('rounded-sm')
    expect(ui.root()).toContain('fancy-accent')
    expect(ui.root()).toContain('transition-all')
    expect(ui.root()).toContain('aria-[pressed=true]:scale-96')
  })

  it('applies size variants', () => {
    expect(useButtonStyle({ size: 'sm' }).root()).toContain('h-6')
    expect(useButtonStyle({ size: 'lg' }).root()).toContain('h-10')
    expect(useButtonStyle({ size: 'sm' }).icon()).toContain('size-3')
    expect(useButtonStyle({ size: 'lg' }).icon()).toContain('size-4')
  })

  it('applies radius variants', () => {
    expect(useButtonStyle({ radius: 'none' }).root()).not.toContain('rounded-')
    expect(useButtonStyle({ radius: 'md' }).root()).toContain('rounded-md')
    expect(useButtonStyle({ radius: 'full' }).root()).toContain('rounded-full')
  })

  it('applies appearance variants', () => {
    expect(useButtonStyle({ variant: 'primary' }).root()).toContain('fancy-accent')
    expect(useButtonStyle({ variant: 'secondary' }).root()).toContain('fancy-neutral-soft')
    expect(useButtonStyle({ variant: 'soft' }).root()).toContain('fancy-accent-soft')
    expect(useButtonStyle({ variant: 'outline' }).root()).toContain('fancy-neutral-outline')
    expect(useButtonStyle({ variant: 'ghost' }).root()).toContain('fancy-accent-ghost')
    expect(useButtonStyle({ variant: 'plain' }).root()).toContain('fancy-accent-plain')
    expect(useButtonStyle({ variant: 'inverse' }).root()).toContain('fancy-accent-inverse')
    expect(useButtonStyle({ variant: 'danger' }).root()).toContain('fancy-error')
    expect(useButtonStyle({ variant: 'unstyled' }).root()).not.toContain('fancy-')
  })

  it('skips pressed scale for plain, unstyled, and scalable false', () => {
    expect(useButtonStyle({ variant: 'plain' }).root()).not.toContain('aria-[pressed=true]:scale-96')
    expect(useButtonStyle({ variant: 'unstyled' }).root()).not.toContain('aria-[pressed=true]:scale-96')
    expect(useButtonStyle({ scalable: false }).root()).not.toContain('aria-[pressed=true]:scale-96')
  })

  it('applies disabled and loading states', () => {
    const disabled = useButtonStyle({ disabled: true })
    expect(disabled.root()).toContain('is-disabled')
    expect(disabled.root()).not.toContain('aria-[pressed=true]:scale-96')

    const loading = useButtonStyle({ loading: true })
    expect(loading.root()).toContain('is-loading')
    expect(loading.icon()).toContain('animate-spin')
    expect(loading.root()).not.toContain('aria-[pressed=true]:scale-96')
  })
})
