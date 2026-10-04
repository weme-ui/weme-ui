import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export { tv as createVariants, cx, type VariantProps } from 'tailwind-variants'

export type ComponentProps<Props, Key extends string> = Props extends Record<string, any>
  ? Props[Key]
  : never

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
