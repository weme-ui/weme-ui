export interface RegistryFile {
  type?: string
  kind?: string
  path: string
  target?: string
}

export interface RegistryItem {
  name: string
  title?: string
  description?: string
  type?: string
  when?: string
  files: RegistryFile[]
  cssVars?: Record<string, Record<string, string>>
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  meta?: Record<string, string>
}

export interface RegistryConfig {
  name: string
  description?: string
  version?: string
  homepage?: string
  repository?: string
  items: RegistryItem[]
}

export interface LibraryDocPage {
  library: string
  slug: string[]
  href: string
  title: string
  body: string
}

export interface DocNavItem {
  title: string
  href: string
}

export interface ComponentTreeItem {
  name: string
  title: string
  href: string
  description?: string
}

export interface ComponentTreeCategory {
  id: string
  label: string
  items: ComponentTreeItem[]
}

export interface ComponentTreeSection {
  id: string
  label: string
  categories: ComponentTreeCategory[]
}

export interface LibrarySummary {
  id: string
  name: string
  description?: string
  version?: string
  href: string
  docs: DocNavItem[]
  tree: ComponentTreeSection[]
}

export interface ItemPageModel {
  library: string
  section: string
  name: string
  title: string
  description?: string
  category?: string
  categoryLabel?: string
  item: RegistryItem
  readme?: string
  exampleModules: Array<{
    name: string
    path: string
  }>
  sourceFiles: RegistryFile[]
  href: string
}

const registryModules = import.meta.glob<RegistryConfig>(
  '../../../../registry/*/registry.json',
  { eager: true, import: 'default' },
)

const libraryDocModules = import.meta.glob<string>(
  '../../../../registry/*/docs/**/*.{md,mdx}',
  { eager: true, query: '?raw', import: 'default' },
)

const itemReadmeModules = import.meta.glob<string>(
  '../../../../registry/*/src/**/README.md',
  { eager: true, query: '?raw', import: 'default' },
)

const exampleModules = import.meta.glob(
  '../../../../registry/*/src/**/examples/*.vue',
  { eager: true },
)

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  if (!normalizedBase)
    return normalizedPath
  return `${normalizedBase}${normalizedPath}`
}

