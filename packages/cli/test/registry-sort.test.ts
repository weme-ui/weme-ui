import { RegistryItemSchema } from '@weme-ui/schema'
import * as v from 'valibot'
import { describe, expect, it } from 'vitest'
import { sortRegistryItems } from '../src/commands/registry/utils'

type RegistryItemInput = v.InferInput<typeof RegistryItemSchema>

function registryItem(input: RegistryItemInput) {
  return v.parse(RegistryItemSchema, input)
}

describe('sortRegistryItems', () => {
  it('sorts items by when, type, then name', () => {
    const items = [
      registryItem({
        name: 'zeta',
        type: 'page',
        when: 'on-depended',
        files: [{ path: 'pages/zeta.vue', type: 'page' }],
      }),
      registryItem({
        name: 'button',
        type: 'component',
        files: [{ path: 'components/button.vue' }],
      }),
      registryItem({
        name: 'theme',
        type: 'theme',
        when: 'on-init',
        files: [{ path: 'theme/index.ts', type: 'theme' }],
      }),
      registryItem({
        name: 'alpha',
        type: 'util',
        when: 'on-depended',
        files: [{ path: 'utils/alpha.ts', type: 'util' }],
      }),
      registryItem({
        name: 'beta',
        type: 'util',
        when: 'on-init',
        files: [{ path: 'utils/beta.ts', type: 'util' }],
      }),
      registryItem({
        name: 'card',
        type: 'component',
        when: 'on-init',
        files: [{ path: 'components/card.vue' }],
      }),
      registryItem({
        name: 'alert',
        type: 'component',
        files: [{ path: 'components/alert.vue' }],
      }),
      registryItem({
        name: 'layout',
        type: 'layout',
        files: [{ path: 'layouts/default.vue', type: 'layout' }],
      }),
      registryItem({
        name: 'block',
        type: 'block',
        files: [{ path: 'blocks/hero.vue', type: 'block' }],
      }),
      registryItem({
        name: 'use-toggle',
        type: 'composable',
        files: [{ path: 'composables/use-toggle.ts', type: 'composable' }],
      }),
    ]

    const sorted = sortRegistryItems(items)

    expect(sorted.map((item) => [item.when, item.type, item.name])).toEqual([
      ['on-init', 'util', 'beta'],
      ['on-init', 'component', 'card'],
      ['on-init', 'theme', 'theme'],
      ['on-depended', 'util', 'alpha'],
      ['on-depended', 'component', 'alert'],
      ['on-depended', 'component', 'button'],
      ['on-depended', 'composable', 'use-toggle'],
      ['on-depended', 'layout', 'layout'],
      ['on-depended', 'block', 'block'],
      ['on-depended', 'page', 'zeta'],
    ])
  })

  it('sorts files by kind without mutating the input', () => {
    const item = registryItem({
      name: 'button',
      files: [
        { path: 'components/button/README.md', kind: 'doc' },
        { path: 'components/button/b.vue', kind: 'file' },
        { path: 'components/button/example.vue', kind: 'example' },
        { path: 'components/button/a.vue' },
        { path: 'components/button/button.test.ts', kind: 'test' },
      ],
    })
    const originalPaths = item.files.map((file) => file.path)

    const sorted = sortRegistryItems([item])

    expect(sorted[0]?.files.map((file) => file.path)).toEqual([
      'components/button/b.vue',
      'components/button/a.vue',
      'components/button/button.test.ts',
      'components/button/example.vue',
      'components/button/README.md',
    ])
    expect(item.files.map((file) => file.path)).toEqual(originalPaths)
    expect(sorted[0]).not.toBe(item)
    expect(sorted[0]?.files).not.toBe(item.files)
  })

  it('returns items that pass RegistryItemSchema safeParse', () => {
    const sorted = sortRegistryItems([
      registryItem({
        name: 'button',
        title: 'Button',
        description: '按钮 component。',
        files: [{ path: 'components/button/button.vue' }],
        registryDependencies: ['utils'],
      }),
    ])

    const parsed = v.safeParse(v.array(RegistryItemSchema), sorted)

    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.output).toEqual(sorted)
    }
  })

  it('returns an empty list for empty input', () => {
    expect(sortRegistryItems([])).toEqual([])
  })
})
