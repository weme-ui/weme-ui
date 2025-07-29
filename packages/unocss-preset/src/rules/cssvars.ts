/* eslint-disable regexp/no-empty-capturing-group */
/* eslint-disable regexp/no-empty-group */
import type { Rule, WemePresetOptions } from '../types'

export function cssVarRules(options: WemePresetOptions): Rule[] {
  return [
    // Background
    createCssVarRule(
      /^bg-(.+)$/,
      'background',
      options,
    ),

    // Foreground
    createCssVarRule(
      /^(?:c|text)-(.+)$/,
      'color',
      options,
    ),

    // Width
    createSizeCssVarRule(
      /^w-(.+)$/,
      'width',
      options,
    ),

    // Height
    createSizeCssVarRule(
      /^h-(.+)$/,
      'height',
      options,
    ),

    // Size
    createSizeCssVarRule(
      /^size-(.+)$/,
      'size',
      options,
    ),

    // Padding
    createPaddingCssVarRule(
      /^pa?()-?(.+)$/,
      'padding',
      options,
    ),
    createPaddingCssVarRule(
      /^p-?([rltbsexy])(?:-?(.+))?$/,
      'padding',
      options,
    ),

    // Margin
    createPaddingCssVarRule(
      /^ma?()-?(.+)$/,
      'margin',
      options,
    ),
    createPaddingCssVarRule(
      /^m-?([rltbsexy])(?:-?(.+))?$/,
      'margin',
      options,
    ),
  ]
}

function createCssVarRule(matcher: RegExp, property: string, options: WemePresetOptions): Rule {
  const { prefix, cssVars } = options

  const map: Record<string, Record<string, string>> = {
    token: {
      color: 'foreground',
    },
    suffix: {
      color: 'fg',
      background: 'bg',
    },
  }

  return [
    matcher,
    ([, c]) => {
      const suffix = map.suffix[property] ?? property

      if (Object.keys(cssVars).includes(`${c}-${map.token[property] ?? property}`)) {
        return {
          [`${property}`]: `var(--${prefix}${c}-${suffix})`,
        }
      }
    },
  ]
}

function createSizeCssVarRule(matcher: RegExp, property: string, options: WemePresetOptions): Rule {
  const { prefix, cssVars } = options

  if (property === 'size') {
    return [
      matcher,
      ([, c]) => {
        if (Object.keys(cssVars).includes(`${c}-width`) && Object.keys(cssVars).includes(`${c}-height`)) {
          return {
            width: `var(--${prefix}${c}-width)`,
            height: `var(--${prefix}${c}-height)`,
          }
        }

        if (Object.keys(cssVars).includes(`${c}-width`)) {
          return {
            width: `var(--${prefix}${c}-width)`,
            height: `var(--${prefix}${c}-width)`,
          }
        }

        if (Object.keys(cssVars).includes(`${c}-height`)) {
          return {
            width: `var(--${prefix}${c}-height)`,
            height: `var(--${prefix}${c}-height)`,
          }
        }
      },
    ]
  }

  return createCssVarRule(matcher, property, options)
}

function createPaddingCssVarRule(matcher: RegExp, property: string, options: WemePresetOptions): Rule {
  const { prefix, cssVars } = options

  const map: Record<string, Record<string, string>> = {
    direction: {
      l: 'left',
      r: 'right',
      t: 'top',
      b: 'bottom',
      s: 'left',
      e: 'right',
      x: 'inline',
      y: 'block',
    },
  }

  if (property === 'padding' || property === 'margin') {
    return [
      matcher,
      ([, side, c]) => {
        const matched = Object.keys(cssVars)
          .filter(k => k.startsWith(`${c}-${property}`))

        if (matched.length > 0) {
          const value = matched.find(k => k === `${c}-${property}-${map.direction[side]}`)
            ? `var(--${prefix}${c}-${property}-${map.direction[side]})`
            : `var(--${prefix}${c}-${property})`

          if (side === 'l' || side === 'r' || side === 't' || side === 'b') {
            return {
              [`${property}-${map.direction[side]}`]: value,
            }
          }
          else if (side === 's') {
            return {
              [`${property}-inline-start`]: value,
            }
          }
          else if (side === 'e') {
            return {
              [`${property}-inline-end`]: value,
            }
          }
          else if (side === 'x') {
            return {
              [`${property}-inline`]: value,
            }
          }
          else if (side === 'y') {
            return {
              [`${property}-block`]: value,
            }
          }

          return {
            [`${property}`]: `var(--${prefix}${c}-${property})`,
          }
        }
      },
    ]
  }

  return createCssVarRule(matcher, property, options)
}
