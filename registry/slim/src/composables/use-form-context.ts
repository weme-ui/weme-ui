import type { FormApi, VueFormApi } from '@tanstack/vue-form'
import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export {
  useForm,
  useField as useFormField,
  useSelector as useFormSelector,
} from '@tanstack/vue-form'

export type AnyFormApi = VueFormApi<any, any, any, any, any, any, any, any, any, any, any, any>
  & FormApi<any, any, any, any, any, any, any, any, any, any, any, any>

export interface FormContextValue {
  form: AnyFormApi
  loading: Ref<boolean>
  disabled: Ref<boolean>
}

export const [
  useFormContext,
  provideFormContext,
] = createContext<FormContextValue>('Form')
