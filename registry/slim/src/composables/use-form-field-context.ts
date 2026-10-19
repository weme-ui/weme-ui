import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'
import { useAttrs } from 'vue'
import { isBoolDataAttrValue, toBoolAriaValue } from '~/utils/props'

export interface FormFieldSharedProps {
  id?: string
  name?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  loading?: boolean
}

export interface FormFieldControlDetail {
  value: unknown
}

export interface FormFieldControlRegistration {
  id?: () => string | undefined
  element: () => HTMLElement | null | undefined
  getValue: () => unknown
}

export type FormFieldDataAttributes = Record<`data-${'disabled' | 'valid' | 'invalid' | 'dirty' | 'touched' | 'filled' | 'focused'}`, '' | undefined>

export interface FormFieldContextValue {
  fieldId: ComputedRef<string | undefined>
  labelId: ComputedRef<string | undefined>
  descriptionId: ComputedRef<string | undefined>
  name: Ref<string | undefined>
  disabled: ComputedRef<boolean>
  required: Ref<boolean>
  loading: ComputedRef<boolean>
  valid: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  dirty: ComputedRef<boolean>
  touched: ComputedRef<boolean>
  filled: ComputedRef<boolean>
  focused: Ref<boolean>
  dataAttributes: ComputedRef<FormFieldDataAttributes>
  getControlId: () => string | undefined
  focusControl: () => void
  resetField: () => void
  registryControl: (control: FormFieldControlRegistration) => () => void
  handleControlFocus: () => void
  handleControlBlur: (detail?: FormFieldControlDetail) => void
}

export const [
  useFormFieldContext,
  provideFormFieldContext,
] = createContext<FormFieldContextValue>('FormField')

function mergeIds(consumerValue: unknown, fieldValue: string | undefined) {
  return [consumerValue as string | undefined, fieldValue].filter(Boolean).join(' ') || undefined
}

export function useFormFieldBindings() {
  const attrs = useAttrs()

  const {
    'aria-describedby': describedBy,
    'aria-labelledby': labelledBy,
    'aria-invalid': ariaInvalid,
    id,
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
    'id': fieldContext.fieldId.value ?? id as string | undefined,
    'name': fieldContext.name.value ?? name as string | undefined,
    'disabled': isDisabled || undefined,
    'required': (fieldContext.required.value || isBoolDataAttrValue(required)) || undefined,
    'aria-labelledby': mergeIds(labelledBy, fieldContext.labelId.value),
    'aria-describedby': mergeIds(describedBy, fieldContext.descriptionId.value),
    'aria-invalid': ariaInvalid ? toBoolAriaValue(ariaInvalid) : ((fieldContext.invalid.value && !isDisabled) || undefined),
  }
}
