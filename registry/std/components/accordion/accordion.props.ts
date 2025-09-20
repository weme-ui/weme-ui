import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import type { VNode } from 'vue'
import type { AccordionStyleProps, AccordionStyleSlots } from './accordion.style'

export interface AccordionItem {
  title: string
  content: string | VNode
  value: string
  icon?: string
  description?: string
  disabled?: boolean
}

export interface AccordionProps extends AccordionRootProps {
  items?: AccordionItem[]
  color?: AccordionStyleProps['color']
  variant?: AccordionStyleProps['variant']
  align?: AccordionStyleProps['align']
  radius?: AccordionStyleProps['radius']
  class?: any
  ui?: Partial<AccordionStyleSlots>
}

export interface AccordionEmits extends AccordionRootEmits {}