function libraryIdFromPath(path: string): string {
  const match = path.match(/registry\/([^/]+)\//)
  if (!match)
    throw new Error(`Unable to resolve library from path: ${path}`)
  return match[1]
}

function titleFromMarkdown(body: string, fallback: string): string {
  for (const line of body.split('\n')) {
    if (!line.startsWith('# '))
      continue
    const text = line.slice(2).trim()
    if (text)
      return text
  }
  return fallback
}

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.(md|mdx)$/, '')
    .split(/[-_]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function typeToSection(type = 'block'): string {
  switch (type) {
    case 'composable':
      return 'composables'
    case 'util':
      return 'utilities'
    default:
      return 'components'
  }
}

function sectionLabel(section: string): string {
  switch (section) {
    case 'composables':
      return 'Composables'
    case 'utilities':
      return 'Utilities'
    default:
      return 'Components'
  }
}

function defaultCategoryForType(type = 'block'): { id: string, label: string } {
  switch (type) {
    case 'composable':
      return { id: 'composables', label: 'Composables' }
    case 'util':
      return { id: 'utilities', label: 'Utilities' }
    default:
      return { id: 'uncategorized', label: 'Uncategorized' }
  }
}

function itemHref(library: string, item: RegistryItem): string {
  const section = typeToSection(item.type)
  return withBase(`/${library}/${section}/${item.name}/`)
}

function resolveReadme(library: string, item: RegistryItem): string | undefined {
  const docFile = item.files.find(file => file.kind === 'doc')
  if (docFile) {
    const key = Object.keys(itemReadmeModules).find(path =>
      path.endsWith(`/registry/${library}/${docFile.path}`),
    )
    if (key)
      return itemReadmeModules[key]
  }

  const fallbackKey = Object.keys(itemReadmeModules).find((path) => {
    return path.includes(`/registry/${library}/`)
      && path.includes(`/${item.name}/README.md`)
  })
  return fallbackKey ? itemReadmeModules[fallbackKey] : undefined
}

function resolveExamples(library: string, item: RegistryItem) {
  const exampleFiles = item.files.filter(file => file.kind === 'example')
  const paths = exampleFiles.length > 0
    ? exampleFiles.map(file => file.path)
    : Object.keys(exampleModules)
        .filter(path => path.includes(`/registry/${library}/`) && path.includes(`/${item.name}/examples/`))
        .map((path) => {
          const idx = path.indexOf(`/registry/${library}/`)
          return path.slice(idx + `/registry/${library}/`.length)
        })

  return paths.map((relativePath) => {
    return {
      name: relativePath.split('/').pop()?.replace(/\.vue$/, '') || relativePath,
      path: `${library}/${relativePath}`,
    }
  })
}

export function getLibraries(): LibrarySummary[] {
  return Object.entries(registryModules)
    .map(([path, config]) => {
      const id = libraryIdFromPath(path)
      return {
        id,
        name: config.name,
        description: config.description,
        version: config.version,
        href: withBase(`/${id}/`),
        docs: getLibraryDocNav(id),
        tree: getComponentTree(id, config),
      }
    })
    .sort((a, b) => a.id.localeCompare(b.id))
}

export function getLibrary(library: string): LibrarySummary | undefined {
  return getLibraries().find(item => item.id === library)
}

export function getLibraryDocPages(library: string): LibraryDocPage[] {
  return Object.entries(libraryDocModules)
    .filter(([path]) => path.includes(`/registry/${library}/docs/`))
    .map(([path, body]) => {
      const relative = path.split(`/registry/${library}/docs/`)[1]
      const withoutExt = relative.replace(/\.(md|mdx)$/, '')
      const slug = withoutExt === 'index'
        ? []
        : withoutExt.split('/')
      const href = slug.length === 0
        ? withBase(`/${library}/docs/`)
        : withBase(`/${library}/docs/${slug.join('/')}/`)
      const fallback = slug.length === 0
        ? 'Overview'
        : titleFromFilename(slug[slug.length - 1])

      return {
        library,
        slug,
        href,
        title: titleFromMarkdown(body, fallback),
        body,
      }
    })
    .sort((a, b) => a.href.localeCompare(b.href))
}

export function getLibraryDocNav(library: string): DocNavItem[] {
  return getLibraryDocPages(library).map(page => ({
    title: page.title,
    href: page.href,
  }))
}

export function getLibraryDocPage(library: string, slug: string[] = []): LibraryDocPage | undefined {
  const normalized = slug.filter(Boolean)
  return getLibraryDocPages(library).find((page) => {
    if (normalized.length === 0)
      return page.slug.length === 0
    return page.slug.join('/') === normalized.join('/')
  })
}

export function getComponentTree(library: string, config?: RegistryConfig): ComponentTreeSection[] {
  const registry = config
    ?? Object.entries(registryModules).find(([path]) => libraryIdFromPath(path) === library)?.[1]

  if (!registry)
    return []

  const sectionMap = new Map<string, Map<string, ComponentTreeCategory>>()

  for (const item of registry.items) {
    if (item.name.startsWith('#'))
      continue

    const section = typeToSection(item.type)
    const categoryId = item.meta?.['docs.category'] || defaultCategoryForType(item.type).id
    const categoryLabel = item.meta?.['docs.categoryLabel']
      || defaultCategoryForType(item.type).label

    if (!sectionMap.has(section))
      sectionMap.set(section, new Map())

    const categories = sectionMap.get(section)!
    if (!categories.has(categoryId)) {
      categories.set(categoryId, {
        id: categoryId,
        label: categoryLabel,
        items: [],
      })
    }

    categories.get(categoryId)!.items.push({
      name: item.name,
      title: item.title || item.name,
      description: item.description,
      href: itemHref(library, item),
    })
  }

  return [...sectionMap.entries()].map(([section, categories]) => ({
    id: section,
    label: sectionLabel(section),
    categories: [...categories.values()],
  }))
}

export function getItemPage(library: string, section: string, name: string): ItemPageModel | undefined {
  const entry = Object.entries(registryModules).find(([path]) => libraryIdFromPath(path) === library)
  if (!entry)
    return undefined

  const [, config] = entry
  const item = config.items.find((candidate) => {
    return candidate.name === name && typeToSection(candidate.type) === section
  })
  if (!item)
    return undefined

  return {
    library,
    section,
    name,
    title: item.title || item.name,
    description: item.description,
    category: item.meta?.['docs.category'],
    categoryLabel: item.meta?.['docs.categoryLabel'],
    item,
    readme: resolveReadme(library, item),
    exampleModules: resolveExamples(library, item),
    sourceFiles: item.files.filter(file => !file.kind || file.kind === 'file'),
    href: itemHref(library, item),
  }
}

export function getAllItemPages(): ItemPageModel[] {
  return getLibraries().flatMap((library) => {
    const entry = Object.entries(registryModules).find(([path]) => libraryIdFromPath(path) === library.id)
    if (!entry)
      return []
    return entry[1].items
      .filter(item => !item.name.startsWith('#'))
      .map(item => getItemPage(library.id, typeToSection(item.type), item.name))
      .filter((page): page is ItemPageModel => !!page)
  })
}

export interface AdjacentNavLink {
  title: string
  href: string
}

export interface AdjacentNav {
  prev: AdjacentNavLink | null
  next: AdjacentNavLink | null
}

/**
 * Flat library navigation order: docs first, then component tree sections/categories/items.
 */
export function getLibraryNavSequence(library: string): AdjacentNavLink[] {
  const summary = getLibrary(library)
  if (!summary)
    return []

  const docs = summary.docs.map(item => ({ title: item.title, href: item.href }))
  const items = summary.tree.flatMap(section =>
    section.categories.flatMap(category =>
      category.items.map(item => ({ title: item.title, href: item.href })),
    ),
  )
  return [...docs, ...items]
}

export function getAdjacentNav(library: string, currentHref: string): AdjacentNav {
  const sequence = getLibraryNavSequence(library)
  const normalized = currentHref.replace(/\/$/, '') || '/'
  const index = sequence.findIndex((item) => {
    return (item.href.replace(/\/$/, '') || '/') === normalized
  })

  if (index < 0) {
    return { prev: null, next: null }
  }

  return {
    prev: index > 0 ? sequence[index - 1] : null,
    next: index < sequence.length - 1 ? sequence[index + 1] : null,
  }
}
