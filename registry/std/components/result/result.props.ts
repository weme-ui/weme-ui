import type { PrimitiveProps } from 'reka-ui'
import type { IconBoxStyleProps } from '../icon/icon-box.style'
import type { ResultStyleSlots } from './result.style'

export interface ResultProps extends PrimitiveProps {
  icon?: string
  title?: string
  description?: string
  type?: IconBoxStyleProps['color']
  size?: IconBoxStyleProps['size']
  class?: any
  ui?: Partial<ResultStyleSlots>
}

export interface ResultEmits {}
