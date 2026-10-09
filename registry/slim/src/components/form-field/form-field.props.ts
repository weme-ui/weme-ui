import type { PrimitiveProps } from 'reka-ui'
import type { FormFieldStyleProps, FormFieldStyleSlots } from './form-field.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

export interface FormFieldProps extends PrimitiveProps, Omit<FormFieldSharedProps, 'name'> {
  orientation?: FormFieldStyleProps['orientation']
  name: string
  label?: string
  description?: string
  hint?: string
  help?: string
  nativeLabel?: boolean
  class?: any
  ui?: Partial<FormFieldStyleSlots>
}
