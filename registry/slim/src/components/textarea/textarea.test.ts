import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useTextareaStyle } from './textarea.style'
import Textarea from './textarea.vue'

function mountTextarea(textareaProps: Record<string, unknown> = {}) {
  const model = ref((textareaProps.modelValue as string | undefined) ?? '')

  const Root = defineComponent({
    setup() {
      const form = useForm({
        defaultValues: { bio: model.value },
        onSubmit: async () => {},
      })

      return () => h(Form, { form }, () =>
        h(FormField, { name: 'bio', label: 'Bio' }, {
          default: () => h(Textarea, {
            ...textareaProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: string | null | undefined) => {
              model.value = value == null ? '' : String(value)
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('textarea', () => {
  it('applies default soft variant, size, and radius', () => {
    const ui = useTextareaStyle({})
    expect(ui.root()).toContain('h-fit')
    expect(ui.root()).toContain('rounded-md')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('transition-colors')
    expect(ui.textarea()).toContain('placeholder:text-subtle')
    expect(ui.textarea()).toContain('p-sm')
  })

  it('applies size variants', () => {
    expect(useTextareaStyle({ size: 'sm' }).root()).toContain('text-xs')
    expect(useTextareaStyle({ size: 'sm' }).textarea()).toContain('p-xs')
    expect(useTextareaStyle({ size: 'sm' }).innerWrapper()).toContain('bottom-1')

    expect(useTextareaStyle({ size: 'md' }).root()).toContain('text-sm')
    expect(useTextareaStyle({ size: 'lg' }).root()).toContain('text-base')
    expect(useTextareaStyle({ size: 'lg' }).textarea()).toContain('p-md')
  })

  it('applies radius variants', () => {
    expect(useTextareaStyle({ radius: 'none' }).root()).toContain('rounded-none')
    expect(useTextareaStyle({ radius: 'md' }).root()).toContain('rounded-md')
    expect(useTextareaStyle({ radius: 'xl' }).root()).toContain('rounded-xl')
  })

  it('applies appearance variants', () => {
    const soft = useTextareaStyle({ variant: 'soft' }).root().split(/\s+/)
    expect(soft).toContain('bg-muted')
    expect(soft).toContain('b')

    const outline = useTextareaStyle({ variant: 'outline' }).root().split(/\s+/)
    expect(outline).toContain('bg-base')
    expect(outline).toContain('b')

    const unstyledRoot = useTextareaStyle({ unstyled: true }).root()
    expect(unstyledRoot).not.toContain('bg-muted')
    expect(unstyledRoot).not.toContain('b-transparent')
  })

  it('applies soft and outline focus compounds when valid', () => {
    const soft = useTextareaStyle({ variant: 'soft', invalid: false })
    expect(soft.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(soft.root()).toContain('hover:not-[[data-focused]]:bg-elevated')

    const outline = useTextareaStyle({ variant: 'outline', invalid: false })
    expect(outline.root()).toContain('data-[focused]:(bg-base b-accent outline-2 outline-accent-4)')
    expect(outline.root()).toContain('hover:not-[[data-focused]]:b-elevated')
  })

  it('applies invalid border for soft and outline', () => {
    expect(useTextareaStyle({ variant: 'soft', invalid: true }).root()).toContain('b-error')
    expect(useTextareaStyle({ variant: 'soft', invalid: true }).root()).toContain('outline-error-4')
    expect(useTextareaStyle({ variant: 'outline', invalid: true }).root()).toContain('b-error')
  })

  it('applies disabled and loading states', () => {
    expect(useTextareaStyle({ disabled: true }).root()).toContain('is-disabled')

    const loading = useTextareaStyle({ loading: true })
    expect(loading.root()).toContain('is-loading')
    expect(loading.loader()).toContain('animate-spin')
  })

  it('applies autosize resize classes', () => {
    expect(useTextareaStyle({ autosize: true }).textarea()).toContain('resize-y')
    expect(useTextareaStyle({ autosize: false }).textarea()).toContain('resize-none')
  })

  it('applies counter and overcount styles', () => {
    // compound text-subtle wins via twMerge over text-(xs nowrap) when not overcount
    expect(useTextareaStyle({}).counter()).toContain('text-subtle')
    expect(useTextareaStyle({}).counter()).toContain('px-sm')
    // overcount text-error survives when unstyled; styled counter text-* merges it away via twMerge
    expect(useTextareaStyle({ overcount: true, unstyled: true }).counter()).toContain('text-error')
  })

  describe('given a textarea inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountTextarea({ placeholder: 'Tell us about yourself…' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('updates modelValue on input', async () => {
      const { wrapper, model } = mountTextarea({ modelValue: '' })
      const textarea = wrapper.get('textarea')
      await textarea.setValue('hello')
      expect(model.value).toBe('hello')
      wrapper.unmount()
    })

    it('renders the counter when countable and maxLength are set', async () => {
      const { wrapper } = mountTextarea({
        modelValue: 'hi',
        countable: true,
        maxLength: 10,
      })
      await nextTick()
      expect(wrapper.text()).toContain('2 / 10')
      wrapper.unmount()
    })

    it('does not render the counter when maxLength is missing', async () => {
      const { wrapper } = mountTextarea({
        modelValue: 'hi',
        countable: true,
      })
      await nextTick()
      expect(wrapper.text()).not.toContain('2 /')
      wrapper.unmount()
    })

    it('renders the loader when loading', async () => {
      const { wrapper } = mountTextarea({ loading: true })
      await nextTick()
      expect(wrapper.find('[data-slot="textarea"] .animate-spin').exists() || wrapper.find('svg').exists()).toBe(true)
      wrapper.unmount()
    })

    it('emits change with the textarea string on native change', async () => {
      const { wrapper } = mountTextarea({ modelValue: '' })
      const textarea = wrapper.get('textarea')
      await textarea.setValue('typed')
      await textarea.trigger('change')
      const emitted = wrapper.findComponent(Textarea).emitted('change') as any[][]
      expect(emitted.at(-1)?.[0]).toBe('typed')
      wrapper.unmount()
    })

    it('emits focus and blur from the textarea', async () => {
      const { wrapper } = mountTextarea()
      const textarea = wrapper.get('textarea')
      await textarea.trigger('focus')
      await textarea.trigger('blur')
      const component = wrapper.findComponent(Textarea)
      expect(component.emitted('focus')).toBeTruthy()
      expect(component.emitted('blur')).toBeTruthy()
      wrapper.unmount()
    })

    it('trims modelValue when trim modifier is set', async () => {
      const { wrapper, model } = mountTextarea({
        modelValue: '',
        modelModifiers: { trim: true },
      })
      const textarea = wrapper.get('textarea')
      await textarea.setValue('  hello  ')
      expect(model.value).toBe('hello')
      wrapper.unmount()
    })

    it('exposes data-slot on the root', () => {
      const { wrapper } = mountTextarea()
      expect(wrapper.find('[data-slot="textarea"]').exists()).toBe(true)
      wrapper.unmount()
    })

    it('sets data-readonly when readonly', async () => {
      const { wrapper } = mountTextarea({ readonly: true })
      await nextTick()
      const root = wrapper.find('[data-slot="textarea"]')
      expect(root.attributes('data-readonly')).toBeDefined()
      wrapper.unmount()
    })

    it('skips svg-img-alt for loading icon', async () => {
      // Iconify SVG uses role="img" without alt.
      const { wrapper } = mountTextarea({ loading: true })
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
