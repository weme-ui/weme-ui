import type { AffixStyleSlots } from './affix.style'

export interface AffixProps {
  triggerTop?: number
  triggerBottom?: number
  target?: string | HTMLElement | Window
  class?: any
  ui?: Partial<AffixStyleSlots>
}

export interface AffixEmits {
  (e: 'change', isFixed: boolean): void
}
