import type { AutocompleteItems } from './autocomplete.props'
import type { FormApi } from '~/composables/use-form-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useAutocompleteStyle } from './autocomplete.style'
import Autocomplete from './autocomplete.vue'

const fruitItems: AutocompleteItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
]

function mountAutocomplete(inputProps: Record<string, unknown> = {}) {
  const model = ref((inputProps.modelValue as string | undefined) ?? '')

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { fruit: model.value },
        onSubmit: async () => {},
      }) as FormApi

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'fruit', label: 'Fruit' }, {
          default: () => h(Autocomplete, {
            'items': fruitItems,
            'openOnFocus': true,
            ...inputProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: string) => {
              model.value = value ?? ''
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('autocomplete', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useAutocompleteStyle({})
    expect(ui.root()).toContain('group')
    expect(ui.root()).toContain('relative')
    expect(ui.root()).toContain('text-sm')
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.anchor()).toContain('px-2.5')
    expect(ui.anchor()).toContain('gap-sm')
    expect(ui.input()).toContain('placeholder:text-subtle')
    expect(ui.content()).toContain('bg-base')
    expect(ui.content()).toContain('shadow-xs')
    expect(ui.group()).toContain('flex')
    expect(ui.group()).toContain('flex-col')
    expect(ui.label()).toContain('text-subtle')
    expect(ui.label()).toContain('text-sm')
    expect(ui.label()).toContain('py-2.5')
    expect(ui.viewport()).toContain('p-1')
    expect(ui.item()).toContain('group/item')
    expect(ui.item()).toContain('data-[highlighted]:bg-muted')
    expect(ui.itemIndicator()).toContain('text-accent')
    expect(ui.itemIndicator()).toContain('ml-auto')
    expect(ui.separator()).toContain('my-1')
    expect(ui.separator()).toContain('b-b')
  })

  it('applies size variants', () => {
    const sm = useAutocompleteStyle({ size: 'sm' })
    expect(sm.root()).toContain('h-6')
    expect(sm.root()).toContain('text-xs')
    expect(sm.anchor()).toContain('px-1.5')
    expect(sm.viewport()).toContain('p-0.5')
    expect(sm.label()).toContain('text-xs')
    expect(sm.label()).toContain('py-1.5')
    expect(sm.item()).toContain('py-1.5')

    const lg = useAutocompleteStyle({ size: 'lg' })
    expect(lg.root()).toContain('h-10')
    expect(lg.root()).toContain('text-base')
    expect(lg.anchor()).toContain('px-3')
    expect(lg.viewport()).toContain('p-1.5')
    expect(lg.label()).toContain('text-base')
    expect(lg.label()).toContain('py-3')
    expect(lg.item()).toContain('py-3')
  })

  it('applies radius variants', () => {
    expect(useAutocompleteStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(useAutocompleteStyle({ radius: 'md' }).root()).toContain('rounded-md')
    expect(useAutocompleteStyle({ radius: 'xl' }).root()).toContain('rounded-xl')

    const full = useAutocompleteStyle({ radius: 'full' })
    expect(full.root()).toContain('rounded-full')
    expect(full.content()).toContain('rounded-5')
    expect(full.item()).toContain('rounded-full')
    expect(full.anchor()).toContain('px-3.5')
  })

  it('applies appearance variants', () => {
    const soft = useAutocompleteStyle({ variant: 'soft' }).root().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = useAutocompleteStyle({ variant: 'outline' })
    expect(outline.root().split(/\s+/)).toContain('bg-base')
    expect(outline.content()).toContain('b')
    expect(outline.content()).toContain('b-base')
  })

  it('applies focus compounds when valid', () => {
    const soft = useAutocompleteStyle({ variant: 'soft', invalid: false })
    expect(soft.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.root()).toContain('hover:not-[[data-focused]]:bg-elevated')

    const outline = useAutocompleteStyle({ variant: 'outline', invalid: false })
    expect(outline.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
  })

  it('applies invalid, disabled, and loading states', () => {
    expect(useAutocompleteStyle({ invalid: true }).root()).toContain('b-error')
    expect(useAutocompleteStyle({ invalid: true }).root()).toContain('outline-error-4')
    expect(useAutocompleteStyle({ disabled: true }).root()).toContain('is-disabled')

    const loading = useAutocompleteStyle({ loading: true })
    expect(loading.root()).toContain('is-loading')
    expect(loading.suffixIcon()).toContain('animate-spin')
  })

  it('skips appearance styles when unstyled', () => {
    const unstyled = useAutocompleteStyle({ unstyled: true, variant: 'soft' })
    expect(unstyled.root()).not.toContain('bg-muted')
    expect(unstyled.content()).not.toContain('bg-base')
    expect(unstyled.item()).not.toContain('data-[highlighted]:bg-muted')
    expect(unstyled.label() ?? '').not.toContain('text-subtle')
    expect(unstyled.input()).not.toContain('placeholder:text-subtle')
  })

  describe('given an autocomplete inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountAutocomplete({ placeholder: 'Search fruit…' })
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify stub SVGs use role="img" without alt.
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders a combobox input with the field label association', () => {
      const { wrapper } = mountAutocomplete({ placeholder: 'Search fruit…' })
      const input = wrapper.get('input')
      expect(input.attributes('placeholder')).toBe('Search fruit…')
      expect(wrapper.find('[data-slot="autocomplete"]').exists()).toBe(true)
      wrapper.unmount()
    })

    it('applies the disabled style state on the root', () => {
      const { wrapper } = mountAutocomplete({ disabled: true })
      expect(wrapper.get('[data-slot="autocomplete"]').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('applies the loading style state and spins the suffix icon', () => {
      const { wrapper } = mountAutocomplete({ loading: true })
      expect(wrapper.get('[data-slot="autocomplete"]').classes()).toContain('is-loading')
      wrapper.unmount()
    })

    it('shows the clear control when clearable and valued', async () => {
      const { wrapper } = mountAutocomplete({
        modelValue: 'apple',
        clearable: true,
      })
      await nextTick()
      // AutocompleteCancel + AutocompleteTrigger are both buttons.
      expect(wrapper.findAll('button[type="button"]').length).toBeGreaterThanOrEqual(2)
      wrapper.unmount()
    })

    it('hides the clear control when disabled', async () => {
      const { wrapper } = mountAutocomplete({
        modelValue: 'apple',
        clearable: true,
        disabled: true,
      })
      await nextTick()
      // Only the trigger button remains (Cancel is gated by hasClean).
      expect(wrapper.findAll('button[type="button"]')).toHaveLength(1)
      wrapper.unmount()
    })

    it('opens and lists options on focus', async () => {
      const { wrapper } = mountAutocomplete({ placeholder: 'Search fruit…' })
      await wrapper.get('input').trigger('focus')
      await nextTick()
      await nextTick()

      const options = document.body.querySelectorAll('[role="option"]')
      expect(options.length).toBe(3)
      expect(document.body.textContent).toContain('Apple')
      expect(document.body.textContent).toContain('Banana')
      wrapper.unmount()
    })

    it('selects an option and emits update:modelValue and change', async () => {
      const { wrapper, model } = mountAutocomplete({ modelValue: '' })
      await wrapper.get('input').trigger('focus')
      await nextTick()
      await nextTick()

      const apple = Array.from(document.body.querySelectorAll('[role="option"]'))
        .find(el => el.textContent?.includes('Apple'))
      expect(apple).toBeTruthy()
      apple!.dispatchEvent(new PointerEvent('click', { bubbles: true }))
      await nextTick()

      expect(model.value).toBe('apple')
      const autocomplete = wrapper.findComponent(Autocomplete)
      expect(autocomplete.emitted('update:modelValue')?.at(-1)).toEqual(['apple'])
      expect(autocomplete.emitted('change')?.at(-1)).toEqual(['apple'])
      wrapper.unmount()
    })

    it('renders group labels and separators', async () => {
      const { wrapper } = mountAutocomplete({
        items: [
          [
            { type: 'label', label: 'Citrus', value: 'citrus-label' },
            { label: 'Orange', value: 'orange' },
            { type: 'separator', value: 'sep' },
            { label: 'Lemon', value: 'lemon' },
          ],
        ],
      })
      await wrapper.get('input').trigger('focus')
      await nextTick()
      await nextTick()

      expect(document.body.textContent).toContain('Citrus')
      expect(document.body.textContent).toContain('Orange')
      expect(document.body.textContent).toContain('Lemon')
      // label / separator are not options; only selectable items are.
      expect(document.body.querySelectorAll('[role="option"]').length).toBe(2)
      wrapper.unmount()
    })

    it('shows empty text when there are no items', async () => {
      const { wrapper } = mountAutocomplete({
        items: [],
        emptyText: 'No results',
        openOnFocus: true,
      })
      await wrapper.get('input').trigger('focus')
      await nextTick()
      await nextTick()

      expect(document.body.textContent).toContain('No results')
      wrapper.unmount()
    })

    it('emits focus and blur from the input', async () => {
      const { wrapper } = mountAutocomplete()
      const input = wrapper.get('input')
      await input.trigger('focus')
      await input.trigger('blur')
      const autocomplete = wrapper.findComponent(Autocomplete)
      expect(autocomplete.emitted('focus')).toBeTruthy()
      expect(autocomplete.emitted('blur')).toBeTruthy()
      wrapper.unmount()
    })
  })
})
