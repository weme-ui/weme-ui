import type { UserPresetOptions } from './types'
import { definePreset, mergeDeep } from 'unocss'
import { DEFAULT_THEME_COLORS } from './constants'
import { resolveOptions } from './options'
import { preflights } from './preflights'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { variants } from './variants'

export { resolveThemes } from './themes'
export * from './types/themes'

export const presetWemeUI = definePreset((userOptions: UserPresetOptions = {}) => {
  const options = resolveOptions(userOptions)
  const colorNames = Object.keys({
    ...options.accentColors,
    ...options.neutralColors,
  })

  return {
    name: '@weme-ui/unocss-preset',
    options,
    extendTheme: (t) => {
      const {
        colors,
        font,
        text,
        radius,
        breakpoint,
        verticalBreakpoint,
        ...others
      } = theme(options)

      return {
        ...mergeDeep(t, others),
        colors,
        font,
        text,
        radius,
        breakpoint,
        verticalBreakpoint,
      }
    },
    preflights: preflights(options),
    rules: rules(options),
    shortcuts: shortcuts(options),
    variants,
    shorthands: {
      'theme-colors': `(${DEFAULT_THEME_COLORS.join('|')})`,
      'colors': `(${colorNames.join('|')})`,
      'scales': `(${Array.from({ length: 11 }, (_, i) => i + 1).join('|')})`,
    },
    enforce: 'post',
  }
})
