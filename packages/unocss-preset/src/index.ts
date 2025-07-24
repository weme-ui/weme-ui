import type { UserPresetOptions } from './types'
import { definePreset, mergeDeep } from 'unocss'
import { resolveOptions } from './options'
import { preflights } from './preflights'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { variants } from './variants'

export * from './types/themes'

export const presetHalo = definePreset((userOptions: UserPresetOptions = {}) => {
  const options = resolveOptions(userOptions)

  return {
    name: '@weme-ui/unocss-preset-halo',
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
    shortcuts,
    variants,
    shorthands: {
      'theme-colors': '(accent|neutral|info|success|warning|error)',
      'scales': '(1|2|3|4|5|6|7|8|9|10|11|12)',
    },
    enforce: 'post',
  }
})
