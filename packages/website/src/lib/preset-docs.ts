export interface PresetDocLink {
  id: string
  title: string
}

export interface PresetDocGroup {
  label: string
  items: PresetDocLink[]
}

export const PRESET_DOCS_NAV: PresetDocGroup[] = [
  {
    label: '开始',
    items: [{ id: 'index', title: 'Getting started' }],
  },
  {
    label: 'Theme',
    items: [
      { id: 'theme', title: 'Overview' },
      { id: 'theme/color', title: 'Color' },
      { id: 'theme/palette', title: 'Palette' },
      { id: 'theme/dark-mode', title: 'Dark mode' },
      { id: 'theme/tokens', title: 'Tokens' },
      { id: 'theme/typography', title: 'Typography' },
      { id: 'theme/spacing', title: 'Spacing' },
      { id: 'theme/radius', title: 'Radius' },
      { id: 'theme/shadows', title: 'Shadows' },
    ],
  },
  {
    label: 'Utilities',
    items: [
      { id: 'utilities/rules', title: 'Rules' },
      { id: 'utilities/animate', title: 'Animation' },
      { id: 'utilities/variants', title: 'Variants' },
    ],
  },
]

const titles = new Map(
  PRESET_DOCS_NAV.flatMap((group) => group.items.map((item) => [item.id, item.title] as const)),
)

/** `theme/color.md` 或 `index.md` → collection id。 */
export function docIdFromEntry(entry: string) {
  const normalized = entry.replace(/\\/g, '/').replace(/^\.\//, '')
  return docIdFromRelative(normalized)
}

export function docIdFromRelative(relativePath: string) {
  const withoutExt = relativePath.replace(/\.md$/, '')
  const slug = withoutExt.replace(/\/index$/, '').replace(/^index$/, '')
  return slug || 'index'
}

/** 站点根相对路径，不含 `base`。 */
export function presetDocPath(id: string) {
  if (id === 'index') return '/docs/unocss-preset/'
  return `/docs/unocss-preset/${id}/`
}

export function titleForDoc(id: string) {
  return titles.get(id) ?? id
}
