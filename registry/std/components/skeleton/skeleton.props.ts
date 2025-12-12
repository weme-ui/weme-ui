import type { PrimitiveProps } from 'reka-ui'
import type { SkeletonStyleProps, SkeletonStyleSlots } from './skeleton.style'

export interface SkeletonProps extends PrimitiveProps {
  lines?: number
  variant?: SkeletonStyleProps['variant']
  radius?: SkeletonStyleProps['radius']
  class?: any
  ui?: Partial<SkeletonStyleSlots>
}
