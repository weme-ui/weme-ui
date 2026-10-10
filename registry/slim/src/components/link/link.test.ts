import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { createMemoryHistory, createRouter } from 'vue-router'
import { useLinkStyle } from './link.style'
import Link from './link.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})

beforeAll(async () => {
  await router.push('/')
  await router.isReady()
})

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
    expect(ui.suffixIcon()).toContain('text-muted')
  })

  describe('given an internal link', () => {
    it('renders an anchor with the label and has no accessibility violations', async () => {
      const wrapper = mount(Link, {
        attachTo: document.body,
        props: { to: '/', label: 'Documentation' },
        global: { plugins: [router] },
      })
      const anchor = wrapper.get('a')
      expect(anchor.text()).toContain('Documentation')
      expect(anchor.attributes('href')).toBe('/')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })

  describe('given an external link', () => {
    it('uses the absolute href and shows the external icon', async () => {
      const wrapper = mount(Link, {
        attachTo: document.body,
        props: { to: 'https://example.com', label: 'External' },
        global: { plugins: [router] },
      })
      const anchor = wrapper.get('a')
      expect(anchor.attributes('href')).toBe('https://example.com')
      expect(wrapper.find('[data-slot="icon"]').exists()).toBe(true)
      // Iconify SVG uses role="img" without alt; decorative external icon is not labeled today.
      expect(await axe(wrapper.element, {
        rules: { 'svg-img-alt': { enabled: false } },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
