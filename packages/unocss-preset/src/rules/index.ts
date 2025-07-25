import type { Rule, WemePresetOptions } from '../types'
import { cssVarRules } from './cssvars'
import { backgroundRules, borderRules, foregroundRules, gradientRules, ringRules, shadowRules } from './theme'

export function rules(options: WemePresetOptions): Rule[] {
  const rules: Rule[] = [
    backgroundRules,
    foregroundRules,
    borderRules,
    ringRules,
    shadowRules,
    gradientRules,

    cssVarRules(options),
  ].flat()

  return rules
}
