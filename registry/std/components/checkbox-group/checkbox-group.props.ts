import type { AcceptableValue, CheckboxGroupRootEmits, CheckboxGroupRootProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { CheckboxEmits, CheckboxProps } from '../checkbox/checkbox.props'
import type { CheckboxStyleSlots } from '../checkbox/checkbox.style'
import type { CheckboxGroupStyleProps, CheckboxGroupStyleSlots } from './checkbox-group.style'

export type CheckboxGroupItem = Pick<
  CheckboxProps,
  | 'label'
  | 'description'
  | 'disabled'
  | 'value'
> & EmitsToProps<Pick<CheckboxEmits, 'change'>> & {
  class?: any
  ui?: Partial<Pick<CheckboxStyleSlots, 'leading' | 'trailing' | 'indicator' | 'label' | 'description'>>
}

export interface CheckboxGroupProps extends CheckboxGroupRootProps {
  items?: CheckboxGroupItem[]
  color?: CheckboxGroupStyleProps['color']
  variant?: CheckboxGroupStyleProps['variant']
  orientation?: CheckboxGroupStyleProps['orientation']
  size?: CheckboxGroupStyleProps['size']
  radius?: CheckboxGroupStyleProps['radius']
  align?: CheckboxProps['align']
  indicator?: CheckboxProps['indicator']
  checkedIcon?: CheckboxProps['checkedIcon']
  indeterminateIcon?: CheckboxProps['indeterminateIcon']
  class?: any
  ui?: Partial<CheckboxGroupStyleSlots>
}

export interface CheckboxGroupEmits extends CheckboxGroupRootEmits {
  change: [values: AcceptableValue[]]
}
