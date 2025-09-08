import type { VariantHandler } from 'unocss'

export function notLastChildSelectorVariant(s: string): VariantHandler {
  return {
    matcher: s,
    handle: (input, next) => next({
      ...input,
      parent: `${input.parent ? `${input.parent} $$ ` : ''}${input.selector}`,
      selector: ':where(&>:not(:last-child))',
    }),
  }
}

export function minifyCss(css: string) {
  return css.trim().replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\//g, '')
}
