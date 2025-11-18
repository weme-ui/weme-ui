export function useHeader(): HeaderNavItem[] {
  return [
    {
      label: '文档',
      children: [
        {
          icon: 'lucide:rocket',
          label: '快速上手',
          description: '如何安装、安装组件并完成初始化项目',
          to: '/docs/get-started',
        },
        {
          icon: 'lucide:book-open',
          label: '开发指南',
          description: '深入了解 Weme UI 的设计理念和最佳实践',
          to: '/docs/guide',
        },
        {
          icon: 'lucide:component',
          label: '组件概览',
          description: '组件属性参数及使用说明',
          to: '/docs/components',
        },
        {
          icon: 'lucide:code',
          label: 'API',
          description: '组合式函数及工具函数的介绍文档',
          to: '/docs/api',
        },
        {
          icon: 'lucide:pyramid',
          label: '集成',
          description: '集成 Nuxt Module 及 UnoCSS Preset 技术文档',
          to: '/docs/integrations/nuxt-module',
        },
        {
          icon: 'lucide:boxes',
          label: '自定义组件集',
          description: '了解如何拥有自己的组件集',
          to: '/docs/registry',
        },
      ],
    },
    {
      label: '模板',
      children: [
        {
          icon: 'lucide:layout-template',
          label: '布局',
          description: '常用布局模板',
          to: '/templates/layouts',
        },
        {
          icon: 'lucide:blocks',
          label: '页面',
          description: '常用页面模板',
          to: '/templates/blocks',
        },
        {
          icon: 'lucide:swatch-book',
          label: '主题',
          description: '不同颜色效果的主题模板',
          to: '/templates/themes',
        },
      ],
    },
    {
      label: '社区',
      children: [
        {
          icon: 'lucide:messages-square',
          label: '讨论区',
          description: '寻求帮助、分享经验、交流心得',
          to: 'https://github.com/orgs/weme-ui/discussions',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        {
          icon: 'lucide:bug',
          label: '提交问题',
          description: '报告 Bug 或者提供建议',
          to: 'https://github.com/weme-ui/weme-ui/issues',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        {
          icon: 'lucide:git-pull-request',
          label: '贡献代码',
          description: '欢迎贡献代码',
          to: '/contribution',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        {
          icon: 'lucide:map',
          label: '路线图',
          description: '了解 Weme UI 的发展规划',
          to: '/roadmap',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        {
          icon: 'lucide:bell-dot',
          label: '更新日志',
          description: '查看 Weme UI 的更新日志',
          to: '/releases',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      ],
    },
    {
      label: '示例',
      to: '/playground',
    },
  ]
}
