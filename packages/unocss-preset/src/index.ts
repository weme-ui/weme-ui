import type { WemePresetOptions } from './types'
import { definePreset } from 'unocss'
import { resolveOptions } from './options'
import { preflights } from './preflights'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { getColorNames } from './utils'
import { variants } from './variants'

export const presetWemeUI = definePreset((userOptions: WemePresetOptions = {}) => {
  const options = resolveOptions(userOptions)

  return {
    name: '@weme-ui/unocss-preset',
    rules: rules(options),
    shortcuts: shortcuts(options),
    preflights: preflights(options),
    theme: theme(options),
    variants,
    shorthands: {
      color: `(${getColorNames(options.colors).join('|')})`,
      scale: `(${Array.from({ length: 11 }, (_, i) => i + 1).join('|')})`,
    },
    options,
  }
})

export { THEME_COLORS } from './defaults'

export type { WemePresetOptions } from './types'
export type { WemePresetTheme, WemePresetThemeColorNames, WemePresetThemeColors, WemePresetThemeTokens } from './types'
