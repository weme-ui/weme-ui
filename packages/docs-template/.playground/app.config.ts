export default defineAppConfig({
  wemeDocs: {
    site: {
      title: 'Weme UI',
      titleTemplate: '%s - Weme UI',
      description: 'Beautifully designed Nuxt Content template built with Weme UI.',
      keywords: ['weme', 'weme-ui', 'nuxt', 'vue', 'reka-ui', 'radix-colors'],
      lang: 'zh-CN',
    },

    nav: [
      {
        label: 'Docs',
        children: [
          {
            label: 'Get Started',
            description: 'Getting up and running is quick and easy.',
            to: '/docs/web/get-started/installation',
          },
          {
            label: 'Components',
            description: 'Explore the components.',
            to: '/docs/web/components',
          },
          {
            label: 'Blocks',
            description: 'Explore the blocks.',
            to: '/docs/web/styles',
          },
          {
            label: 'Templates',
            description: 'Explore the templates.',
            to: '/docs/web/templates',
          },
          {
            label: 'Playground',
            description: 'Explore the components in action.',
            to: '/docs/web/playground',
          },
        ],
      },
      {
        label: 'Colors',
        children: [
          {
            label: 'Docs',
            description: 'Comprehend the color system.',
            to: '/colors',
          },
          {
            label: 'Customization',
            description: 'Create your own color palette.',
            to: '/colors/customization',
          },
        ],
      },
      {
        label: 'Resources',
        children: [
          {
            label: 'UnoCSS Preset',
            description: 'UnoCSS Preset for Weme UI.',
            to: '/resources/unocss-preset',
          },
          {
            label: 'Nuxt Module',
            description: 'Nuxt Module for Weme UI.',
            to: '/resources/nuxt-module',
          },
          {
            label: 'Vite Plugin',
            description: 'Vite Plugin for Weme UI.',
            to: '/resources/vite-plugin',
          },
        ],
      },
    ],

    links: [
      {
        label: 'Community',
        to: 'https://github.com/orgs/weme-ui/discussions',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
      {
        label: 'Releases',
        to: 'https://github.com/weme-ui/weme-ui/releases',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    ],
  },
})
