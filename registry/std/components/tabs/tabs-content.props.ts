import type { TabsContentProps as RekaTabsContentProps } from 'reka-ui'

export interface TabsContentProps extends RekaTabsContentProps {
  icon?: string
  title: string
  loading?: boolean
  class?: any
}
