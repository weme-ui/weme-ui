import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
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
})
