import type { Preflight } from '@unocss/core'
import type { Theme } from '../theme/types'
import type { PresetWemeUIOptions } from '~/options'
import { custom } from './custom'
import { property } from './property'
import { reset } from './reset'
import { theme } from './theme'

export function preflights(options: PresetWemeUIOptions): Preflight<Theme>[] {
  return [
    reset(options),
    custom(options),
    theme(options),
    property(options),
  ].filter(Boolean) as Preflight<Theme>[]
}
