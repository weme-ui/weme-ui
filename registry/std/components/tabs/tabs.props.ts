import type { TabsIndicatorProps, TabsListProps, TabsRootEmits, TabsRootProps, TabsTriggerProps } from 'reka-ui'
import type { TabsStyleProps, TabsStyleSlots } from './tabs.style'

export interface TabsProps extends TabsRootProps {
  variant?: TabsStyleProps['variant']
  side?: TabsStyleProps['side']
  size?: TabsStyleProps['size']
  radius?: TabsStyleProps['radius']
  animate?: boolean
  list?: Omit<TabsListProps, 'as' | 'asChild'>
  trigger?: Omit<TabsTriggerProps, 'as' | 'asChild'>
  indicator?: Omit<TabsIndicatorProps, 'as' | 'asChild'>
  class?: any
  ui?: Partial<TabsStyleSlots>
}

export interface TabsEmits extends TabsRootEmits {}
