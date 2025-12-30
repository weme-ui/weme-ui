import type { Preset } from 'unocss'
import type { Theme, WemePresetOptions } from './types'
import { definePreset } from 'unocss'
import { resolveOptions } from './options'
import { preflights } from './preflights'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { getColorNames } from './utils'
import { variants } from './variants'

export { COLOR_NAMES, GRAY_COLOR_NAMES, THEME_COLORS, VARIANT_MAP } from './defaults'

export const presetWemeUI = definePreset<WemePresetOptions, Theme>((userOptions = {}): Preset<Theme> => {
  const options = resolveOptions(userOptions)

  return {
    name: '@weme-ui/unocss-preset',
    shortcuts: shortcuts(options),
    preflights: preflights(options),
    theme: theme(options),
    rules: rules(options),
    variants,
    options,
    autocomplete: {
      shorthands: {
        color: `(${getColorNames(options.colors).join('|')})`,
        scale: `(${Array.from({ length: 11 }, (_, i) => i + 1).join('|')})`,
      },
    },
  }
})

export type { Theme as UnoPresetTheme, WemePresetOptions, WemePresetThemeDefinition as WemePresetTheme, WemePresetThemeColorNames, WemePresetThemeColors, WemePresetThemeTokens } from './types'
export default presetWemeUI
