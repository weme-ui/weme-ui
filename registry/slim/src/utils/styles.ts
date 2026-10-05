import type { ClassValue } from 'clsx'
import type { TWMergeConfig, VariantProps } from 'tailwind-variants'
import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { createTV, cx } from 'tailwind-variants'

export { cx, type VariantProps }

export type ComponentProps<Props, Key extends string> = Props extends Record<string, any>
  ? Props[Key]
  : never

/** Any token after `fancy-` / `plain-` (e.g. `primary`, `amber-soft`). */
const isSurfaceToken = (value: string) => value.length > 0

/**
 * Teach twMerge that surface shortcuts conflict with each other.
 * Pure class-group matching — no shortcut expansion at runtime.
 */
const twMergeConfig = {
  extend: {
    classGroups: {
      fancy: [{ fancy: [isSurfaceToken] }],
      plain: [{ plain: [isSurfaceToken] }],
    },
    conflictingClassGroups: {
      fancy: ['plain'] as const,
      plain: ['fancy'] as const,
    },
  },
}

const twMerge = extendTailwindMerge<'fancy' | 'plain'>(twMergeConfig)

export const createVariants = createTV({
  twMerge: true,
  twMergeConfig: twMergeConfig as TWMergeConfig,
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
