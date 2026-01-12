import type { RuleExpression } from 'vee-validate'
import type { FormFieldStyleProps, FormFieldStyleSlots } from './form-field.style'

export interface FormFieldProps {
  as?: any
  id?: string
  name: string
  label?: string
  value?: any
  type?: string
  uncheckedValue?: any
  rules?: RuleExpression<unknown>
  validateOnMount?: boolean
  validateOnInput?: boolean
  validateOnChange?: boolean
  validateOnBlur?: boolean
  validateOnModelUpdate?: boolean
  bails?: boolean
  standalone?: boolean
  keepValue?: boolean

  orientation?: FormFieldStyleProps['orientation']
  size?: FormFieldStyleProps['size']
  radius?: FormFieldStyleProps['radius']
  hint?: string
  description?: string
  help?: string
  disabled?: boolean
  required?: boolean
  class?: any
  ui?: Partial<FormFieldStyleSlots>
}
