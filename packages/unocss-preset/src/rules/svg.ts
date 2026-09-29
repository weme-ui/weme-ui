import type { CSSObject, CSSValueInput, Rule, RuleContext } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { customThemeCssVarResolver } from '../tokens'
import { colorResolver, h, isSize } from '../utils'

export function svgUtilities(options: ResolvedWemeUIOptions): Rule<Theme>[] {
  return [
  // fills
    [/^fill-(.+)$/, (match, ctx) => handleColor('fill', 'fill', 'fill', match, ctx, options), { autocomplete: 'fill-$colors' }],
    [/^fill-op(?:acity)?-?(.+)$/, ([, opacity], { theme }) => ({ '--un-fill-opacity': h.bracket.percent.cssvar(opacity, theme) }), { autocomplete: 'fill-(op|opacity)-<percent>' }],
    ['fill-none', { fill: 'none' }],

    // stroke size
    [/^stroke-(?:width-|size-)?(.+)$/, handleWidth],

    // stroke dash
    [/^stroke-dash-(.+)$/, ([, s], { theme }) => ({ 'stroke-dasharray': h.bracket.cssvar.number(s, theme) }), { autocomplete: 'stroke-dash-<num>' }],
    [/^stroke-offset-(.+)$/, ([, s], { theme }) => ({ 'stroke-dashoffset': h.bracket.cssvar.px.numberWithUnit(s, theme) })],

    // stroke colors
    [/^stroke-(.+)$/, (match, ctx) => handleColorOrWidth(match, ctx, options), { autocomplete: 'stroke-$colors' }],
    [/^stroke-op(?:acity)?-?(.+)$/, ([, opacity], { theme }) => ({ '--un-stroke-opacity': h.bracket.percent.cssvar(opacity, theme) }), { autocomplete: 'stroke-(op|opacity)-<percent>' }],

    // line cap
    ['stroke-cap-square', { 'stroke-linecap': 'square' }],
    ['stroke-cap-round', { 'stroke-linecap': 'round' }],
    ['stroke-cap-auto', { 'stroke-linecap': 'butt' }],

    // line join
    ['stroke-join-arcs', { 'stroke-linejoin': 'arcs' }],
    ['stroke-join-bevel', { 'stroke-linejoin': 'bevel' }],
    ['stroke-join-clip', { 'stroke-linejoin': 'miter-clip' }],
    ['stroke-join-round', { 'stroke-linejoin': 'round' }],
    ['stroke-join-auto', { 'stroke-linejoin': 'miter' }],

    // none
    ['stroke-none', { stroke: 'none' }],
  ]
}

function handleWidth([, b]: string[], { theme }: RuleContext<Theme>): CSSObject {
  return { 'stroke-width': h.bracket.cssvar.fraction.px.number(b, theme) }
}

function handleColor(
  property: string,
  opacityVar: string,
  fuzzyMapKey: 'border-color' | 'fill',
  match: RegExpMatchArray,
  ctx: RuleContext<Theme>,
  options: ResolvedWemeUIOptions,
) {
  const result = colorResolver(property, opacityVar)(match, ctx)
  if (result) {
    return result
  }

  const customTheme = customThemeCssVarResolver(property, fuzzyMapKey)(match[1], options.cssVars)
  if (customTheme) {
    return customTheme
  }
}

function handleColorOrWidth(match: RegExpMatchArray, ctx: RuleContext<Theme>, options: ResolvedWemeUIOptions): CSSObject | (CSSValueInput | string)[] | undefined {
  if (isSize(match[1]))
    return handleWidth(match, ctx)
  return handleColor('stroke', 'stroke', 'border-color', match, ctx, options)
}
