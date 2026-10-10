import type { CustomThemeTokens } from '@weme-ui/unocss-preset/tokens'
import type { ClassValue } from 'clsx'
import type { TWMergeConfig, VariantProps } from 'tailwind-variants'
import { isColorAlias, isCustomThemeToken } from '@weme-ui/unocss-preset/tokens'
import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { createTV, cx } from 'tailwind-variants'

export { cx, type VariantProps }

export type ComponentProps<Props, Key extends string> = Props extends Record<string, any>
  ? Props[Key]
  : never

/** Any token after `fancy-` / `plain-` (e.g. `primary`, `amber-soft`). */
function isSurfaceToken(value: string) {
  return value.length > 0
}

/** 颜色别名，含可选刻度 `accent` / `accent-4`（1–12） */
function isColorAliasValue(value: string) {
  const [name, scale] = value.split('-')
  if (!isColorAlias(name))
    return false
  if (scale === undefined)
    return true
  const n = Number(scale)
  return Number.isInteger(n) && n >= 1 && n <= 12
}

/** 与 UnoCSS preset 同源：按 utility group 传入 front */
function isThemeColor(front: keyof CustomThemeTokens) {
  return (value: string) => isCustomThemeToken(value, front) || isColorAliasValue(value)
}

const BORDER_NON_COLOR_VALUES = new Set([
  // style
  'solid',
  'dashed',
  'dotted',
  'double',
  'none',
  'hidden',
  'collapse',
  'separate',
  // size keywords
  'px',
  'em',
  'rem',
  'full',
  'auto',
])

/** UnoCSS 方向 / 轴向：`b-t`、`b-r-2`、`b-x` … 不是颜色 */
function isBorderSideOrAxis(value: string) {
  return /^(?:[trblxyse]|bs|be)(?:-|$)/.test(value)
}

/**
 * UnoCSS `b-*` 边框色；排除宽度、style、方向。
 * hybrid：主题 token/别名 + 色板 / cssVars / transparent 等。
 */
function isBorderColor(value: string) {
  if (
    /^\d+(?:\.\d+)?$/.test(value)
    || BORDER_NON_COLOR_VALUES.has(value)
    || isBorderSideOrAxis(value)
  ) {
    return false
  }
  return isThemeColor('border')(value) || /[a-z]/i.test(value)
}

/**
 * Teach twMerge that surface shortcuts conflict with each other,
 * and wire UnoCSS color shorthands to the same groups as theme tokens.
 * Pure class-group matching — no shortcut expansion at runtime.
 */
const twMergeConfig = {
  extend: {
    classGroups: {
      'fancy': [{ fancy: [isSurfaceToken] }],
      'plain': [{ plain: [isSurfaceToken] }],
      'bg-color': [{ bg: [isThemeColor('background')] }],
      'text-color': [{
        text: [isThemeColor('foreground')],
        c: [isThemeColor('foreground')],
        color: [isThemeColor('foreground')],
      }],
      'border-color': [{
        border: [isThemeColor('border')],
        b: [isBorderColor],
      }],
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
