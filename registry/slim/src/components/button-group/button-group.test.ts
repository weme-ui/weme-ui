import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { h } from 'vue'
import Button from '../button/button.vue'
import { useButtonGroupStyle } from './button-group.style'
import ButtonGroup from './button-group.vue'

describe('button-group', () => {
  it('applies default orientation and gap', () => {
    const ui = useButtonGroupStyle({})
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('gap-md')
    expect(ui.root()).not.toContain('flex-col')
    expect(ui.separator()).toContain('w-px')
    expect(ui.separator()).toContain('bg-border-base')
  })

  it('applies vertical orientation', () => {
    const ui = useButtonGroupStyle({ orientation: 'vertical' })
    expect(ui.root()).toContain('flex-col')
    expect(ui.root()).toContain('items-stretch')
    expect(ui.separator()).toContain('h-px')
    expect(ui.separator()).not.toContain('w-px')
  })

  it('applies gap variants', () => {
    expect(useButtonGroupStyle({ gap: 'none' }).root()).not.toContain('gap-')
    expect(useButtonGroupStyle({ gap: 'xs' }).root()).toContain('gap-xs')
    expect(useButtonGroupStyle({ gap: 'sm' }).root()).toContain('gap-sm')
    expect(useButtonGroupStyle({ gap: 'lg' }).root()).toContain('gap-lg')
    expect(useButtonGroupStyle({ gap: 'xl' }).root()).toContain('gap-xl')
  })

  it('joins horizontal items when gap is none', () => {
    const ui = useButtonGroupStyle({ orientation: 'horizontal', gap: 'none', separator: false })
    expect(ui.item()).toContain('data-[order=first]:rounded-r-none')
    expect(ui.item()).toContain('data-[order=last]:rounded-l-none')
    expect(ui.item()).toContain('data-[order=between]:rounded-none')
    expect(ui.item()).toContain('data-[order=first]:border-r-0')
    expect(ui.item()).toContain('data-[order=between]:border-r-0')
  })

  it('joins vertical items when gap is none', () => {
    const ui = useButtonGroupStyle({ orientation: 'vertical', gap: 'none', separator: false })
    expect(ui.item()).toContain('data-[order=first]:rounded-b-none')
    expect(ui.item()).toContain('data-[order=last]:rounded-t-none')
    expect(ui.item()).toContain('data-[order=between]:rounded-none')
    expect(ui.item()).toContain('data-[order=first]:border-b-0')
    expect(ui.item()).toContain('data-[order=between]:border-b-0')
  })

  it('keeps joined rounding but skips border collapse when separator is true', () => {
    const ui = useButtonGroupStyle({ orientation: 'horizontal', gap: 'none', separator: true })
    expect(ui.item()).toContain('data-[order=first]:rounded-r-none')
    expect(ui.item()).not.toContain('data-[order=first]:border-r-0')
  })

  describe('given a group with two buttons', () => {
    it('exposes role=group and has no accessibility violations', async () => {
      const wrapper = mount(ButtonGroup, {
        attachTo: document.body,
        slots: {
          default: () => [
            h(Button, { label: 'One' }),
            h(Button, { label: 'Two' }),
          ],
        },
      })
      expect(wrapper.attributes('role')).toBe('group')
      expect(wrapper.attributes('data-slot')).toBe('button-group')
      // role="group" + aria-orientation comes from RovingFocusGroup; axe flags aria-allowed-attr.
      expect(await axe(wrapper.element, {
        rules: { 'aria-allowed-attr': { enabled: false } },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
