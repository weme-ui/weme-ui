import type { CSSEntry, UtilObject } from '@unocss/core'
import { remRE } from './handlers/regex'

/**
 * 创建 rem 到 px 的处理器
 *
 * @category Utils
 */
export function createRemToPxProcessor(base: number = 16) {
  function resolver(utility: CSSEntry) {
    if (typeof utility[1] === 'string' && remRE.test(utility[1]))
      utility[1] = utility[1].replace(remRE, (_, p1) => `${p1 * base}px`)
  }

  return (utilObjectOrEntry: UtilObject | CSSEntry) => {
    if (Array.isArray(utilObjectOrEntry)) {
      resolver(utilObjectOrEntry as CSSEntry)
    }
    else {
      (utilObjectOrEntry as UtilObject).entries.forEach(resolver)
    }
  }
}
