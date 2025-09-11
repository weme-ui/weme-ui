import type { WemePresetOptions } from './types'
import { definePreset } from 'unocss'
import { resolveOptions } from './options'
import { preflights } from './preflights'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { getColorNames } from './utils'
import { variants } from './variants'

export const presetWemeUI = definePreset((_options: WemePresetOptions = {}) => {
  const options = resolveOptions(_options)

  return {
    name: '@weme-ui/unocss-preset',
    rules: rules(options),
    shortcuts: shortcuts(options),
    preflights: preflights(options),
    theme: theme(options),
    variants,
    shorthands: {
      color: `(${getColorNames(options).join('|')})`,
      scale: `(${Array.from({ length: 11 }, (_, i) => i + 1).join('|')})`,
    },
    options,
  }
})

export { defaultThemeColors as colors } from './defaults'
export { variantsMap } from './shortcuts/variants'

export { WemePresetOptions }
export * from './types/theme'
