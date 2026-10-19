import type { FormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { usePinInputStyle } from './pin-input.style'
import PinInput from './pin-input.vue'

function mountPinInput(inputProps: Record<string, unknown> = {}) {
  const model = ref((inputProps.modelValue as string[] | undefined) ?? [])

  const Root = defineComponent({
    setup() {
      // FormApi is invariant in TData; cast so h(Form) accepts useForm()'s concrete return type.
      const form = useForm({
        defaultValues: { code: model.value },
        onSubmit: async () => {},
      }) as FormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'code', label: 'Verification code' }, {
          default: () => h(PinInput, {
            ...inputProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: string[]) => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

function pinInputs(wrapper: ReturnType<typeof mount>) {
  return wrapper.findAll('input[aria-label^="pin input"]')
}

describe('pin-input', () => {
  it('applies default soft variant and size', () => {
    const ui = usePinInputStyle({})
    expect(ui.root()).toContain('gap-sm')
    expect(ui.root()).toContain('flex')
    expect(ui.input()).toContain('size-8')
    expect(ui.input()).toContain('text-center')
    expect(ui.input()).toContain('outline-none')
    expect(ui.input()).toContain('bg-muted')
    expect(ui.input()).toContain('text-foreground')
    expect(ui.input()).toContain('transition-colors')
    expect(ui.input()).toContain('duration-200')
  })

  it('applies size variants', () => {
    expect(usePinInputStyle({ size: 'sm' }).root()).toContain('gap-xs')
    expect(usePinInputStyle({ size: 'sm' }).input()).toContain('size-6')
    expect(usePinInputStyle({ size: 'md' }).input()).toContain('size-8')
    expect(usePinInputStyle({ size: 'lg' }).root()).toContain('gap-md')
    expect(usePinInputStyle({ size: 'lg' }).input()).toContain('size-10')
  })

  it('applies radius variants on inputs', () => {
    expect(usePinInputStyle({ radius: 'none' }).input()).toContain('rounded-none')
    expect(usePinInputStyle({ radius: 'md' }).input()).toContain('rounded-md')
    expect(usePinInputStyle({ radius: 'full' }).input()).toContain('rounded-full')
  })

  it('applies appearance variants', () => {
    const soft = usePinInputStyle({ variant: 'soft' }).input().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = usePinInputStyle({ variant: 'outline' }).input().split(/\s+/)
    expect(outline).toContain('bg-base')
    expect(outline).toContain('b')

    const unstyledInput = usePinInputStyle({ unstyled: true }).input()
    expect(unstyledInput).not.toContain('bg-muted')
    expect(unstyledInput).not.toContain('b-transparent')
    expect(unstyledInput).not.toContain('text-foreground')
    expect(unstyledInput).not.toContain('transition-colors')
  })

  it('applies soft and outline focus compounds when valid', () => {
    const soft = usePinInputStyle({ variant: 'soft', invalid: false })
    expect(soft.input()).toContain('focus:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.input()).toContain('hover:not-focus:bg-elevated')

    const outline = usePinInputStyle({ variant: 'outline', invalid: false })
    expect(outline.input()).toContain('focus:(bg-base b-accent outline-2 outline-accent-4)')
    expect(outline.input()).toContain('hover:not-focus:b-elevated')
  })

  it('applies invalid border for soft and outline', () => {
    expect(usePinInputStyle({ variant: 'soft', invalid: true }).input()).toContain('b-error')
    expect(usePinInputStyle({ variant: 'soft', invalid: true }).input()).toContain('outline-error-4')
    expect(usePinInputStyle({ variant: 'outline', invalid: true }).input()).toContain('b-error')
  })

  it('applies disabled state', () => {
    expect(usePinInputStyle({ disabled: true }).root()).toContain('is-disabled')
  })

  describe('given a pin input inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountPinInput()
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders the configured number of pin cells with data-slot', () => {
      const { wrapper } = mountPinInput({ length: 4 })
      expect(wrapper.find('[data-slot="pin-input"]').exists()).toBe(true)
      expect(pinInputs(wrapper)).toHaveLength(4)
      wrapper.unmount()
    })

    it('respects a custom length', () => {
      const { wrapper } = mountPinInput({ length: 6 })
      expect(pinInputs(wrapper)).toHaveLength(6)
      wrapper.unmount()
    })

    it('exposes aria-label and per-cell names', async () => {
      const { wrapper } = mountPinInput({ length: 4 })
      await nextTick()
      const inputs = pinInputs(wrapper)
      expect(inputs[0].attributes('aria-label')).toMatch(/^pin input 1 of/)
      expect(inputs[3].attributes('aria-label')).toMatch(/^pin input 4 of/)
      expect(inputs[0].attributes('name')).toBe('code-1')
      expect(inputs[3].attributes('name')).toBe('code-4')
      wrapper.unmount()
    })

    it('updates modelValue when a cell is filled', async () => {
      const { wrapper, model } = mountPinInput({ length: 4, modelValue: [] })
      const first = pinInputs(wrapper)[0]
      await first.setValue('1')
      await nextTick()
      expect(model.value[0]).toBe('1')
      wrapper.unmount()
    })

    it('emits complete when all cells are filled', async () => {
      const { wrapper, model } = mountPinInput({ length: 4, modelValue: [] })
      const inputs = pinInputs(wrapper)

      for (let i = 0; i < 4; i++) {
        await inputs[i].setValue(String(i + 1))
        await nextTick()
      }

      expect(model.value).toEqual(['1', '2', '3', '4'])
      const complete = wrapper.findComponent(PinInput).emitted('complete')
      expect(complete?.at(-1)?.[0]).toEqual(['1', '2', '3', '4'])
      wrapper.unmount()
    })

    it('emits focus and blur from a cell', async () => {
      const { wrapper } = mountPinInput()
      const first = pinInputs(wrapper)[0]
      await first.trigger('focus')
      await first.trigger('blur')
      const pin = wrapper.findComponent(PinInput)
      expect(pin.emitted('focus')).toBeTruthy()
      expect(pin.emitted('blur')).toBeTruthy()
      wrapper.unmount()
    })

    it('clears the current cell on Backspace', async () => {
      const { wrapper, model } = mountPinInput({
        length: 4,
        modelValue: ['1', '2', '', ''],
        otp: false,
      })
      const inputs = pinInputs(wrapper)
      await (inputs[1].element as HTMLInputElement).focus()
      await inputs[1].trigger('keydown', { key: 'Backspace' })
      await nextTick()
      expect(model.value[1]).toBeFalsy()
      wrapper.unmount()
    })

    it('applies disabled styles and disables cells', () => {
      const { wrapper } = mountPinInput({ disabled: true })
      expect(wrapper.get('[data-slot="pin-input"]').classes()).toContain('is-disabled')
      for (const input of pinInputs(wrapper))
        expect(input.attributes('disabled')).toBeDefined()
      wrapper.unmount()
    })

    it('uses the default placeholder character', () => {
      const { wrapper } = mountPinInput()
      expect(pinInputs(wrapper)[0].attributes('placeholder')).toBe('○')
      wrapper.unmount()
    })
  })
})
