type DocafeConfigTarget = '_blank' | '_parent' | '_self' | '_top'

interface DocafeConfigLinkable {
  to: string
  icon?: string
  rel?: string
  target?: DocafeConfigTarget
}

type DocafeConfigTextLink = DocafeConfigLinkable & {
  label: string
  description?: string
}

type DocafeConfigIconLink = DocafeConfigLinkable & {
  icon: string
  alt?: string
}

type DocafeConfigNavItem = Omit<DocafeConfigTextLink, 'to'> & {
  to?: string
  children?: DocafeConfigTextLink[]
}

interface DocafeConfigTheme {
  bordered?: boolean
  fillContainer?: boolean
  custom?: boolean
}

interface DocafeConfigIcons {
  // Languages
  'js': string
  'ts': string
  'html': string
  'css': string
  'vue': string
  'json': string
  'yaml': string
  'go': string
  'bash': string
  'shell': string
  'md': string
  'diff': string

  // Folders
  'file': string
  'folder': string
  'folder-assets': string
  'folder-components': string
  'folder-composables': string
  'folder-config': string
  'folder-constant': string
  'folder-docs': string
  'folder-layouts': string
  'folder-locales': string
  'folder-middleware': string
  'folder-nuxt': string
  'folder-plugins': string
  'folder-src': string
  'folder-styles': string
  'folder-tests': string
  'folder-themes': string
  'folder-types': string
  'folder-utils': string
  'folder-views': string

  // Package Managers
  'pnpm': string
  'npm': string
  'yarn': string
}

interface DocafeConfig {
  site?: {
    title?: string
    titleTemplate?: string
    description?: string
    lang?: string
  }

  theme?: DocafeConfigTheme

  icons?: DocafeConfigIcons

  header?: {
    logo?: string
    name?: string
    nav?: DocafeConfigNavItem[]
    bordered?: boolean
  }

  sidebar?: {
    spiltLevel?: boolean
    bordered?: boolean
    badge?: {
      icon?: string
      label?: string
    }
  }

  footer?: {
    copyright?: string
    links?: DocafeConfigTextLink[]
    bordered?: boolean
  }

  outline?: {
    title?: string
    extends?: {
      title?: string
      links?: DocafeConfigTextLink[]
    }
  }

  socials?: DocafeConfigIconLink[]

  github?: {
    repo: string
    branch?: string
    directory?: string
  }
}
