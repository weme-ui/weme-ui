import type { IconifyIconProps } from '@iconify/vue'

export type IconProps = Omit<IconifyIconProps, 'icon'> & {
  name: IconifyIconProps['icon']
  icon?: IconifyIconProps['icon']
  class?: any
}
