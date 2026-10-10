import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h } from 'vue'
import { useForm } from '~/composables/use-form-context'
import Form from '../form/form.vue'
import { useFormFieldStyle } from './form-field.style'
import FormField from './form-field.vue'

function mountFormField(props: Record<string, unknown> = {}) {
  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { email: '' },
        onSubmit: async () => {},
      })

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'email', label: 'Email', ...props }, {
          default: () => h('input', {
            'type': 'email',
            'aria-label': 'Email',
          }),
        }))
    },
  })

  return mount(Root, { attachTo: document.body })
}

describe('form-field', () => {
  it('applies default vertical orientation and base slots', () => {
    const ui = useFormFieldStyle({})

    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('gap-2')
    expect(ui.root()).toContain('flex-col')
    expect(ui.header()).toContain('flex')
    expect(ui.header()).toContain('flex-col')
    expect(ui.labelWrapper()).toContain('flex')
    expect(ui.labelWrapper()).toContain('gap-1')
    expect(ui.label()).toContain('text-(base highlighted nowrap)')
    expect(ui.label()).toContain('font-medium')
    expect(ui.description()).toContain('text-(sm subtle)')
    expect(ui.required()).toContain('text-red')
    expect(ui.required()).toContain('align-middle')
    expect(ui.content()).toContain('flex')
    expect(ui.content()).toContain('flex-col')
    expect(ui.hint()).toContain('text-(xs muted)')
    expect(ui.help()).toContain('text-(xs muted)')
    expect(ui.errors()).toContain('text-(xs error)')
  })

  it('applies orientation variants', () => {
    const vertical = useFormFieldStyle({ orientation: 'vertical' })
    expect(vertical.root()).toContain('flex-col')
    expect(vertical.description()).not.toContain('items-center')

    const horizontal = useFormFieldStyle({ orientation: 'horizontal' })
    expect(horizontal.root()).not.toContain('flex-col')
    expect(horizontal.description()).toContain('items-center')
  })

  it('applies loading and disabled states', () => {
    expect(useFormFieldStyle({ loading: true }).root()).toContain('is-loading')
    expect(useFormFieldStyle({ disabled: true }).content()).toContain('is-disabled')
  })

  describe('given a labeled field inside a form', () => {
    it('renders the label and data-slot', () => {
      const wrapper = mountFormField()
      expect(wrapper.find('[data-slot="form-field"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('Email')
      wrapper.unmount()
    })

    it('shows the required marker when required', () => {
      const wrapper = mountFormField({ required: true })
      expect(wrapper.text()).toContain('*')
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mountFormField({ description: 'Work email' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
