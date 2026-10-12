import type { AnyFormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { usePasswordInputStyle } from './password-input.style'
import PasswordInput from './password-input.vue'

function mountPasswordInput(inputProps: Record<string, unknown> = {}) {
  const model = ref((inputProps.modelValue as string | undefined) ?? '')
  const visible = ref((inputProps.visible as boolean | undefined) ?? false)

  const Root = defineComponent({
    setup() {
      // FormApi is invariant in TData; cast so h(Form) accepts useForm()'s concrete return type.
      const form = useForm({
        defaultValues: { password: model.value },
        onSubmit: async () => {},
      }) as AnyFormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'password', label: 'Password' }, {
          default: () => h(PasswordInput, {
            'toggleVisibility': true,
            ...inputProps,
            'modelValue': model.value,
            'visible': visible.value,
            'onUpdate:modelValue': (value: string | number | null | undefined) => {
              model.value = value == null ? '' : String(value)
            },
            'onUpdate:visible': (value: boolean) => {
              visible.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model, visible }
}

function toggleButton(wrapper: ReturnType<typeof mount>) {
  return wrapper.get('button[aria-label="Toggle password visibility"]')
}

describe('password-input', () => {
  it('applies extended input defaults and visibility base classes', () => {
    const ui = usePasswordInputStyle({})
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('transition-colors')
    expect(ui.visibility()).toContain('cursor-pointer')
    expect(ui.visibility()).toContain('transition-colors')
    expect(ui.visibility()).toContain('duration-200')
    expect(ui.visibility()).toContain('hover:text-foreground')
  })

  it('applies size variants to the visibility control', () => {
    expect(usePasswordInputStyle({ size: 'sm' }).visibility()).toContain('size-4')
    expect(usePasswordInputStyle({ size: 'sm' }).visibility()).toContain('-mr-0.5')
    expect(usePasswordInputStyle({ size: 'md' }).visibility()).toContain('size-6')
    expect(usePasswordInputStyle({ size: 'md' }).visibility()).toContain('-mr-1')
    expect(usePasswordInputStyle({ size: 'lg' }).visibility()).toContain('size-8')
    expect(usePasswordInputStyle({ size: 'lg' }).visibility()).toContain('-mr-1.5')
  })

  it('applies radius and appearance from the extended input style', () => {
    expect(usePasswordInputStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(usePasswordInputStyle({ radius: 'full' }).root()).toContain('rounded-full')

    const soft = usePasswordInputStyle({ variant: 'soft' }).root().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = usePasswordInputStyle({ variant: 'outline' }).root().split(/\s+/)
    expect(outline).toContain('bg-base')
    expect(outline).toContain('b')
  })

  it('skips visibility hover styles when unstyled', () => {
    const unstyled = usePasswordInputStyle({ unstyled: true })
    expect(unstyled.visibility()).not.toContain('hover:text-foreground')
    expect(unstyled.root()).not.toContain('bg-muted')
  })

  describe('given a password input inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      // Iconify stub SVGs use role="img" without alt.
      const { wrapper } = mountPasswordInput({ placeholder: 'Password' })
      expect(await axe(wrapper.element, {
        rules: {
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders a masked password field with a visibility toggle', () => {
      const { wrapper } = mountPasswordInput()
      expect(wrapper.get('input').attributes('type')).toBe('password')
      expect(wrapper.find('button[aria-label="Toggle password visibility"]').exists()).toBe(true)
      wrapper.unmount()
    })

    it('toggles to text type and updates visible when the control is clicked', async () => {
      const { wrapper, visible } = mountPasswordInput({ modelValue: 'secret' })
      await toggleButton(wrapper).trigger('click')
      await nextTick()
      expect(visible.value).toBe(true)
      expect(wrapper.get('input').attributes('type')).toBe('text')

      await toggleButton(wrapper).trigger('click')
      await nextTick()
      expect(visible.value).toBe(false)
      expect(wrapper.get('input').attributes('type')).toBe('password')
      wrapper.unmount()
    })

    it('starts as text when visible is true', () => {
      const { wrapper } = mountPasswordInput({ visible: true, modelValue: 'secret' })
      expect(wrapper.get('input').attributes('type')).toBe('text')
      wrapper.unmount()
    })

    it('updates modelValue on input', async () => {
      const { wrapper, model } = mountPasswordInput({ modelValue: '' })
      await wrapper.get('input').setValue('hunter2')
      expect(model.value).toBe('hunter2')
      wrapper.unmount()
    })

    it('emits focus and blur from the input', async () => {
      const { wrapper } = mountPasswordInput()
      const input = wrapper.get('input')
      await input.trigger('focus')
      await input.trigger('blur')
      const passwordInput = wrapper.findComponent(PasswordInput)
      expect(passwordInput.emitted('focus')).toBeTruthy()
      expect(passwordInput.emitted('blur')).toBeTruthy()
      wrapper.unmount()
    })

    it('emits change with the input string on native change', async () => {
      const { wrapper } = mountPasswordInput({ modelValue: '' })
      const input = wrapper.get('input')
      await input.setValue('typed')
      await input.trigger('change')
      const emitted = wrapper.findComponent(PasswordInput).emitted('change') as any[][]
      expect(emitted.at(-1)?.[0]).toBe('typed')
      wrapper.unmount()
    })

    it('applies the disabled style state on the input root', () => {
      const { wrapper } = mountPasswordInput({ disabled: true, modelValue: 'secret' })
      // Input applies useInputStyle({ disabled }) on the root; native disabled is FormField-driven.
      expect(wrapper.get('[data-slot="input"]').classes()).toContain('is-disabled')
      wrapper.unmount()
    })
  })
})
