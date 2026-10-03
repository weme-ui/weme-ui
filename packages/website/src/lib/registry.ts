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

export type LibrarySource = 'registry' | 'package'

export interface LibrarySummary {
  id: string
  source: LibrarySource
  name: string
  description?: string
  version?: string
  href: string
  docs: DocNavItem[]
  tree: ComponentTreeSection[]
}

/**
 * Packages that publish docs through the website.
 * Same `docs/` convention as `registry/<library>/docs`.
 * Keep as an allowlist so generated packages (e.g. schema) are not picked up.
 */
const PACKAGE_DOC_IDS = ['unocss-preset'] as const

interface PackageManifest {
  name?: string
  description?: string
  version?: string
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
    title: string
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

// Keep globs scoped to PACKAGE_DOC_IDS so generated package docs (e.g. schema) stay out.
// When adding a package, append another glob pattern and PACKAGE_DOC_IDS entry.
const packageDocModules = import.meta.glob<string>(
  '../../../../packages/unocss-preset/docs/**/*.{md,mdx}',
  { eager: true, query: '?raw', import: 'default' },
)

const packageManifestModules = import.meta.glob<PackageManifest>(
  '../../../../packages/unocss-preset/package.json',
  { eager: true, import: 'default' },
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

function packageIdFromPath(path: string): string | undefined {
  // Prefer explicit packages/… keys, then normalized sibling keys like ../../../unocss-preset/…
  const packagesMatch = path.match(/packages\/([^/]+)\//)
  if (packagesMatch)
    return packagesMatch[1]

  for (const id of PACKAGE_DOC_IDS) {
    if (path.includes(`/${id}/`) || path.includes(`/${id}/package.json`) || path.endsWith(`/${id}/package.json`))
      return id
  }

  return undefined
}

function isPackageDocLibrary(id: string): boolean {
  return (PACKAGE_DOC_IDS as readonly string[]).includes(id)
}

function getPackageManifest(id: string): PackageManifest | undefined {
  const entry = Object.entries(packageManifestModules).find(([path]) => {
    return packageIdFromPath(path) === id
  })
  return entry?.[1]
}

function findDocSegment(modules: Record<string, string>, marker: string): string | undefined {
  const sample = Object.keys(modules).find(path => path.includes(marker))
  if (!sample)
    return undefined
  const index = sample.indexOf(marker)
  return sample.slice(0, index + marker.length)
}

function resolveDocSource(library: string): {
  modules: Record<string, string>
  segment: string
} | undefined {
  const registryMarker = `/registry/${library}/docs/`
  const registrySegment = findDocSegment(libraryDocModules, registryMarker)
  if (registrySegment) {
    return {
      modules: libraryDocModules,
      segment: registrySegment,
    }
  }

  if (!isPackageDocLibrary(library))
    return undefined

  // Vite may normalize `../../../../packages/<id>/docs` to `../../../<id>/docs`.
  const packageMarker = `/${library}/docs/`
  const packageSegment = findDocSegment(packageDocModules, packageMarker)
  if (packageSegment) {
    return {
      modules: packageDocModules,
      segment: packageSegment,
    }
  }

  return undefined
}

function slugFromDocRelativePath(relative: string): string[] {
  const withoutExt = relative.replace(/\.(md|mdx)$/, '')
  const parts = withoutExt.split('/').filter(Boolean)
  const leaf = parts[parts.length - 1]
  if (leaf === 'index' || leaf === 'README')
    return parts.slice(0, -1)
  return parts
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
    case 'layout':
      return 'layouts'
    case 'block':
      return 'blocks'
    case 'util':
      return 'utilities'
    default:
      return 'components'
  }
}

/**
 * `util` stays in registry.json for install semantics, but is not shown in the docs site.
 * Components, composables, layouts, and blocks load co-located README + examples.
 */
function isDocsItem(item: RegistryItem): boolean {
  return !item.name.startsWith('#') && item.type !== 'util'
}

export function getSectionLabel(section: string): string {
  switch (section) {
    case 'composables':
      return 'Composables'
    case 'layouts':
      return 'Layouts'
    case 'blocks':
      return 'Blocks'
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
    case 'layout':
      return { id: 'layouts', label: 'Layouts' }
    case 'block':
      return { id: 'blocks', label: 'Blocks' }
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

/** `with-icon` → `With Icon`; strips legacy `<item>-` prefixes when present. */
export function humanizeExampleName(slug: string, itemName?: string): string {
  let value = slug
  if (itemName && value.startsWith(`${itemName}-`))
    value = value.slice(itemName.length + 1)
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
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
    const name = relativePath.split('/').pop()?.replace(/\.vue$/, '') || relativePath
    return {
      name,
      title: humanizeExampleName(name, item.name),
      path: `${library}/${relativePath}`,
    }
  })
}

export function getLibraries(): LibrarySummary[] {
  const registries = Object.entries(registryModules).map(([path, config]) => {
    const id = libraryIdFromPath(path)
    return {
      id,
      source: 'registry' as const,
      name: config.name,
      description: config.description,
      version: config.version,
      href: withBase(`/${id}/`),
      docs: getLibraryDocNav(id),
      tree: getComponentTree(id, config),
    }
  })

  const packages: LibrarySummary[] = []
  for (const id of PACKAGE_DOC_IDS) {
    const docs = getLibraryDocNav(id)
    if (docs.length === 0)
      continue

    const manifest = getPackageManifest(id)
    packages.push({
      id,
      source: 'package',
      name: manifest?.name || id,
      description: manifest?.description,
      version: manifest?.version,
      href: withBase(`/${id}/`),
      docs,
      tree: [],
    })
  }

  return [...registries, ...packages].sort((a, b) => a.id.localeCompare(b.id))
}

export function getLibrary(library: string): LibrarySummary | undefined {
  return getLibraries().find(item => item.id === library)
}

export function getLibraryDocPages(library: string): LibraryDocPage[] {
  const source = resolveDocSource(library)
  if (!source)
    return []

  return Object.entries(source.modules)
    .filter(([path]) => path.includes(source.segment))
    .map(([path, body]) => {
      const relative = path.split(source.segment)[1]
      const slug = slugFromDocRelativePath(relative)
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
    if (!isDocsItem(item))
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
    label: getSectionLabel(section),
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
  if (!item || !isDocsItem(item))
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
  return Object.entries(registryModules).flatMap(([path, config]) => {
    const library = libraryIdFromPath(path)
    return config.items
      .filter(isDocsItem)
      .map(item => getItemPage(library, typeToSection(item.type), item.name))
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
