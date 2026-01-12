import type { ComputedRef, InjectionKey } from 'vue'
import type { FormFieldProps } from '~/types/components'
import type { FormFieldInjectedProps } from '~/types/input'
import { computed, inject } from 'vue'

export {
  toFieldValidator,
  toFormValidator,
  toTypedSchema,
} from '@vee-validate/zod'

export {
  useField,
  useFieldArray,
  useFieldError,
  useFieldValue,
  useForm,
  useFormContext,
  useFormErrors,
  useFormValues,
  useIsFieldDirty,
  useIsFieldTouched,
  useIsFieldValid,
  useIsFormDirty,
  useIsFormTouched,
  useIsFormValid,
  useIsSubmitting,
  useIsValidating,
  useResetForm,
  useSubmitCount,
  useSubmitForm,
  useValidateField,
  useValidateForm,
} from 'vee-validate'

export const formFieldInjectionKey: InjectionKey<ComputedRef<FormFieldInjectedProps<FormFieldProps>> | undefined> = Symbol('weme-ui.form-field')

export function useFormField<T>(props?: FormFieldInjectedProps<T>) {
  const formField = inject(formFieldInjectionKey, undefined)

  provide(formFieldInjectionKey, undefined)

  return {
    id: computed(() => props?.id ?? formField?.value.id),
    name: computed(() => props?.name ?? formField?.value.name),
    size: computed(() => props?.size ?? formField?.value.size),
    radius: computed(() => props?.radius ?? formField?.value.radius),
    disabled: computed(() => props?.disabled || formField?.value.disabled),
    required: computed(() => props?.required || formField?.value.required),
  }
}
