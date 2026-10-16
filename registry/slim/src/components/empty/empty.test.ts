import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import IconTile from '../icon-tile/icon-tile.vue'
import { useEmptyStyle } from './empty.style'
import Empty from './empty.vue'

describe('empty', () => {
  it('applies default size and styled surface classes', () => {
    const ui = useEmptyStyle({})
    expect(ui.root()).toContain('text-sm')
    expect(ui.root()).toContain('gap-md')
    expect(ui.root()).toContain('b-transparent')
    expect(ui.root()).toContain('flex-center')
    expect(ui.header()).toContain('gap-sm')
    expect(ui.header()).toContain('text-highlighted')
    expect(ui.description()).toContain('text-xs')
    expect(ui.description()).toContain('text-subtle')
  })

  it('applies size variants', () => {
    const sm = useEmptyStyle({ size: 'sm' })
    expect(sm.root()).toContain('text-xs')
    expect(sm.root()).toContain('gap-sm')
    expect(sm.header()).toContain('gap-xs')
    expect(sm.description()).toContain('text-xs')

    const lg = useEmptyStyle({ size: 'lg' })
    expect(lg.root()).toContain('text-base')
    expect(lg.root()).toContain('gap-lg')
    expect(lg.header()).toContain('gap-md')
    expect(lg.description()).toContain('text-sm')
  })

  it('skips surface classes when unstyled is true', () => {
    const ui = useEmptyStyle({ unstyled: true })
    expect(ui.root()).not.toContain('b-transparent')
    expect(ui.header()).not.toContain('text-highlighted')
    expect(ui.description()).not.toContain('text-subtle')
  })

  describe('given a default empty state', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const wrapper = mount(Empty, {
        attachTo: document.body,
        props: { icon: 'ri:inbox-line' },
        slots: {
          title: 'No results',
          description: 'Try adjusting your filters.',
        },
      })
      expect(wrapper.attributes('data-slot')).toBe('empty')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders IconTile with soft variant and mapped size', () => {
      const wrapper = mount(Empty, {
        attachTo: document.body,
        props: { icon: 'ri:inbox-line', size: 'md' },
      })
      const tile = wrapper.findComponent(IconTile)
      expect(tile.exists()).toBe(true)
      expect(tile.props('variant')).toBe('soft')
      expect(tile.props('size')).toBe('sm')
      expect(tile.props('icon')).toBe('ri:inbox-line')
      wrapper.unmount()
    })

    it('maps Empty size to IconTile size', () => {
      const sm = mount(Empty, {
        props: { icon: 'ri:inbox-line', size: 'sm' },
      })
      expect(sm.findComponent(IconTile).props('size')).toBe('xs')
      sm.unmount()

      const lg = mount(Empty, {
        props: { icon: 'ri:inbox-line', size: 'lg' },
      })
      expect(lg.findComponent(IconTile).props('size')).toBe('md')
      lg.unmount()
    })

    it('does not render IconTile when icon is omitted', () => {
      const wrapper = mount(Empty)
      expect(wrapper.findComponent(IconTile).exists()).toBe(false)
      wrapper.unmount()
    })
  })
})
