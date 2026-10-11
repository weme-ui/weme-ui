import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useNumberInputStyle } from './number-input.style'
import NumberInput from './number-input.vue'

function mountNumberInput(inputProps: Record<string, unknown> = {}) {
  const model = ref((inputProps.modelValue as number | undefined) ?? 0)

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { quantity: model.value },
        onSubmit: async () => {},
      })

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'quantity', label: 'Quantity' }, {
          default: () => h(NumberInput, {
            ...inputProps,
            'modelValue': model.value,
            // Prefer update:modelValue — onChange also catches bubbled native input change Events.
            'onUpdate:modelValue': (value: number | undefined) => {
              if (typeof value === 'number')
                model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('number-input', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useNumberInputStyle({})
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('flex-(inline y-center)')
    expect(ui.root()).toContain('transition-colors')
    expect(ui.input()).toContain('text-center')
    expect(ui.input()).toContain('outline-none')
  })

  it('applies size variants and control sizes', () => {
    expect(useNumberInputStyle({ size: 'sm' }).root()).toContain('h-6')
    expect(useNumberInputStyle({ size: 'sm' }).root()).toContain('text-xs')
    expect(useNumberInputStyle({ size: 'sm' }).decrement()).toContain('size-5.5')
    expect(useNumberInputStyle({ size: 'sm' }).increment()).toContain('size-5.5')

    expect(useNumberInputStyle({ size: 'md' }).decrement()).toContain('size-7.5')
    expect(useNumberInputStyle({ size: 'lg' }).root()).toContain('h-10')
    expect(useNumberInputStyle({ size: 'lg' }).increment()).toContain('size-9.5')
  })

  it('applies radius variants', () => {
    expect(useNumberInputStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(useNumberInputStyle({ radius: 'md' }).root()).toContain('rounded-md')
    expect(useNumberInputStyle({ radius: 'full' }).root()).toContain('rounded-full')
  })

  it('applies appearance variants', () => {
    const soft = useNumberInputStyle({ variant: 'soft' }).root().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = useNumberInputStyle({ variant: 'outline' })
    // twMerge collapses `b b-base` on root to `b`; side borders keep `b-base`.
    expect(outline.root()).toContain('bg-base')
    expect(outline.root().split(/\s+/)).toContain('b')
    expect(outline.decrement()).toContain('b-r')
    expect(outline.decrement()).toContain('b-base')
    expect(outline.increment()).toContain('b-l')
    expect(outline.increment()).toContain('b-base')

    const unstyledRoot = useNumberInputStyle({ unstyled: true }).root()
    expect(unstyledRoot).not.toContain('bg-muted')
    expect(unstyledRoot).not.toContain('b-transparent')
  })

  it('applies soft and outline focus compounds when valid', () => {
    const soft = useNumberInputStyle({ variant: 'soft', invalid: false })
    expect(soft.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.root()).toContain('hover:not-[[data-focused]]:bg-elevated')

    const outline = useNumberInputStyle({ variant: 'outline', invalid: false })
    expect(outline.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(outline.root()).toContain('hover:not-[[data-focused]]:b-elevated')
  })

  it('applies invalid border for soft and outline', () => {
    expect(useNumberInputStyle({ variant: 'soft', invalid: true }).root()).toContain('b-error')
    expect(useNumberInputStyle({ variant: 'soft', invalid: true }).root()).toContain('outline-error-4')
    expect(useNumberInputStyle({ variant: 'outline', invalid: true }).root()).toContain('b-error')
  })

  it('applies disabled state and control shared classes', () => {
    expect(useNumberInputStyle({ disabled: true }).root()).toContain('is-disabled')
    expect(useNumberInputStyle({}).decrement()).toContain('cursor-pointer')
    expect(useNumberInputStyle({}).increment()).toContain('hover:bg-muted')
  })

  describe('given a number input inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      // Iconify stub SVGs use role="img" without alt.
      const { wrapper } = mountNumberInput({ placeholder: '0' })
      expect(await axe(wrapper.element, {
        rules: {
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders spinbutton controls with data-slot on the root', () => {
      const { wrapper } = mountNumberInput()
      expect(wrapper.find('[data-slot="number-input"]').exists()).toBe(true)
      expect(wrapper.get('[role="spinbutton"]').attributes('aria-roledescription')).toBe('Number field')
      expect(wrapper.find('button[aria-label="Increase"]').exists()).toBe(true)
      expect(wrapper.find('button[aria-label="Decrease"]').exists()).toBe(true)
      wrapper.unmount()
    })

    it('emits change and updates value on ArrowUp', async () => {
      const { wrapper, model } = mountNumberInput({ modelValue: 1, step: 1 })
      await wrapper.get('[role="spinbutton"]').trigger('keydown', { key: 'ArrowUp' })
      await nextTick()
      expect(model.value).toBe(2)
      // Filter numbers: VisuallyHiddenInput also bubbles a native `change` Event through the component.
      const changes = (wrapper.findComponent(NumberInput).emitted('change') ?? [])
        .map(args => args[0])
        .filter((value): value is number => typeof value === 'number')
      expect(changes.at(-1)).toBe(2)
      wrapper.unmount()
    })

    it('emits change and updates value on ArrowDown', async () => {
      const { wrapper, model } = mountNumberInput({ modelValue: 3, step: 1 })
      await wrapper.get('[role="spinbutton"]').trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      expect(model.value).toBe(2)
      const changes = (wrapper.findComponent(NumberInput).emitted('change') ?? [])
        .map(args => args[0])
        .filter((value): value is number => typeof value === 'number')
      expect(changes.at(-1)).toBe(2)
      wrapper.unmount()
    })

    it('steps by ten on PageUp and PageDown', async () => {
      const { wrapper, model } = mountNumberInput({ modelValue: 10, step: 1 })
      await wrapper.get('[role="spinbutton"]').trigger('keydown', { key: 'PageUp' })
      await nextTick()
      expect(model.value).toBe(20)

      await wrapper.get('[role="spinbutton"]').trigger('keydown', { key: 'PageDown' })
      await nextTick()
      expect(model.value).toBe(10)
      wrapper.unmount()
    })

    it('clamps to min and max with Home and End', async () => {
      const { wrapper, model } = mountNumberInput({ modelValue: 5, min: 0, max: 10, step: 1 })
      await wrapper.get('[role="spinbutton"]').trigger('keydown', { key: 'Home' })
      await nextTick()
      expect(model.value).toBe(0)

      await wrapper.get('[role="spinbutton"]').trigger('keydown', { key: 'End' })
      await nextTick()
      expect(model.value).toBe(10)
      wrapper.unmount()
    })

    it('disables step buttons at min and max', async () => {
      const { wrapper, model } = mountNumberInput({ modelValue: 0, min: 0, max: 2, step: 1 })
      expect(wrapper.get('button[aria-label="Decrease"]').attributes('disabled')).toBeDefined()

      model.value = 2
      await nextTick()
      expect(wrapper.get('button[aria-label="Increase"]').attributes('disabled')).toBeDefined()
      wrapper.unmount()
    })

    it('emits focus and blur from the input', async () => {
      const { wrapper } = mountNumberInput()
      const input = wrapper.get('[role="spinbutton"]')
      await input.trigger('focus')
      await input.trigger('blur')
      const numberInput = wrapper.findComponent(NumberInput)
      expect(numberInput.emitted('focus')).toBeTruthy()
      expect(numberInput.emitted('blur')).toBeTruthy()
      wrapper.unmount()
    })

    it('disables increment and decrement when disabled', () => {
      const { wrapper } = mountNumberInput({ modelValue: 1, disabled: true })
      expect(wrapper.get('button[aria-label="Increase"]').attributes('disabled')).toBeDefined()
      expect(wrapper.get('button[aria-label="Decrease"]').attributes('disabled')).toBeDefined()
      expect(wrapper.get('[data-slot="number-input"]').attributes('data-disabled')).toBeDefined()
      wrapper.unmount()
    })
  })
})
