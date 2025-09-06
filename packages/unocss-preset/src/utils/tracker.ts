import type { CSSObjectInput } from '@unocss/core'
import { symbols } from '@unocss/core'

// region Tracking Colors
export const trackedColors = new Set<string>()

export function trackColor(color: string, scale: number) {
  const key = `${color}-${scale}`

  if (!trackedColors.has(key))
    trackedColors.add(key)
}

export function trackColorScales(color: string) {
  for (let scale = 1; scale <= 12; scale++) {
    trackColor(color, scale)
  }
}
// endregion

// region Tracking properties
export const trackedProperties = new Map<string, string>()

export function trackProperty(property: string, options: { syntax?: string, inherits?: boolean, initialValue?: unknown } = {}) {
  if (!trackedProperties.has(property)) {
    const {
      syntax = '*',
      inherits = false,
      initialValue,
    } = options

    const value: CSSObjectInput = {
      [symbols.shortcutsNoMerge]: true,
      [symbols.noMerge]: true,
      [symbols.variants]: () => [
        {
          parent: '',
          layer: 'properties',
          selector: () => `@property ${property}`,
        },
      ],
      syntax: JSON.stringify(syntax),
      inherits: inherits ? 'true' : 'false',
    }

    if (initialValue != null) {
      value['initial-value'] = initialValue as keyof CSSObjectInput
    }

    trackedProperties.set(property, initialValue ? String(initialValue) : 'initial')

    return value
  }
}
// endregion
