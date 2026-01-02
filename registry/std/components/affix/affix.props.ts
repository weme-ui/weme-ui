import type { AffixStyleSlots } from './affix.style'

export interface AffixProps {
  container?: string | HTMLElement | Window
  triggerTop?: number
  triggerBottom?: number
  class?: any
  ui?: Partial<AffixStyleSlots>
}

export interface AffixEmits {
  (e: 'change', isFixed: boolean): void
}
