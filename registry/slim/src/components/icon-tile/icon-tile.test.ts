import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useIconTileStyle } from './icon-tile.style'
import IconTile from './icon-tile.vue'

describe('icon-tile', () => {
  it('applies default color, variant, size, and radius', () => {
    const ui = useIconTileStyle({})
    expect(ui.root()).toContain('size-10')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('plain-neutral')
    expect(ui.icon()).toContain('size-4.5')
    expect(ui.icon()).toContain('pointer-events-none')
  })

  it('applies size variants', () => {
    expect(useIconTileStyle({ size: 'xs' }).root()).toContain('size-6')
    expect(useIconTileStyle({ size: 'xs' }).icon()).toContain('size-3.5')
    expect(useIconTileStyle({ size: 'sm' }).root()).toContain('size-8')
    expect(useIconTileStyle({ size: 'lg' }).root()).toContain('size-12')
    expect(useIconTileStyle({ size: 'xl' }).root()).toContain('size-14')
    expect(useIconTileStyle({ size: 'xl' }).icon()).toContain('size-7')
  })

  it('applies radius variants', () => {
    expect(useIconTileStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(useIconTileStyle({ radius: 'sm' }).root()).toContain('rounded-sm')
    expect(useIconTileStyle({ radius: 'full' }).root()).toContain('rounded-full')
  })

  it('applies color and variant compound classes', () => {
    expect(useIconTileStyle({ color: 'accent', variant: 'solid' }).root()).toContain('plain-accent')
    expect(useIconTileStyle({ color: 'info', variant: 'soft' }).root()).toContain('plain-info-soft')
    expect(useIconTileStyle({ color: 'success', variant: 'elevated' }).root()).toContain('plain-success-elevated')
    expect(useIconTileStyle({ color: 'warning', variant: 'outline' }).root()).toContain('plain-warning-outline')
    expect(useIconTileStyle({ color: 'error', variant: 'frame' }).root()).toContain('plain-error-frame')
    expect(useIconTileStyle({ color: 'neutral', variant: 'inverse' }).root()).toContain('plain-neutral-inverse')
  })

  it('skips surface classes for unstyled variant', () => {
    expect(useIconTileStyle({ variant: 'unstyled' }).root()).not.toContain('plain-')
  })

  describe('given a decorative icon tile', () => {
    it('is aria-hidden and has no accessibility violations', async () => {
      const wrapper = mount(IconTile, {
        attachTo: document.body,
        props: { icon: 'ri:discord-line' },
      })
      expect(wrapper.attributes('aria-hidden')).toBe('true')
      expect(wrapper.attributes('data-slot')).toBe('icon-tile')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
