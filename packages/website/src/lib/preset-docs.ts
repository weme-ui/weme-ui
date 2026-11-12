export interface PresetDocLink {
  id: string
  title: string
}

export interface PresetDocGroup {
  label: string
  items: PresetDocLink[]
}

/** 与 `packages/unocss-preset/docs/index.md` 的目录一致。 */
export const PRESET_DOCS_NAV: PresetDocGroup[] = [
  {
    label: '入门',
    items: [
      { id: 'index', title: '概览' },
      { id: 'getting-started', title: '快速开始' },
    ],
  },
  {
    label: '主题与变量',
    items: [
      { id: 'preset-and-theme', title: '主题' },
      { id: 'radix-colors', title: '颜色' },
      { id: 'css-variables', title: 'CSS 变量' },
    ],
  },
  {
    label: '规则、变体、快捷方式',
    items: [
      { id: 'rules', title: 'Rules' },
      { id: 'variants', title: 'Variants' },
      { id: 'shortcuts', title: 'Shortcuts' },
    ],
  },
  {
    label: '预检与后处理',
    items: [{ id: 'preflights-and-postprocess', title: 'Preflights' }],
  },
  {
    label: '最佳实践',
    items: [{ id: 'recipes', title: '组合' }],
  },
  {
    label: '扩展开发',
    items: [{ id: 'extending', title: '新增规则' }],
  },
]

const titles = new Map(
  PRESET_DOCS_NAV.flatMap((group) => group.items.map((item) => [item.id, item.title] as const)),
)

/** `getting-started.md` 或 `index.md` → collection id。 */
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
