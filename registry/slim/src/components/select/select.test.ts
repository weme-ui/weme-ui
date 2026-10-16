import type { VueWrapper } from '@vue/test-utils'
import type { SelectItems, SelectValue } from './select.props'
import type { AnyFormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import Empty from '../empty/empty.vue'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useSelectStyle } from './select.style'
import Select from './select.vue'

type SelectModel = SelectValue | SelectValue[]

const fruitItems: SelectItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
]

function mountSelect(inputProps: Record<string, unknown> = {}) {
  const isMultiple = inputProps.multiple === true || inputProps.multiple === ''
  const model = ref<SelectModel>(
    inputProps.modelValue !== undefined
      ? inputProps.modelValue as SelectModel
      : (isMultiple ? [] : ''),
  )

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { fruit: model.value },
        onSubmit: async () => {},
      }) as AnyFormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'fruit', label: 'Fruit' }, {
          // Generic SFC props are not fully inferred under `h()`.
          default: () => h(Select as any, {
            'items': fruitItems,
            ...inputProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: SelectModel) => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

function getSelect(wrapper: ReturnType<typeof mount>) {
  return wrapper.findComponent(Select) as unknown as VueWrapper
}

async function openList(wrapper: ReturnType<typeof mount>) {
  const trigger = wrapper.get('[data-slot="select"]')
  await trigger.trigger('pointerdown')
  await trigger.trigger('click')
  await nextTick()
  await nextTick()
}

function contentOptions() {
  return Array.from(document.body.querySelectorAll('[data-slot="select-content"] [role="option"]'))
}

async function selectOption(label: string) {
  const option = contentOptions().find(el => el.textContent?.includes(label))
  expect(option).toBeTruthy()
  // Reka SelectItem commits on pointerup.
  option!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
  option!.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))
  await nextTick()
  await nextTick()
}

