import type { PrimitiveProps } from 'reka-ui'
import type { GroupStyleProps, GroupStyleSlots } from './group.style'

export interface GroupProps extends PrimitiveProps {
  gap?: GroupStyleProps['gap']
  grow?: GroupStyleProps['grow']
  class?: any
  ui?: Partial<GroupStyleSlots>
}
