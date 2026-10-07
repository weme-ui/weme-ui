import type { IconifyIconProps } from '@iconify/vue'
import type { PrimitiveProps } from 'reka-ui'
import type { IconStackStyleProps, IconStackStyleSlots } from './icon-stack.style'

export interface IconStackProps extends PrimitiveProps {
  icon?: IconifyIconProps['icon']
  color?: IconStackStyleProps['color']
  size?: IconStackStyleProps['size']
  contentX?: string
  contentY?: string
  class?: any
  ui?: Partial<IconStackStyleSlots>
}
