import type { Preflight } from '@unocss/core'
import type { PresetWemeUIOptions } from '..'
import type { Theme } from '../theme'
import { custom } from './custom'
import { preflight } from './preflight'
import { property } from './property'
import { reset } from './reset'
import { theme } from './theme'

export const preflights: (options: PresetWemeUIOptions) => Preflight<Theme>[] = (options) => {
  return [reset(options), preflight(), custom(options), theme(), property(options)].filter(
    Boolean,
  ) as Preflight<Theme>[]
}
