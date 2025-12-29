/* eslint-disable regexp/no-empty-group */
/* eslint-disable regexp/no-empty-capturing-group */
import type { Rule } from '@unocss/core'
import type { VariantHandler } from 'unocss'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { resolveColor } from '../utils'

export function borderColors(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^(?:border|b)-(.+)$/,
      ([, c]) => {
        return resolveColor('border-color', 'border', c, options)
      },
      {
        autocomplete: [
          '(border|b)-<color>',
          '(border|b)-<color>-<scale>',
          '(border|b)-<color>-<scale>/<percent>',
        ],
      },
    ],

    [
      /^(?:border|b)-([xy])-(.+)$/,
      ([, d, c]) => {
        switch (d) {
          case 'x': return resolveColor('border-inline-color', 'border', c, options)
          case 'y': return resolveColor('border-block-color', 'border', c, options)
        }
      },
      {
        autocomplete: [
          '(border|b)-(x|y)-<color>',
          '(border|b)-(x|y)-<color>-<scale>',
          '(border|b)-(x|y)-<color>-<scale>/<percent>',
        ],
      },
    ],

    [
      /^(?:border|b)-([rltbse])-(.+)$/,
      ([, d, c]) => {
        switch (d) {
          case 'r': return resolveColor('border-right-color', 'border', c, options)
          case 'l': return resolveColor('border-left-color', 'border', c, options)
          case 't': return resolveColor('border-top-color', 'border', c, options)
          case 'b': return resolveColor('border-bottom-color', 'border', c, options)
          case 's': return resolveColor('border-inline-start-color', 'border', c, options)
          case 'e': return resolveColor('border-inline-end-color', 'border', c, options)
        }
      },
      {
        autocomplete: [
          '(border|b)-(r|l|t|b|s|e)-<color>',
          '(border|b)-(r|l|t|b|s|e)-<color>-<scale>',
          '(border|b)-(r|l|t|b|s|e)-<color>-<scale>/<percent>',
        ],
      },
    ],

    [
      /^(?:border|b)-(block|inline)-(.+)$/,
      ([, d, c]) => {
        return resolveColor(`border-${d}-color`, 'border', c, options)
      },
      {
        autocomplete: [
          '(border|b)-(block|inline)-<color>',
          '(border|b)-(block|inline)-<color>-<scale>',
          '(border|b)-(block|inline)-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

export function borderSizes(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^(?:border|b)-()(?:width|size)-(.+)$/,
      ([, c]) => {
        return resolveColor('border-width', '', c, options)
      },
      {
        autocomplete: [
          '(border|b)-(width|size)-<value>',
        ],
      },
    ],

    [
      /^(?:border|b)-([xy])-(?:width|size)-(.+)$/,
      ([, d, c]) => {
        const width = resolveColor('border-width', '', c, options)

        if (width) {
          switch (d) {
            case 'x': return { 'border-inline-width': width['border-width'] }
            case 'y': return { 'border-block-width': width['border-width'] }
          }
        }
      },
      {
        autocomplete: [
          '(border|b)-(x|y)-(width|size)-<value>',
        ],
      },
    ],

    [
      /^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/,
      ([, d, c]) => {
        const width = resolveColor('border-width', '', c, options)

        if (width) {
          switch (d) {
            case 'r': return { 'border-right-width': width['border-width'] }
            case 'l': return { 'border-left-width': width['border-width'] }
            case 't': return { 'border-top-width': width['border-width'] }
            case 'b': return { 'border-bottom-width': width['border-width'] }
            case 's': return { 'border-inline-start-width': width['border-width'] }
            case 'e': return { 'border-inline-end-width': width['border-width'] }
          }
        }
      },
      {
        autocomplete: [
          '(border|b)-(r|l|t|b|s|e)-(width|size)-<value>',
        ],
      },
    ],

    [
      /^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/,
      ([, d, c]) => {
        const width = resolveColor('border-width', '', c, options)

        if (width) {
          return {
            [`border-${d}-width`]: width['border-width'],
          }
        }
      },
      {
        autocomplete: [
          '(border|b)-(block|inline)-(width|size)-<value>',
        ],
      },
    ],
  ]
}

export function divideColor(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^divide-(.+)$/,
      function* (match, ctx) {
        const result = resolveColor('border-color', 'border', match[1], options)

        if (result) {
          yield {
            [ctx.symbols.variants]: [notLastChildSelectorVariant(match[0])],
            ...result,
          }
        }
      },
      {
        autocomplete: [
          'divide-<color>',
          'divide-<color>-<scale>',
          'divide-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

function notLastChildSelectorVariant(s: string): VariantHandler {
  return {
    matcher: s,
    handle: (input, next) => next({
      ...input,
      parent: `${input.parent ? `${input.parent} $$ ` : ''}${input.selector}`,
      selector: ':where(&>:not(:last-child))',
    }),
  }
}
