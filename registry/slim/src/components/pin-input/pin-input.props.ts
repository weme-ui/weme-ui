import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'
import type { PinInputStyleProps, PinInputStyleSlots } from './pin-input.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

export interface PinInputProps extends PinInputRootProps, Omit<FormFieldSharedProps, 'loading'> {
  variant?: PinInputStyleProps['variant']
  size?: PinInputStyleProps['size']
  radius?: PinInputStyleProps['radius']
  length?: number
  unstyled?: boolean
  class?: any
  ui?: Partial<PinInputStyleSlots>
}

export interface PinInputEmits extends PinInputRootEmits {
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
