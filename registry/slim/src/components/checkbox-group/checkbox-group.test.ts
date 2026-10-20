import type { CheckboxGroupItem, CheckboxGroupValue } from './checkbox-group.props'
import type { FormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useCheckboxGroupStyle } from './checkbox-group.style'
import CheckboxGroup from './checkbox-group.vue'

const defaultItems: CheckboxGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]

function mountCheckboxGroup(
  groupProps: Record<string, unknown> = {},
  fieldProps: Record<string, unknown> = {},
) {
  const model = ref<CheckboxGroupValue[]>(
    (groupProps.modelValue as CheckboxGroupValue[] | undefined) ?? [],
  )

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { interests: model.value },
        onSubmit: async () => {},
      }) as FormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'interests', label: 'Interests', nativeLabel: false, ...fieldProps }, {
          default: () => h(CheckboxGroup, {
            ...groupProps,
            'items': (groupProps.items as CheckboxGroupItem[] | undefined) ?? defaultItems,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: CheckboxGroupValue[]) => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('checkbox-group', () => {
  it('applies default vertical orientation, size, and gap', () => {
    const ui = useCheckboxGroupStyle({})
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('flex-col')
    expect(ui.root()).toContain('py-sm')
    expect(ui.root()).toContain('gap-md')
  })

  it('applies size and orientation variants', () => {
    expect(useCheckboxGroupStyle({ size: 'sm' }).root()).toContain('gap-sm')
    expect(useCheckboxGroupStyle({ size: 'lg' }).root()).toContain('gap-lg')
    expect(useCheckboxGroupStyle({ orientation: 'horizontal' }).root()).not.toContain('flex-col')
    expect(useCheckboxGroupStyle({ orientation: 'vertical' }).root()).toContain('flex-col')
  })

  it('applies disabled state', () => {
    expect(useCheckboxGroupStyle({ disabled: true }).root()).toContain('is-disabled')
  })

  describe('given a group inside a form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountCheckboxGroup()
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify SVG uses role="img" without alt.
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('sets data-slot and renders each item as a checkbox', () => {
      const { wrapper } = mountCheckboxGroup()
      expect(wrapper.find('[data-slot="checkbox-group"]').exists()).toBe(true)
      expect(wrapper.findAll('[data-slot="checkbox"]')).toHaveLength(3)
      expect(wrapper.text()).toContain('Design')
      expect(wrapper.text()).toContain('Engineering')
      wrapper.unmount()
    })

    it('toggles values when an item is clicked', async () => {
      const { wrapper, model } = mountCheckboxGroup()
      await wrapper.findAll('[data-slot="checkbox"]')[0].trigger('click')
      await nextTick()
      expect(model.value).toEqual(['design'])
      wrapper.unmount()
    })

    it('emits change when the value updates', async () => {
      const { wrapper } = mountCheckboxGroup()
      await wrapper.findAll('[data-slot="checkbox"]')[1].trigger('click')
      await nextTick()
      const emitted = wrapper.findComponent(CheckboxGroup).emitted('change') as CheckboxGroupValue[][][]
      expect(emitted.at(-1)?.[0]).toEqual(['engineering'])
      wrapper.unmount()
    })

    it('prefixes item ids from the group id', () => {
      const { wrapper } = mountCheckboxGroup({ id: 'interests' })
      expect(wrapper.findAll('[data-slot="checkbox"]')[0].attributes('id')).toBe('interests-design')
      wrapper.unmount()
    })

    it('does not toggle when the group is disabled', async () => {
      const { wrapper, model } = mountCheckboxGroup({ disabled: true })
      await wrapper.findAll('[data-slot="checkbox"]')[0].trigger('click')
      expect(model.value).toEqual([])
      wrapper.unmount()
    })
  })
})
