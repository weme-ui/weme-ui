import type { AcceptableValue, CheckboxGroupRootEmits, CheckboxGroupRootProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { CheckboxGroupStyleProps, CheckboxGroupStyleSlots } from './checkbox-group.style'
import type { CheckboxEmits, CheckboxProps } from './checkbox.props'
import type { CheckboxStyleProps } from './checkbox.style'

export type CheckboxGroupItem = CheckboxProps & EmitsToProps<Pick<CheckboxEmits, 'change'>>

export interface CheckboxGroupProps extends CheckboxGroupRootProps {
  items?: CheckboxGroupItem[]
  variant?: CheckboxGroupStyleProps['variant']
  color?: CheckboxStyleProps['color']
  orientation?: CheckboxGroupStyleProps['orientation']
  align?: CheckboxStyleProps['align']
  radius?: CheckboxStyleProps['radius']
  size?: CheckboxGroupStyleProps['size']
  indicator?: CheckboxProps['indicator']
  fill?: boolean
  class?: any
  ui?: Partial<CheckboxGroupStyleSlots>
}

export interface CheckboxGroupEmits extends CheckboxGroupRootEmits {
  change: [value: AcceptableValue[]]
}
