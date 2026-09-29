import type { Rule, RuleContext } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { customThemeCssVarResolver } from '../tokens'
import { colorResolver, h } from '../utils'

export function placeholders(options: ResolvedWemeUIOptions): Rule<Theme>[] {
  return [
    // The prefix `$ ` is intentional. This rule is not to be matched directly from user-generated token.
    // See variants/placeholder.
    [/^\$ placeholder-(.+)$/, (match, ctx) => handlerPlaceholder(match, ctx, options), { autocomplete: 'placeholder-$colors' }],
    [/^\$ placeholder-op(?:acity)?-?(.+)$/, ([, opacity], { theme }) => ({ '--un-placeholder-opacity': h.bracket.percent(opacity, theme) }), { autocomplete: ['placeholder-(op|opacity)', 'placeholder-(op|opacity)-<percent>'] }],
  ]
}

function handlerPlaceholder(match: RegExpMatchArray, ctx: RuleContext<Theme>, options: ResolvedWemeUIOptions) {
  const result = colorResolver('color', 'placeholder')(match, ctx)
  if (result) {
    return result
  }

  const customTheme = customThemeCssVarResolver('color', 'color')(match[1], options.cssVars)
  if (customTheme) {
    return customTheme
  }
}
