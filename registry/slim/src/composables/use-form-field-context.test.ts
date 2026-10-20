import type { FormFieldContextValue } from './use-form-field-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { computed, defineComponent, h, ref } from 'vue'
import {
  provideFormFieldContext,
  useFormFieldBindings,
  useFormFieldContext,
} from './use-form-field-context'

function makeContext(overrides: Partial<FormFieldContextValue> = {}): FormFieldContextValue {
  return {
    fieldId: computed(() => 'field-1'),
    labelId: computed(() => 'label-1'),
    descriptionId: computed(() => 'desc-1'),
    name: ref('email'),
    disabled: computed(() => false),
    required: ref(true),
    loading: computed(() => false),
    valid: computed(() => true),
    invalid: computed(() => true),
    dirty: computed(() => false),
    touched: computed(() => false),
    filled: computed(() => false),
    focused: ref(false),
    dataAttributes: computed(() => ({
      'data-disabled': undefined,
      'data-valid': '',
      'data-invalid': '',
      'data-dirty': undefined,
      'data-touched': undefined,
      'data-filled': undefined,
      'data-focused': undefined,
    })),
    getControlId: () => 'field-1',
    focusControl: () => {},
    resetField: () => {},
    registryControl: () => () => {},
    handleControlFocus: () => {},
    handleControlBlur: () => {},
    ...overrides,
  }
}

function mountWithFieldContext(
  context: FormFieldContextValue,
  consumer: ReturnType<typeof defineComponent>,
  attrs: Record<string, unknown> = {},
) {
  const Provider = defineComponent({
    setup(_, { slots }) {
      provideFormFieldContext(context)
      return () => slots.default?.()
    },
  })

  return mount({
    setup() {
      return () => h(Provider, null, { default: () => h(consumer, attrs) })
    },
  })
}

describe('useFormFieldContext', () => {
  describe('given a provided field context', () => {
    it('returns the injected value from a descendant', () => {
      const Consumer = defineComponent({
        setup() {
          const context = useFormFieldContext()
          return () => h('div', { 'data-name': context.name.value })
        },
      })

      const wrapper = mountWithFieldContext(makeContext(), Consumer)
      expect(wrapper.get('[data-name]').attributes('data-name')).toBe('email')
      wrapper.unmount()
    })
  })

  describe('useFormFieldBindings', () => {
    it('merges id, name, required, aria, and data attributes', () => {
      const Consumer = defineComponent({
        inheritAttrs: false,
        setup() {
          const bindings = useFormFieldBindings()
          return () => h('input', bindings)
        },
      })

      const wrapper = mountWithFieldContext(makeContext(), Consumer, {
        'aria-labelledby': 'extra-label',
      })
      const input = wrapper.get('input')

      expect(input.attributes('id')).toBe('field-1')
      expect(input.attributes('name')).toBe('email')
      expect(input.attributes('required')).toBeDefined()
      expect(input.attributes('aria-labelledby')).toBe('extra-label label-1')
      expect(input.attributes('aria-describedby')).toBe('desc-1')
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.attributes('data-valid')).toBe('')
      expect(input.attributes('data-invalid')).toBe('')
      wrapper.unmount()
    })

    it('omits aria-invalid when the field is disabled', () => {
      const Consumer = defineComponent({
        inheritAttrs: false,
        setup() {
          const bindings = useFormFieldBindings()
          return () => h('input', bindings)
        },
      })

      const wrapper = mountWithFieldContext(makeContext({
        disabled: computed(() => true),
        invalid: computed(() => true),
      }), Consumer)
      const input = wrapper.get('input')

      expect(input.attributes('disabled')).toBeDefined()
      expect(input.attributes('aria-invalid')).toBeUndefined()
      wrapper.unmount()
    })
  })
})
