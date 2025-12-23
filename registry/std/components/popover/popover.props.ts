import type { HoverCardRootProps, HoverCardTriggerProps, PopoverArrowProps, PopoverContentEmits, PopoverContentProps, PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { PopoverStyleProps, PopoverStyleSlots } from './popover.style'

export type PopoverMode = 'click' | 'hover'

export interface PopoverProps<M extends PopoverMode = PopoverMode> extends PopoverRootProps, Pick<HoverCardRootProps, 'openDelay' | 'closeDelay'> {
  variant?: PopoverStyleProps['variant']
  size?: PopoverStyleProps['size']
  radius?: PopoverStyleProps['radius']
  translucent?: PopoverStyleProps['translucent']
  /**
   * @defaultValue 'click'
   */
  mode?: M
  content?: Omit<PopoverContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<PopoverContentEmits>>
  arrow?: boolean | Omit<PopoverArrowProps, 'as' | 'asChild'>
  portal?: boolean | string | HTMLElement
  reference?: HoverCardTriggerProps['reference']
  /**
   * @defaultValue true
   */
  dismissible?: boolean
  class?: any
  ui?: Partial<PopoverStyleSlots>
}

export interface PopoverEmits extends PopoverRootEmits {
  'close:prevent': []
}
