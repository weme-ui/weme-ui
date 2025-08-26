import { defu } from 'defu'
import { defineNuxtModule } from 'nuxt/kit'

const defaultIcons: DocafeConfigIcons = {
  'js': 'catppuccin:javascript',
  'ts': 'catppuccin:typescript',
  'html': 'catppuccin:html',
  'css': 'catppuccin:css',
  'vue': 'catppuccin:vue',
  'json': 'catppuccin:json',
  'yaml': 'catppuccin:yaml',
  'go': 'catppuccin:go',
  'bash': 'catppuccin:bash',
  'shell': 'lucide:terminal',
  'md': 'catppuccin:markdown',
  'diff': 'catppuccin:diff',
  'file': 'catppuccin:file',
  'folder': 'catppuccin:folder',
  'folder-assets': 'catppuccin:folder-assets',
  'folder-components': 'catppuccin:folder-components',
  'folder-composables': 'catppuccin:folder-composables',
  'folder-config': 'catppuccin:folder-config',
  'folder-constant': 'catppuccin:folder-constant',
  'folder-docs': 'catppuccin:folder-docs',
  'folder-layouts': 'catppuccin:folder-layouts',
  'folder-locales': 'catppuccin:folder-locales',
  'folder-middleware': 'catppuccin:folder-middleware',
  'folder-nuxt': 'catppuccin:folder-nuxt',
  'folder-plugins': 'catppuccin:folder-plugins',
  'folder-src': 'catppuccin:folder-src',
  'folder-styles': 'catppuccin:folder-styles',
  'folder-tests': 'catppuccin:folder-tests',
  'folder-themes': 'catppuccin:folder-themes',
  'folder-types': 'catppuccin:folder-types',
  'folder-utils': 'catppuccin:folder-utils',
  'folder-views': 'catppuccin:folder-views',
  'pnpm': 'catppuccin:pnpm',
  'npm': 'catppuccin:npm',
  'yarn': 'catppuccin:yarn',
}

export default defineNuxtModule({
  meta: {
    name: 'docafe/config',
  },

  async setup(_options, nuxt) {
    const appConfig = nuxt.options.appConfig.docafe || {} as DocafeConfig

    appConfig.site = defu(appConfig.site, {
      title: 'Write beautiful docs built with Weme UI',
      titleTemplate: '%s - Docafe',
      description: 'Write beautiful docs built with Weme UI.',
      lang: 'en-US',
    })

    appConfig.theme = defu(appConfig.theme, {
      bordered: true,
      fillContainer: true,
      custom: false,
    })

    appConfig.icons = defu(appConfig.icons, defaultIcons)

    appConfig.header = defu(appConfig.header, {
      name: 'Docafe',
    })

    appConfig.sidebar = defu(appConfig.sidebar, {
      spiltLevel: false,
    })

    appConfig.footer = defu(appConfig.footer, {
      copyright: 'Published under the MIT License.',
    })

    appConfig.outline = defu(appConfig.outline, {
      title: 'On this page',
      extends: {
        title: 'Community',
        links: [
          {
            icon: 'lucide:star',
            label: 'Star on GitHub',
            to: 'https://github.com/weme-ui/docafe',
            rel: 'noopener noreferrer',
            target: '_blank',
          },
          {
            icon: 'lucide:bug',
            label: 'Report an issue',
            to: 'https://github.com/weme-ui/docafe/issues',
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        ],
      },
    })

    appConfig.github = defu(appConfig.github, {
      repo: 'weme-ui/weme-ui',
      directory: 'packages/docafe',
    })

    nuxt.options.appConfig.docafe = appConfig
  },
})
