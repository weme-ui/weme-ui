import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import AnimatedSelectIcon from './animated-select-icon.vue'

describe('animated-select-icon', () => {
  describe('given an unselected icon', () => {
    it('sets data-slot and omits data-selected', async () => {
      const wrapper = mount(AnimatedSelectIcon, {
        attachTo: document.body,
        props: {
          icon: 'ri:checkbox-blank-line',
          selected: false,
        },
      })
      await nextTick()
      const root = wrapper.get('[data-slot="animated-select-icon"]')
      expect(root.attributes('data-selected')).toBeUndefined()
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mount(AnimatedSelectIcon, {
        attachTo: document.body,
        props: {
          'icon': 'ri:checkbox-blank-line',
          'selected': false,
          'aria-hidden': true,
        },
      })
      await nextTick()
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify SVG uses role="img" without alt.
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })

  describe('given a selected icon', () => {
    it('sets data-selected', async () => {
      const wrapper = mount(AnimatedSelectIcon, {
        attachTo: document.body,
        props: {
          icon: 'ri:checkbox-blank-line',
          selectedIcon: 'ri:checkbox-line',
          selected: true,
        },
      })
      await nextTick()
      expect(wrapper.get('[data-slot="animated-select-icon"]').attributes('data-selected')).toBe('')
      wrapper.unmount()
    })
  })
})
