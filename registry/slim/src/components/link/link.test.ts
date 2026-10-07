import { describe, expect, it } from 'vitest'
import { useLinkStyle } from './link.style'

describe('link', () => {
  it('applies default slots and accent color', () => {
    const ui = useLinkStyle({})
    expect(ui.root()).toContain('flex-(inline y-center)')
    expect(ui.root()).toContain('gap-x-2')
    expect(ui.root()).toContain('fancy-accent-plain')
    expect(ui.root()).toContain('transition-colors')
    expect(ui.prefixIcon()).toContain('size-4')
    expect(ui.prefixIcon()).toContain('transition-colors')
    expect(ui.suffixIcon()).toContain('size-4')
    expect(ui.suffixIcon()).toContain('transition-colors')
  })

  it('applies color variants', () => {
    expect(useLinkStyle({ color: 'accent' }).root()).toContain('fancy-accent-plain')
    expect(useLinkStyle({ color: 'neutral' }).root()).toContain('fancy-neutral-plain')
    expect(useLinkStyle({ color: 'info' }).root()).toContain('fancy-info-plain')
    expect(useLinkStyle({ color: 'success' }).root()).toContain('fancy-success-plain')
    expect(useLinkStyle({ color: 'warning' }).root()).toContain('fancy-warning-plain')
    expect(useLinkStyle({ color: 'error' }).root()).toContain('fancy-error-plain')
  })

  it('skips fancy color classes when unstyled', () => {
    const ui = useLinkStyle({ unstyled: true, color: 'accent' })
    expect(ui.root()).not.toContain('fancy-')
  })

  it('applies muted suffix icon when external', () => {
    const ui = useLinkStyle({ external: true })
    expect(ui.suffixIcon()).toContain('text-foreground-muted')
  })
})
