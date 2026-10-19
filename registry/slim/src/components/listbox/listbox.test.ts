import type { VueWrapper } from '@vue/test-utils'
import type { ListboxItems, ListboxValue } from './listbox.props'
import type { FormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import Empty from '../empty/empty.vue'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useListboxStyle } from './listbox.style'
import Listbox from './listbox.vue'

type ListboxModel = ListboxValue | ListboxValue[]

const fruitItems: ListboxItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
]

function mountListbox(inputProps: Record<string, unknown> = {}) {
  const isMultiple = inputProps.multiple === true || inputProps.multiple === ''
  const model = ref<ListboxModel>(
    inputProps.modelValue !== undefined
      ? inputProps.modelValue as ListboxModel
      : (isMultiple ? [] : ''),
  )

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { fruit: model.value },
        onSubmit: async () => {},
      }) as FormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'fruit', label: 'Fruit' }, {
          // Generic SFC props are not fully inferred under `h()`.
          default: () => h(Listbox as any, {
            'items': fruitItems,
            ...inputProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: ListboxModel) => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

function getListbox(wrapper: ReturnType<typeof mount>) {
  return wrapper.findComponent(Listbox) as unknown as VueWrapper
}

describe('listbox', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useListboxStyle({})
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('flex-col')
    expect(ui.root()).toContain('text-sm')
    expect(ui.root()).toContain('gap-sm')
    expect(ui.filter()).toContain('h-8')
    expect(ui.filter()).toContain('rounded-md')
    expect(ui.filter()).toContain('bg-muted')
    expect(ui.filterInput()).toContain('placeholder:text-subtle')
    expect(ui.content()).toContain('bg-muted')
    expect(ui.content()).toContain('b-transparent')
    expect(ui.content()).toContain('p-sm')
    expect(ui.item()).toContain('px-md')
    expect(ui.item()).toContain('data-[highlighted]:not-[[data-state=checked]]:b-elevated')
    expect(ui.itemIndicator()).toContain('ml-auto')
    expect(ui.groupLabel()).toContain('text-muted')
    expect(ui.separator()).toContain('pointer-events-none')
  })

  it('applies size variants', () => {
    const sm = useListboxStyle({ size: 'sm' })
    expect(sm.root()).toContain('text-xs')
    expect(sm.root()).toContain('gap-xs')
    expect(sm.filter()).toContain('h-6')
    expect(sm.content()).toContain('p-xs')
    expect(sm.item()).toContain('px-sm')

    const lg = useListboxStyle({ size: 'lg' })
    expect(lg.root()).toContain('text-base')
    expect(lg.root()).toContain('gap-md')
    expect(lg.filter()).toContain('h-10')
    expect(lg.content()).toContain('p-md')
    expect(lg.item()).toContain('px-lg')
    expect(lg.itemDescription()).toContain('text-sm')
  })

  it('applies radius variants', () => {
    expect(useListboxStyle({ radius: 'none' }).filter()).toContain('rounded-none')
    expect(useListboxStyle({ radius: 'md' }).filter()).toContain('rounded-md')
    expect(useListboxStyle({ radius: 'xl' }).content()).toContain('rounded-xl')

    const full = useListboxStyle({ radius: 'full' })
    expect(full.filter()).toContain('rounded-full')
    expect(full.content()).toContain('rounded-2xl')
    expect(full.item()).toContain('rounded-2xl')
    expect(full.filter()).toContain('px-3.5')
  })

  it('applies appearance variants', () => {
    const soft = useListboxStyle({ variant: 'soft' })
    expect(soft.filter()).toContain('bg-muted')
    expect(soft.content()).toContain('bg-muted')

    const outline = useListboxStyle({ variant: 'outline' })
    expect(outline.filter()).toContain('bg-base')
    expect(outline.content()).toContain('bg-base')
    expect(outline.content()).toContain('b-base')
  })

  it('applies orientation variants', () => {
    expect(useListboxStyle({ orientation: 'vertical' }).group()).toContain('flex-col')

    const horizontal = useListboxStyle({ orientation: 'horizontal' })
    expect(horizontal.group()).toContain('flex-wrap')
    expect(horizontal.item()).toContain('flex-1/4')
  })

  it('applies focus compounds when valid', () => {
    const soft = useListboxStyle({ variant: 'soft', invalid: false })
    expect(soft.filter()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.filter()).toContain('hover:not-[[data-focused]]:bg-elevated')
    expect(soft.item()).toContain('data-[state=checked]:bg-elevated')

    const outline = useListboxStyle({ variant: 'outline', invalid: false })
    expect(outline.filter()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
  })

  it('applies invalid and disabled states', () => {
    expect(useListboxStyle({ invalid: true }).filter()).toContain('b-error')
    expect(useListboxStyle({ invalid: true }).filter()).toContain('outline-error-4')
    expect(useListboxStyle({ disabled: true }).root()).toContain('is-disabled')
  })

  it('applies hasDescription item layout', () => {
    const withDescription = useListboxStyle({ hasDescription: true, size: 'md' })
    expect(withDescription.itemContent()).toContain('pr-2')
    expect(withDescription.itemContent()).toContain('flex-col')
    expect(withDescription.itemIcon()).toContain('mt-0.75')

    const without = useListboxStyle({ hasDescription: false })
    expect(without.item()).toContain('flex-y-center')
  })

  it('skips appearance styles when unstyled', () => {
    const unstyled = useListboxStyle({ unstyled: true, variant: 'soft' })
    expect(unstyled.filter()).not.toContain('bg-muted')
    expect(unstyled.content()).not.toContain('bg-muted')
    expect(unstyled.item()).not.toContain('data-[highlighted]:not-[[data-state=checked]]:b-elevated')
    expect(unstyled.filterInput()).not.toContain('placeholder:text-subtle')
    expect(unstyled.groupLabel() ?? '').not.toContain('text-muted')
  })

  describe('given a listbox inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountListbox({ placeholder: 'Search fruit…' })
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify stub SVGs use role="img" without alt.
          'svg-img-alt': { enabled: false },
          // Reka ListboxContent is role="listbox"; FormField label binds to the filter input.
          'aria-input-field-name': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders the listbox root with data-slot', () => {
      const { wrapper } = mountListbox({ placeholder: 'Search fruit…' })
      expect(wrapper.find('[data-slot="listbox"]').exists()).toBe(true)
      wrapper.unmount()
    })

    it('applies the disabled style state on the root', () => {
      const { wrapper } = mountListbox({ disabled: true })
      expect(wrapper.get('[data-slot="listbox"]').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('lists options without opening a popup', async () => {
      const { wrapper } = mountListbox({ placeholder: 'Search fruit…' })
      await nextTick()

      const options = wrapper.findAll('[role="option"]')
      expect(options.length).toBe(3)
      expect(wrapper.text()).toContain('Apple')
      expect(wrapper.text()).toContain('Banana')
      wrapper.unmount()
    })

    it('selects an option and emits update:modelValue and change', async () => {
      const { wrapper, model } = mountListbox({ modelValue: '' })
      await nextTick()

      const apple = wrapper.findAll('[role="option"]')
        .find(el => el.text().includes('Apple'))
      expect(apple).toBeTruthy()
      apple!.element.dispatchEvent(new PointerEvent('click', { bubbles: true }))
      await nextTick()

      expect(model.value).toBe('apple')
      const listbox = getListbox(wrapper)
      expect(listbox.emitted('update:modelValue')?.at(-1)).toEqual(['apple'])
      expect(listbox.emitted('change')?.at(-1)).toEqual(['apple'])
      wrapper.unmount()
    })

    it('supports multiple selection', async () => {
      const { wrapper, model } = mountListbox({
        multiple: true,
        modelValue: [],
      })
      await nextTick()

      const apple = wrapper.findAll('[role="option"]')
        .find(el => el.text().includes('Apple'))
      expect(apple).toBeTruthy()
      apple!.element.dispatchEvent(new PointerEvent('click', { bubbles: true }))
      await nextTick()

      expect(model.value).toEqual(['apple'])
      wrapper.unmount()
    })

    it('filters options by label', async () => {
      const { wrapper } = mountListbox({ placeholder: 'Search fruit…' })
      await nextTick()

      const input = wrapper.get('input')
      await input.setValue('ban')
      await nextTick()

      const options = wrapper.findAll('[role="option"]')
      expect(options.length).toBe(1)
      expect(options[0]!.text()).toContain('Banana')
      expect(wrapper.text()).not.toContain('Apple')
      wrapper.unmount()
    })

    it('emits update:filter when the filter changes', async () => {
      const { wrapper } = mountListbox()
      const input = wrapper.get('input')
      await input.setValue('app')
      await nextTick()

      const listbox = getListbox(wrapper)
      expect(listbox.emitted('update:filter')?.at(-1)).toEqual(['app'])
      wrapper.unmount()
    })

    it('renders group labels and separators', async () => {
      const { wrapper } = mountListbox({
        items: [
          [
            { type: 'label', label: 'Citrus', value: 'citrus-label' },
            { label: 'Orange', value: 'orange' },
            { type: 'separator', value: 'sep' },
            { label: 'Lemon', value: 'lemon' },
          ],
        ],
      })
      await nextTick()

      expect(wrapper.text()).toContain('Citrus')
      expect(wrapper.text()).toContain('Orange')
      expect(wrapper.text()).toContain('Lemon')
      expect(wrapper.findAll('[role="option"]').length).toBe(2)
      wrapper.unmount()
    })

    it('shows Empty with emptyText when there are no items', async () => {
      const { wrapper } = mountListbox({
        items: [],
        emptyText: 'No results',
        emptyIcon: 'ri:inbox-line',
      })
      await nextTick()

      const empty = wrapper.findComponent(Empty)
      expect(empty.exists()).toBe(true)
      expect(empty.props('title')).toBe('No results')
      expect(empty.props('icon')).toBe('ri:inbox-line')
      expect(wrapper.text()).toContain('No results')
      wrapper.unmount()
    })

    it('shows Empty after filter yields no matches', async () => {
      const { wrapper } = mountListbox({ emptyText: 'Nothing found' })
      await nextTick()

      await wrapper.get('input').setValue('zzzz')
      await nextTick()

      expect(wrapper.findComponent(Empty).exists()).toBe(true)
      expect(wrapper.text()).toContain('Nothing found')
      expect(wrapper.findAll('[role="option"]').length).toBe(0)
      wrapper.unmount()
    })

    it('emits focus and blur from the filter input', async () => {
      const { wrapper } = mountListbox()
      const input = wrapper.get('input')

      await input.trigger('focus')
      await nextTick()
      await input.trigger('blur')
      await nextTick()

      const listbox = getListbox(wrapper)
      expect(listbox.emitted('focus')).toBeTruthy()
      expect(listbox.emitted('blur')).toBeTruthy()
      wrapper.unmount()
    })
  })
})
