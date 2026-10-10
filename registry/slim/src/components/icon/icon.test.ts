import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Icon from './icon.vue'

describe('icon', () => {
  it('passes name as the iconify icon prop', () => {
    const wrapper = shallowMount(Icon, {
      props: { name: 'ri:discord-line' },
    })

    expect(wrapper.findComponent({ name: 'Icon' }).props('icon')).toBe('ri:discord-line')
  })

  it('prefers icon prop over name when both are set', () => {
    const wrapper = shallowMount(Icon, {
      props: {
        name: 'ri:facebook-line',
        icon: 'ri:instagram-line',
      },
    })

    expect(wrapper.findComponent({ name: 'Icon' }).props('icon')).toBe('ri:instagram-line')
  })

  describe('given a named icon', () => {
    it('renders data-slot and has no accessibility violations', async () => {
      const wrapper = mount(Icon, {
        attachTo: document.body,
        props: { 'name': 'ri:discord-line', 'aria-hidden': true },
      })
      expect(wrapper.attributes('data-slot')).toBe('icon')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
