import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import type { AccordionStyleProps, AccordionStyleSlots } from './accordion.style'

export interface AccordionItem {
  icon?: string
  title: string
  description?: string
  content: string
  value?: string
  disabled?: boolean
  unmountOnHide?: boolean
}

export interface AccordionProps extends AccordionRootProps {
  items?: AccordionItem[]
  indicatorIcon?: string
  color?: AccordionStyleProps['color']
  variant?: AccordionStyleProps['variant']
  size?: AccordionStyleProps['size']
  radius?: AccordionStyleProps['radius']
  align?: AccordionStyleProps['align']
  class?: any
  ui?: Partial<AccordionStyleSlots>
}

export interface AccordionEmits extends AccordionRootEmits {}
