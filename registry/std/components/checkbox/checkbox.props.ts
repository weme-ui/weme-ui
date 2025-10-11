import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { CheckboxStyleProps, CheckboxStyleSlots } from './checkbox.style'

export interface CheckboxProps extends Omit<CheckboxRootProps, 'asChild'> {
  label?: string
  description?: string
  color?: CheckboxStyleProps['color']
  align?: CheckboxStyleProps['align']
  radius?: CheckboxStyleProps['radius']
  size?: CheckboxStyleProps['size']
  indicator?: 'start' | 'end' | 'none'
  fill?: boolean
  class?: any
  ui?: Partial<CheckboxStyleSlots>
  [key: string]: any
}

export interface CheckboxEmits extends CheckboxRootEmits {
  change: [checked: boolean | 'indeterminate']
}
