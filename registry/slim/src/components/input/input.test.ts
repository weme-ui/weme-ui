import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useInputStyle } from './input.style'
import Input from './input.vue'

function mountInput(inputProps: Record<string, unknown> = {}) {
  const model = ref((inputProps.modelValue as string | undefined) ?? '')

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { name: model.value },
        onSubmit: async () => {},
      })

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'name', label: 'Name' }, {
          default: () => h(Input, {
            ...inputProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: string | number | null | undefined) => {
              model.value = value == null ? '' : String(value)
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('input', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useInputStyle({})
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('px-2.5')
    expect(ui.root()).toContain('transition-colors')
    expect(ui.input()).toContain('placeholder:text-subtle')
  })

  it('applies size variants and padding compounds', () => {
    expect(useInputStyle({ size: 'sm' }).root()).toContain('h-6')
    expect(useInputStyle({ size: 'sm' }).root()).toContain('px-1.5')
    expect(useInputStyle({ size: 'lg' }).root()).toContain('h-10')
    expect(useInputStyle({ size: 'lg' }).root()).toContain('px-3')
    expect(useInputStyle({ size: 'sm', radius: 'full' }).root()).toContain('px-2.25')
    expect(useInputStyle({ size: 'md', radius: 'full' }).root()).toContain('px-3.5')
  })

  it('applies radius variants', () => {
    expect(useInputStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(useInputStyle({ radius: 'md' }).root()).toContain('rounded-md')
    expect(useInputStyle({ radius: 'full' }).root()).toContain('rounded-full')
  })

  it('applies appearance variants', () => {
    const soft = useInputStyle({ variant: 'soft' }).root().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = useInputStyle({ variant: 'outline' }).root().split(/\s+/)
    expect(outline).toContain('bg-base')
    expect(outline).toContain('b')

    expect(useInputStyle({ variant: 'unstyled' }).root()).not.toContain('bg-muted')
    expect(useInputStyle({ variant: 'unstyled' }).root()).not.toContain('transition-colors')
  })

  it('applies soft and outline focus compounds when valid', () => {
    const soft = useInputStyle({ variant: 'soft', invalid: false })
    expect(soft.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.root()).toContain('hover:not-[[data-focused]]:bg-elevated')

    const outline = useInputStyle({ variant: 'outline', invalid: false })
    expect(outline.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(outline.root()).toContain('hover:not-[[data-focused]]:b-elevated')
  })

  it('applies invalid border for soft and outline', () => {
    expect(useInputStyle({ variant: 'soft', invalid: true }).root()).toContain('b-error')
    expect(useInputStyle({ variant: 'soft', invalid: true }).root()).toContain('outline-error-4')
    expect(useInputStyle({ variant: 'outline', invalid: true }).root()).toContain('b-error')
  })

  it('applies disabled and loading states', () => {
    expect(useInputStyle({ disabled: true }).root()).toContain('is-disabled')

    const loading = useInputStyle({ loading: true })
    expect(loading.root()).toContain('is-loading')
    expect(loading.suffixIcon()).toContain('animate-spin')
  })

  it('applies overcount and affix focus colors', () => {
    expect(useInputStyle({ overcount: true }).counter()).toContain('text-error')

    const prefix = useInputStyle({ variant: 'soft', invalid: false }).prefix()
    expect(prefix).toContain('group-data-[focused]:text-highlighted')
    expect(prefix).toContain('not-[[data-focused]]:text-subtle')
  })

  describe('given an input inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountInput({ placeholder: 'Your name' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('updates modelValue on input', async () => {
      const { wrapper, model } = mountInput({ modelValue: '' })
      const input = wrapper.get('input')
      await input.setValue('hello')
      expect(model.value).toBe('hello')
      wrapper.unmount()
    })

    it('renders the counter when countable', async () => {
      const { wrapper } = mountInput({
        modelValue: 'hi',
        countable: true,
        maxLength: 10,
      })
      await nextTick()
      expect(wrapper.text()).toContain('2 / 10')
      wrapper.unmount()
    })

    it('clears the value when the clean control is clicked', async () => {
      const { wrapper, model } = mountInput({
        modelValue: 'hello',
        clearable: true,
      })
      await nextTick()
      const cleanBtn = wrapper.get('button[type="button"]')
      await cleanBtn.trigger('click')
      expect(model.value).toBe('')
      wrapper.unmount()
    })

    it('does not show the clean control when disabled', async () => {
      const { wrapper } = mountInput({
        modelValue: 'hello',
        clearable: true,
        disabled: true,
      })
      await nextTick()
      expect(wrapper.find('button[type="button"]').exists()).toBe(false)
      wrapper.unmount()
    })

    it('skips button-name and svg-img-alt for icon-only clean control', async () => {
      // Clear control is icon-only; Iconify SVG uses role="img" without alt.
      const { wrapper } = mountInput({
        modelValue: 'hello',
        clearable: true,
      })
      await nextTick()
      expect(await axe(wrapper.element, {
        rules: {
          'button-name': { enabled: false },
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
