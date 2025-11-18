export function useFooter(): FooterNavItem[] {
  return [
    {
      label: '关于',
      to: '/about',
    },
    {
      label: '开发计划',
      to: '/roadmap',
    },
    {
      label: '更新日志',
      to: '/releases',
    },
  ]
}
