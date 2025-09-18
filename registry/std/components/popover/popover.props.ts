import type { PopoverContentEmits, PopoverPortalProps, PopoverRootEmits, PopoverRootProps, PopoverContentProps as RekaPopoverContentProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { PopoverStyleProps, PopoverStyleSlots } from './popover.style'

export type PopoverContentProps = Omit<RekaPopoverContentProps, 'side' | 'asChild'> & EmitsToProps<PopoverContentEmits>

export interface PopoverProps extends PopoverRootProps {
  side?: PopoverStyleProps['side']
  radius?: PopoverStyleProps['radius']
  portalProps?: PopoverPortalProps
  contentProps?: PopoverContentProps
  translucent?: boolean
  asChild?: boolean
  closable?: boolean
  showArrow?: boolean
  class?: any
  ui?: Partial<PopoverStyleSlots>
}

export interface PopoverEmits extends PopoverRootEmits {}
