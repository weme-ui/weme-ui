import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import ConfigProvider from './config-provider.vue'

describe('config-provider', () => {
  describe('given a default provider', () => {
    it('renders the default slot', () => {
      const wrapper = mount(ConfigProvider, {
        attachTo: document.body,
        slots: {
          default: '<p>app</p>',
        },
      })

      expect(wrapper.text()).toBe('app')
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mount(ConfigProvider, {
        attachTo: document.body,
        slots: {
          default: '<p>app</p>',
        },
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
