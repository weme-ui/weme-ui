import type { FormApi as CoreFormApi, VueFormApi } from '@tanstack/vue-form'
import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'

export {
  useForm,
  useField as useFormField,
} from '@tanstack/vue-form'

export type FormApi = CoreFormApi<any, any, any, any, any, any, any, any, any, any, any, any>
  & VueFormApi<any, any, any, any, any, any, any, any, any, any, any, any>

export type FormValidationMode = 'onSubmit' | 'onBlur' | 'onChange'

export interface FormRegisteredField {
  name: Ref<string | undefined>
  invalid: ComputedRef<boolean>
  getValue: () => unknown
  getControlElement: () => HTMLElement | undefined
  resetField: () => void
}

export interface FormContextValue {
  serverErrors: ComputedRef<Record<string, string | string[]>>
  validationMode: Ref<FormValidationMode>
  disabled: Ref<boolean>
  loading: Ref<boolean>
  form: FormApi
  getValues: () => Record<string, unknown>
  registerField: (field: FormRegisteredField) => () => void
}

export const [
  useFormContext,
  provideFormContext,
] = createContext<FormContextValue>('Form')
