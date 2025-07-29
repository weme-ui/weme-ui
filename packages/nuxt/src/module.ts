import type { ModuleOptions as IconNuxtOptions } from '@nuxt/icon'
import type { UnocssNuxtOptions } from '@unocss/nuxt'
import type { NuxtTemplate } from 'nuxt/schema'
import { addPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule, hasNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import { WemeIcons } from './runtime/icons'
import { getTemplates } from './templates'

export type * from './runtime/types'

export interface WemeNuxtOptions {
  /**
   * Prefix for css variables
   *
   * @default 'ui-'
   */
  prefix?: string

  /**
   * Inject reset styles
   *
   * @default true
   */
  reset?: boolean

  /**
   * Custom accent colors
   */
  accentColors?: Record<string, string>

  /**
   * custom neutral colors
   */
  neutralColors?: Record<string, string>

  /**
   * Background colors
   *
   * @default { light: '#fff', dark: '#111' }
   */
  background?: {
    light: string
    dark: string
  }

  /**
   * Components Css Variables
   */
  cssVars?: Record<string, string> | Record<string, Record<string, string>>

  /**
   * Import themes from directories
   */
  imports?: {
    /**
     * Directories to import themes from
     */
    themes?: string[]
  }
}

export default defineNuxtModule<WemeNuxtOptions>({
  meta: {
    name,
    version,
    configKey: 'weme',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },

  defaults: {
    prefix: 'ui-',
    reset: true,
    background: {
      light: '#fff',
      dark: '#111',
    },
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    options = options || {}

    options.imports = options.imports || { themes: [] }
    options.imports.themes?.push('./themes')
    options.imports.themes = [...new Set(options.imports.themes?.filter(Boolean).map(dir => resolver.resolve(dir)))]

    nuxt.options.weme = options
    nuxt.options.alias['#weme'] = resolver.resolve('../.nuxt/weme')

    nuxt.options.appConfig.weme = {
      theme: 'default',
      icons: WemeIcons,
    }

    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {}
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, 'isolate'].filter(Boolean).join(' ')

    async function registerModule<T extends Record<string, any>>(name: string, key: string, options?: T) {
      if (!hasNuxtModule(name)) {
        await installModule(name, options)
      }
      else {
        (nuxt.options as any)[key] = defu((nuxt.options as any)[key], options || {})
      }
    }

    await registerModule('@vueuse/nuxt', 'vueuse')

    await registerModule<UnocssNuxtOptions>('@unocss/nuxt', 'unocss', {
      uno: false,
      components: false,
      safelist: [
        'isolate',
      ],
    })

    await registerModule<IconNuxtOptions>('@nuxt/icon', 'icon', {
      componentName: 'UseIcon',
      cssLayer: 'components',
      customCollections: [
        {
          prefix: 'weme',
          // weme:logo, weme:empty
          dir: resolver.resolve('runtime/assets/icon'),
          normalizeIconName: false,
        },
      ],
    })

    // Plugins
    addPlugin({ src: resolver.resolve('runtime/plugins/custom-theme.ts') })

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
