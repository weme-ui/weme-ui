import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import Form from './form.vue'

describe('form', () => {
  describe('given a form with a submit control', () => {
    it('renders layout classes, novalidate, and data-slot', () => {
      const handleSubmit = vi.fn()
      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          name: 'demo',
          form: { handleSubmit } as any,
        },
        slots: {
          default: '<button type="submit">Save</button>',
        },
      })

      const form = wrapper.get('form')
      expect(form.attributes('name')).toBe('demo')
      expect(form.attributes('novalidate')).toBeDefined()
      expect(form.attributes('data-slot')).toBe('form')
      expect(form.attributes('class')).toContain('flex')
      expect(form.attributes('class')).toContain('flex-col')
      expect(form.attributes('class')).toContain('gap-4')
      wrapper.unmount()
    })

    it('calls form.handleSubmit on submit', async () => {
      const handleSubmit = vi.fn()
      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          name: 'demo',
          form: { handleSubmit } as any,
        },
        slots: {
          default: '<button type="submit">Save</button>',
        },
      })

      await wrapper.get('form').trigger('submit')
      expect(handleSubmit).toHaveBeenCalledTimes(1)
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const handleSubmit = vi.fn()
      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          name: 'demo',
          form: { handleSubmit } as any,
        },
        slots: {
          default: '<button type="submit">Save</button>',
        },
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
