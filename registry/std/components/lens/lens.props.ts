import type { PrimitiveProps } from 'reka-ui'
import type { LensStyleSlots } from './lens.style'

export interface LensProps extends PrimitiveProps {
  size?: number
  zoom?: number
  class?: any
  ui?: Partial<LensStyleSlots>
}

export interface LensEmits {
  (e: 'hover', value: boolean): void
}
