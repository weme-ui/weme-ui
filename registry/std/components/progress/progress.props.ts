import type { ProgressRootEmits, ProgressRootProps } from 'reka-ui'
import type { ProgressStyleProps, ProgressStyleSlots } from './progress.style'

export interface ProgressProps extends ProgressRootProps {
  label?: string
  color?: ProgressStyleProps['color']
  radius?: ProgressStyleProps['radius']
  size?: ProgressStyleProps['size']
  animate?: ProgressStyleProps['animate']
  class?: any
  ui?: Partial<ProgressStyleSlots>
}

export interface ProgressEmits extends ProgressRootEmits {}
