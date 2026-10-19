import type { TagGroupItem, TagGroupItemValue } from './tag-group.props'
import type { FormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useTagGroupStyle } from './tag-group.style'
import TagGroup from './tag-group.vue'

const defaultItems: TagGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]

function mountTagGroup(tagGroupProps: Record<string, unknown> = {}) {
  const model = ref<TagGroupItemValue | TagGroupItemValue[] | undefined>(
    tagGroupProps.modelValue as TagGroupItemValue | TagGroupItemValue[] | undefined,
  )
  const items = ref<TagGroupItem[]>(
    (tagGroupProps.items as TagGroupItem[] | undefined) ?? [...defaultItems],
  )

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { tags: model.value ?? '' },
        onSubmit: async () => {},
      }) as FormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'tags', label: 'Tags' }, {
          default: () => h(TagGroup, {
            ...tagGroupProps,
            'items': items.value,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: TagGroupItemValue | TagGroupItemValue[] | undefined) => {
              model.value = value
            },
            'onRemove': (values: TagGroupItemValue[]) => {
              items.value = items.value.filter(item => !values.includes(item.value))
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model, items }
}

describe('tag-group', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useTagGroupStyle({})
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('flex-wrap')
    expect(ui.root()).toContain('gap-sm')
    expect(ui.item()).toContain('h-6')
    expect(ui.item()).toContain('text-sm')
    expect(ui.item()).toContain('rounded-md')
    expect(ui.item()).toContain('bg-muted')
    expect(ui.item()).toContain('text-foreground')
    expect(ui.itemDelete()).toContain('-mr-1.5')
    expect(ui.itemIcon()).toContain('shrink-0')
    expect(ui.itemDeleteIcon()).toContain('shrink-0')
  })

  it('applies size variants', () => {
    const sm = useTagGroupStyle({ size: 'sm' })
    expect(sm.root()).toContain('gap-xs')
    expect(sm.item()).toContain('h-4')
    expect(sm.item()).toContain('text-xs')
    expect(sm.item()).toContain('px-1.5')

    const lg = useTagGroupStyle({ size: 'lg' })
    expect(lg.root()).toContain('gap-md')
    expect(lg.item()).toContain('h-8')
    expect(lg.item()).toContain('text-base')
    expect(lg.item()).toContain('px-3')
  })

  it('applies radius variants', () => {
    expect(useTagGroupStyle({ radius: 'none' }).item()).toContain('rounded-none')
    expect(useTagGroupStyle({ radius: 'md' }).item()).toContain('rounded-md')
    expect(useTagGroupStyle({ radius: 'full' }).item()).toContain('rounded-full')
    expect(useTagGroupStyle({ radius: 'full' }).itemDelete()).toContain('rounded-full')
  })

  it('applies appearance variants', () => {
    expect(useTagGroupStyle({ variant: 'soft' }).item()).toContain('bg-muted')
    expect(useTagGroupStyle({ variant: 'outline' }).item()).toContain('bg-base')
    expect(useTagGroupStyle({ variant: 'outline' }).item()).toContain('b-base')
    expect(useTagGroupStyle({ variant: 'inverted' }).item()).toContain('bg-inverted')
    expect(useTagGroupStyle({ variant: 'inverted' }).item()).toContain('text-inverted')
  })

  it('applies selectable compounds for selection and press feedback', () => {
    const soft = useTagGroupStyle({ variant: 'soft', selectable: true })
    expect(soft.item()).toContain('aria-[pressed=true]:scale-97')
    expect(soft.item()).toContain('hover:data-[state=unchecked]:(bg-elevated')
    expect(soft.item()).toContain('data-[state=checked]:(bg-accent-3 font-medium text-accent)')

    const outline = useTagGroupStyle({ variant: 'outline', selectable: true })
    expect(outline.item()).toContain('data-[state=checked]:(bg-accent-3 font-medium text-accent b-accent)')

    const inverted = useTagGroupStyle({ variant: 'inverted', selectable: true })
    expect(inverted.item()).toContain('data-[state=checked]:(bg-accent font-medium text-accent-1)')
  })

  it('skips selectable hover and checked styles when not selectable', () => {
    const soft = useTagGroupStyle({ variant: 'soft', selectable: false })
    expect(soft.item()).not.toContain('aria-[pressed=true]:scale-97')
    expect(soft.item()).not.toContain('data-[state=checked]')
    expect(soft.item()).not.toContain('hover:data-[state=unchecked]')
  })

  it('applies disabled state', () => {
    expect(useTagGroupStyle({ disabled: true }).root()).toContain('is-disabled')
  })

  it('skips appearance styles when unstyled', () => {
    const unstyled = useTagGroupStyle({ unstyled: true, variant: 'soft', selectable: true })
    expect(unstyled.item()).not.toContain('bg-muted')
    expect(unstyled.item()).not.toContain('rounded-md')
    expect(unstyled.item()).not.toContain('h-6')
    expect(unstyled.item()).not.toContain('aria-[pressed=true]:scale-97')
    expect(unstyled.itemDelete()).not.toContain('b-base')
  })

  describe('given a tag group inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountTagGroup({
        selectionMode: 'single',
        closeable: true,
      })
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify stub SVGs use role="img" without alt.
          'svg-img-alt': { enabled: false },
          // Hidden form input sits inside TagGroupRoot (role=grid) for id/name association.
          'aria-required-children': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders data-slot, grid role, and labels', () => {
      const { wrapper } = mountTagGroup()
      const root = wrapper.get('[data-slot="tag-group"]')
      expect(root.attributes('role')).toBe('grid')
      expect(wrapper.text()).toContain('Design')
      expect(wrapper.text()).toContain('Engineering')
      expect(wrapper.findAll('[role="row"]')).toHaveLength(3)
      wrapper.unmount()
    })

    it('renders no rows when items are empty', async () => {
      const { wrapper } = mountTagGroup({
        items: [],
      })
      await nextTick()
      expect(wrapper.findAll('[role="row"]')).toHaveLength(0)
      // Reka TagGroupRoot switches to role="group" after mount when no items are registered.
      expect(wrapper.get('[data-slot="tag-group"]').attributes('role')).toBe('group')
      wrapper.unmount()
    })

    it('applies the disabled style state on the root', () => {
      const { wrapper } = mountTagGroup({ disabled: true })
      expect(wrapper.get('[data-slot="tag-group"]').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('selects a tag and emits update:modelValue and change', async () => {
      const { wrapper, model } = mountTagGroup({
        selectionMode: 'single',
      })
      const rows = wrapper.findAll('[role="row"]')
      await rows[0]!.trigger('click')
      await nextTick()

      expect(model.value).toBe('design')
      const tagGroup = wrapper.findComponent(TagGroup)
      expect(tagGroup.emitted('update:modelValue')?.at(-1)).toEqual(['design'])
      expect(tagGroup.emitted('change')?.at(-1)).toEqual(['design'])
      expect(rows[0]!.attributes('data-state')).toBe('checked')
      expect(rows[0]!.attributes('aria-selected')).toBe('true')
      wrapper.unmount()
    })

    it('supports multiple selection', async () => {
      const { wrapper, model } = mountTagGroup({
        selectionMode: 'multiple',
        modelValue: [],
      })
      const rows = wrapper.findAll('[role="row"]')
      await rows[0]!.trigger('click')
      await rows[1]!.trigger('click')
      await nextTick()

      expect(model.value).toEqual(['design', 'engineering'])
      expect(rows[0]!.attributes('data-state')).toBe('checked')
      expect(rows[1]!.attributes('data-state')).toBe('checked')
      expect(wrapper.get('[data-slot="tag-group"]').attributes('aria-multiselectable')).toBe('true')
      wrapper.unmount()
    })

    it('sets aria-pressed while the pointer is down on a selectable tag', async () => {
      const { wrapper } = mountTagGroup({
        selectionMode: 'single',
      })
      const row = wrapper.get('[role="row"]')
      await row.trigger('mousedown')
      expect(row.attributes('aria-pressed')).toBe('true')
      await row.trigger('mouseup')
      expect(row.attributes('aria-pressed')).toBeUndefined()
      wrapper.unmount()
    })

    it('renders delete controls when closeable and emits remove', async () => {
      const { wrapper, items } = mountTagGroup({
        closeable: true,
      })
      const deleteButtons = wrapper.findAll('button').filter(btn =>
        btn.element.closest('[role="row"]') != null,
      )
      expect(deleteButtons.length).toBeGreaterThanOrEqual(3)

      await deleteButtons[0]!.trigger('click')
      await nextTick()

      const tagGroup = wrapper.findComponent(TagGroup)
      expect(tagGroup.emitted('remove')?.at(-1)).toEqual([['design']])
      expect(items.value.map(item => item.value)).toEqual(['engineering', 'product'])
      wrapper.unmount()
    })

    it('does not render delete controls when closeable is false', () => {
      const { wrapper } = mountTagGroup({
        closeable: false,
      })
      const deleteButtons = wrapper.findAll('button').filter(btn =>
        btn.element.closest('[role="row"]') != null,
      )
      expect(deleteButtons).toHaveLength(0)
      wrapper.unmount()
    })
  })
})
