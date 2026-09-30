/* eslint-disable regexp/no-empty-group */
/* eslint-disable regexp/no-empty-capturing-group */
import type { CSSEntries, Rule, RuleContext, VariantHandler } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { parseCustomThemeSize } from '../tokens'
import { defineProperty, directionMap, directionSize, h, numberResolver, themeTracking } from '../utils'

export function paddings(options: ResolvedWemeUIOptions): Rule<Theme>[] {
  return [
    [/^pa?()-?(.+)$/, handleDirectionSize('padding', options), { autocomplete: ['(m|p)<num>', '(m|p)-<num>'] }],
    [/^p-?xy()()$/, handleDirectionSize('padding', options), { autocomplete: '(m|p)-(xy)' }],
    [/^p-?([xy])(?:-?(.+))?$/, handleDirectionSize('padding', options)],
    [/^p-?([rltbse])(?:-?(.+))?$/, handleDirectionSize('padding', options), { autocomplete: '(m|p)<directions>-<num>' }],
    [/^p-(block|inline)(?:-(.+))?$/, handleDirectionSize('padding', options), { autocomplete: '(m|p)-(block|inline)-<num>' }],
    [/^p-?([bi][se])(?:-?(.+))?$/, handleDirectionSize('padding', options), { autocomplete: '(m|p)-(bs|be|is|ie)-<num>' }],
  ]
}

export function margins(options: ResolvedWemeUIOptions): Rule<Theme>[] {
  return [
    [/^ma?()-?(.+)$/, handleDirectionSize('margin', options)],
    [/^m-?xy()()$/, handleDirectionSize('margin', options)],
    [/^m-?([xy])(?:-?(.+))?$/, handleDirectionSize('margin', options)],
    [/^m-?([rltbse])(?:-?(.+))?$/, handleDirectionSize('margin', options)],
    [/^m-(block|inline)(?:-(.+))?$/, handleDirectionSize('margin', options)],
    [/^m-?([bi][se])(?:-?(.+))?$/, handleDirectionSize('margin', options)],
  ]
}

function handleDirectionSize(
  property: 'padding' | 'margin',
  options: ResolvedWemeUIOptions,
  map: Record<string, string[]> = directionMap,
  formatter: (p: string, d: string) => string = (p, d) => `${p}${d}`,
) {
  return (match: RegExpMatchArray, ctx: RuleContext<Theme>): CSSEntries | undefined => {
    const dynamic = directionSize(property)(match, ctx)
    if (dynamic) {
      return dynamic as CSSEntries
    }

    const [, direction, size] = match
    if (size != null && direction != null) {
      const v = parseCustomThemeSize(size, options.cssVars, property)

      if (v !== undefined) {
        return map[direction].map(i => [formatter(property, i), v])
      }
    }
  }
}

export const spaces: Rule<Theme>[] = [
  [/^space-([xy])-(.+)$/, handlerSpace, { autocomplete: ['space-(x|y)', 'space-(x|y)-reverse', 'space-(x|y)-$spacing'] }],
  [/^space-([xy])-reverse$/, function* ([m, d]: string[], { symbols }: RuleContext<Theme>) {
    yield {
      [symbols.variants]: [notLastChildSelectorVariant(m)],
      [`--un-space-${d}-reverse`]: '1',
    }
    yield defineProperty(`--un-space-${d}-reverse`, { initialValue: 0 })
  }],
]

export function notLastChildSelectorVariant(s: string): VariantHandler {
  return {
    matcher: s,
    order: 1,
    handle: (input, next) => next({
      ...input,
      parent: `${input.parent ? `${input.parent} $$ ` : ''}${input.selector}`,
      selector: ':where(&>:not(:last-child))',
    }),
  }
}

function* handlerSpace([m, d, s]: string[], { theme, symbols }: RuleContext<Theme>) {
  let v: string | undefined
  const num = numberResolver(s)
  if (num != null) {
    themeTracking(`spacing`)
    v = `calc(var(--spacing) * ${num})`
  }
  else {
    v = theme.spacing?.[s] ?? h.bracket.cssvar.auto.fraction.rem(s || '1', theme)
  }

  if (v != null) {
    const results = directionMap[d === 'x' ? 'inline' : 'block'].map((item, index): [string, string] => {
      const key = `margin${item}`
      const value = `calc(${v} * ${index === 0 ? `var(--un-space-${d}-reverse)` : `calc(1 - var(--un-space-${d}-reverse))`})`
      return [key, value]
    })

    if (results) {
      yield {
        [symbols.variants]: [notLastChildSelectorVariant(m)],
        [`--un-space-${d}-reverse`]: '0',
        ...Object.fromEntries(results),
      }
      yield defineProperty(`--un-space-${d}-reverse`, { initialValue: 0 })
    }
  }
}
