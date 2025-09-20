interface NavigationItem {
  icon?: string
  title: string
  path?: string
  redirect?: string
  badge?: {
    icon?: string
    label?: string
  }
  children?: NavigationItem[]
}
