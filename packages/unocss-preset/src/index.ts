import type { UserPresetOptions } from './types'
import { definePreset } from 'unocss'
import { resolveOptions } from './options'
import { preflights } from './preflights'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { resolveColorNames } from './utils'
import { variants } from './variants'

export * from './types/theme'

export const presetWemeUI = definePreset((_options: UserPresetOptions = {}) => {
  const options = resolveOptions(_options)

  return {
    name: '@weme-ui/unocss-preset',
    rules: rules(options),
    theme: theme(options),
    shortcuts: shortcuts(),
    preflights: preflights(options),
    variants,
    shorthands: {
      color: `(${resolveColorNames(options).join('|')})`,
      scale: `(${Array.from({ length: 11 }, (_, i) => i + 1).join('|')})`,
    },
    options,
  }
})
