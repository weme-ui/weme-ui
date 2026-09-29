import type { Preflight } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme/types'
import { custom } from './custom'
import { property } from './property'
import { reset } from './reset'
import { theme } from './theme'

export function preflights(options: ResolvedWemeUIOptions): Preflight<Theme>[] {
  return [
    reset(options),
    theme(options),
    custom(options),
    property(options),
  ].filter(Boolean) as Preflight<Theme>[]
}
