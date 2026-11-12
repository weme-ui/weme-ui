import type { Postprocessor } from '@unocss/core'
import type { PresetWemeUIOptions } from '..'
import { important } from './important'
import { varPrefix } from './varPrefix'

export function postprocessors(options: PresetWemeUIOptions): Postprocessor[] {
  return [important, varPrefix].flatMap((i) => i(options))
}
