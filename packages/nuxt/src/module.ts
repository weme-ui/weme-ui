import type { NuxtTemplate } from 'nuxt/schema'
import type { WemeNuxtOptions } from './types'
import { addPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule, hasNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
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

  async setup(options, nuxt) {
    options = await resolveOptions(options, nuxt, resolver)

    nuxt.options.weme = options
    nuxt.options.alias['#weme'] = resolver.resolve('runtime')
    nuxt.options.appConfig.weme = {
      icons: WemeIcons,
    }

    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {}
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, 'isolate'].filter(Boolean).join(' ')

    nuxt.options.vite = nuxt.options.vite || {}
    nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    nuxt.options.vite.optimizeDeps.include.push(
      'clsx',
      'tailwind-merge',
      'tailwind-variants',
      'reka-ui',
      'reka-ui/namespaced',
      'motion-v',
    )

    async function registerModule(name: string, key: string, options: Record<string, any>) {
      if (!hasNuxtModule(name)) {
        await installModule(name, defu((nuxt.options as any)[key], options))
      }
      else {
        (nuxt.options as any)[key] = defu((nuxt.options as any)[key], options)
      }
    }

    await registerModule('@unocss/nuxt', 'unocss', {
      components: false,
      safelist: [
        'isolate',
      ],
    })

    await registerModule('@nuxt/image', 'image', {
      inject: false,
      provider: 'ipx',
      screen: {
        xs: 520,
        sm: 768,
        md: 1024,
        lg: 1280,
        xl: 1640,
      },
    })

    await registerModule('@nuxt/icon', 'icon', {
      componentName: 'UseIcon',
      cssLayer: 'components',
      customCollections: [
        {
          prefix: 'weme',
          dir: resolver.resolve('runtime/assets/icon'),
          normalizeIconName: false,
        },
        {
          prefix: 'weme',
          dir: resolver.resolve('runtime/assets/empty'),
          normalizeIconName: false,
        },
      ],
    })

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
