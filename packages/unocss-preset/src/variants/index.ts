import type { Variant } from '../types'
import { dataVariants } from './data'

export const variants: Variant[] = [
  ...dataVariants(),
]
