import type { IconifyIconProps } from '@iconify/vue'

export interface AnimatedSelectIconProps {
  icon: IconifyIconProps['icon']
  selectedIcon?: IconifyIconProps['icon']
  selected: boolean
  class?: any
}
