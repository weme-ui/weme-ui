import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'
import { useAttrs } from 'vue'
import { isBoolDataAttrValue, toBoolAriaValue } from '~/utils/props'

export type FormFieldDataAttributes = Record<`data-${'disabled' | 'valid' | 'invalid' | 'focused' | 'touched' | 'dirty' | 'filled'}`, '' | undefined>

export interface FormFieldContextValue {
  fieldId: ComputedRef<string | undefined>
  labelId: ComputedRef<string | undefined>
  descriptionId: ComputedRef<string | undefined>
  name: Ref<string | undefined>
  required: Ref<boolean>
  readonly: Ref<boolean>
  loading: ComputedRef<boolean>
  valid: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  dirty: ComputedRef<boolean>
  touched: ComputedRef<boolean>
  filled: ComputedRef<boolean>
  focused: Ref<boolean>
  disabled: ComputedRef<boolean>
  dataAttributes: ComputedRef<FormFieldDataAttributes>
  orientation: Ref<'horizontal' | 'vertical'>
  handleControlFocus: () => void
  handleControlBlur: () => void
}

export interface FormFieldSharedProps {
  id?: string
  name?: string
  loading?: boolean
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
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

  const field = useFormFieldContext()
  const isDisabled = field.disabled.value ?? isBoolDataAttrValue(disabled)

  return {
    ...rest,
    ...field.dataAttributes.value,
    'id': field.fieldId.value ?? id as string,
    'name': field.name.value ?? name as string,
    'disabled': isDisabled || undefined,
    'required': (field.required.value || isBoolDataAttrValue(required)) || undefined,
    'aria-labelledby': mergeIds(labelledBy, field.labelId.value),
    'aria-describedby': mergeIds(describedBy, field.descriptionId.value),
    'aria-invalid': ariaInvalid ? toBoolAriaValue(ariaInvalid) : ((field.invalid.value && !isDisabled) || undefined),
  }
}
