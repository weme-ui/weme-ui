import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'
import { useAttrs } from 'vue'
import { isBoolDataAttrValue, toBoolAriaValue } from '~/utils/props'

export type FormFieldDataAttributes = Record<`data-${'disabled' | 'valid' | 'invalid' | 'focused' | 'touched' | 'dirty' | 'filled'}`, '' | undefined>

export interface FormFieldControlRegistration {
  id?: () => string | undefined
}

export interface FormFieldContextValue {
  fieldId: ComputedRef<string | undefined>
  labelId: ComputedRef<string | undefined>
  descriptionId: ComputedRef<string | undefined>
  name: Ref<string | undefined>
  required: Ref<boolean>
  loading: ComputedRef<boolean>
  valid: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  dirty: ComputedRef<boolean>
  touched: ComputedRef<boolean>
  filled: ComputedRef<boolean>
  focused: Ref<boolean>
  disabled: ComputedRef<boolean>
  dataAttributes: ComputedRef<FormFieldDataAttributes>
  getControlId: () => string | undefined
  registryControl: (control: FormFieldControlRegistration) => () => void
  handleControlFocus: () => void
  handleControlBlur: () => void
}

export interface FormFieldSharedProps {
  id?: string
  name?: string
  loading?: boolean
  required?: boolean
  disabled?: boolean
  invalid?: boolean
}

export const [
  useFormFieldContext,
  provideFormFieldContext,
] = createContext<FormFieldContextValue>('FormField')

function mergeIds(consumerValue: unknown, fieldValue: string | undefined) {
  return [consumerValue as string | undefined, fieldValue].filter(Boolean).join(' ') || undefined
}

export function useFormFieldBindings(props?: FormFieldSharedProps) {
  const attrs = useAttrs()

  const {
    'aria-describedby': describedBy,
    'aria-labelledby': labelledBy,
    'aria-invalid': ariaInvalid,
    name,
    disabled,
    required,
    class: className,
    ...rest
  } = attrs

  const fieldContext = useFormFieldContext()
  const isDisabled = fieldContext.disabled.value ?? isBoolDataAttrValue(disabled)

  return {
    ...rest,
    ...fieldContext.dataAttributes.value,
    'id': props?.id ?? fieldContext.getControlId(),
    'name': fieldContext.name.value ?? name as string | undefined,
    'disabled': props?.disabled || isDisabled || undefined,
    'required': (props?.required || fieldContext.required.value || isBoolDataAttrValue(required)) || undefined,
    'aria-labelledby': mergeIds(labelledBy, fieldContext.labelId.value),
    'aria-describedby': mergeIds(describedBy, fieldContext.descriptionId.value),
    'aria-invalid': ariaInvalid ? toBoolAriaValue(ariaInvalid) : ((fieldContext.invalid.value && !isDisabled) || undefined),
  }
}
