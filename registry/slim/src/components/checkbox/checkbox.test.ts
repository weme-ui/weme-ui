import type { FormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useCheckboxStyle } from './checkbox.style'
import Checkbox from './checkbox.vue'

function mountCheckbox(
  checkboxProps: Record<string, unknown> = {},
  fieldProps: Record<string, unknown> = {},
) {
  const model = ref(
    (checkboxProps.modelValue as boolean | 'indeterminate' | undefined) ?? false,
  )

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { terms: model.value },
        onSubmit: async () => {},
      }) as FormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'terms', ...fieldProps }, {
          default: () => h(Checkbox, {
            ...checkboxProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('checkbox', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useCheckboxStyle({})
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('gap-md')
    expect(ui.indicator()).toContain('size-5')
    expect(ui.indicator()).toContain('rounded-md')
    expect(ui.indicator()).toContain('bg-muted')
    expect(ui.content()).toContain('text-sm')
  })

  it('applies size variants', () => {
    expect(useCheckboxStyle({ size: 'sm' }).root()).toContain('gap-sm')
    expect(useCheckboxStyle({ size: 'sm' }).indicator()).toContain('size-4')
    expect(useCheckboxStyle({ size: 'sm' }).checkedIcon()).toContain('size-3')
    expect(useCheckboxStyle({ size: 'lg' }).root()).toContain('gap-lg')
    expect(useCheckboxStyle({ size: 'lg' }).indicator()).toContain('size-6')
    expect(useCheckboxStyle({ size: 'lg' }).checkedIcon()).toContain('size-5')
  })

  it('applies radius on the indicator', () => {
    expect(useCheckboxStyle({ radius: 'none' }).indicator()).toContain('rounded-none')
    expect(useCheckboxStyle({ radius: 'md' }).indicator()).toContain('rounded-md')
    expect(useCheckboxStyle({ radius: 'full' }).indicator()).toContain('rounded-full')
  })

  it('applies align variants', () => {
    expect(useCheckboxStyle({ align: 'start' }).root()).toContain('items-start')
    expect(useCheckboxStyle({ align: 'center' }).root()).toContain('items-center')
    expect(useCheckboxStyle({ align: 'end' }).root()).toContain('items-end')
  })

  it('applies soft, outline, and card appearance compounds', () => {
    expect(useCheckboxStyle({ variant: 'soft' }).indicator()).toContain('bg-muted')
    expect(useCheckboxStyle({ variant: 'outline' }).indicator()).toContain('b-base')
    expect(useCheckboxStyle({ variant: 'outline' }).indicator()).toContain('bg-base')

    const card = useCheckboxStyle({ variant: 'card' })
    expect(card.root()).toContain('b-base')
    expect(card.root()).toContain('bg-base')
    expect(card.indicator()).toContain('text-accent')
  })

  it('applies inverted indicator text for soft and outline', () => {
    expect(useCheckboxStyle({ variant: 'soft', inverted: true }).indicator()).toContain('text-inverted')
    expect(useCheckboxStyle({ variant: 'soft', inverted: false }).indicator()).toContain('text-highlighted')
    expect(useCheckboxStyle({ variant: 'outline', inverted: true }).indicator()).toContain('text-inverted')
  })

  it('applies card size and radius compounds', () => {
    expect(useCheckboxStyle({ variant: 'card', size: 'sm' }).root()).toContain('px-sm')
    expect(useCheckboxStyle({ variant: 'card', size: 'md' }).root()).toContain('px-lg')
    expect(useCheckboxStyle({ variant: 'card', radius: 'full' }).root()).toContain('rounded-full')
  })

  it('applies disabled state', () => {
    expect(useCheckboxStyle({ disabled: true }).root()).toContain('is-disabled')
  })

  it('skips appearance compounds when unstyled', () => {
    const unstyled = useCheckboxStyle({ unstyled: true, variant: 'soft', inverted: true })
    expect(unstyled.indicator()).not.toContain('bg-muted')
    expect(unstyled.indicator()).not.toContain('text-inverted')
    expect(unstyled.content()).not.toContain('text-foreground')
  })

  describe('given a checkbox inside a form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountCheckbox({
        modelValue: false,
        label: 'Accept terms',
      })
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify SVG uses role="img" without alt when unchecked still may not show icon
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('exposes role checkbox, data-slot, and aria-checked', () => {
      const { wrapper } = mountCheckbox({
        modelValue: true,
        label: 'Accept terms',
      })
      const root = wrapper.get('[data-slot="checkbox"]')
      expect(root.attributes('role')).toBe('checkbox')
      expect(root.attributes('aria-checked')).toBe('true')
      expect(root.attributes('data-state')).toBe('checked')
      expect(root.attributes('data-indicator')).toBe('start')
      wrapper.unmount()
    })

    it('toggles modelValue when clicked', async () => {
      const { wrapper, model } = mountCheckbox({
        modelValue: false,
        label: 'Accept terms',
      })
      await wrapper.get('[data-slot="checkbox"]').trigger('click')
      expect(model.value).toBe(true)
      wrapper.unmount()
    })

    it('does not toggle on Enter keydown', async () => {
      // Reka CheckboxRoot prevents Enter; Space activates via native button click.
      const { wrapper, model } = mountCheckbox({
        modelValue: false,
        label: 'Accept terms',
      })
      await wrapper.get('[data-slot="checkbox"]').trigger('keydown.enter')
      expect(model.value).toBe(false)
      wrapper.unmount()
    })

    it('does not toggle when FormField is disabled', async () => {
      const { wrapper, model } = mountCheckbox(
        { modelValue: false, label: 'Accept terms' },
        { disabled: true },
      )
      await wrapper.get('[data-slot="checkbox"]').trigger('click')
      expect(model.value).toBe(false)
      wrapper.unmount()
    })

    it('exposes aria-checked mixed when indeterminate', async () => {
      const { wrapper } = mountCheckbox({
        modelValue: 'indeterminate',
        label: 'Select all',
      })
      await nextTick()
      const root = wrapper.get('[data-slot="checkbox"]')
      expect(root.attributes('aria-checked')).toBe('mixed')
      expect(root.attributes('data-state')).toBe('indeterminate')
      wrapper.unmount()
    })

    it('renders label and description text', () => {
      const { wrapper } = mountCheckbox({
        modelValue: false,
        label: 'Marketing emails',
        description: 'Receive occasional updates.',
      })
      expect(wrapper.text()).toContain('Marketing emails')
      expect(wrapper.text()).toContain('Receive occasional updates.')
      wrapper.unmount()
    })

    it('places the indicator at the end when indicator is end', async () => {
      const { wrapper } = mountCheckbox({
        modelValue: true,
        label: 'End',
        indicator: 'end',
      })
      await nextTick()
      const root = wrapper.get('[data-slot="checkbox"]')
      expect(root.attributes('data-indicator')).toBe('end')
      expect(wrapper.find('svg').exists()).toBe(true)
      wrapper.unmount()
    })

    it('hides the visible indicator when indicator is none', async () => {
      const { wrapper } = mountCheckbox({
        modelValue: true,
        label: 'None',
        indicator: 'none',
      })
      await nextTick()
      expect(wrapper.get('[data-slot="checkbox"]').attributes('data-indicator')).toBe('none')
      expect(wrapper.find('.sr-only').exists()).toBe(true)
      wrapper.unmount()
    })

    it('emits change when the value updates', async () => {
      const { wrapper } = mountCheckbox({
        modelValue: false,
        label: 'Accept terms',
      })
      await wrapper.get('[data-slot="checkbox"]').trigger('click')
      const emitted = wrapper.findComponent(Checkbox).emitted('change') as any[][]
      expect(emitted.at(-1)?.[0]).toBe(true)
      wrapper.unmount()
    })

    it('renders the label as span without for when inGroup', () => {
      const { wrapper } = mountCheckbox({
        modelValue: false,
        label: 'Grouped',
        inGroup: true,
      })
      const label = wrapper.get('span.font-medium')
      expect(label.element.tagName.toLowerCase()).toBe('span')
      expect(label.attributes('for')).toBeUndefined()
      wrapper.unmount()
    })

    it('skips svg-img-alt for checked icon', async () => {
      // Iconify SVG uses role="img" without alt.
      const { wrapper } = mountCheckbox({
        modelValue: true,
        label: 'Accept terms',
      })
      await nextTick()
      expect(await axe(wrapper.element, {
        rules: {
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
