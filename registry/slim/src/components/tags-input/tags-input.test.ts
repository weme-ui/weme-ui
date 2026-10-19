import type { TagsInputValue } from './tags-input.props'
import type { FormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useTagsInputStyle } from './tags-input.style'
import TagsInput from './tags-input.vue'

function mountTagsInput(tagsInputProps: Record<string, unknown> = {}) {
  const model = ref<TagsInputValue[]>(
    (tagsInputProps.modelValue as TagsInputValue[] | undefined) ?? [],
  )

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { tags: model.value },
        onSubmit: async () => {},
      }) as FormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'tags', label: 'Tags' }, {
          default: () => h(TagsInput, {
            ...tagsInputProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: TagsInputValue[]) => {
              model.value = value ?? []
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('tags-input', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useTagsInputStyle({})
    expect(ui.root()).toContain('flex-wrap')
    expect(ui.root()).toContain('min-h-6')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('bg-muted')
    // soft compounds add `b` + `b-transparent`; twMerge keeps `b`
    expect(ui.root().split(/\s+/)).toContain('b')
    expect(ui.root()).toContain('transition-colors')
    expect(ui.input()).toContain('placeholder:text-subtle')
    expect(ui.input()).toContain('w-fit')
    expect(ui.item()).toContain('h-5')
    expect(ui.item()).toContain('text-sm')
    expect(ui.item()).toContain('group-not-[[data-focused]]:bg-elevated')
    expect(ui.itemText()).toContain('text-nowrap')
    expect(ui.clear()).toContain('ml-auto')
  })

  it('applies size variants', () => {
    const sm = useTagsInputStyle({ size: 'sm' })
    expect(sm.root()).toContain('min-h-4')
    expect(sm.root()).toContain('text-xs')
    expect(sm.item()).toContain('h-4')
    expect(sm.item()).toContain('text-xs')

    const lg = useTagsInputStyle({ size: 'lg' })
    expect(lg.root()).toContain('min-h-7')
    expect(lg.root()).toContain('text-base')
    expect(lg.item()).toContain('h-6.5')
    expect(lg.item()).toContain('text-base')
  })

  it('applies radius variants', () => {
    expect(useTagsInputStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(useTagsInputStyle({ radius: 'md' }).root()).toContain('rounded-md')
    expect(useTagsInputStyle({ radius: 'full' }).root()).toContain('rounded-full')
  })

  it('applies appearance variants', () => {
    const soft = useTagsInputStyle({ variant: 'soft' }).root().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = useTagsInputStyle({ variant: 'outline' }).root().split(/\s+/)
    expect(outline).toContain('bg-base')
    expect(outline).toContain('b')
  })

  it('applies soft and outline focus compounds when valid', () => {
    const soft = useTagsInputStyle({ variant: 'soft', invalid: false })
    expect(soft.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.root()).toContain('hover:not-[[data-focused]]:bg-elevated')

    const outline = useTagsInputStyle({ variant: 'outline', invalid: false })
    expect(outline.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(outline.root()).toContain('hover:not-[[data-focused]]:b-elevated')
  })

  it('applies invalid border for soft and outline', () => {
    expect(useTagsInputStyle({ variant: 'soft', invalid: true }).root()).toContain('b-error')
    expect(useTagsInputStyle({ variant: 'soft', invalid: true }).root()).toContain('outline-error-4')
    expect(useTagsInputStyle({ variant: 'outline', invalid: true }).root()).toContain('b-error')
  })

  it('applies disabled state', () => {
    expect(useTagsInputStyle({ disabled: true }).root()).toContain('is-disabled')
  })

  it('skips appearance styles when unstyled', () => {
    const unstyled = useTagsInputStyle({ unstyled: true, variant: 'soft' })
    expect(unstyled.root()).not.toContain('bg-muted')
    expect(unstyled.root()).not.toContain('b-transparent')
    expect(unstyled.input()).not.toContain('placeholder:text-subtle')
    expect(unstyled.item()).not.toContain('group-not-[[data-focused]]:bg-elevated')
    expect(unstyled.clear()).not.toContain('op-0')
  })

  it('applies item, clear, and prefix focus styles', () => {
    const ui = useTagsInputStyle({ invalid: false })
    expect(ui.item()).toContain('group-data-[focused]:(text-accent bg-accent-3)')
    expect(ui.item()).toContain('group-not-[[data-focused]]:group-hover:bg-muted')
    expect(ui.itemDelete()).toContain('hover:(text-highlighted b-elevated bg-accent-5)')

    const clear = ui.clear()
    expect(clear).toContain('op-0')
    expect(clear).toContain('group-data-[focused]:op-100')
    expect(clear).toContain('hover:bg-accent-3')

    expect(ui.prefix()).toContain('group-data-[focused]:text-highlighted')
    expect(ui.prefix()).toContain('group-not-[[data-focused]]:text-subtle')
    expect(ui.prefixIcon()).toContain('shrink-0')
    expect(ui.itemIcon()).toContain('shrink-0')
  })

  describe('given a tags input inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountTagsInput({
        modelValue: ['design'],
        clearable: true,
        placeholder: 'Add a tag…',
      })
      expect(await axe(wrapper.element, {
        rules: {
          // Item delete / clear controls are icon-only; Iconify SVG uses role="img" without alt.
          'button-name': { enabled: false },
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('exposes data-slot on the root and renders tags', () => {
      const { wrapper } = mountTagsInput({
        modelValue: ['design', 'vue'],
      })
      expect(wrapper.find('[data-slot="tags-input"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('design')
      expect(wrapper.text()).toContain('vue')
      wrapper.unmount()
    })

    it('adds a tag on Enter and emits update:modelValue', async () => {
      const { wrapper, model } = mountTagsInput({
        modelValue: ['design'],
        placeholder: 'Add a tag…',
      })
      const input = wrapper.get('input')
      await input.setValue('vue')
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()

      expect(model.value).toEqual(['design', 'vue'])
      const component = wrapper.findComponent(TagsInput)
      expect(component.emitted('update:modelValue')?.at(-1)).toEqual([['design', 'vue']])
      expect(component.emitted('addTag')?.at(-1)).toEqual(['vue'])
      wrapper.unmount()
    })

    it('removes a tag when its delete control is clicked', async () => {
      const { wrapper, model } = mountTagsInput({
        modelValue: ['design', 'vue'],
      })
      const deleteButtons = wrapper.findAll('button[type="button"]')
      expect(deleteButtons.length).toBeGreaterThanOrEqual(2)

      await deleteButtons[0]!.trigger('click')
      await nextTick()

      expect(model.value).toEqual(['vue'])
      const component = wrapper.findComponent(TagsInput)
      expect(component.emitted('removeTag')?.at(-1)).toEqual(['design'])
      wrapper.unmount()
    })

    it('clears all tags when the clear control is clicked', async () => {
      const { wrapper, model } = mountTagsInput({
        modelValue: ['alpha', 'beta'],
        clearable: true,
      })
      await nextTick()
      const buttons = wrapper.findAll('button[type="button"]')
      // Two item deletes + one TagsInputClear
      expect(buttons).toHaveLength(3)

      await buttons.at(-1)!.trigger('click')
      await nextTick()

      expect(model.value).toEqual([])
      expect(wrapper.findAll('button[type="button"]')).toHaveLength(0)
      wrapper.unmount()
    })

    it('does not show the clear control when disabled', async () => {
      const { wrapper } = mountTagsInput({
        modelValue: ['design'],
        clearable: true,
        disabled: true,
      })
      await nextTick()
      // Item delete buttons may still render; clear must not.
      const root = wrapper.get('[data-slot="tags-input"]')
      expect(root.classes()).toContain('is-disabled')
      // hasClean is false when disabled — only item deletes remain (2 would mean clear present for 1 tag)
      expect(wrapper.findAll('button[type="button"]')).toHaveLength(1)
      wrapper.unmount()
    })

    it('renders prefix text', () => {
      const { wrapper } = mountTagsInput({
        modelValue: [],
        prefix: '#',
      })
      expect(wrapper.text()).toContain('#')
      wrapper.unmount()
    })

    it('sets data-readonly when readonly', () => {
      const { wrapper } = mountTagsInput({
        modelValue: ['design'],
        readonly: true,
      })
      expect(wrapper.get('[data-slot="tags-input"]').attributes('data-readonly')).toBe('')
      expect(wrapper.get('input').attributes('readonly')).toBeDefined()
      wrapper.unmount()
    })

    it('emits focus and blur from the input', async () => {
      const { wrapper } = mountTagsInput({ modelValue: [] })
      const input = wrapper.get('input')
      await input.trigger('focus')
      await input.trigger('blur')
      const component = wrapper.findComponent(TagsInput)
      expect(component.emitted('focus')).toBeTruthy()
      expect(component.emitted('blur')).toBeTruthy()
      wrapper.unmount()
    })
  })
})
