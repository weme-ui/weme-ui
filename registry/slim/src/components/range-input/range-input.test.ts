import type { RangeInputValue } from './range-input.props'
import type { FormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useRangeInputStyle } from './range-input.style'
import RangeInput from './range-input.vue'

function mountRangeInput(inputProps: Record<string, unknown> = {}) {
  const model = ref<RangeInputValue>(
    (inputProps.modelValue as RangeInputValue | undefined) ?? [null, null],
  )

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { price: model.value },
        onSubmit: async () => {},
      }) as FormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'price', label: 'Price' }, {
          default: () => h(RangeInput, {
            ...inputProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: RangeInputValue) => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('range-input', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useRangeInputStyle({})
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('text-foreground')
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('transition-colors')
    expect(ui.fromInput()).toContain('text-center')
    expect(ui.fromInput()).toContain('placeholder:text-subtle')
    expect(ui.toInput()).toContain('text-center')
    expect(ui.separator()).toContain('text-muted')
  })

  it('applies size variants and icon sizes', () => {
    expect(useRangeInputStyle({ size: 'sm' }).root()).toContain('h-6')
    expect(useRangeInputStyle({ size: 'sm' }).root()).toContain('text-xs')
    expect(useRangeInputStyle({ size: 'sm' }).fromIcon()).toContain('size-6')
    expect(useRangeInputStyle({ size: 'sm' }).toIcon()).toContain('size-6')

    expect(useRangeInputStyle({ size: 'md' }).fromIcon()).toContain('size-8')
    expect(useRangeInputStyle({ size: 'lg' }).root()).toContain('h-10')
    expect(useRangeInputStyle({ size: 'lg' }).toIcon()).toContain('size-10')
  })

  it('applies radius variants', () => {
    expect(useRangeInputStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(useRangeInputStyle({ radius: 'md' }).root()).toContain('rounded-md')
    expect(useRangeInputStyle({ radius: 'full' }).root()).toContain('rounded-full')
  })

  it('applies appearance variants', () => {
    const soft = useRangeInputStyle({ variant: 'soft' }).root().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = useRangeInputStyle({ variant: 'outline' }).root().split(/\s+/)
    expect(outline).toContain('bg-base')
    expect(outline).toContain('b')

    const unstyledRoot = useRangeInputStyle({ unstyled: true }).root()
    expect(unstyledRoot).not.toContain('bg-muted')
    expect(unstyledRoot).not.toContain('b-transparent')
    expect(unstyledRoot).not.toContain('text-foreground')
  })

  it('applies soft and outline focus compounds when valid', () => {
    const soft = useRangeInputStyle({ variant: 'soft', invalid: false })
    expect(soft.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.root()).toContain('hover:not-[[data-focused]]:bg-elevated')

    const outline = useRangeInputStyle({ variant: 'outline', invalid: false })
    expect(outline.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(outline.root()).toContain('hover:not-[[data-focused]]:b-elevated')
  })

  it('applies invalid border for soft and outline', () => {
    expect(useRangeInputStyle({ variant: 'soft', invalid: true }).root()).toContain('b-error')
    expect(useRangeInputStyle({ variant: 'soft', invalid: true }).root()).toContain('outline-error-4')
    expect(useRangeInputStyle({ variant: 'outline', invalid: true }).root()).toContain('b-error')
  })

  it('applies disabled state and separator focus color', () => {
    expect(useRangeInputStyle({ disabled: true }).root()).toContain('is-disabled')
    expect(useRangeInputStyle({}).separator()).toContain('group-data-[focused]:text-foreground')
  })

  describe('given a range input inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountRangeInput({
        fromPlaceholder: 'Min',
        toPlaceholder: 'Max',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders dual inputs with data-slot and default separator', () => {
      const { wrapper } = mountRangeInput()
      expect(wrapper.find('[data-slot="range-input"]').exists()).toBe(true)
      const inputs = wrapper.findAll('input')
      expect(inputs).toHaveLength(2)
      expect(wrapper.text()).toContain('-')
      wrapper.unmount()
    })

    it('keeps id and name on the from input only', () => {
      const { wrapper } = mountRangeInput()
      const [from, to] = wrapper.findAll('input')
      expect(from.attributes('id')).toBeTruthy()
      expect(from.attributes('name')).toBe('price')
      expect(to.attributes('id')).toBeUndefined()
      expect(to.attributes('name')).toBeUndefined()
      wrapper.unmount()
    })

    it('updates modelValue when from or to input changes', async () => {
      const { wrapper, model } = mountRangeInput({ modelValue: [null, null] })
      const [from, to] = wrapper.findAll('input')

      await from.setValue('10')
      expect(model.value).toEqual([10, null])

      await to.setValue('20')
      expect(model.value).toEqual([10, 20])
      wrapper.unmount()
    })

    it('emits change with the parsed range on native change', async () => {
      const { wrapper, model } = mountRangeInput({ modelValue: [1, 2] })
      const [from] = wrapper.findAll('input')

      await from.setValue('5')
      await from.trigger('change')
      await nextTick()

      expect(model.value).toEqual([5, 2])
      const changes = wrapper.findComponent(RangeInput).emitted('change') ?? []
      expect(changes.at(-1)?.[0]).toEqual([5, 2])
      wrapper.unmount()
    })

    it('clamps values to min and max', async () => {
      const { wrapper, model } = mountRangeInput({
        modelValue: [null, null],
        min: 0,
        max: 100,
      })
      const [from, to] = wrapper.findAll('input')

      await from.setValue('-5')
      expect(model.value[0]).toBe(0)

      await to.setValue('150')
      expect(model.value[1]).toBe(100)
      wrapper.unmount()
    })

    it('parses empty input as null', async () => {
      const { wrapper, model } = mountRangeInput({ modelValue: [10, 20] })
      const [from] = wrapper.findAll('input')

      await from.setValue('')
      expect(model.value).toEqual([null, 20])
      wrapper.unmount()
    })

    it('emits focus and blur from either input', async () => {
      const { wrapper } = mountRangeInput()
      const [from, to] = wrapper.findAll('input')
      const rangeInput = wrapper.findComponent(RangeInput)

      await from.trigger('focus')
      await from.trigger('blur')
      await to.trigger('focus')
      await to.trigger('blur')

      expect(rangeInput.emitted('focus')?.length).toBeGreaterThanOrEqual(2)
      expect(rangeInput.emitted('blur')?.length).toBeGreaterThanOrEqual(2)
      wrapper.unmount()
    })

    it('applies disabled styles when disabled', () => {
      const { wrapper } = mountRangeInput({ disabled: true })
      expect(wrapper.get('[data-slot="range-input"]').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('renders a custom separator string', () => {
      const { wrapper } = mountRangeInput({ separator: '~' })
      expect(wrapper.text()).toContain('~')
      expect(wrapper.text()).not.toContain('-')
      wrapper.unmount()
    })
  })
})
