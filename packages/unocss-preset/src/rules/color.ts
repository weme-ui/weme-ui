import type { Rule } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { customThemeColorResolver } from '../tokens'
import { colorResolver, h, isSize } from '../utils'

/**
 * @example op10 op-30 opacity-100
 */
export const opacity: Rule<Theme>[] = [
  [/^op(?:acity)?-?(.+)$/, ([, d], { theme }) => ({ opacity: h.bracket.percent.cssvar(d, theme) })],
]

const bgUrlRE = /^\[url\(.+\)\]$/
const bgLengthRE = /^\[(?:length|size):.+\]$/
const bgPositionRE = /^\[position:.+\]$/
const bgGradientRE = /^\[(?:linear|conic|radial)-gradient\(.+\)\]$/
const bgImageRE = /^\[image:.+\]$/

export function bgColors(options: ResolvedWemeUIOptions): Rule<Theme>[] {
  return [
    [/^bg-(.+)$/, (match, ctx) => {
      const d = match[1]
      const { theme } = ctx
      if (bgUrlRE.test(d))
        return { '--un-url': h.bracket(d, theme), 'background-image': 'var(--un-url)' }
      const bracketLength = h.bracketOfLength(d, theme)
      if (bgLengthRE.test(d) && bracketLength != null)
        return { 'background-size': bracketLength.split(' ').map(e => h.fraction.auto.px.cssvar(e) ?? e).join(' ') }
      const bracketPosition = h.bracketOfPosition(d, theme)
      if ((isSize(d) || bgPositionRE.test(d)) && bracketPosition != null)
        return { 'background-position': bracketPosition.split(' ').map(e => h.position.fraction.auto.px.cssvar(e) ?? e).join(' ') }
      if (bgGradientRE.test(d) || bgImageRE.test(d)) {
        const s = h.bracket(d, theme)
        if (s) {
          const url = s.startsWith('http') ? `url(${s})` : h.cssvar(s)
          return { 'background-image': url ?? s }
        }
      }
      const color = colorResolver('background-color', 'bg')(match, ctx)
      if (color)
        return color

      return customThemeColorResolver('background-color', 'background-color')(d, options.cssVars)
    }, { autocomplete: 'bg-$colors' }],
    [/^bg-op(?:acity)?-?(.+)$/, ([, opacity], { theme }) => ({ '--un-bg-opacity': h.bracket.percent.cssvar(opacity, theme) }), { autocomplete: 'bg-(op|opacity)-<percent>' }],
  ]
}

export const colorScheme: Rule<Theme>[] = [
  [/^(?:color-)?scheme-(.+)$/, ([, v]) => ({ 'color-scheme': v.split('-').join(' ') })],
]
