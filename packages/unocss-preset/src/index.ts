import type { PresetWemeUIOptions } from './options'
import type { Theme } from './theme'
import { definePreset } from '@unocss/core'
import { extractorArbitraryVariants } from '@unocss/extractor-arbitrary-variants'
import { resolveOptions } from './options'
import { postprocessors } from './postprocess'
import { preflights } from './preflights'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { shorthands } from './shorthands'
import { theme } from './theme'
import { PRESET_NAME, trackedColorAliases, trackedProperties, trackedTheme } from './utils'
import { variants } from './variants'

/**
 * Weme UI UnoCSS 预设
 *
 * @category Preset
 */
export const presetWemeUI = definePreset<PresetWemeUIOptions, Theme>((userOptions = {}) => {
  const options = resolveOptions(userOptions)

  return {
    name: PRESET_NAME,
    prefix: options.prefix,
    options,
    layers: {
      properties: -200,
      theme: -150,
      base: -100,
    },
    autocomplete: {
      shorthands,
    },
    rules: rules(options),
    shortcuts,
    theme: theme(options),
    variants: variants(options),
    preflights: preflights(options),
    postprocess: postprocessors(options),
    extractorDefault: options.arbitraryVariants === false
      ? undefined
      : extractorArbitraryVariants(),
    configResolved() {
      trackedTheme.clear()
      trackedProperties.clear()
      trackedColorAliases.clear()
    },
    meta: {
      themeDeps: trackedTheme,
      propertyDeps: trackedProperties,
      colorAliasDeps: trackedColorAliases,
    },
  }
})

export default presetWemeUI
