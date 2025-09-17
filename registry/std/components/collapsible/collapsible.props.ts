import type { CollapsibleRootEmits, PrimitiveProps } from 'reka-ui'
import type { CollapsibleStyleSlots } from './collapsible.style'

export interface CollapsibleProps extends PrimitiveProps {
  orientation?: 'top' | 'bottom'
  class?: any
  ui?: Partial<CollapsibleStyleSlots>
}

export interface CollapsibleEmits extends CollapsibleRootEmits {}
