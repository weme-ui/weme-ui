export default defineAppConfig({
  docafe: {
    site: {
      title: 'Re-usable UI components with Reka UI and UnoCSS',
      titleTemplate: '%s - Weme UI',
      description: 'Re-usable UI components with Reka UI and UnoCSS.',
      lang: 'en-US',
    },

    header: {
      name: 'Weme UI',
      logo: 'weme:logo',
      nav: [
        {
          label: 'Docs',
          children: [
            {
              icon: 'lucide:rocket',
              label: 'Getting Started',
              description: 'Learn how to get started.',
              to: '/docs/std/get-started/installation',
            },
            {
              icon: 'lucide:book-open',
              label: 'Guide',
              description: 'Learn how Weme UI works.',
              to: '/docs/std/guide',
            },
            {
              icon: 'lucide:component',
              label: 'Components',
              description: 'Explore all components.',
              to: '/docs/std/components',
            },
            {
              icon: 'lucide:code',
              label: 'API',
              description: 'Explore all composables, utilities.',
              to: '/docs/std/api',
            },
          ],
        },
        {
          label: 'Templates',
          children: [
            {
              icon: 'lucide:layout-template',
              label: 'Layouts',
              description: 'Explore the layouts.',
              to: '/layouts',
            },
            {
              icon: 'lucide:blocks',
              label: 'Blocks',
              description: 'Explore the blocks.',
              to: '/blocks',
            },
            {
              icon: 'lucide:swatch-book',
              label: 'Themes',
              description: 'Explore the themes.',
              to: '/themes',
            },
          ],
        },
        {
          label: 'Resources',
          children: [
            {
              icon: 'simple-icons:nuxt',
              label: 'Nuxt Module',
              description: 'Nuxt Module for Weme UI.',
              to: '/resources/nuxt-module',
            },
            {
              icon: 'simple-icons:unocss',
              label: 'UnoCSS Preset',
              description: 'UnoCSS Preset for Weme UI.',
              to: '/resources/unocss-preset',
            },
          ],
        },
        {
          label: 'Community',
          children: [
            {
              icon: 'lucide:messages-square',
              label: 'Discussions',
              description: 'Find answers and support.',
              to: 'https://github.com/orgs/weme-ui/discussions',
              rel: 'noopener noreferrer',
              target: '_blank',
            },
            {
              icon: 'lucide:bug',
              label: 'Reporting Bugs',
              description: 'Report bugs helpfully.',
              to: 'https://github.com/weme-ui/weme-ui/issues',
              rel: 'noopener noreferrer',
              target: '_blank',
            },
            {
              icon: 'lucide:git-pull-request',
              label: 'Contribution',
              description: 'We love contributions of all kinds.',
              to: '/contribution',
            },
            {
              icon: 'lucide:map',
              label: 'Roadmap',
              description: 'More upcoming features and ideas.',
              to: '/roadmap',
            },
            {
              icon: 'lucide:bell-dot',
              label: 'Releases',
              description: 'Latest updates and releases.',
              to: '/releases',
            },
          ],
        },
        {
          label: 'Playground',
          to: '/playground',
        },
      ],
    },

    footer: {
      links: [
        {
          label: 'Roadmap',
          to: '/roadmap',
        },
        {
          label: 'Releases',
          to: '/releases',
        },
      ],
    },

    outline: {
      title: '大纲',
      extends: {
        title: '社区支持',
        links: [
          {
            icon: 'lucide:star',
            label: 'Star on GitHub',
            to: 'https://github.com/weme-ui/weme-ui',
            rel: 'noopener noreferrer',
            target: '_blank',
          },
          {
            icon: 'lucide:bug',
            label: 'Report an issue',
            to: 'https://github.com/weme-ui/weme-ui/issues',
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        ],
      },
    },
  },
})
