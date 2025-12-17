import type { CollapsibleContentEmits, CollapsibleRootProps } from 'reka-ui'
import type { CollapsibleStyleSlots } from './collapsible.style'

export interface CollapsibleProps extends CollapsibleRootProps {
  orientation?: 'top' | 'bottom'
  class?: any
  ui?: Partial<CollapsibleStyleSlots>
}

export interface CollapsibleEmits extends CollapsibleContentEmits {}
