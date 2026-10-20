import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { computed, defineComponent, h, ref } from 'vue'
import {
  provideFormContext,
  useForm,
  useFormContext,
  useFormField,
} from './use-form-context'

describe('useFormContext', () => {
  it('re-exports TanStack Vue Form helpers', () => {
    expect(typeof useForm).toBe('function')
    expect(typeof useFormField).toBe('function')
  })

  describe('given a provided form context', () => {
    it('returns the injected value from a descendant', () => {
      const form = { handleSubmit() {} } as any

      const Provider = defineComponent({
        setup(_, { slots }) {
          provideFormContext({
            form,
            validationMode: ref('onSubmit'),
            serverErrors: computed(() => ({})),
            disabled: ref(false),
            loading: ref(true),
            getValues: () => ({ email: 'a@b.c' }),
            registerField: () => () => {},
          })
          return () => slots.default?.()
        },
      })

      const Consumer = defineComponent({
        setup() {
          const context = useFormContext()
          return () => h('div', {
            'data-loading': String(context.loading.value),
            'data-mode': context.validationMode.value,
          })
        },
      })

      const wrapper = mount({
        setup() {
          return () => h(Provider, null, { default: () => h(Consumer) })
        },
      })
      const root = wrapper.get('[data-loading]')
      expect(root.attributes('data-loading')).toBe('true')
      expect(root.attributes('data-mode')).toBe('onSubmit')
      wrapper.unmount()
    })
  })
})
