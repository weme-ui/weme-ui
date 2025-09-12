import type { ColorName, TypeName } from '#build/weme/styles'
import { colorStyles } from '#build/weme/styles'

/**
 * Create color variant classes
 */
export function createColorVariantClasses({ type, color, variant, slot = '' }: {
  type: TypeName
  color: ColorName
  variant: string
  slot?: string
}) {
  const classes = colorStyles[color]
    .filter(
      v => v.variant === variant && v.type === type,
    )
    .map(v => v.class)
    .join(' ')

  return slot === ''
    ? classes
    : { [slot]: classes }
}

/**
 * Create color variants for all color classes
 *
 * @example
 * ```
 * import { createColorVariants } from '#weme/utils/styles'
 * import { createVariants } from '../../utils'
 *
 * createVariants({
 *   variants: {
 *     color: createColorVariants({
 *       type: 'button',
 *       variant: 'solid',
 *       slot: 'base', // Optional
 *     }),
 *   }
 * })
 *
 * **Create placeholders for all colors**
 *
 * createVariants({
 *   variants: {
 *     color: createColorVariants({
 *       type: 'button',
 *       variant: 'solid',
 *       defaults: '', // Required
 *       slot: 'base', // Optional
 *     }),
 *   }
 * })
 *
 * Placeholders:
 *
 * { accent: '', neutral: '', info: '', success: '', warning: '', error: '' }
 * ```
 */
export function createColorVariants({ type = 'static', defaults, variant = 'solid', slot = '' }: {
  type?: TypeName
  variant?: string
  defaults?: string
  slot?: string
}) {
  return Object.keys(colorStyles)
    .reduce((acc, color) => ({
      ...acc,

      [color]: defaults !== undefined
        ? slot === '' ? defaults : { [slot]: defaults }
        : createColorVariantClasses({
            color: color as ColorName,
            variant,
            type,
            slot,
          }),
    }), {} as Record<ColorName, any>)
}

/**
 * Create color compound variants for all color classes
 */
export function createColorCompoundVariants({ type, variants, slot = '', extra }: {
  type: TypeName
  variants: string | string[] | Record<string, string>
  slot?: string
  extra?: Record<string, any>
}) {
  const compounds: any[] = []

  Object.entries(colorStyles).forEach(([color]) => {
    if (typeof variants === 'object' && !Array.isArray(variants)) {
      Object.entries(variants).forEach(([alias, variant]) => {
        compounds.push({
          color,
          variant: alias,
          ...extra,
          class: createColorVariantClasses({ color: color as ColorName, variant, type, slot }),
        })
      })
    }
    else {
      variants = typeof variants === 'string' ? [variants] : variants

      variants.forEach((variant) => {
        compounds.push({
          color,
          variant,
          ...extra,
          class: createColorVariantClasses({ color: color as ColorName, variant, type, slot }),
        })
      })
    }
  })

  return compounds
}
