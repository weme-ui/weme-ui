import type { NuxtTemplate } from 'nuxt/schema'
import type { WemeNuxtOptions } from './module'
import type { WemeThemeDefinition } from './runtime/types'
import { getColorNames } from '@weme-ui/colors'
import { createWemeConfigType } from './templates/config'
import { createWemeStyles } from './templates/styles'
import { createWemeThemes } from './templates/themes'
import { createWemeType } from './templates/type'
import { createUnoCssConfig } from './templates/unocss'

export async function getTemplates(options: WemeNuxtOptions): Promise<NuxtTemplate[]> {
  const templates: NuxtTemplate[] = []

  const accentColorNames: string[] = [...getColorNames('accent'), ...Object.keys(options.accentColors || {})]
  const neutralColorNames: string[] = [...getColorNames('neutral'), ...Object.keys(options.neutralColors || {})]

  const themes: WemeThemeDefinition[] = []

  if (options.imports?.themes) {
    const { default: fg } = await import('fast-glob')

    for (const dir of options.imports.themes) {
      const files = await fg([`${dir}/*.ts`])

      for (const file of files) {
        const module = await import(file)
        const theme = module.default

        if (theme && typeof theme === 'object')
          themes.push(theme)
      }
    }
  }

  // weme/themes.ts
  templates.push(createWemeThemes(
    themes,
    options.background,
    options.prefix,
  ))

  // weme/weme.style.ts
  templates.push(createWemeStyles())

  // uno.config.ts
  templates.push(createUnoCssConfig(
    options.prefix!,
    options.reset!,
    options.background!,
    options.accentColors,
    options.neutralColors,
    themes,
  ))

  // types/weme.d.ts
  templates.push(createWemeType(
    themes,
    accentColorNames,
    neutralColorNames,
  ))

  // types/weme.config.d.ts
  templates.push(createWemeConfigType())

  return templates
}
