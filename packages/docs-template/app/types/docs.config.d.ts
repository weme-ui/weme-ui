type ThemeableIcon
  = | string
    | { svg: string }
    | { light: string, dark: string }

type ThemeableImage
  = | string
    | { src: string, alt?: string }
    | { light: string, dark: string, alt?: string }

interface Linkable {
  to: string
  icon?: ThemeableIcon
  rel?: string
  target?: '_blank' | '_self'
}

type TextLink = Linkable & {
  label: string
}

type IconLink = Linkable & {
  icon: ThemeableIcon
  alt?: string
}

type Button = TextLink & {
  color?: 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost' | 'link' | 'inverse'
}

type Feature = Omit<Linkable, 'to'> & {
  title?: string
  description?: string
  to?: string
}

type NavItem = Omit<TextLink, 'to'> & {
  to?: string
  description?: string
  children?: TextLink[]
}

interface WemeDocsConfig {
  site?: {
    logo?: ThemeableIcon
    title?: string
    titleTemplate?: string
    description?: string
    keywords?: string[]
    lang?: string
  }

  nav?: NavItem[]
  links?: TextLink[]
  socials?: IconLink[]

  outline?: {
    title?: string
    extends?: {
      title?: string
      links?: TextLink[]
    }
  } | boolean

  footer?: {
    copyright?: string
    links?: TextLink[]
  }

  github?: {
    repo: string
    branch?: string
    directory?: string
  }
}
