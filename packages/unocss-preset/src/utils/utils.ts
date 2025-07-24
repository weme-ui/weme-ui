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

export function minifyCss(css: string) {
  return css.trim().replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\//g, '')
}
