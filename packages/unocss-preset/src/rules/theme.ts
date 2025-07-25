import type { Rule } from '../types'
import { isThemeColorName, parseColor, resolveColor } from '../utils'

export const foregroundRules: Rule[] = [
  createThemeColorRule(
    /^(?:c|text)-(.+)$/,
    'color',
    { autocomplete: '(c|text)-<theme-colors>-<scales>' },
  ),

  createThemeTokenRule(
    /^(?:c|text)-(dimmed|muted|toned|default|highlighted)$/,
    'color',
    'fg',
    { autocomplete: '(c|text)-(dimmed|muted|toned|default|highlighted)' },
  ),
]

export const backgroundRules: Rule[] = [
  createThemeColorRule(
    /^bg-(.+)$/,
    'background-color',
    { autocomplete: 'bg-<theme-colors>-<scales>' },
  ),

  createThemeTokenRule(
    /^bg-(default|dimmed|muted|elevated)$/,
    'background-color',
    'bg',
    { autocomplete: 'bg-(default|dimmed|muted|elevated)' },
  ),

  createThemeColorRule(
    /^fill-(.+)$/,
    'fill',
    { autocomplete: 'fill-<theme-colors>-<scales>' },
  ),

  createThemeTokenRule(
    /^fill-(default|dimmed|muted|elevated)$/,
    'fill',
    'bg',
    { autocomplete: 'fill-(default|dimmed|muted|elevated)' },
  ),
]

export const borderRules: Rule[] = [
  createThemeColorRule(
    /^(?:b|border)-(.+)$/,
    'border-color',
    { autocomplete: '(b|border)-<theme-colors>-<scales>' },
  ),

  createThemeTokenRule(
    /^(?:b|border)-(default|elevated)$/,
    'border-color',
    'border',
    { autocomplete: '(b|border)-(default|elevated)' },
  ),

  createThemeColorRule(
    /^stroke-(.+)$/,
    'stroke',
    { autocomplete: 'stroke-<theme-colors>-<scales>' },
  ),

  createThemeTokenRule(
    /^stroke-(default|elevated)$/,
    'border',
    'border',
    { autocomplete: 'stroke-(default|elevated)' },
  ),
]

export const ringRules: Rule[] = [
  createThemeColorRule(
    /^ring-(.+)$/,
    '--un-ring-color',
    { autocomplete: 'ring-<theme-colors>-<scales>' },
  ),

  createThemeTokenRule(
    /^ring-(default|elevated)$/,
    '--un-ring-color',
    'border',
    { autocomplete: 'ring-(default|elevated)' },
  ),
]

export const shadowRules: Rule[] = [
  createThemeColorRule(
    /^shadow-(.+)$/,
    '--un-shadow-color',
    { autocomplete: 'shadow-<theme-colors>-<scales>' },
  ),

  createThemeColorRule(
    /^text-shadow-(.+)$/,
    '--un-text-shadow',
    { autocomplete: 'text-shadow-<theme-colors>-<scales>' },
  ),
]

export const gradientRules: Rule[] = [
  [
    /^(from|via|to|stops)-(.+)$/,
    ([, p, c]) => {
      const { color, scale, opacity } = parseColor(c)

      if (isThemeColorName(color)) {
        const css = {
          [`--un-gradient-${p}`]: resolveColor(color, scale, opacity),
        }

        switch (p) {
          case 'from':
            css['--un-gradient-stops'] = 'var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))'
            break

          case 'via':
            css['--un-gradient-via-stops'] = 'var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-via) var(--un-gradient-via-position), var(--un-gradient-to) var(--un-gradient-to-position)'
            css['--un-gradient-stops'] = 'var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-via) var(--un-gradient-via-position), var(--un-gradient-to) var(--un-gradient-to-position)'
            break

          case 'to':
            css['--un-gradient-stops'] = 'var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))'
            break
        }

        return css
      }
    },
    { autocomplete: '(from|via|to|stops)-<theme-colors>-<scales>' },
  ],
]

function createThemeColorRule(
  matcher: RegExp,
  property: string,
  meta?: Rule[2],
): Rule {
  return [
    matcher,
    ([, c]) => {
      const { color, scale, opacity } = parseColor(c)

      if (isThemeColorName(color)) {
        return {
          [`${property}`]: resolveColor(color, scale, opacity),
        }
      }
    },
    meta,
  ]
}

function createThemeTokenRule(
  matcher: RegExp,
  property: string,
  token: string,
  meta?: Rule[2],
): Rule {
  return [
    matcher,
    ([, c]) => {
      const { color, opacity } = parseColor(c)

      let colorVar = `var(--ui-${token}${color === 'default' ? '' : `-${color}`})`

      if (opacity !== undefined) {
        colorVar = `color-mix(in oklch, ${colorVar} ${opacity}%, transparent)`
      }

      return {
        [`${property}`]: colorVar,
      }
    },
    meta,
  ]
}
