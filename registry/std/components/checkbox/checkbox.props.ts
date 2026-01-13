import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { CheckboxStyleProps, CheckboxStyleSlots } from './checkbox.style'

export interface CheckboxProps extends CheckboxRootProps {
  label?: string
  description?: string
  color?: CheckboxStyleProps['color']
  size?: CheckboxStyleProps['size']
  radius?: CheckboxStyleProps['radius']
  align?: CheckboxStyleProps['align']
  indicator?: 'start' | 'end' | 'none'
  checkedIcon?: string
  indeterminateIcon?: string
  class?: any
  ui?: Partial<CheckboxStyleSlots>
}

export interface CheckboxEmits extends CheckboxRootEmits {
  change: [value: boolean | 'indeterminate']
}
