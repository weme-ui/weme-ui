import type { NuxtTemplate } from 'nuxt/schema'
import type { WemeNuxtOptions } from './types'
import { addPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'
import { resolveOptions } from './options'
import { WemeIcons } from './runtime/icons'
import { getTemplates } from './templates'

export type * from './types'

const resolver = createResolver(import.meta.url)

export default defineNuxtModule<WemeNuxtOptions>({
  meta: {
    name,
    version,
    configKey: 'weme',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },

  moduleDependencies: () => {
    return {
      '@vueuse/nuxt': {
        defaults: {
          autoImports: true,
        },
      },

      '@unocss/nuxt': {
        defaults: {
          components: false,
          safelist: [
            'isolate',
          ],
        },
      },

      '@nuxt/icon': {
        defaults: {
          componentName: 'UseIcon',
          cssLayer: 'components',
          customCollections: [
            {
              prefix: 'weme',
              dir: resolver.resolve('runtime/assets/icon'),
              normalizeIconName: false,
            },
          ],
        },
      },
    }
  },

  async setup(options, nuxt) {
    options = await resolveOptions(options, nuxt, resolver)

    nuxt.options.weme = options
    nuxt.options.alias['#weme'] = resolver.resolve('runtime')
    nuxt.options.appConfig.weme = {
      icons: WemeIcons,
    }

    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {}
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, 'isolate'].filter(Boolean).join(' ')

    // Plugins
    addPlugin({ src: resolver.resolve('runtime/plugins/custom-theme') })

    // Templates
    const templates: NuxtTemplate[] = await getTemplates(options)

    templates.forEach((template) => {
      if (template.filename?.endsWith('.d.ts')) {
        addTypeTemplate(template as any)
      }
      else {
        addTemplate(template)
      }
    })
  },
})
