import type { RatingStyleProps, RatingStyleSlots } from './rating.style'

export interface RatingProps {
  defaultValue?: number
  count?: number
  color?: RatingStyleProps['color']
  size?: RatingStyleProps['size']
  icon?: string
  checkedIcon?: string
  readonly?: boolean
  disabled?: boolean
  class?: any
  ui?: Partial<RatingStyleSlots>
}

export interface RatingEmits {
  change: [value: number]
}
