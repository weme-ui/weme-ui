import type { CSSObject, CSSValueInput, Rule, RuleContext } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { customThemeColorResolver } from '../tokens'
import { colorResolver, globalKeywords, h, isSize } from '../utils'

const decorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy', ...globalKeywords]

export function textDecorations(options: ResolvedWemeUIOptions): Rule<Theme>[] {
  return [
    [/^(?:decoration-)?(underline|overline|line-through)$/, ([, s]) => ({ 'text-decoration-line': s }), { autocomplete: 'decoration-(underline|overline|line-through)' }],

    // size
    [/^(?:underline|decoration)-(?:size-)?(.+)$/, handleWidth, { autocomplete: '(underline|decoration)-<num>' }],
    [/^(?:underline|decoration)-(auto|from-font)$/, ([, s]) => ({ 'text-decoration-thickness': s }), { autocomplete: '(underline|decoration)-(auto|from-font)' }],

    // colors
    [/^(?:underline|decoration)-(.+)$/, (match, ctx) => handleColorOrWidth(match, ctx, options), { autocomplete: '(underline|decoration)-$colors' }],
    [/^(?:underline|decoration)-op(?:acity)?-?(.+)$/, ([, opacity], { theme }) => ({ '--un-line-opacity': h.bracket.percent.cssvar(opacity, theme) }), { autocomplete: '(underline|decoration)-(op|opacity)-<percent>' }],

    // offset
    [/^(?:underline|decoration)-offset-(.+)$/, ([, s], { theme }) => ({ 'text-underline-offset': h.auto.bracket.cssvar.global.px(s, theme) }), { autocomplete: '(underline|decoration)-(offset)-<num>' }],
    // style
    ...decorationStyles.map(v => [`underline-${v}`, { 'text-decoration-style': v }] as Rule<Theme>),
    ...decorationStyles.map(v => [`decoration-${v}`, { 'text-decoration-style': v }] as Rule<Theme>),
    ['no-underline', { 'text-decoration': 'none' }],
    ['decoration-none', { 'text-decoration': 'none' }],
  ]
}

function handleWidth([, b]: string[], { theme }: RuleContext<Theme>): CSSObject {
  return { 'text-decoration-thickness': h.bracket.cssvar.global.px(b, theme) }
}

function handleColorOrWidth(
  match: RegExpMatchArray,
  ctx: RuleContext<Theme>,
  options: ResolvedWemeUIOptions,
): CSSObject | (CSSValueInput | string)[] | undefined {
  if (isSize(match[1]))
    return handleWidth(match, ctx)

  const result = colorResolver('text-decoration-color', 'line')(match, ctx)
  if (result) {
    const css = result[0] as CSSObject
    css['-webkit-text-decoration-color'] = css['text-decoration-color']
    return result
  }

  const customTheme = customThemeColorResolver('text-decoration-color', 'border-color')(match[1], options.cssVars)
  if (customTheme) {
    const css = customTheme[0] as CSSObject
    css['-webkit-text-decoration-color'] = css['text-decoration-color']
    return css
  }
}
