interface BreadcrumbItem {
  label: string
  to: string
}

export function useBreadcrumb(url: string) {
  const { navigation } = useContent()

  const breadcrumbs: BreadcrumbItem[] = []
  const segments = url.split(/[/#]/g).filter(Boolean)

  let to = ''
  let nav = navigation.value

  if (nav.length === 0)
    return []

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]!.replace('.html', '')
    to += `/${segment}`

    const page = nav.find(item => item.path === to)
    nav = page?.children || []

    breadcrumbs.push({
      label: page?.title ?? segment,
      to,
    })
  }

  return breadcrumbs
}