describe('select', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useSelectStyle({})
    expect(ui.trigger()).toContain('group/trigger')
    expect(ui.trigger()).toContain('text-sm')
    expect(ui.trigger()).toContain('h-8')
    expect(ui.trigger()).toContain('rounded-md')
    expect(ui.trigger()).toContain('bg-muted')
    expect(ui.trigger()).toContain('px-2.5')
    expect(ui.trigger()).toContain('gap-sm')
    expect(ui.value()).toContain('data-[placeholder]:text-subtle')
    expect(ui.content()).toContain('bg-base')
    expect(ui.content()).toContain('shadow-xs')
    expect(ui.group()).toContain('flex')
    expect(ui.group()).toContain('flex-col')
    expect(ui.group()).toContain('p-1')
    expect(ui.groupLabel()).toContain('text-subtle')
    expect(ui.item()).toContain('group/item')
    expect(ui.item()).toContain('data-[highlighted]:bg-muted')
    expect(ui.itemIndicator()).toContain('text-accent')
    expect(ui.itemIndicator()).toContain('ml-auto')
    expect(ui.separator()).toContain('my-1')
    expect(ui.separator()).toContain('b-b')
    expect(ui.valueCount()).toContain('ml-4')
  })

  it('applies size variants', () => {
    const sm = useSelectStyle({ size: 'sm' })
    expect(sm.trigger()).toContain('h-6')
    expect(sm.trigger()).toContain('text-xs')
    expect(sm.trigger()).toContain('px-1.5')
    expect(sm.group()).toContain('p-0.5')
    expect(sm.groupLabel()).toContain('text-xs')
    expect(sm.item()).toContain('py-1.5')
    expect(sm.valueCount()).toContain('ml-2')

    const lg = useSelectStyle({ size: 'lg' })
    expect(lg.trigger()).toContain('h-10')
    expect(lg.trigger()).toContain('text-base')
    expect(lg.trigger()).toContain('px-3')
    expect(lg.group()).toContain('p-1.5')
    expect(lg.groupLabel()).toContain('text-sm')
    expect(lg.item()).toContain('py-2.5')
  })

  it('applies radius variants', () => {
    expect(useSelectStyle({ radius: 'none' }).trigger()).toContain('rounded-none')
    expect(useSelectStyle({ radius: 'md' }).trigger()).toContain('rounded-md')
    expect(useSelectStyle({ radius: 'xl' }).trigger()).toContain('rounded-xl')

    const full = useSelectStyle({ radius: 'full' })
    expect(full.trigger()).toContain('rounded-full')
    expect(full.content()).toContain('rounded-5')
    expect(full.item()).toContain('rounded-4')
    expect(full.valueCount()).toContain('rounded-full')
    expect(full.trigger()).toContain('px-3.5')
  })

  it('applies appearance variants', () => {
    const soft = useSelectStyle({ variant: 'soft' })
    expect(soft.trigger()).toContain('bg-muted')
    expect(soft.trigger()).toContain('b')

    const outline = useSelectStyle({ variant: 'outline' })
    expect(outline.trigger()).toContain('bg-base')
    expect(outline.content()).toContain('b')
    expect(outline.content()).toContain('b-base')
  })

  it('applies open-state compounds when valid', () => {
    const soft = useSelectStyle({ variant: 'soft', invalid: false })
    expect(soft.trigger()).toContain('data-[state=open]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.trigger()).toContain('hover:bg-elevated')

    const outline = useSelectStyle({ variant: 'outline', invalid: false })
    expect(outline.trigger()).toContain('data-[state=open]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(outline.trigger()).toContain('hover:b-elevated')
  })

  it('applies disabled and loading states', () => {
    expect(useSelectStyle({ disabled: true }).trigger()).toContain('is-disabled')

    const loading = useSelectStyle({ loading: true })
    expect(loading.trigger()).toContain('is-loading')
    expect(loading.suffixIcon()).toContain('animate-spin')
  })

  it('applies hasDescription item layout', () => {
    const withDescription = useSelectStyle({ hasDescription: true, size: 'md' })
    expect(withDescription.itemContent()).toContain('pr-2')
    expect(withDescription.itemContent()).toContain('flex-col')
    expect(withDescription.itemIcon()).toContain('mt-0.75')

    const without = useSelectStyle({ hasDescription: false })
    expect(without.item()).toContain('flex-y-center')
  })

  it('skips appearance styles when unstyled', () => {
    const unstyled = useSelectStyle({ unstyled: true, variant: 'soft' })
    expect(unstyled.trigger()).not.toContain('bg-muted')
    expect(unstyled.content()).not.toContain('bg-base')
    expect(unstyled.item()).not.toContain('data-[highlighted]:bg-muted')
    expect(unstyled.value()).not.toContain('data-[placeholder]:text-subtle')
    expect(unstyled.groupLabel() ?? '').not.toContain('text-subtle')
  })

  describe('given a select inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountSelect({ placeholder: 'Pick fruit…' })
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify stub SVGs use role="img" without alt.
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders the select trigger with data-slot', () => {
      const { wrapper } = mountSelect({ placeholder: 'Pick fruit…' })
      expect(wrapper.find('[data-slot="select"]').exists()).toBe(true)
      wrapper.unmount()
    })

    it('applies the disabled style state on the trigger', () => {
      const { wrapper } = mountSelect({ disabled: true })
      expect(wrapper.get('[data-slot="select"]').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('applies the loading style state on the trigger', () => {
      const { wrapper } = mountSelect({ loading: true })
      expect(wrapper.get('[data-slot="select"]').classes()).toContain('is-loading')
      wrapper.unmount()
    })

    it('shows placeholder when empty', () => {
      const { wrapper } = mountSelect({ placeholder: 'Pick fruit…' })
      expect(wrapper.get('[data-slot="select"]').text()).toContain('Pick fruit…')
      const value = wrapper.get('[data-placeholder]')
      expect(value.attributes('data-placeholder')).toBe('')
      wrapper.unmount()
    })

    it('shows selected label for single selection', async () => {
      const { wrapper } = mountSelect({ modelValue: 'apple' })
      await nextTick()
      expect(wrapper.get('[data-slot="select"]').text()).toContain('Apple')
      wrapper.unmount()
    })

    it('shows value count for multiple selection', async () => {
      const { wrapper } = mountSelect({
        multiple: true,
        modelValue: ['apple', 'banana'],
      })
      await nextTick()
      expect(wrapper.get('[data-slot="select"]').text()).toContain('2')
      wrapper.unmount()
    })

    it('opens and lists options when the trigger is activated', async () => {
      const { wrapper } = mountSelect({ placeholder: 'Pick fruit…' })
      await openList(wrapper)

      expect(contentOptions().length).toBe(3)
      expect(document.body.textContent).toContain('Apple')
      expect(document.body.textContent).toContain('Banana')
      expect(document.body.querySelector('[data-slot="select-content"]')).toBeTruthy()
      wrapper.unmount()
    })

    it('selects an option and emits update:modelValue and change', async () => {
      const { wrapper, model } = mountSelect({ modelValue: '' })
      await openList(wrapper)
      await selectOption('Apple')

      expect(model.value).toBe('apple')
      const select = getSelect(wrapper)
      expect(select.emitted('update:modelValue')?.at(-1)).toEqual(['apple'])
      expect(select.emitted('change')?.at(-1)).toEqual(['apple'])
      wrapper.unmount()
    })

    it('supports multiple selection', async () => {
      const { wrapper, model } = mountSelect({
        multiple: true,
        modelValue: [],
      })
      await openList(wrapper)
      await selectOption('Apple')

      expect(model.value).toEqual(['apple'])
      wrapper.unmount()
    })

    it('emits update:open when the list opens', async () => {
      const { wrapper } = mountSelect({ placeholder: 'Pick fruit…' })
      await openList(wrapper)

      const select = getSelect(wrapper)
      expect(select.emitted('update:open')?.at(-1)).toEqual([true])
      wrapper.unmount()
    })

    it('renders group labels and separators', async () => {
      const { wrapper } = mountSelect({
        items: [
          [
            { type: 'label', label: 'Citrus', value: 'citrus-label' },
            { label: 'Orange', value: 'orange' },
            { type: 'separator', value: 'sep' },
            { label: 'Lemon', value: 'lemon' },
          ],
        ],
      })
      await openList(wrapper)

      const content = document.body.querySelector('[data-slot="select-content"]')
      expect(content?.textContent).toContain('Citrus')
      expect(content?.textContent).toContain('Orange')
      expect(content?.textContent).toContain('Lemon')
      expect(contentOptions().length).toBe(2)
      wrapper.unmount()
    })

    it('shows Empty with emptyText when there are no items', async () => {
      const { wrapper } = mountSelect({
        items: [],
        emptyText: 'No results',
        emptyIcon: 'ri:inbox-line',
      })
      await openList(wrapper)

      const empty = wrapper.findComponent(Empty)
      expect(empty.exists()).toBe(true)
      expect(empty.props('title')).toBe('No results')
      expect(empty.props('icon')).toBe('ri:inbox-line')
      expect(document.body.textContent).toContain('No results')
      wrapper.unmount()
    })
  })
})
