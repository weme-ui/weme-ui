import { clickVariants } from './clickable'
import { staticVariants } from './static'

export * from './clickable'
export * from './static'

export const variantsMap: Record<string, string[]> = {
  click: clickVariants,
  static: staticVariants,
}
