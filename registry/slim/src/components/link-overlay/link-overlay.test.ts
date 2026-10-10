import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useLinkOverlayStyle } from './link-overlay.style'
import LinkOverlay from './link-overlay.vue'

describe('link-overlay', () => {
  it('applies overlay base styles', () => {
    const ui = useLinkOverlayStyle()
    expect(ui.base()).toContain('static')
    expect(ui.base()).toContain('before:(block cursor-inherit content-[""] inset-0 abs)')
  })

  describe('given a link overlay', () => {
    it('renders as an anchor with data-slot and has no accessibility violations', async () => {
      const wrapper = mount(LinkOverlay, {
        attachTo: document.body,
        attrs: { href: '#section' },
        slots: { default: 'Open card' },
      })
      expect(wrapper.attributes('data-slot')).toBe('link-overlay')
      expect(wrapper.attributes('href')).toBe('#section')
      expect(wrapper.text()).toContain('Open card')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
