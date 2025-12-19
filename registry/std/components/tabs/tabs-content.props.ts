import type { TabsContentProps as _TabsContentProps } from 'reka-ui'

export interface TabsContentProps extends _TabsContentProps {
  title: string
  icon?: string
  loading?: boolean
  active?: boolean
  disabled?: boolean
  class?: any
}
