import type { Variant } from '../types'
import { createDataVariants, createPresentDataVariants } from '../utils'

export function dataVariants(): Variant[] {
  const align = ['start', 'end', 'center']
  const motion = ['to-start', 'to-end', 'from-start', 'from-end']
  const orientation = ['vertical', 'horizontal']
  const side = ['left', 'right', 'top', 'bottom']
  const state = ['open', 'closed', 'checked', 'unchecked', 'indeterminate', 'complete', 'indeterminate', 'loading', 'on', 'off', 'active', 'inactive', 'visible', 'hidden', 'drag', 'hover', 'inactive']
  const swipe = ['start', 'move', 'cancel', 'end']
  const swipeDirection = ['left', 'right', 'up', 'down']
  const present = ['active', 'complete', 'disabled', 'empty', 'expanded', 'focus', 'focused', 'highlighted-end', 'highlighted-start', 'highlighted', 'invalid', 'linear', 'outside-view', 'outside-visible-view', 'placeholder-shown', 'placeholder', 'pressed', 'readonly', 'selected', 'selection-end', 'selection-start', 'today', 'unavailable']

  return [
    ...createDataVariants('align', align),
    ...createDataVariants('motion', motion),
    ...createDataVariants('orientation', orientation),
    ...createDataVariants('side', side),
    ...createDataVariants('state', state),
    ...createDataVariants('swipe', swipe),
    ...createDataVariants('swipe-direction', swipeDirection),

    // Present
    ...createPresentDataVariants(present),
  ].filter(Boolean)
}
