export default defineAppConfig({
  docs: {
    title: 'Weme UI - Re-usable UI components with Reka UI and UnoCSS',
    titleTemplate: '%s - Weme UI',
    description: 'Re-usable UI components with Reka UI and UnoCSS.',
    lang: 'en-US',

    header: {
      name: 'Weme UI',
      logo: 'weme:logo',
      navs: [
        {
          label: 'Docs',
          children: [
            {
              icon: 'lucide:rocket',
              label: 'Getting Started',
              description: 'Learn how to get started.',
              to: '/docs/get-started',
            },
            {
              icon: 'lucide:book-open',
              label: 'Guide',
              description: 'Learn how Weme UI works.',
              to: '/docs/guide',
            },
            {
              icon: 'lucide:component',
              label: 'Components',
              description: 'Explore all components.',
              to: '/docs/components',
            },
            {
              icon: 'lucide:code',
              label: 'API',
              description: 'Explore all composables, utilities.',
              to: '/docs/api',
            },
            {
              icon: 'logos:nuxt-icon',
              label: 'Nuxt Module',
              description: 'Nuxt Module for Weme UI.',
              to: '/docs/essentials/nuxt-module',
            },
            {
              icon: 'logos:unocss',
              label: 'UnoCSS Preset',
              description: 'UnoCSS Preset for Weme UI.',
              to: '/docs/essentials/unocss-preset',
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
              to: '/templates/layouts',
            },
            {
              icon: 'lucide:blocks',
              label: 'Blocks',
              description: 'Explore the blocks.',
              to: '/templates/blocks',
            },
            {
              icon: 'lucide:swatch-book',
              label: 'Themes',
              description: 'Explore the themes.',
              to: '/templates/themes',
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
      copyright: 'Published under the MIT License.',
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
      community: {
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

    github: {
      repo: 'weme-ui/weme-ui',
    },

    fileIcons: {
      'catppuccin:bash': ['shell', 'sh', 'bash', 'zsh'],
      'catppuccin:markdown': ['md', 'markdown', 'mdc'],
      'catppuccin:vue': ['vue'],
      'catppuccin:typescript': ['ts', 'tsx'],
      'catppuccin:javascript': ['js', 'jsx'],
      'catppuccin:html': ['html'],
      'catppuccin:css': ['css'],
      'catppuccin:json': ['json', 'jsonc'],
      'catppuccin:yaml': ['yaml', 'yml'],
      'catppuccin:go': ['go'],
      'catppuccin:prisma': ['prisma'],
    },
  },
})
