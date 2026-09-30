/* eslint-disable regexp/no-empty-group */
/* eslint-disable regexp/no-empty-capturing-group */
import type { CSSEntries, CSSObject, CSSValueInput, Rule, RuleContext } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { notNull } from '@unocss/core'
import { customThemeColorCSSGenerator, parseCustomThemeColorCssVar, parseCustomThemeSize, parseCustomThemeToken } from '../tokens'
import { colorCSSGenerator, cornerMap, directionMap, generateThemeVariable, globalKeywords, h, hasParseableColor, isSize, parseColor, SpecialColorKey, themeTracking } from '../utils'

export const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none', 'groove', 'ridge', 'inset', 'outset', ...globalKeywords]

export function borders(options: ResolvedWemeUIOptions): Rule<Theme>[] {
  return [
    // compound
    [/^(?:border|b)()(?:-(.+))?$/, (match, ctx) => handlerBorderSize(match, ctx, options), { autocomplete: '(border|b)-<directions>' }],
    [/^(?:border|b)-([xy])(?:-(.+))?$/, (match, ctx) => handlerBorderSize(match, ctx, options)],
    [/^(?:border|b)-([rltbse])(?:-(.+))?$/, (match, ctx) => handlerBorderSize(match, ctx, options)],
    [/^(?:border|b)-(block|inline)(?:-(.+))?$/, (match, ctx) => handlerBorderSize(match, ctx, options)],
    [/^(?:border|b)-([bi][se])(?:-(.+))?$/, (match, ctx) => handlerBorderSize(match, ctx, options)],

    // size
    [/^(?:border|b)-()(?:width|size)-(.+)$/, (match, ctx) => handlerBorderSize(match, ctx, options), { autocomplete: ['(border|b)-<num>', '(border|b)-<directions>-<num>'] }],
    [/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, (match, ctx) => handlerBorderSize(match, ctx, options)],
    [/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, (match, ctx) => handlerBorderSize(match, ctx, options)],
    [/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, (match, ctx) => handlerBorderSize(match, ctx, options)],
    [/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, (match, ctx) => handlerBorderSize(match, ctx, options)],

    // colors
    [/^(?:border|b)-()(?:color-)?(.+)$/, (match, ctx) => handlerBorderColorOrSize(match, ctx, options), { autocomplete: ['(border|b)-$colors', '(border|b)-<directions>-$colors'] }],
    [/^(?:border|b)-([xy])-(?:color-)?(.+)$/, (match, ctx) => handlerBorderColorOrSize(match, ctx, options)],
    [/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, (match, ctx) => handlerBorderColorOrSize(match, ctx, options)],
    [/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, (match, ctx) => handlerBorderColorOrSize(match, ctx, options)],
    [/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, (match, ctx) => handlerBorderColorOrSize(match, ctx, options)],

    // opacity
    [/^(?:border|b)-()op(?:acity)?-?(.+)$/, handlerBorderOpacity, { autocomplete: '(border|b)-(op|opacity)-<percent>' }],
    [/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
    [/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
    [/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
    [/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],

    // radius
    [/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/, handlerRounded, { autocomplete: ['(border|b)-(rounded|rd)', '(border|b)-(rounded|rd)-$radius', '(rounded|rd)', '(rounded|rd)-$radius'] }],
    [/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/, handlerRounded],
    [/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
    [/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/, handlerRounded],
    [/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded],

    // style
    [/^(?:border|b)-(?:style-)?()(.+)$/, handlerBorderStyle, { autocomplete: ['(border|b)-style', `(border|b)-(${borderStyles.join('|')})`, '(border|b)-<directions>-style', `(border|b)-<directions>-(${borderStyles.join('|')})`, `(border|b)-<directions>-style-(${borderStyles.join('|')})`, `(border|b)-style-(${borderStyles.join('|')})`] }],
    [/^(?:border|b)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle],
    [/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle],
    [/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle],
    [/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle],
  ]
}

function borderColorResolver(direction: string, options: ResolvedWemeUIOptions) {
  return ([, body]: string[], ctx: RuleContext<Theme>): [CSSObject, ...CSSValueInput[]] | undefined => {
    const data = parseColor(body, ctx.theme)
    const result = colorCSSGenerator(data, `border${direction}-color`, `border${direction}`, ctx)

    if (result) {
      const css = result[0]
      if (
        data?.color && !Object.values(SpecialColorKey).includes(data.color)
        && !data.alpha
        && direction && direction !== ''
      ) {
        css[`--un-border${direction}-opacity`] = `var(--un-border-opacity)`
      }

      return result
    }

    const token = parseCustomThemeToken(body)
    const customThemeData = token?.keys.length
      ? token
      : parseCustomThemeColorCssVar('border-color', body, options.cssVars)

    if (!customThemeData?.keys.length)
      return

    const customTheme = customThemeColorCSSGenerator(customThemeData, `border${direction}-color`)

    if (customTheme) {
      const css = customTheme[0]
      if (!customThemeData.alpha && direction && direction !== '') {
        css[`--un-border${direction}-opacity`] = `var(--un-border-opacity)`
      }

      return customTheme
    }
  }
}

function handlerBorderSize(
  [, a = '', b = '1']: string[],
  { theme }: RuleContext<Theme>,
  options: ResolvedWemeUIOptions,
): CSSEntries | undefined {
  const v = h.bracket.bracketOfLength.cssvar.global.px(b, theme)
  if (a in directionMap && v != null)
    return directionMap[a].map(i => [`border${i}-width`, v])

  const themeSize = parseCustomThemeSize(b, options.cssVars, 'border-width')
  if (a in directionMap && themeSize)
    return directionMap[a].map(i => [`border${i}-width`, themeSize])
}

function handlerBorderColorOrSize([, a = '', b]: string[], ctx: RuleContext<Theme>, options: ResolvedWemeUIOptions): CSSEntries | (CSSValueInput | string)[] | undefined {
  if (a in directionMap) {
    const themeSize = parseCustomThemeSize(b, options.cssVars, 'border-width')
    if (isSize(b) || themeSize)
      return handlerBorderSize(['', a, b], ctx, options)

    const bracketColor = h.bracketOfColor(b, ctx.theme)
    b = bracketColor ?? b

    const directions = directionMap[a].map(i =>
      borderColorResolver(i, options)(['', b], ctx)
      ?? ((bracketColor != null || hasParseableColor(b, ctx.theme))
        ? colorCSSGenerator({ color: b, name: '_' } as unknown as ReturnType<typeof parseColor>, `border${i}-color`, `border${i}`, ctx)
        : undefined),
    ).filter(notNull)

    if (!directions.length)
      return

    return [
      directions
        .map(d => d[0])
        .reduce((acc, item) => {
          // Merge multiple direction CSSObject into one
          Object.assign(acc, item)
          return acc
        }, {}),
      ...directions.flatMap(d => d.slice(1)),
    ]
  }
}

function handlerBorderOpacity([, a = '', opacity]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  const v = h.bracket.percent.cssvar(opacity, theme)
  if (a in directionMap && v != null)
    return directionMap[a].map(i => [`--un-border${i}-opacity`, v])
}

function handlerRounded([, a = '', s = 'DEFAULT']: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  if (a in cornerMap) {
    if (s === 'full')
      return cornerMap[a].map(i => [`border${i}-radius`, 'calc(infinity * 1px)'])

    const _v = theme.radius?.[s] ?? h.bracket.cssvar.global.fraction.rem(s, theme)
    if (_v != null) {
      const isVar = theme.radius && s in theme.radius
      if (isVar) {
        themeTracking(`radius`, s)
      }

      return cornerMap[a].map(i => [
        `border${i}-radius`,
        isVar ? generateThemeVariable('radius', s) : _v,
      ])
    }
  }
}

export function handlerBorderStyle([, a = '', s]: string[]): CSSEntries | undefined {
  if (borderStyles.includes(s) && a in directionMap) {
    return [
      ['--un-border-style', s],
      ...directionMap[a].map(i => [`border${i}-style`, s]) as CSSEntries,
    ]
  }
}
