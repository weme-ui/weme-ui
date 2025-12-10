import type { PrimitiveProps } from 'reka-ui'
import type { IconBoxStyleSlots } from './icon-box.style'

export interface IconBoxProps extends PrimitiveProps {
  class?: any
  ui?: Partial<IconBoxStyleSlots>
}

export interface IconBoxEmits {}
