import type { ColorName, StateName, VariantName, VariantNameMap } from '#build/weme/styles'
import { colorStyles } from '#build/weme/styles'

/**
 * Create color variant classes
 */
export function createColorVariantClasses({
  color,
  variant,
  states,
  slot = '',
}: {
  color: ColorName
  variant: VariantName
  states: StateName | StateName[]
  slot?: string
}) {
  const colorVariant = colorStyles[color].filter(v => v.variant === variant)

  const classes = colorVariant
    .filter(v => (Array.isArray(states) ? states : [states]).includes(v.state))
    .map(v => v.class)
    .filter(Boolean)

  return slot === ''
    ? classes
    : { [slot]: classes }
}

/**
 * Create color variants for all color classes
 *
 * @example
 * ```
 * import { createColorVariants } from '#weme/weme.style'
 * import { createVariants } from '../../utils'
 *
 * createVariants({
 *   variants: {
 *     color: createColorVariants({
 *       variant: 'solid',
 *       states: 'normal', // Multiple states can be specified as ['normal', 'hover', 'active']
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
 *       variant: 'solid',
 *       defaults: '', // Required
 *       states: 'normal', // Required
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
export function createColorVariants({
  variant = 'solid',
  states = 'normal',
  defaults,
  slot = '',
}: {
  variant?: VariantName
  states?: StateName | StateName[]
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
            states,
            slot,
          }),
    }), {} as Record<ColorName, any>)
}

/**
 * Create color compound variants for all color classes
 */
export function createColorCompoundVariants({
  variants,
  states,
  slot = '',
}: {
  variants: VariantName | VariantName[] | VariantNameMap
  states: StateName | StateName[]
  slot?: string
}) {
  const compounds: any[] = []

  Object.entries(colorStyles).forEach(([color]) => {
    if (typeof variants === 'object' && !Array.isArray(variants)) {
      Object.entries(variants).forEach(([alias, variant]) => {
        compounds.push({
          color,
          variant: alias,
          class: createColorVariantClasses({ color: color as ColorName, variant, states, slot }),
        })
      })
    }
    else {
      variants = typeof variants === 'string' ? [variants] : variants

      variants.forEach((variant) => {
        compounds.push({
          color,
          variant,
          class: createColorVariantClasses({ color: color as ColorName, variant, states, slot }),
        })
      })
    }
  })

  return compounds
}
