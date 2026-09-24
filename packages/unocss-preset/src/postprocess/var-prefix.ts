import type { Postprocessor } from '@unocss/core'
import type { PresetWemeUIOptions } from '..'

export function varPrefix({ variablePrefix: prefix }: PresetWemeUIOptions): Postprocessor[] {
  const processor: Postprocessor = (obj) => {
    if (obj.layer === 'properties')
      obj.selector = obj.selector.replace(/^@property --un-/, `@property --${prefix}`)

    obj.entries.forEach((i) => {
      i[0] = i[0].replace(/^--un-/, `--${prefix}`)
      if (typeof i[1] === 'string')
        i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`)
    })
  }

  return prefix !== 'un-' ? [processor] : []
}
