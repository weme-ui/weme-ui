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
      { id: 'getting-started', title: '安装 preset 并写出第一个类名' },
    ],
  },
  {
    label: '主题与变量',
    items: [
      { id: 'preset-and-theme', title: '配置 Preset 与定制主题' },
      { id: 'radix-colors', title: '使用 Radix Colors 刻度与别名' },
      { id: 'css-variables', title: '使用并覆盖自定义 CSS 变量' },
    ],
  },
  {
    label: '规则、变体、快捷方式',
    items: [
      { id: 'rules', title: '按场景选用 Rules 类名' },
      { id: 'variants', title: '用 Variants 写暗色、断点与状态' },
      { id: 'shortcuts', title: '用 Shortcuts 收拢重复类名' },
    ],
  },
  {
    label: '预检与后处理',
    items: [{ id: 'preflights-and-postprocess', title: '理解 Preflights 与 Postprocess' }],
  },
  {
    label: '最佳实践',
    items: [{ id: 'recipes', title: '组合类名、变量与变体' }],
  },
  {
    label: '扩展开发',
    items: [{ id: 'extending', title: '在仓库里新增规则、变量与变体' }],
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
