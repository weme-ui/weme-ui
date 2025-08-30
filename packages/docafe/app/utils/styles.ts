import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createTV } from 'tailwind-variants'

export type { VariantProps } from 'tailwind-variants'

export const createVariants = createTV({
  twMerge: true,
})

export function cn(...extras: ClassValue[]) {
  return twMerge(
    clsx(
      ...extras,
    ),
  )
}
