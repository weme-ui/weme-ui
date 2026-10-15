import type { VueWrapper } from '@vue/test-utils'
import type { ComboboxItems, ComboboxValue } from './combobox.props'
import type { AnyFormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useComboboxStyle } from './combobox.style'
import Combobox from './combobox.vue'

type ComboboxModel = ComboboxValue | ComboboxValue[]

const fruitItems: ComboboxItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
]

function mountCombobox(inputProps: Record<string, unknown> = {}) {
  const isMultiple = inputProps.multiple === true || inputProps.multiple === ''
  const model = ref<ComboboxModel>(
    inputProps.modelValue !== undefined
      ? inputProps.modelValue as ComboboxModel
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
          default: () => h(Combobox as any, {
            'items': fruitItems,
            ...inputProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: ComboboxModel) => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

function getCombobox(wrapper: ReturnType<typeof mount>) {
  // Generic SFC confuses VTU overloads into DOMWrapper; narrow to VueWrapper for emits.
  return wrapper.findComponent(Combobox) as unknown as VueWrapper
}

async function openList(wrapper: ReturnType<typeof mount>) {
  // Click the anchor surface (not ComboboxTrigger): Trigger click bubbles to
  // Anchor's `@click="open = !open"` and would toggle open then closed.
  const root = wrapper.get('[data-slot="combobox"]')
  const anchor = root.element.firstElementChild as HTMLElement | null
  expect(anchor).toBeTruthy()
  anchor!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await nextTick()
  await nextTick()
}

describe('combobox', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useComboboxStyle({})
    expect(ui.root()).toContain('group')
    expect(ui.root()).toContain('relative')
    expect(ui.root()).toContain('text-sm')
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.anchor()).toContain('px-2.5')
    expect(ui.anchor()).toContain('gap-sm')
    expect(ui.values()).toContain('text-subtle')
    expect(ui.filterInput()).toContain('placeholder:text-subtle')
    expect(ui.content()).toContain('bg-base')
    expect(ui.content()).toContain('shadow-xs')
    expect(ui.group()).toContain('flex')
    expect(ui.group()).toContain('flex-col')
    expect(ui.group()).toContain('p-1')
    expect(ui.label()).toContain('text-subtle')
    expect(ui.label()).toContain('text-sm')
    expect(ui.viewport()).toContain('mt-13.5')
    expect(ui.item()).toContain('group/item')
    expect(ui.item()).toContain('data-[highlighted]:bg-muted')
    expect(ui.itemIndicator()).toContain('text-accent')
    expect(ui.itemIndicator()).toContain('ml-auto')
    expect(ui.separator()).toContain('my-1')
    expect(ui.separator()).toContain('b-b')
    expect(ui.valueCount()).toContain('ml-4')
    expect(ui.valueCount()).toContain('bg-elevated')
  })

  it('applies size variants', () => {
    const sm = useComboboxStyle({ size: 'sm' })
    expect(sm.root()).toContain('h-6')
    expect(sm.root()).toContain('text-xs')
    expect(sm.anchor()).toContain('px-1.5')
    expect(sm.viewport()).toContain('mt-11')
    expect(sm.group()).toContain('p-0.5')
    expect(sm.label()).toContain('text-xs')
    expect(sm.item()).toContain('py-1.5')
    expect(sm.valueCount()).toContain('ml-2')

    const lg = useComboboxStyle({ size: 'lg' })
    expect(lg.root()).toContain('h-10')
    expect(lg.root()).toContain('text-base')
    expect(lg.anchor()).toContain('px-3')
    expect(lg.viewport()).toContain('mt-14.5')
    expect(lg.group()).toContain('p-1.5')
    expect(lg.label()).toContain('text-base')
    expect(lg.item()).toContain('py-3')
  })

  it('applies radius variants', () => {
    expect(useComboboxStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(useComboboxStyle({ radius: 'md' }).root()).toContain('rounded-md')
    expect(useComboboxStyle({ radius: 'xl' }).root()).toContain('rounded-xl')

    const full = useComboboxStyle({ radius: 'full' })
    expect(full.root()).toContain('rounded-full')
    expect(full.content()).toContain('rounded-5')
    expect(full.item()).toContain('rounded-4')
    expect(full.valueCount()).toContain('rounded-full')
    expect(full.anchor()).toContain('px-3.5')
  })

  it('applies appearance variants', () => {
    const soft = useComboboxStyle({ variant: 'soft' }).root().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = useComboboxStyle({ variant: 'outline' })
    expect(outline.root().split(/\s+/)).toContain('bg-base')
    expect(outline.content()).toContain('b')
    expect(outline.content()).toContain('b-base')
  })

  it('applies focus compounds when valid', () => {
    const soft = useComboboxStyle({ variant: 'soft', invalid: false })
    expect(soft.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.root()).toContain('hover:not-[[data-focused]]:bg-elevated')

    const outline = useComboboxStyle({ variant: 'outline', invalid: false })
    expect(outline.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
  })

  it('applies invalid, disabled, and loading states', () => {
    expect(useComboboxStyle({ invalid: true }).root()).toContain('b-error')
    expect(useComboboxStyle({ invalid: true }).root()).toContain('outline-error-4')
    expect(useComboboxStyle({ disabled: true }).root()).toContain('is-disabled')

    const loading = useComboboxStyle({ loading: true })
    expect(loading.root()).toContain('is-loading')
    expect(loading.suffixIcon()).toContain('animate-spin')
  })

  it('applies hasDescription item layout', () => {
    const withDescription = useComboboxStyle({ hasDescription: true, size: 'md' })
    expect(withDescription.itemContent()).toContain('pr-2')
    expect(withDescription.itemContent()).toContain('flex-col')
    expect(withDescription.itemIcon()).toContain('mt-0.75')

    const without = useComboboxStyle({ hasDescription: false })
    expect(without.item()).toContain('flex-y-center')
  })

  it('skips appearance styles when unstyled', () => {
    const unstyled = useComboboxStyle({ unstyled: true, variant: 'soft' })
    expect(unstyled.root()).not.toContain('bg-muted')
    expect(unstyled.content()).not.toContain('bg-base')
    expect(unstyled.item()).not.toContain('data-[highlighted]:bg-muted')
    expect(unstyled.label() ?? '').not.toContain('text-subtle')
    expect(unstyled.values() ?? '').not.toContain('text-subtle')
    expect(unstyled.filterInput()).not.toContain('placeholder:text-subtle')
  })

  describe('given a combobox inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountCombobox({ placeholder: 'Pick fruit…' })
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify stub SVGs use role="img" without alt.
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders the combobox root with data-slot', () => {
      const { wrapper } = mountCombobox({ placeholder: 'Pick fruit…' })
      expect(wrapper.find('[data-slot="combobox"]').exists()).toBe(true)
      wrapper.unmount()
    })

    it('applies the disabled style state on the root', () => {
      const { wrapper } = mountCombobox({ disabled: true })
      expect(wrapper.get('[data-slot="combobox"]').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('applies the loading style state on the root', () => {
      const { wrapper } = mountCombobox({ loading: true })
      expect(wrapper.get('[data-slot="combobox"]').classes()).toContain('is-loading')
      wrapper.unmount()
    })

    it('shows the clear control when clearable and multiple valued', async () => {
      const { wrapper } = mountCombobox({
        multiple: true,
        modelValue: ['apple'],
        clearable: true,
      })
      await nextTick()
      expect(wrapper.findAll('button[type="button"]').length).toBeGreaterThanOrEqual(2)
      wrapper.unmount()
    })

    it('hides the clear control when disabled', async () => {
      const { wrapper } = mountCombobox({
        multiple: true,
        modelValue: ['apple'],
        clearable: true,
        disabled: true,
      })
      await nextTick()
      expect(wrapper.findAll('button[type="button"]')).toHaveLength(1)
      wrapper.unmount()
    })

    it('opens and lists options when the trigger is activated', async () => {
      const { wrapper } = mountCombobox({ placeholder: 'Pick fruit…' })
      await openList(wrapper)

      const options = document.body.querySelectorAll('[role="option"]')
      expect(options.length).toBe(3)
      expect(document.body.textContent).toContain('Apple')
      expect(document.body.textContent).toContain('Banana')
      expect(document.body.querySelector('[data-slot="combobox-content"]')).toBeTruthy()
      wrapper.unmount()
    })

    it('selects an option and emits update:modelValue and change', async () => {
      const { wrapper, model } = mountCombobox({ modelValue: '' })
      await openList(wrapper)

      const apple = Array.from(document.body.querySelectorAll('[role="option"]'))
        .find(el => el.textContent?.includes('Apple'))
      expect(apple).toBeTruthy()
      apple!.dispatchEvent(new PointerEvent('click', { bubbles: true }))
      await nextTick()

      expect(model.value).toBe('apple')
      const combobox = getCombobox(wrapper)
      expect(combobox.emitted('update:modelValue')?.at(-1)).toEqual(['apple'])
      expect(combobox.emitted('change')?.at(-1)).toEqual(['apple'])
      wrapper.unmount()
    })

    it('supports multiple selection', async () => {
      const { wrapper, model } = mountCombobox({
        multiple: true,
        modelValue: [],
      })
      await openList(wrapper)

      const apple = Array.from(document.body.querySelectorAll('[role="option"]'))
        .find(el => el.textContent?.includes('Apple'))
      expect(apple).toBeTruthy()
      apple!.dispatchEvent(new PointerEvent('click', { bubbles: true }))
      await nextTick()

      expect(model.value).toEqual(['apple'])
      wrapper.unmount()
    })

    it('shows selected label for single selection', async () => {
      const { wrapper } = mountCombobox({ modelValue: 'apple' })
      await nextTick()
      expect(wrapper.get('[data-slot="combobox"]').text()).toContain('Apple')
      wrapper.unmount()
    })

    it('shows placeholder and value count for multiple selection', async () => {
      const empty = mountCombobox({
        multiple: true,
        modelValue: [],
        placeholder: 'Pick fruits…',
      })
      expect(empty.wrapper.get('[data-slot="combobox"]').text()).toContain('Pick fruits…')
      empty.wrapper.unmount()

      const valued = mountCombobox({
        multiple: true,
        modelValue: ['apple', 'banana'],
      })
      await nextTick()
      expect(valued.wrapper.get('[data-slot="combobox"]').text()).toContain('2')
      valued.wrapper.unmount()
    })

    it('renders group labels and separators', async () => {
      const { wrapper } = mountCombobox({
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

      expect(document.body.textContent).toContain('Citrus')
      expect(document.body.textContent).toContain('Orange')
      expect(document.body.textContent).toContain('Lemon')
      expect(document.body.querySelectorAll('[role="option"]').length).toBe(2)
      wrapper.unmount()
    })

    it('shows empty text when there are no items', async () => {
      const { wrapper } = mountCombobox({
        items: [],
        emptyText: 'No results',
      })
      await openList(wrapper)

      expect(document.body.textContent).toContain('No results')
      wrapper.unmount()
    })

    it('emits focus and blur from the filter input', async () => {
      const { wrapper } = mountCombobox()
      await openList(wrapper)

      const input = document.body.querySelector('input')
      expect(input).toBeTruthy()
      input!.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
      await nextTick()
      input!.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
      await nextTick()

      const combobox = getCombobox(wrapper)
      expect(combobox.emitted('focus')).toBeTruthy()
      expect(combobox.emitted('blur')).toBeTruthy()
      wrapper.unmount()
    })
  })
})
