import type { PrimitiveProps } from 'reka-ui'
import type { FormApi, FormValidationMode } from '~/composables/use-form-context'

export interface FormProps extends PrimitiveProps {
  form: FormApi
  validationMode?: FormValidationMode
  errors?: Record<string, string | string[]>
  loading?: boolean
  disabled?: boolean
  class?: any
}

export interface FormEmits {
  submit: [event: SubmitEvent]
  formSubmit: [values: Record<string, unknown>, event: SubmitEvent]
}
