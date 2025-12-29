import type { Variant } from '@unocss/core'
import type { Theme } from '../types'
import { dataAttribute } from './data-attribute'

export const variants: Variant<Theme>[] = [
  ...dataAttribute,
]
