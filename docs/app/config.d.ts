type DocsLinkTarget = '_blank' | '_self'

interface DocsLink {
  to?: string
  icon?: string
  label?: string
  description?: string
  redirect?: string
  rel?: string
  target?: DocsLinkTarget
}

type DocsNavItem = Omit<DocsLink, 'to'> & {
  to?: string
  children?: DocsLink[]
}

type DocsFileIcons = Record<string, string[]>

interface DocsConfig {
  title?: string
  titleTemplate?: string
  description?: string
  lang?: string

  header?: {
    name?: string
    logo?: string
    navs?: DocsNavItem[]
  }

  footer?: {
    copyright?: string
    links?: DocsLink[]
  }

  outline?: {
    title?: string
    community?: {
      title?: string
      links?: DocsLink[]
    }
  }

  socials?: DocsLink[]

  fileIcons?: DocsFileIcons

  github?: {
    repo: string
    branch?: string
    directory?: string
  }
}
