import type { AnyFormApi } from '~/composables/use-form-context'

export interface FormProps {
  id?: string
  name?: string
  form: AnyFormApi
  loading?: boolean
  disabled?: boolean
  class?: any
}
