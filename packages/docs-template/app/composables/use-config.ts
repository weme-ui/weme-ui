import { createSharedComposable } from '@vueuse/core'
import { defu } from 'defu'

const defaultConfig: WemeDocsConfig = {
  site: {
    title: 'Weme UI',
    titleTemplate: ':title - Weme UI',
    description: 'Beautifully designed Nuxt Content template built with Weme UI.',
    keywords: ['weme', 'weme-ui', 'nuxt', 'vue', 'reka-ui', 'radix-colors'],
    lang: 'zh-CN',
  },

  socials: [
    {
      icon: 'i-simple-icons-github',
      to: 'https://github.com/weme-ui/weme-ui',
    },
  ],

  outline: {
    title: 'On this page',
  },

  footer: {
    copyright: 'Published under the MIT License.',
  },
}

function _useConfig() {
  const appConfig = computed<WemeDocsConfig>(() => useAppConfig()?.wemeDocs || {})
  const resolvedConfig = defu(appConfig.value, defaultConfig)

  const { page } = useContent()

  return computed<WemeDocsConfig>(() => {
    return {
      ...resolvedConfig,

      nav: page.value?.nav as NavItem[] || resolvedConfig.nav || [],
      links: page.value?.links as TextLink[] || resolvedConfig.links || [],
      socials: page.value?.socials as IconLink[] || resolvedConfig.socials || [],
    }
  })
}

export const useConfig = /* @__PURE__ */ createSharedComposable(_useConfig)
