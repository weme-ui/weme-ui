import type { NuxtTemplate } from 'nuxt/schema'
import type { WemeNuxtOptions } from './module'
import { getColorNames } from '@weme-ui/colors'
import { createWemeConfigType } from './templates/config'
import { createWemeStyles } from './templates/styles'
import { createWemeType } from './templates/type'
import { createUnoCssConfig } from './templates/unocss'

export async function getTemplates(options: WemeNuxtOptions): Promise<NuxtTemplate[]> {
  const templates: NuxtTemplate[] = []

  const accentColorNames: string[] = [...getColorNames('accent'), ...Object.keys(options.accentColors || {})]
  const neutralColorNames: string[] = [...getColorNames('neutral'), ...Object.keys(options.neutralColors || {})]

  // types/weme.config.d.ts
  templates.push(createWemeConfigType())

  // types/weme.d.ts
  templates.push(createWemeType(
    options.themes || [],
    accentColorNames,
    neutralColorNames,
  ))

  // uno.config.ts
  templates.push(createUnoCssConfig(
    options.variablePrefix || 'ui',
    options.accentColors,
    options.neutralColors,
    options.themes,
    options.cssVars,
  ))

  // weme/styles.ts
  templates.push(createWemeStyles())

  return templates
}
