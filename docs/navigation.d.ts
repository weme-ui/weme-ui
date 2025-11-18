interface HeaderNavItem {
  label: string
  description?: string
  icon?: string
  to?: string
  rel?: string
  redirect?: string
  target?: '_blank' | '_self'
  children?: HeaderNavItem[]
}

interface FooterNavItem {
  label: string
  to?: string
  rel?: string
  redirect?: string
  target?: '_blank' | '_self'
}
