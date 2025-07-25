import type { Variant } from '../types'

export function createDataVariants(name: string, attributes: string[]): Variant[] {
  const variants: Variant[] = []

  attributes.forEach((attr) => {
    // [data-*=*]
    variants.push({
      name: `data-${name}:${attr}`,
      match(matcher) {
        if (!matcher.startsWith(`${name}-${attr}:`))
          return matcher

        return {
          matcher: matcher.slice(`${name}-${attr}:`.length),
          selector: s => `${s}[data-${name}=${attr}]`,
        }
      },
      multiPass: true,
    })

    // :not([data-*=*])
    variants.push({
      name: `not-data-${name}:${attr}`,
      match(matcher) {
        if (!matcher.startsWith(`not-${name}-${attr}:`))
          return matcher

        return {
          matcher: matcher.slice(`not-${name}-${attr}:`.length),
          selector: s => `${s}:not([data-${name}=${attr}])`,
        }
      },
      multiPass: true,
    })
  })

  return variants
}

export function createPresentDataVariants(names: string[]): Variant[] {
  const variants: Variant[] = []

  names.forEach((name) => {
    // [data-*]
    variants.push({
      name: `data-${name}`,
      match(matcher) {
        if (!matcher.startsWith(`data-${name}:`))
          return matcher

        return {
          matcher: matcher.slice(`data-${name}:`.length),
          selector: s => `${s}[data-${name}]`,
        }
      },
      multiPass: true,
    })

    // :not([data-*])
    variants.push({
      name: `not-data-${name}`,
      match(matcher) {
        if (!matcher.startsWith(`not-data-${name}:`))
          return matcher

        return {
          matcher: matcher.slice(`not-data-${name}:`.length),
          selector: s => `${s}:not([data-${name}])`,
        }
      },
      multiPass: true,
    })
  })

  return variants
}

// Tokens or CssVars
type CssVars = Record<string, string> | Record<string, Record<string, string>>

export function createCssVars(prefix: string, cssVars: CssVars) {
  const shortcuts: Record<string, string> = {
    foreground: 'fg',
    background: 'bg',
  }

  function normalizeCssVarName(name: string): string {
    if (name.startsWith('--'))
      name = name.slice(2)

    if (name.startsWith(prefix))
      name = name.slice(prefix.length + 1)

    return name.split('-')
      .map((n) => {
        if (n === 'default')
          return ''

        return shortcuts[n] ?? n
      })
      .filter(Boolean)
      .join('-')
  }

  return Object.entries(cssVars)
    .map(([name, value]) => {
      if (typeof value === 'string')
        return `--${prefix}${normalizeCssVarName(name)}: ${value};`

      return Object.entries(value)
        .map(([subName, subValue]) => {
          return `--${prefix}${normalizeCssVarName(`${name}-${subName}`)}: ${subValue};`
        })
        .join('')
    })
    .join('')
}
